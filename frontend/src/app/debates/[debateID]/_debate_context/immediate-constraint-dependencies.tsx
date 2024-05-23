'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/debates/[debateID]/_debate_context/parse-types';

function logicalFormulaDependencies({parse}: {parse: LogicalFormula}): Set<string> {
  if (parse.parseType === 'LogicalFormulaImplies') {
    const left = Array.from(logicalFormulaDependencies({parse: parse.left}));
    const right = Array.from(logicalFormulaDependencies({parse: parse.right}));
    return new Set([...left, ...right]);
  } else if (parse.parseType === 'LogicalFormulaOr'
    || parse.parseType === 'LogicalFormulaAnd') {
    const dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.push(...Array.from(
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
  if (parse.parseType === 'LogicalFormulaWithoutImpliesOr'
    || parse.parseType === 'LogicalFormulaWithoutImpliesAnd') {
    const dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.push(...Array.from(
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
    const dependenciesArray: string[] = [];
    for (let i = 0; i < parse.children.length; i++) {
      dependenciesArray.push(...Array.from(
        affineExpressionDependencies({parse: parse.children[i]})));
    }
    return new Set(dependenciesArray);
  } else if (parse.parseType === 'AffineExpressionMultiplication') {
    return affineExpressionDependencies({parse: parse.child});
  } else if (parse.parseType === 'AffineExpressionProbability') {
    return logicalFormulaWithoutImpliesDependencies({parse: parse.child});
  } else if (parse.parseType === 'AffineExpressionConstant') {
    return new Set([]);
  } else {throw new Error("Unrecognized parseType");}
}

export function immediateConstraintDependencies({parse}: {parse: ConstraintParse}): Set<string> {
  if (
    (parse.parseType === 'LogicalFormulaImplies') ||
    (parse.parseType === 'LogicalFormulaOr') ||
    (parse.parseType === 'LogicalFormulaAnd') ||
    (parse.parseType === 'LogicalFormulaNot') ||
    (parse.parseType === 'ClaimID')
  ) {
    return logicalFormulaDependencies({parse: parse});
  } else if (parse.parseType === 'ConditionalProbabilityAssignment') {
    const left = Array.from(logicalFormulaWithoutImpliesDependencies(
      {parse: parse.conditionalLeftFormula}));
    const right = Array.from(logicalFormulaWithoutImpliesDependencies(
      {parse: parse.conditionalRightFormula}));
    return new Set([...left, ...right]);
  } else if (parse.parseType === 'AffineEquation') {
    const left = Array.from(affineExpressionDependencies({parse: parse.left}));
    const right = Array.from(affineExpressionDependencies({parse: parse.right}));
    return new Set([...left, ...right]);
  } else {throw new Error("Unrecognized parseType");}
}
