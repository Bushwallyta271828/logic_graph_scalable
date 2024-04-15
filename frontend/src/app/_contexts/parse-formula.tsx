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

//function infixSplit({formula, substitutions, divider, subParser}: {
//  formula:string,
//  substitutions:{[claimID:string]:string},
//  divider:string,
//  subParser: {({formula: string, substitutions:{[claimID:string]:string}})
//    => {substitutedFormula:string, validFormula:boolean}}})
//{
//  const {depths, matching} = FindDepths(formula);
//  if (!matching) {return {substitutedFormula: formula, successfulSplit: false};}
//  const indexDepthZero = indexOfDepthZeroSubstring({formula: formula, depths: depths, substring: divider});
//  if (indexDepthZero < 0) {return {substitutedFormula: formula, successfulSplit: false};}
//  const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
//    = subParser({formula: formula.splice(0, TODO), substitutions: substitutions});
//  const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
//    = subParser({formula: formula.splice(TODO), substitutions: substitutions});
//  return {
//    substitutedFormula: leftSubstitutedFormula+"="+rightSubstitutedFormula,
//    validFormula: leftValidFormula && rightValidFormula
//  };
//}

function parseLogicalFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  const trimmedFormula = formula.trim();
  if (trimmedFormula === "") {return {substitutedFormula: "", validFormula: false};}
  const {depths, matching} = FindDepths(trimmedFormula);
  if (!matching) {return {substitutedFormula: trimmedFormula, validFormula: false};}
  if (depths.slice(1, depths.length-1).every((depth) => depth >= 1)) {
    return parseLogicalFormula({
      formula: trimmedFormula.slice(1, trimmedFormula.length-1),
      substitutions: substitutions
    });
  }

  const orIndex1 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:" or "});
  const orIndex2 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:")or "});
  const orIndex3 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:" or("});
  const orIndex4 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:")or("});
  const orIndex = Math.max(orIndex1, orIndex2, orIndex3, orIndex4); //non-negative if any of them are 

  const andIndex1 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:" and "});
  const andIndex2 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:")and "});
  const andIndex3 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:" and("});
  const andIndex4 = indexOfDepthZeroSubstring({formula:trimmedFormula, depths:depths, substring:")and("});
  const andIndex = Math.max(andIndex1, andIndex2, andIndex3, andIndex4);
  if (orIndex >= 0) {
    const {substitutedformula: leftsubstitutedformula, validformula: leftvalidformula}
      = parselogicalformula({formula: formula.slice(0, orIndex+1), substitutions: substitutions});
    const {substitutedformula: rightsubstitutedformula, validformula: rightvalidformula}
      = parselogicalformula({formula: formula.slice(orIndex+3), substitutions: substitutions});
    return {
      substitutedformula: leftsubstitutedformula+" or "+rightsubstitutedformula,
      validformula: leftvalidformula && rightvalidformula
    };
  } else if (andIndex >= 0) {
    const {substitutedformula: leftsubstitutedformula, validformula: leftvalidformula}
      = parselogicalformula({formula: formula.slice(0, andIndex+1), substitutions: substitutions});
    const {substitutedformula: rightsubstitutedformula, validformula: rightvalidformula}
      = parselogicalformula({formula: formula.slice(andIndex+4), substitutions: substitutions});
    return {
      substitutedformula: leftsubstitutedformula+" and "+rightsubstitutedformula,
      validformula: leftvalidformula && rightvalidformula
    };
  } else { 
  }
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
  const spacedFormula = formula.replace(/[\(\)]/g, match => ` ${match} `);

  if (spacedFormula.includes("=")) {
    const equationSides = spacedFormula.split("=");
    if (equationSides.length !== 2) {
      return {substitutedFormula: spacedFormula, validFormula: false};
    } else {
      const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
        = parseAffineFormula({formula: equationSides[0], substitutions: substitutions});
      const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
        = parseAffineFormula({formula: equationSides[1], substitutions: substitutions});
      return {
        substitutedFormula: leftSubstitutedFormula+" = "+rightSubstitutedFormula,
        validFormula: leftValidFormula && rightValidFormula
      };
    }
  } else {
    return parseLogicalFormula({formula:spacedFormula, substitutions:substitutions});
  }
}
