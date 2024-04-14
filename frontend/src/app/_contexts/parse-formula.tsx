'use client';

function ParseLogicalFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  
}

function ParseEquationSide({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  let first_plus = -1;
  let parenthetical_depth = 0;
  let i = 0;
  while 
  for (let i = 0; i < formula.length; i++) {
    
  }
}

export function ParseFormula({formula,substitutions}:{formula:string,substitutions:{[claimID:string]:string}}) {
  if (formula.includes("=")) {
    const equationSides = formula.split("=");
    if (equationSides.length !== 2)
      {return {substitutedFormula: formula, validFormula: false};}
    const {substitutedFormula: leftSubstitutedFormula, validFormula: leftValidFormula}
      = ParseEquationSide({formula: equationSides[0], substitutions: substitutions});
    const {substitutedFormula: rightSubstitutedFormula, validFormula: rightValidFormula}
      = ParseEquationSide({formula: equationSides[1], substitutions: substitutions});
    return {
      substitutedFormula: leftSubstitutedFormula+"="+rightSubstitutedFormula,
      validFormula: leftValidFormula && rightValidFormula};
  } else {
    return ParseLogicalFormula({formula:formula, substitutions:substitutions});
  }
}
