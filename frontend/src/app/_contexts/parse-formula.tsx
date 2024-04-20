'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  FormulaParse
} from '@/app/_types/claim-types.tsx'; 

type ParserInput = {
  formula: string;
  claimIDs: Set<string>;
};

function nonNegativeReal({candidate}: {candidate: string}) : number | null {
  //Detects (optional sign)(optional spaces)(non-negative real number)
  //and returns the real number if it exists.
  //return /^(0|[1-9]\d*)(\.\d+)?$/.test(candidate);
  //TODO
}

function probabilityValue({candidate}: {candidate: string}) : number | null {
  //TODO (remember to include "-0"!)
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
  //The answer only makes sense if substring doesn't share any prefixes and suffixes.
  const fragments: string[] = [];
  let fragmentStart = 0;
  let fragmentEnd = formula.indexOf(substring);
  while (fragmentEnd >= 0) {
    if (depths[fragmentEnd] === 0) {
      fragments.push(formula.slice(fragmentStart, fragmentEnd));
      fragmentStart = fragmentEnd + substring.length;
    }
    fragmentEnd = formula.slice(fragmentEnd + substring.length).indexOf(substring);
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

function parseLogicalFormula({formula, claimIDs}: ParserInput): LogicalFormula | null {
  //This function will attempt to parse formula as a LogicalFormula.
  //It will return null if formula cannot be parsed.
  //This function assumes that formula has had spaces added around parentheses!
  const trimmedFormula = formula.trim(); 
  if (trimmedFormula === "") {return null;}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {return null;}
  const unwrap = attemptUnwrap({trimmedFormula: trimmedFormula, depths: depths});
  if (unwrap) {return parseLogicalFormula({formula: unwrap, claimIDs: claimIDs});}

  if (claimIDs.has(trimmedFormula))
    {return {parseType: 'ClaimID' as const, value: trimmedFormula} as LogicalFormula;}

  const impliesFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " implies "});
  if (impliesFragments.length >= 2) {
    let rightTail = parseLogicalFormula(
      {formula: impliesFragments[impliesFragments.length-1], claimIDs: claimIDs});
    if (!rightTail) {return null;}
    for (let i = impliesFragments.length-2; i >= 0; i--) {
      const left = parseLogicalFormula({formula: impliesFragments[i], claimIDs: claimIDs});
      if (!left) {return null;}
      rightTail = {parseType: 'LogicalFormulaImplies', left: left, right: rightTail} as LogicalFormula;
    }
    return rightTail;
  }

  const orFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " or "});
  if (orFragments.length >= 2) {
    const children: LogicalFormula[] = [];
    for (let i = 0; i < orFragments.length; i++) {
      const child = parseLogicalFormula({formula: orFragments[i], claimIDs: claimIDs});
      if (child) {children.push(child);} else {return null;}
    }
    return {parseType: 'LogicalFormulaOr' as const, children: children} as LogicalFormula;
  }

  const andFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " and "});
  if (andFragments.length >= 2) {
    const children: LogicalFormula[] = [];
    for (let i = 0; i < andFragments.length; i++) {
      const child = parseLogicalFormula({formula: andFragments[i], claimIDs: claimIDs});
      if (child) {children.push(child);} else {return null;}
    }
    return {parseType: 'LogicalFormulaAnd' as const, children: children} as LogicalFormula;
  }

  if (trimmedFormula.slice(0, 4) === "not ") {
    const child = parseLogicalFormula({formula: trimmedFormula.slice(4), claimIDs: claimIDs});
    if (child) {
      return {parseType: 'LogicalFormulaNot' as const, child: child} as LogicalFormula;
    } else {return null;}
  }

  return null;
}

