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
  switch (parse.parseType) {
    case 'LogicalFormulaImplies':
      const left = logicalFormulaDependencies({parse: parse.left});
      const right = logicalFormulaDependencies({parse: parse.right});
      return new Set([...left, ...right]);
    case 'LogicalFormulaOr':
    case 'LogicalFormulaAnd':
    case 'LogicalFormulaNot':
      return logicalFormulaDependencies({parse: parse.child});
    case 'ClaimID':
      return new Set([parse.claimID,]);
    default: throw new Error("Unrecognized parseType");
  }
}

function logicalFormulaWithoutImpliesDependencies({parse}:
  {parse: LogicalFormulaWithoutImplies}): Set<string> {
}

function affineExpressionDependencies({parse}: {parse: AffineExpression}): Set<string> {
}

export function immediateConstraintDependencies({parse}: {parse: ConstraintParse}): Set<string> {
}
