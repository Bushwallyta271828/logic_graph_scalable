'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/_types/parse-types';
import { potentialClaimID } from '@/app/_types/claim-types';

export class ParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParsingError";
  }
}

function signlessReal({candidate}: {candidate: string}) : number | null {
  //Tries to parse candidate as a signless real number, returns null if impossible.
  //(The only difference between signless and non-negative is that "-0" has a sign.)
  if (/^(0|[1-9]\d*)(\.\d+)?$/.test(candidate)) {return Number(candidate);}
  else {return null;}
}

function probabilityValue({candidate}: {candidate: string}) : number | null {
  //Tries to parse candidate as a real number in [0, 1], returns null if impossible.
  const isNegative = candidate.startsWith("-");
  const nonNegative = isNegative ? candidate.slice(1).trim() : candidate;
  const isZero = /^0(\.0+)?$/.test(nonNegative);
  const magnitudeValid = /^(1(\.0+)?|0(\.\d+)?)$/.test(nonNegative);
  if ((magnitudeValid && !isNegative) || isZero) {
    return Number(nonNegative);
  } else {return null;}
}

function findDepths({formula}: {formula: string}) {
  //Computes how many layers of parentheses each
  //character is contained within, as well as whether
  //the parentheses match overall.
  let depths: number[] = [];
  let depth = 0;
  let matching = true;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === "(") {depth += 1;}
    if (formula[i] === ")") {depth -= 1;}
    if (depth < 0) {matching = false;}
    depths.push(formula[i] === "(" ? depth - 1 : depth);
  }
  return {depths: depths, matching: matching && (depth === 0)};
}

function splitOnAllDepthZeroSubstrings({formula, depths, substring}:
  {formula: string, depths: number[], substring: string}): string[] {
  //This function behaves exactly like slicing formula with substring except that it
  //only splits on instances of substring at a depth of zero.
  //The function assumes that substring doesn't contain parentheses so it has constant depth.
  //Be careful if substring shares prefixes and suffixes!
  const fragments: string[] = [];
  let fragmentStart = 0;
  let fragmentEnd = formula.indexOf(substring);
  let matches = (fragmentEnd >= 0);
  while (matches) {
    if (depths[fragmentEnd] === 0) {
      fragments.push(formula.slice(fragmentStart, fragmentEnd));
      fragmentStart = fragmentEnd + substring.length;
    }
    const gapToNextMatch = formula.slice(fragmentEnd + substring.length).indexOf(substring);
    if (gapToNextMatch >= 0) {
      fragmentEnd += substring.length + gapToNextMatch;
    } else {
      matches = false;
    }
  }
  fragments.push(formula.slice(fragmentStart));
  return fragments;
}

function attemptUnwrap({trimmedFormula, depths}:
  {trimmedFormula: string, depths: number[]}): string | null {
  //Given trimmedFormula (no spaces at the start or end) and
  //the depths corresponding to trimmedFormula, attemptUnwrap will
  //return ... if trimmedFormula is of the form (...) and null otherwise.
  if (trimmedFormula[0] === "(" && trimmedFormula[trimmedFormula.length-1] === ")" &&
    depths.slice(1, depths.length-1).every((depth) => depth >= 1)) {
    return trimmedFormula.slice(1, trimmedFormula.length-1);
  }
  return null;
}

type GeneralLogicalFormula<B extends boolean> = B extends true ? LogicalFormula : LogicalFormulaWithoutImplies;

