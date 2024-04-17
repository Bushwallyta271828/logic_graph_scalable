'use client';

type ParserInput = {
  formula: string;
  substitutions: {[claimID: string]: string};
};

type ParserOutput = {
  substitutedFormula: string;
  validFormula: boolean;
};

type Parser = ({formula, substitutions}: ParserInput) => ParserOutput;


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

function indexOfDepthZeroSubstring({selector, formula, depths, substring}:
  {selector: 'first' | 'last', formula: string, depths: number[], substring: string}) {
  //Returns the index of a match for substring within formula
  //that lies at a depth of zero, or -1 if no such index exists.
  //If selector is 'first', this function returns the first such index,
  //and if selector is 'last', it returns the last such index.
  //We need the first index for implications and the last index for subtraction.
  //This function assumes that substring doesn't contain "(" or ")" so the depth is
  //constant throughout.
  if (selector === 'first') {
    const firstCandidateIndex = formula.indexOf(substring);
    if (firstCandidateIndex < 0) {
      return -1;
    } else if (depths[firstCandidateIndex] === 0) {
      return firstCandidateIndex;
    } else {
      return indexOfDepthZeroSubstring({
        selector: 'first' as const,
        formula: formula.slice(firstCandidateIndex+1),
        depths: depths.slice(firstCandidateIndex+1),
        substring: substring,
      });
    }
  } else {
    const lastCandidateIndex = formula.lastIndexOf(substring);
    if (lastCandidateIndex < 0) {
      return -1;
    } else if (depths[lastCandidateIndex] === 0) {
      return lastCandidateIndex;
    } else {
      return indexOfDepthZeroSubstring({
        selector: 'last' as const,
        formula: formula.slice(0, lastCandidateIndex),
        depths: depths.slice(0, lastCandidateIndex),
        substring: substring,
      });
    }
  }
}

