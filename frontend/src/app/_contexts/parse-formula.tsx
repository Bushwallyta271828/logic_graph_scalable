'use client';

function findDepths({formula}: {formula: string}) {
  //Computes how many layers of parentheses each
  //character is contained within, as well as whether
  //the parentheses match overall.
  let depths: number[] = [];
  let depth = 0;
  const matching = true;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === "(") {depth += 1;}
    if (formula[i] === ")") {depth -= 1;}
    if (depth < 0) {matching = false;}
    depths.push(formula[i] === "(" ? depth - 1 : depth);
  }
  return {depths: depths, matching: matching && depth === 0};
}

function lastIndexOfDepthZeroSubstring({formula, depths, substring}:
  {formula: string, depths: number[], substring: string}) {
  //Returns the index of the last match for substring within formula
  //that lies at a depth of zero, or -1 if no such index exists.
  //Using the last instance is important for correctly parsing subtraction:
  //a - b - c = (a - b) - c
  //Assumes that substring doesn't contain "(" or ")" so the depth is
  //constant throughout.
  const lastCandidateIndex = formula.lastIndexOf(substring);
  if (lastCandidateIndex < 0) {
    return -1;
  } else if (depths[lastCandidateIndex] === 0) {
    return lastCandidateIndex;
  } else {
    return lastIndexOfDepthZeroSubstring({
      formula: formula.slice(0, lastCandidateIndex),
      depths: depths.slice(0, lastCandidateIndex),
      substring: substring,
    });
  }
}

function attemptLastInfixSplit({formula, substitutions, divider, subParser}: {
  formula:string,
  substitutions:{[claimID:string]:string},
  divider:string,
  subParser: {({formula: string, substitutions:{[claimID:string]:string}})
    => {substitutedFormula:string, validFormula:boolean}}})
{
  //This helper function will attempt to split formula with a substring of divider
  //at a depth of zero at the last possible location. If the parentheses don't match
  //or if the split is possible but the children don't parse, it will return a best
  //guess at substitutedFormula and false for validFormula. If the split is possible
  //and the children parse, it will return true for validFormula together with the 
  //substitutedFormula. If the split is not possible, it will return null.
  //Note: divider shouldn't have any parentheses in it.
  const {depths, matching} = FindDepths(formula);
  if (!matching) {return {substitutedFormula: formula, validFormula: false};}
  const splitIndex = lastIndexOfDepthZeroSubstring({formula: formula, depths: depths, substring: divider});
  if (splitIndex < 0) {return null;}
  const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
    = subParser({formula: formula.slice(0, splitIndex), substitutions: substitutions});
  const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
    = subParser({formula: formula.slice(splitIndex + divider.length), substitutions: substitutions});
  return {
    substitutedFormula: leftSubstitutedFormula + divider + rightSubstitutedFormula,
    validFormula: leftValidFormula && rightValidFormula,
  };
}

function parseWrapping({trimmedFormula, substitutions, subParser}: {
  trimmedFormula:string,
  substitutions:{[claimID:string]:string},
  subParser: {({formula: string, substitutions:{[claimID:string]:string}})
    => {substitutedFormula:string, validFormula:boolean}}})
{
  //This helper function deals with unwrapping parentheses and empty inputs.
  //If trimmedFormula is empty, has mismatched parentheses, or is nested inside
  //a pair of outer parentheses then the function returns the appropriate
  //substitutedFormula and validFormula. If trimmedFormula is not of these forms, it
  //returns null.
  if (trimmedFormula === "") {return {substitutedFormula: "", validFormula: false};}
  const {depths, matching} = FindDepths(trimmedFormula);
  if (!matching) {return {substitutedFormula: trimmedFormula, validFormula: false};}
  
  if (depths.slice(1, depths.length-1).every((depth) => depth >= 1)) {
    const innerParse = subParser({
      formula: trimmedFormula.slice(1, trimmedFormula.length-1),
      substitutions: substitutions
    });
    return {
      substitutedFormula: "("+innerParse.substitutedFormula+")",
      validFormula: innerParse.validFormula
    };
  }

  return null;
}


function parseLogicalFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  //NOTE: assumes formula has had spaces added around parentheses!
  const trimmedFormula = formula.trim();
  
  const attemptParseWrapping = parseWrapping(
    {trimmedFormula:trimmedFormula, substitutions:substitutions, subParser:parseLogicalFormula});
  if (attemptedParseWrapping) {return attemptedParseWrapping;}

  if (trimmedFormula in substitutions)
    {return {substitutedFormula: substitutions[trimmedFormula], validFormula: true};}

  const orSplit = attemptLastInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " or ", subParser: parseLogicalFormula});
  if (orSplit) {return orSplit;}

  const andSplit = attemptLastInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " and ", subParser: parseLogicalFormula});
  if (andSplit) {return andSplit;}

  if (trimmedFormula.slice(0, 4) === "not ") {
    const {substitutedFormula, validFormula} =
      parseLogicalFormula({formula: trimmedFormula.slice(4), substitutions: substitutions});
    return {substitutedFormula: "not "+substitutedFormula, validFormula: validFormula};
  }
  return {substitutedFormula: trimmedFormula, validFormula: false};
}

function parseAffineFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  //NOTE: assumes formula has had spaces added around parentheses, "*", "+", and "-"!
  const trimmedFormula = formula.trim();
  
  const attemptParseWrapping = parseWrapping(
    {trimmedFormula:trimmedFormula, substitutions:substitutions, subParser:parseAffineFormula});
  if (attemptedParseWrapping) {return attemptedParseWrapping;}

  const plusSplit = attemptInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " + ", subParser: parseAffineFormula});
  if (plusSplit.status !== 'no split')
    {return {substitutedFormula: plusSplit.substitutedFormula, validFormula: plusSplit.status === 'valid'};}

  //TODO -- finish from here! Need to enforce linearity and subtraction!
}

export function parseFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  const spacedFormula = formula.replace(/[\(\)\*\+\-\=]/g, match => ` ${match} `);

  const equalsSplit = attemptLastInfixSplit(
    {formula: spacedFormula, substitutions: substitutions, divider: " = ", subParser: parseAffineFormula});
  if (equalsSplit) {return equalsSplit;}

  return parseLogicalFormula({formula:spacedFormula, substitutions:substitutions});
}
