'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/_types/parse-types.tsx';

function logicalFormulaDependencies({parse}: {parse: LogicalFormula}): Set<string> {
  if (parse.parseType === 'LogicalFormulaImplies') {
    const left = logicalFormulaDependencies({parse: parse.left});
    const right = logicalFormulaDependencies({parse: parse.right});
    return new Set([...left, ...right]);
  } else if (['LogicalFormulaOr', 'LogicalFormulaAnd'].includes(parse.parseType)) {
    let dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.concat(Array.from(
        logicalFormulaDependencies({parse: parse.children[i]})));
    }
    return new Set(dependenciesArray);
  } else if (parse.parseType === 'LogicalFormulaNot') {
    return logicalFormulaDependencies({parse: parse.child});
  } else if (parse.parseType === 'ClaimID') {
    return new Set([parse.claimID,]);
  } else {throw new Error("Unrecognized parseType");}
}

function logicalFormulaWithoutImpliesDependencies({parse}:
  {parse: LogicalFormulaWithoutImplies}): Set<string> {
  if (['LogicalFormulaWithoutImpliesOr', 'LogicalFormulaWithoutImpliesAnd']
    .includes(parse.parseType)) {
    let dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.concat(Array.from(
        logicalFormulaWithoutImpliesDependencies({parse: parse.children[i]})));
    }
    return new Set(dependenciesArray);
  } else if (parse.parseType === 'LogicalFormulaWithoutImpliesNot') {
    return logicalFormulaWithoutImpliesDependencies({parse: parse.child});
  } else if (parse.parseType === 'ClaimID') {
    return new Set([parse.claimID,]);
  } else {throw new Error("Unrecognized parseType");}
}

function affineExpressionDependencies({parse}: {parse: AffineExpression}): Set<string> {
  if (parse.parseType === 'AffineExpressionAddition') {
  } else if (['AffineExpressionMultiplication', 'AffineExpressionProbability']
    .includes(parse.parseType)) {
  } else if (parseType === 'AffineExpressionConstant') {
    return new Set([]);
  } else {throw new Error("Unrecognized parseType");}
}

export function immediateConstraintDependencies({parse}: {parse: ConstraintParse}): Set<string> {
}
