'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/_types/parse-types';

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
    let dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.concat(Array.from(
        affineExpressionDependencies({parse: parse.children[i]})));
    }
    return new Set(dependenciesArray);
  } else if (['AffineExpressionMultiplication', 'AffineExpressionProbability']
    .includes(parse.parseType)) {
    return affineExpressionDependencies({parse: parse.child});
  } else if (parseType === 'AffineExpressionConstant') {
    return new Set([]);
  } else {throw new Error("Unrecognized parseType");}
}

export function immediateConstraintDependencies({parse}: {parse: ConstraintParse}): Set<string> {
  if ([
    'LogicalFormulaImplies',
    'LogicalFormulaOr',
    'LogicalFormulaAnd',
    'LogicalFormulaNot',
    'ClaimID',
  ].includes(parse.parseType)) {
    return logicalFormulaDependencies({parse: parse});
  } else if (parse.parseType === 'ConditionalProbabilityAssignment') {
    const left = logicalFormulaWithoutImpliesDependencies({parse: parse.conditionalLeftFormula});
    const right = logicalFormulaWithoutImpliesDependencies({parse: parse.conditionalRightFormula});
    return new Set([...left, ...right]);
  } else if (parse.parseType === 'AffineEquation') {
    const left = affineExpressionDependencies({parse: parse.left});
    const right = affineExpressionDependencies({parse: parse.right});
    return new Set([...left, ...right]);
  } else {throw new Error("Unrecognized parseType");}
}
