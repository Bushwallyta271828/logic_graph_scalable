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

type ParserOutput = FormulaParse | null;

type Parser = ({formula, claimIDs}: ParserInput) => ParserOutput;


function nonNegativeReal({candidate}: {candidate: string}) {
  return /^(0|[1-9]\d*)(\.\d+)?$/.test(candidate);
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
  {formula: string, depths: number[], substring: string}) {
  //This function behaves exactly like slicing formula with substring except that it
  //only splits on instances of substring at a depth of zero.
  //The function assumes that substring doesn't contain parentheses so it has constant depth.
  //The answer only makes sense if substring doesn't share any prefixes and suffixes.
  const fragments: Array<string> = [];
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

//TODO: Come back for parseWrapping!
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

function parseLogicalFormula({acceptsImplies} : {acceptsImplies: boolean}) {
  return function({formula,substitutions}: ParserInput): ParserOutput {
    //NOTE: assumes formula has had spaces added around parentheses!
    const trimmedFormula = formula.trim();
    
    const attemptedParseWrapping = parseWrapping({
      trimmedFormula: trimmedFormula,
      substitutions: substitutions,
      subParser: parseLogicalFormula({acceptsImplies: acceptsImplies})
    });
    if (attemptedParseWrapping) {return attemptedParseWrapping;}
  
    if (trimmedFormula in substitutions)
      {return {substitutedFormula: substitutions[trimmedFormula], validFormula: true};}

    if (acceptsImplies) { 
      const impliesSplit = attemptInfixSplit({
        formula: trimmedFormula,
        substitutions: substitutions,
        selector: 'first' as const,
        divider: " implies ",
        subParser: parseLogicalFormula({acceptsImplies: acceptsImplies}),
      });
      if (impliesSplit) {return impliesSplit;}
    }
 
    const orSplit = attemptInfixSplit({
      formula: trimmedFormula,
      substitutions: substitutions,
      selector: 'last' as const,
      divider: " or ",
      subParser: parseLogicalFormula({acceptsImplies: acceptsImplies}),
    });
    if (orSplit) {return orSplit;}
  
    const andSplit = attemptInfixSplit({
      formula: trimmedFormula,
      substitutions: substitutions,
      selector: 'last' as const,
      divider: " and ",
      subParser: parseLogicalFormula({acceptsImplies: acceptsImplies}),
    });
    if (andSplit) {return andSplit;}
  
    if (trimmedFormula.slice(0, 4) === "not ") {
      const {substitutedFormula, validFormula} =
        parseLogicalFormula({acceptsImplies: acceptsImplies})
          ({formula: trimmedFormula.slice(4), substitutions: substitutions});
      return {substitutedFormula: "not "+substitutedFormula, validFormula: validFormula};
    }
  
    return {substitutedFormula: trimmedFormula, validFormula: false};
  }
}

function attemptProbabilityUnwrap({trimmedFormula}: {trimmedFormula: string}) {
  //This function will attempt to parse trimmedFormula as the form
  //"P  (child)" where child never breaks out of the parentheses.
  //If such a parsing is possible, it returns the child string.
  //If not, it returns null.
  if (trimmedFormula[0] === "P")
  {
    const afterP = trimmedFormula.slice(1).trim();
    const { depths: afterPDepths } = findDepths({formula: afterP});
    if (afterP[0] === "(" && afterP[afterP.length-1] === ")" &&
      afterPDepths.slice(1, afterPDepths.length-1).every((depth) => depth >= 1)) {
      return afterP.slice(1, afterP.length-1);
    }
  }
  return null;
}

function parseAffineFormula({formula,substitutions}: ParserInput): ParserOutput {
  //NOTE: assumes formula has had spaces added around parentheses, "*", "+", and "-"!
  const trimmedFormula = formula.trim();
  
  const attemptedParseWrapping = parseWrapping(
    {trimmedFormula:trimmedFormula, substitutions:substitutions, subParser:parseAffineFormula});
  if (attemptedParseWrapping) {return attemptedParseWrapping;}

  const plusSplit = attemptInfixSplit({
    formula: trimmedFormula,
    substitutions: substitutions,
    selector: 'last' as const,
    divider: " + ",
    subParser: parseAffineFormula,
  });
  if (plusSplit) {return plusSplit;}

  //NOTE: The operator tree is valid becasue we split on the last instance.
  //For example, a - b - c will be parsed as (a - b) - c.
  //Also note that if the original formula started with "-", the trimming
  //will remove the left space, so initial minus signs don't count.
  const minusSplit = attemptInfixSplit({
    formula: trimmedFormula,
    substitutions: substitutions,
    selector: 'last' as const,
    divider: " - ",
    subParser: parseAffineFormula,
  });
  if (minusSplit) {return minusSplit;}

  //(Dealing with minus signs for single term linear combinations)
  if (trimmedFormula[0] === "-") {
    const {substitutedFormula, validFormula} = parseAffineFormula(
      {formula: trimmedFormula.slice(1), substitutions: substitutions});
    return {substitutedFormula: "-"+substitutedFormula, validFormula: validFormula};
  }

  //NOTE: The only syntax I accept for coefficient multiplication is realNumber * affineFormula.
  //I could probably do something fancier but I think that this is fine.
  const splitIndex = indexOfDepthZeroSubstring({
    selector: 'last' as const,
    formula: trimmedFormula,
    depths: findDepths({formula: trimmedFormula}).depths,
    substring: " * ",
  });
  if (splitIndex >= 0) {
    const coefficient = trimmedFormula.slice(0, splitIndex).trim();
    const validCoefficient = nonNegativeReal({candidate: coefficient});
    const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
      = parseAffineFormula({formula: trimmedFormula.slice(splitIndex + 3), substitutions: substitutions});
    return {
      substitutedFormula: coefficient + " * " + rightSubstitutedFormula,
      validFormula: validCoefficient && rightValidFormula,
    };
  }

  const possibleProbabilityUnwrap = attemptProbabilityUnwrap({trimmedFormula: trimmedFormula});
  if (possibleProbabilityUnwrap) {
    const {substitutedFormula, validFormula} = parseLogicalFormula({acceptsImplies: false})(
      {formula: possibleProbabilityUnwrap, substitutions: substitutions});
    return {substitutedFormula: "P( "+substitutedFormula+" )", validFormula: validFormula};
  }

  if (nonNegativeReal({candidate: trimmedFormula})) {
    return {substitutedFormula: trimmedFormula, validFormula: true};
  }

  return {substitutedFormula: trimmedFormula, validFormula: false};
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
