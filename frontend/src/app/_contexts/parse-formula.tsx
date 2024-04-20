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

//function attemptProbabilityUnwrap({trimmedFormula}: {trimmedFormula: string}) {
//  //This function will attempt to parse trimmedFormula as the form
//  //"P  (child)" where child never breaks out of the parentheses.
//  //If such a parsing is possible, it returns the child string.
//  //If not, it returns null.
//  if (trimmedFormula[0] === "P")
//  {
//    const afterP = trimmedFormula.slice(1).trim();
//    const { depths: afterPDepths } = findDepths({formula: afterP});
//    if (afterP[0] === "(" && afterP[afterP.length-1] === ")" &&
//      afterPDepths.slice(1, afterPDepths.length-1).every((depth) => depth >= 1)) {
//      return afterP.slice(1, afterP.length-1);
//    }
//  }
//  return null;
//}

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
  const isProbability = (outer[outer.length - 1] === "P");
  const outerWithoutP = isProbability ? outer.slice(0, outer.length-1).trim() : outer;
  const outerWithoutStar = (outerWithoutP[outerWithoutP.length-1] === "*") ?
    outerWithoutP.slice(0, outerWithoutP.length - 1).trim() : outerWithoutP;
  const isNegated = (outerWithoutStar[0] === "-");
  const magnitudeOrEmpty =
    isNegated ? outerWithoutStar.slice(1).trim() : outerWithoutStar;
  const attemptMagnitude = nonNegativeReal(magnitudeOrEmpty);
  if (!attemptMagnitude && magnitudeOrEmpty !== "") {return null;}
  //Note that !attemptMagnitude now implies magnitudeOrEmpty === "".
  const coefficient = (attemptMagnitude ? attemptMagnitude : 1) * (isNegated ? -1 : 1);
  const child = isProbability ? //TODO
  
  




  let coefficient = signSeparatedReal(outerWithoutStar);
  if (!coefficient) {
    if outerWithout
  }
  const //TODO


  return null;
}

export function parseFormula({formula,substitutions}: ParserInput): ParserOutput {
  const spacedFormula = formula.replace(/[\(\)\|\*\+\-\=]/g, match => ` ${match} `);

  const {depths, matching} = findDepths({formula: spacedFormula});
  if (!matching) {return {substitutedFormula: spacedFormula, validFormula: false};}
  const equalsIndex = indexOfDepthZeroSubstring(
    {selector: 'last' as const, formula: spacedFormula, depths: depths, substring: " = "});

  if (equalsIndex < 0) {
    return parseLogicalFormula({acceptsImplies: true})
      ({formula:spacedFormula, substitutions:substitutions});
  } else {
    //First, we test to see if we have a conditional probability.
    const rightHandSide = spacedFormula.slice(equalsIndex + 3).trim();
    if (nonNegativeReal({candidate: rightHandSide})) {
      const leftHandSide = spacedFormula.slice(0, equalsIndex).trim();
      const possibleProbabilityUnwrap = attemptProbabilityUnwrap({trimmedFormula: leftHandSide});
      if (possibleProbabilityUnwrap) { 
        const conditionalSplit = attemptInfixSplit({
          formula: possibleProbabilityUnwrap,
          substitutions: substitutions,
          selector: 'last' as const,
          divider: " | ",
          subParser: parseLogicalFormula({acceptsImplies: false}),
        });
        if (conditionalSplit) {
          return {
            substitutedFormula: "P( "+conditionalSplit.substitutedFormula+" ) = "+rightHandSide, 
            validFormula: conditionalSplit.validFormula,
          };
        }
      }
    }
    
    //If we can't parse as a conditional, we parse as an affine formula.
    const equalsSplit = attemptInfixSplit({
      formula: spacedFormula,
      substitutions: substitutions,
      selector: 'last' as const,
      divider: " = ",
      subParser: parseAffineFormula,
    });
    if (equalsSplit) {return equalsSplit;}
    else {
      throw new Error(
        "' = ' identified in indexOfDepthZeroSubstring but not attemptInfixSplit"
      );
    }
  }
}