function parseLogicalFormulaWithoutImplies({formula, claimIDs}: ParserInput):
  LogicalFormulaWithoutImplies | null {
  //This function will attempt to parse formula as a LogicalFormulaWithoutImplies.
  //It will return null if formula cannot be parsed.
  //This function assumes that formula has had spaces added around parentheses!
  const trimmedFormula = formula.trim(); 
  if (trimmedFormula === "") {return null;}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {return null;}
  const unwrap = attemptUnwrap({trimmedFormula: trimmedFormula, depths: depths});
  if (unwrap) {return parseLogicalFormulaWithoutImplies({formula: unwrap, claimIDs: claimIDs});}

  if (claimIDs.has(trimmedFormula))
    {return {parseType: 'ClaimID' as const, value: trimmedFormula} as LogicalFormulaWithoutImplies;}

  const orFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " or "});
  if (orFragments.length >= 2) {
    const children: LogicalFormulaWithoutImplies[] = [];
    for (let i = 0; i < orFragments.length; i++) {
      const child = parseLogicalFormulaWithoutImplies({formula: orFragments[i], claimIDs: claimIDs});
      if (child) {children.push(child);} else {return null;}
    }
    return {parseType: 'LogicalFormulaWithoutImpliesOr' as const, children: children} as LogicalFormulaWithoutImplies;
  }

  const andFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: " and "});
  if (andFragments.length >= 2) {
    const children: LogicalFormulaWithoutImplies[] = [];
    for (let i = 0; i < andFragments.length; i++) {
      const child = parseLogicalFormulaWithoutImplies({formula: andFragments[i], claimIDs: claimIDs});
      if (child) {children.push(child);} else {return null;}
    }
    return {parseType: 'LogicalFormulaWithoutImpliesAnd' as const, children: children} as LogicalFormulaWithoutImplies;
  }

  if (trimmedFormula.slice(0, 4) === "not ") {
    const child = parseLogicalFormulaWithoutImplies({formula: trimmedFormula.slice(4), claimIDs: claimIDs});
    if (child) {
      return {parseType: 'LogicalFormulaWithoutImpliesNot' as const, child: child} as LogicalFormulaWithoutImplies;
    } else {return null;}
  }

  return null;
}

function parseAffineFormula({formula, claimIDs}: ParserInput): AffineExpression | null {
  //This function will attempt to parse formula as an AffineExpression.
  //It will return null if formula cannot be parsed.
  //This function assumes that formula has had spaces
  //added around parentheses, "*", "+", and "-"!
  const trimmedFormula = formula.trim(); 
  if (trimmedFormula === "") {return null;}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {return null;}
  const unwrap = attemptUnwrap({trimmedFormula: trimmedFormula, depths: depths});
  if (unwrap) {return parseAffineFormula({formula: unwrap, claimIDs: claimIDs});}

  //To handle subtraction, we're going to take all depth-zero minus signs
  //(except for a potential first one) and add addition signs
  //in front of them. Since we split on ' - ' and use trimmedFormula, any
  //initial minus sign will be ignored.
  const minusFragments = splitOnAllDepthZeroSubstrings(
    {formula: trimmedFormula, depths: depths, substring: ' - '});
  const allAdditionFormula = ' + - '.join(minusFragments);
  const { depths: additionDepths, matching: additionMatching } =
    findDepths({formula: allAdditionFormula});
  if (!additionMatching) {return null;} //should never fire

  const plusFragments = splitOnAllDepthZeroSubstrings(
    {formula: allAdditionFormula, depths: additionDepths, substring: " + "});
  if (plusFragments.length >= 2) {
    const children: AffineExpression[] = [];
    for (let i = 0; i < plusFragments.length; i++) {
      const child = parseAffineFormula({formula: plusFragments[i], claimIDs: claimIDs});
      if (child) {children.push(child);} else {return null;}
    }
    return {parseType: 'AffineExpressionAddition' as const, children: children} as AffineExpression;
  }

  const attemptConstant = signSeparatedReal({candidate: allAdditionFormula});
  if (attemptConstant) {
    return { parseType: 'AffineExpressionConstant', constant: attemptConstant };
  }

  const openParenthesisIndex = allAdditionFormula.indexOf("("); //first index crucial here
  if (openParenthesisIndex < 0) {return null;}
  const rightUnwrap = attemptUnwrap(
    {trimmedFormula: allAdditionFormula.slice(openParenthesisIndex).trim(), depths: additionDepths});
  if (!rightUnwrap) {return null;}
  const outer = allAdditionFormula.slice(0, openParenthesisIndex).trim();
  const isProbability = outer.endsWith("P");
  const outerWithoutP = isProbability ? outer.slice(0, outer.length-1).trim() : outer;
  const outerWithoutStar = outerWithoutP.endsWith("*") ?
    outerWithoutP.slice(0, outerWithoutP.length - 1).trim() : outerWithoutP;
  const isNegated = outerWithoutStar.startsWith("-");
  const magnitudeOrEmpty =
    isNegated ? outerWithoutStar.slice(1).trim() : outerWithoutStar;
  const attemptMagnitude = nonNegativeReal(magnitudeOrEmpty);
  if (!attemptMagnitude && magnitudeOrEmpty !== "") {return null;}
  //Note that !attemptMagnitude now implies magnitudeOrEmpty === "".
  const coefficient = (attemptMagnitude ? attemptMagnitude : 1) * (isNegated ? -1 : 1);
  let child: AffineExpression | null;
  if (isProbability) {
    const probabilityChild = parseLogicalFormulaWithoutImplies(
      {formula: rightUnwrap, claimIDs: claimIDs});
    if (!probabilityChild) {return null;}
    child = { parseType: 'AffineExpressionProbability' as const,
      child: probabilityChild } as AffineExpression;
  } else {
    child = parseAffineFormula({formula: rightUnwrap, claimIDs: claimIDs});
  }
  if (!child) {return null;}
  if (coefficient === 1) {return child;}
  else {
    return { parseType: 'AffineExpressionMultiplication' as const,
      coefficient: coefficient, child: child } as AffineExpression;
  }
}