function attemptLastInfixSplit({formula, substitutions, divider, subParser}: {
  formula:string,
  substitutions:{[claimID:string]:string},
  divider:string,
  subParser: Parser})
{
  //This helper function will attempt to split formula with a substring of divider
  //at a depth of zero at the last possible location. If the parentheses don't match
  //or if the split is possible but the children don't parse, it will return a best
  //guess at substitutedFormula and false for validFormula. If the split is possible
  //and the children parse, it will return true for validFormula together with the 
  //substitutedFormula. If the split is not possible, it will return null.
  //Note: divider shouldn't have any parentheses in it.
  const {depths, matching} = findDepths({formula: formula});
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
  subParser: Parser})
{
  //This helper function deals with unwrapping parentheses and empty inputs.
  //If trimmedFormula is empty, has mismatched parentheses, or is nested inside
  //a pair of outer parentheses then the function returns the appropriate
  //substitutedFormula and validFormula. If trimmedFormula is not of these forms, it
  //returns null.
  if (trimmedFormula === "") {return {substitutedFormula: "", validFormula: false};}
  const {depths, matching} = findDepths({formula: trimmedFormula});
  if (!matching) {return {substitutedFormula: trimmedFormula, validFormula: false};}
  
  if (trimmedFormula[0] === "(" && trimmedFormula[trimmedFormula.length-1] === ")" &&
    depths.slice(1, depths.length-1).every((depth) => depth >= 1)) {
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

function parseLogicalFormula(acceptsImplies: boolean) {
  return function({formula,substitutions}: ParserInput): ParserOutput {
    //NOTE: assumes formula has had spaces added around parentheses!
    const trimmedFormula = formula.trim();
    
    const attemptedParseWrapping = parseWrapping({
      trimmedFormula: trimmedFormula,
      substitutions: substitutions,
      subParser: parseLogicalFormula(acceptsImplies)
    });
    if (attemptedParseWrapping) {return attemptedParseWrapping;}
  
    if (trimmedFormula in substitutions)
      {return {substitutedFormula: substitutions[trimmedFormula], validFormula: true};}

    if (acceptsImplies) { 
      //Note: we correctly parse implications as a -> (b -> c)
      //since we split as late as possible.
      const impliesSplit = attemptLastInfixSplit({
        formula: trimmedFormula,
        substitutions: substitutions,
        divider: " implies ",
        subParser: parseLogicalFormula(acceptsImplies)});
      if (impliesSplit) {return impliesSplit;}
    }
 
    const orSplit = attemptLastInfixSplit({
      formula: trimmedFormula,
      substitutions: substitutions,
      divider: " or ",
      subParser: parseLogicalFormula(acceptsImplies)});
    if (orSplit) {return orSplit;}
  
    const andSplit = attemptLastInfixSplit({
      formula: trimmedFormula,
      substitutions: substitutions,
      divider: " and ",
      subParser: parseLogicalFormula(acceptsImplies)});
    if (andSplit) {return andSplit;}
  
    if (trimmedFormula.slice(0, 4) === "not ") {
      const {substitutedFormula, validFormula} =
        parseLogicalFormula(acceptsImplies)
          ({formula: trimmedFormula.slice(4), substitutions: substitutions});
      return {substitutedFormula: "not "+substitutedFormula, validFormula: validFormula};
    }
  
    return {substitutedFormula: trimmedFormula, validFormula: false};
  }
}

function parseAffineFormula({formula,substitutions}: ParserInput): ParserOutput {
  //NOTE: assumes formula has had spaces added around parentheses, "*", "+", and "-"!
  const trimmedFormula = formula.trim();
  
  const attemptedParseWrapping = parseWrapping(
    {trimmedFormula:trimmedFormula, substitutions:substitutions, subParser:parseAffineFormula});
  if (attemptedParseWrapping) {return attemptedParseWrapping;}

  const plusSplit = attemptLastInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " + ", subParser: parseAffineFormula});
  if (plusSplit) {return plusSplit;}

  //NOTE: The operator tree is valid becasue we split on the last instance.
  //For example, a - b - c will be parsed as (a - b) - c.
  //Also note that if the original formula started with "-", the trimming
  //will remove the left space, so initial minus signs don't count.
  const minusSplit = attemptLastInfixSplit(
    {formula: trimmedFormula, substitutions: substitutions, divider: " - ", subParser: parseAffineFormula});
  if (minusSplit) {return minusSplit;}

  if (trimmedFormula[0] === "-") {
    const {substitutedFormula, validFormula} = parseAffineFormula(
      {formula: trimmedFormula.slice(1), substitutions: substitutions});
    return {substitutedFormula: "-"+substitutedFormula, validFormula: validFormula};
  }

  //NOTE: The only syntax I accept for coefficient multiplication is realNumber * affineFormula.
  //I could probably do something fancier but I think that this is fine.
  const splitIndex = lastIndexOfDepthZeroSubstring(
    {formula: trimmedFormula, depths: findDepths({formula: trimmedFormula}).depths, substring: " * "});
  if (splitIndex >= 0) {
    const coefficient = trimmedFormula.slice(0, splitIndex).trim();
    const validCoefficient = /^(0|[1-9]\d*)(\.\d+)?$/.test(coefficient);
    const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
      = parseAffineFormula({formula: trimmedFormula.slice(splitIndex + 3), substitutions: substitutions});
    return {
      substitutedFormula: coefficient + " * " + rightSubstitutedFormula,
      validFormula: validCoefficient && rightValidFormula,
    };
  }

  if (trimmedFormula[0] === "P")
  {
    const afterP = trimmedFormula.slice(1).trim();
    const { depths: afterPDepths } = findDepths({formula: afterP});
    if (afterP[0] === "(" && afterP[afterP.length-1] === ")" &&
      afterPDepths.slice(1, afterPDepths.length-1).every((depth) => depth >= 1)) {
      const {substitutedFormula, validFormula} = parseLogicalFormula(
        {formula: afterP.slice(1, afterP.length-1), substitutions: substitutions});
      return {substitutedFormula: "P( "+substitutedFormula+" )", validFormula: validFormula};
    }
  }

  if (/^(0|[1-9]\d*)(\.\d+)?$/.test(trimmedFormula)) {
    return {substitutedFormula: trimmedFormula, validFormula: true};
  }

  return {substitutedFormula: trimmedFormula, validFormula: false};
}

export function parseFormula({formula,substitutions}: ParserInput): ParserOutput {
  const spacedFormula = formula.replace(/[\(\)\*\+\-\=]/g, match => ` ${match} `);

  const equalsSplit = attemptLastInfixSplit(
    {formula: spacedFormula, substitutions: substitutions, divider: " = ", subParser: parseAffineFormula});
  if (equalsSplit) {return equalsSplit;}

  return parseLogicalFormula({formula:spacedFormula, substitutions:substitutions});
}
