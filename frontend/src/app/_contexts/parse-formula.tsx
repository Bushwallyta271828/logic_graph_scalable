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

function indexOfDepthZeroSubstring({formula, depths, substring}:
  {formula: string, depths: number[], substring: string}) {
  //Returns the index of the first match for substring within formula
  //that lies entirely at a depth of zero, or -1 if no such index exists.
  const firstCandidateIndex = formula.indexOf(substring);
  if (firstCandidateIndex < 0) {
    return -1;
  } else if
    (depths.slice(firstCandidateIndex, firstCandidateIndex + substring.length).every(depth => depth === 0)) {
    return firstCandidateIndex;
  } else {
    return indexOfDepthZeroSubstring({
      formula: formula.slice(firstCandidateIndex+1),
      depths: depths.slice(firstCandidateIndex+1),
      substring: substring,
    });
  }
}

function attemptInfixSplit({formula, substitutions, divider, subParser}: {
  formula:string,
  substitutions:{[claimID:string]:string},
  divider:string,
  subParser: {({formula: string, substitutions:{[claimID:string]:string}})
    => {substitutedFormula:string, validFormula:boolean}}})
{
  //This helper function will attempt to split formula with a substring of divider
  //at a depth of zero. If formula's parentheses don't match or if the split is possible
  //but the children don't parse, it will return status: 'invalid' as const. If divider
  //doesn't exist at depth zero, it will return status: 'no split' as const. If the split
  //is successful and the children parse, it will return status: 'valid' as const. In all
  //cases it will return a best guess for substitutedFormula (if 'valid', it should be correct).
  //divider shouldn't have any parentheses in it.
  const {depths, matching} = FindDepths(formula);
  if (!matching) {return {substitutedFormula: formula, status: 'invalid' as const};}
  const indexDepthZero = indexOfDepthZeroSubstring({formula: formula, depths: depths, substring: divider});
  if (indexDepthZero < 0) {return {substitutedFormula: formula, status: 'no split' as const};}
  const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
    = subParser({formula: formula.slice(0, indexDepthZero), substitutions: substitutions});
  const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
    = subParser({formula: formula.slice(indexDepthZero+divider.length), substitutions: substitutions});
  return {
    substitutedFormula: leftSubstitutedFormula+divider+rightSubstitutedFormula,
    status: (leftValidFormula && rightValidFormula) ? 'valid' as const : 'invalid' as const
  };
}

function parseWrapping({formula, substitutions, subParser}: {
  formula:string,
  substitutions:{[claimID:string]:string},
  subParser: {({formula: string, substitutions:{[claimID:string]:string}})
    => {substitutedFormula:string, validFormula:boolean}}})
{
  //This helper function deals with unwrapping parentheses and empty inputs.
  //If the input is empty, has mismatched parentheses, or is nested inside
  //a pair of outer parentheses then the function returns the desired
  //substitutedFormula and validFormula. If the input is not of these forms, it
  //returns null.
  const trimmedFormula = formula.trim();
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
  const attemptParseWrapping = parseWrapping(
    {formula:formula, substitutions:substitutions, subParser:parseLogicalFormula});
  if (attemptedParseWrapping) {return attemptedParseWrapping;}

  const trimmedFormula = formula.trim();
  if (trimmedFormula in substitutions)
    {return {substitutedFormula: substitutions[trimmedFormula], validFormula: true};}

  const orSplit = attemptInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " or ", subParser: parseLogicalFormula});
  if (orSplit.status !== 'no split')
    {return {substitutedFormula: orSplit.substitutedFormula, validFormula: orSplit.status === 'valid'};}

  const andSplit = attemptInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " and ", subParser: parseLogicalFormula});
  if (andSplit.status !== 'no split')
    {return {substitutedFormula: andSplit.substitutedFormula, validFormula: andSplit.status === 'valid'};}

  if (trimmedFormula.slice(0, 4) === "not ") {
    const {substitutedFormula, validFormula} =
      parseLogicalFormula({formula: trimmedFormula.slice(4), substitutions: substitutions});
    return {substitutedFormula: "not "+substitutedFormula, validFormula: validFormula};
  }
  return {substitutedFormula: trimmedFormula, validFormula: false};
}

function parseAffineFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  let 
  let parentheticalDepth = 0;
  
  let i = 0;
  while 
  for (let i = 0; i < formula.length; i++) {
    
  }
}

export function parseFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  const spacedFormula = formula.replace(/[\(\)\*\=]/g, match => ` ${match} `);

  const equalsSplit = attemptInfixSplit(
    {formula: spacedFormula, substitutions: substitutions, divider: " = ", subParser: parseAffineFormula});
  if (equalsSplit.status !== 'no split')
    {return {substitutedFormula: equalsSplit.substitutedFormula, validFormula: equalsSplit.status === 'valid'};}

  return parseLogicalFormula({formula:spacedFormula, substitutions:substitutions});
}