function parseLogicalFormula<B extends boolean>({formula, acceptsImplies}:
  {formula: string, acceptsImplies: B}): GeneralLogicalFormula<B> {
  //This function will attempt to parse formula as either a LogicalFormula or a
  //LogicalFormulaWithoutImplies depending on the value of acceptsImplies.
  //It will throw a ParsingError if formula cannot be parsed.
  //Make sure that B and acceptsImplies agree!
  //This function assumes that formula has had spaces added around parentheses!
  const trimmedFormula = formula.trim(); 
  if (trimmedFormula === "") {throw new ParsingError("Empty logical formula encountered.");}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {throw new ParsingError("Input has mismatched parentheses.");}
  const unwrap = attemptUnwrap({trimmedFormula: trimmedFormula, depths: depths});
  if (unwrap !== null) {return parseLogicalFormula<B>({formula: unwrap, acceptsImplies: acceptsImplies});}

  if (potentialClaimID({candidate: trimmedFormula}))
    {return {parseType: 'ClaimID' as const, claimID: trimmedFormula} as GeneralLogicalFormula<B>;}

  const impliesFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " implies "});
  if (impliesFragments.length >= 2) {
    if (acceptsImplies) {
      let rightTail = parseLogicalFormula<B>({formula: impliesFragments[impliesFragments.length-1], acceptsImplies: true});
      for (let i = impliesFragments.length-2; i >= 0; i--) {
        const left = parseLogicalFormula<B>({formula: impliesFragments[i], acceptsImplies: true});
        rightTail = {parseType: 'LogicalFormulaImplies', left: left, right: rightTail} as GeneralLogicalFormula<B>;
      }
      return rightTail;
    } else {
      throw new ParsingError("Encountered \"implies\" inside a probability.");
    }
  }

  const orFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " or "});
  if (orFragments.length >= 2) {
    return {
      parseType: (acceptsImplies ? 'LogicalFormulaOr' : 'LogicalFormulaWithoutImpliesOr') as const,
      children: orFragments.map((orFragment) =>
        parseLogicalFormula<B>({formula: orFragment, acceptsImplies: acceptsImplies})),
    } as GeneralLogicalFormula<B>;
  }

  const andFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " and "});
  if (andFragments.length >= 2) {
    return {
      parseType: (acceptsImplies ? 'LogicalFormulaAnd' : 'LogicalFormulaWithoutImpliesAnd') as const,
      children: andFragments.map((andFragment) =>
        parseLogicalFormula<B>({formula: andFragment, acceptsImplies: acceptsImplies})),
    } as GeneralLogicalFormula<B>;
  }

  if (trimmedFormula.slice(0, 4) === "not ") {
    return {
      parseType: (acceptsImplies ? 'LogicalFormulaNot' : 'LogicalFormulaWithoutImpliesNot') as const,
      child: parseLogicalFormula<B>({formula: trimmedFormula.slice(4), acceptsImplies: acceptsImplies}),
    } as GeneralLogicalFormula<B>;
  }

  throw new ParsingError("Unrecognized format for logical formula.");
}

function parseAffineFormula({formula}: {formula: string}): AffineExpression {
  //This function will attempt to parse formula as an AffineExpression.
  //It will throw a ParsingError if formula cannot be parsed.
  //This function assumes that formula has had spaces
  //added around parentheses, "*", "+", and "-"!
  const trimmedFormula = formula.trim(); 
  if (trimmedFormula === "") {return null;}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {return null;}
  const unwrap = attemptUnwrap({trimmedFormula: trimmedFormula, depths: depths});
  if (unwrap !== null) {return parseAffineFormula({formula: unwrap});}

  //To handle subtraction, we're going to take all depth-zero minus signs
  //(except for a potential first one) and add addition signs
  //in front of them. Since we split on ' - ' and use trimmedFormula, any
  //initial minus sign will be ignored.
  const minusFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: ' - '});
  const allAdditionFormula = minusFragments.join(' + - ');
  const { depths: additionDepths, matching: additionMatching } =
    findDepths({formula: allAdditionFormula});
  if (!additionMatching) {return null;} //should never fire

  const plusFragments = splitOnAllDepthZeroSubstrings(
    {formula: allAdditionFormula, depths: additionDepths, substring: " + "});
  if (plusFragments.length >= 2) {
    const children: AffineExpression[] = [];
    for (let i = 0; i < plusFragments.length; i++) {
      const child = parseAffineFormula({formula: plusFragments[i]});
      if (child !== null) {children.push(child);} else {return null;}
    }
    return {parseType: 'AffineExpressionAddition' as const, children: children} as AffineExpression;
  }

  const isNegated = allAdditionFormula.startsWith("-");
  const signFactor = isNegated ? -1 : 1;
  const signless = isNegated ? allAdditionFormula.slice(1).trim() : allAdditionFormula;
  const { depths: signlessDepths } = findDepths({formula: signless});

  const attemptConstant = signlessReal({candidate: signless});
  if (attemptConstant !== null) {
    return { parseType: 'AffineExpressionConstant', constant: signFactor * attemptConstant };
  }

  const openParenthesisIndex = signless.indexOf("("); //first index crucial here
  if (openParenthesisIndex < 0) {return null;}
  const rightUnwrap = attemptUnwrap({
    trimmedFormula: signless.slice(openParenthesisIndex), //Note that we preserve trimming!
    depths: signlessDepths.slice(openParenthesisIndex),
  });
  if (rightUnwrap === null) {return null;}
  const outer = signless.slice(0, openParenthesisIndex).trim();
  const isProbability = outer.endsWith("P");
  const outerWithoutP = isProbability ? outer.slice(0, outer.length-1).trim() : outer;
  const outerWithoutStar = outerWithoutP.endsWith("*") ?
    outerWithoutP.slice(0, outerWithoutP.length - 1).trim() : outerWithoutP;
  const attemptMagnitude = signlessReal({candidate: outerWithoutStar});
  if (attemptMagnitude === null && outerWithoutStar !== "") {return null;}
  //Note that attemptMagnitude === null now implies outerWithoutStar === "".
  const coefficient = (attemptMagnitude !== null ? attemptMagnitude : 1) * signFactor;
  let child: AffineExpression | null;
  if (isProbability) {
    const probabilityChild = parseLogicalFormulaWithoutImplies({formula: rightUnwrap});
    if (probabilityChild === null) {return null;}
    child = { parseType: 'AffineExpressionProbability' as const,
      child: probabilityChild } as AffineExpression;
  } else {
    child = parseAffineFormula({formula: rightUnwrap});
  }
  if (child === null) {return null;}
  if (coefficient === 1) {return child;}
  else {
    return { parseType: 'AffineExpressionMultiplication' as const,
      coefficient: coefficient, child: child } as AffineExpression;
  }
}

