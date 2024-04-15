'use client';

//function SeparateParentheticals({formula}: {formula:string}) {
//  //This function 
//  let topLevelFormula = "";
//  let children: string[] = [];
//  let depth = 0;
//  const matching = true;
//  for (let i = 0; i < formula.length; i++) {
//    if (formula[i] === "(") {
//      if (depth === 0) {children.push("");}
//      depth += 1;
//    }
//    if (formula[i] === ")") {depth -= 1;}
//    
//    if (depth < 0) {
//      matching = false;
//    } else if (depth === 0) {
//      topLevelFormula += formula[i];
//    } else {
//      children[children.length - 1] += formula[i];
//    }
//  }
//  return {topLevelFormula: topLevelFormula, children: children, matching: matching};
//}

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

function parseLogicalFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  const {depths, matching} = FindDepths(formula);
  
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
  if (formula.includes("=")) {
    const equationSides = formula.split("=");
    if (equationSides.length !== 2) {
      return {substitutedFormula: formula, validFormula: false};
    } else {
      const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
        = parseAffineFormula({formula: equationSides[0], substitutions: substitutions});
      const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
        = parseAffineFormula({formula: equationSides[1], substitutions: substitutions});
      return {
        substitutedFormula: leftSubstitutedFormula+"="+rightSubstitutedFormula,
        validFormula: leftValidFormula && rightValidFormula
      };
    }
  } else {
    return parseLogicalFormula({formula:formula, substitutions:substitutions});
  }
}