export function parseFormula({formula,substitutions}: ParserInput): FormulaParse | null {
  const spacedFormula = formula.replace(/[\(\)\|\*\+\-\=]/g, match => ` ${match} `);

  const {depths, matching} = findDepths({formula: spacedFormula});
  if (!matching) {return {substitutedFormula: spacedFormula, validFormula: false};}

  const equalsFragments = splitOnAllDepthZeroSubstrings(
    {formula: spacedFormula, depths: depths, substring: " = "});

  if (equalsFragments.length === 1) {
    const logicalAttempt = parseLogicalFormula(
      {formula:spacedFormula, claimIDs: claimIDs});
    return logicalAttempt ? (logicalAttempt as FormulaParse) : null;
  } else if (equalsFragments.length === 2) {
    //First, let's attempt to parse as a conditional probability.
    const rightHandSide = equalsFragments[1].trim();
    const rightHandSideNegation = rightHandSide.startsWith("-");
    const rightHandSideSignless = rightHandSideNegation ?
      rightHandSide.slice(1).trim() : rightHandSide;
    const attemptRightHandSideMagnitude = nonNegativeReal(rightHandSideSignless);
    if (attemptRightHandSideMagnitude) {
      const leftHandSide = equalsFragments[0].trim();
      if (leftHandSide.startsWith("P")) {
        const leftNoP = leftHandSide.slice(1).trim();
        const { depths: leftNoPDepths } = findDepths({formula: leftNoP});
        const probUnwrap = attemptUnwrap({trimmedFormula: leftNoP, depths: leftNoPDepths});
        if (probUnwrap) {
          const { depths: probUnwrapDepths } = findDepths({formula: probUnwrap});
          const conditionalFragments = splitOnAllDepthZeroSubstrings(
            {formula: probUnwrap, depths: probUnwrapDepths, substring: " | "});
          if (conditionalFragments.length === 2) {
            const left = parseLogicalFormulaWithoutImplies(
              {formula: conditionalFragments[0], claimIDs: claimIDs});
            const right = parseLogicalFormulaWithoutImplies(
              {formula: conditionalFragments[1], claimIDs: claimIDs});
            if (left && right) {
              return {
                parseType: 'ConditionalProbabilityAssignment' as const,
                conditionalLeftFormula: left,
                conditionalRightFormula: right,
                value: attemptRightHandSideMagnitude * (rightHandSideNegation ? -1 : 1),
              } as FormulaParse;
            } else {return null;}
          } else if (conditionalFragments.length >= 3) {return null;}
        }
      }
    }

    //Now let's parse as an affine equation.
    const left = parseAffineEquation({formula: equalsFragments[0], claimIDs: claimIDs});
    const right = parseAffineEquation({formula: equalsFragments[1], claimIDs: claimIDs});
    if (left && right) {
      return { parseType: 'AffineEquation' as const, left: left, right: right } as FormulaParse;
    } else {return null;}
  } else {
    return null;
  }
}