export function parseFormula({formula}: {formula: string}): ConstraintParse {
  //This function will attempt to parse formula as a ConstraintParse.
  //It will throw a ParsingError if formula cannot be parsed.
  const spacedFormula = formula.replace(/[\(\)\|\*\+\-\=]/g, match => ` ${match} `);

  const {depths, matching} = findDepths({formula: spacedFormula});
  if (!matching) {return null;}

  const equalsFragments = splitOnAllDepthZeroSubstrings(
    {formula: spacedFormula, depths: depths, substring: " = "});

  if (equalsFragments.length === 1) {
    const logicalAttempt = parseLogicalFormula({formula: spacedFormula});
    return logicalAttempt ? (logicalAttempt as ConstraintParse) : null;
  } else if (equalsFragments.length === 2) {
    //First, let's attempt to parse as a conditional probability.
    const rightHandSideConstant = probabilityValue({candidate: equalsFragments[1].trim()});
    if (rightHandSideConstant !== null) {
      const leftHandSide = equalsFragments[0].trim();
      if (leftHandSide.startsWith("P")) {
        const leftNoP = leftHandSide.slice(1).trim();
        const { depths: leftNoPDepths } = findDepths({formula: leftNoP});
        const probUnwrap = attemptUnwrap({trimmedFormula: leftNoP, depths: leftNoPDepths});
        if (probUnwrap !== null) {
          const { depths: probUnwrapDepths } = findDepths({formula: probUnwrap});
          const conditionalFragments = splitOnAllDepthZeroSubstrings(
            {formula: probUnwrap, depths: probUnwrapDepths, substring: " | "});
          if (conditionalFragments.length === 2) {
            const left = parseLogicalFormulaWithoutImplies({formula: conditionalFragments[0]});
            const right = parseLogicalFormulaWithoutImplies({formula: conditionalFragments[1]});
            if (left !== null && right !== null) {
              return {
                parseType: 'ConditionalProbabilityAssignment' as const,
                conditionalLeftFormula: left,
                conditionalRightFormula: right,
                probability: rightHandSideConstant,
              } as ConstraintParse;
            } else {return null;}
          } else if (conditionalFragments.length >= 3) {return null;}
        }
      }
    }

    //Now let's parse as an affine equation.
    const left = parseAffineFormula({formula: equalsFragments[0]});
    const right = parseAffineFormula({formula: equalsFragments[1]});
    if (left !== null && right !== null) {
      return { parseType: 'AffineEquation' as const, left: left, right: right } as ConstraintParse;
    } else {return null;}
  } else {
    return null;
  }
}
