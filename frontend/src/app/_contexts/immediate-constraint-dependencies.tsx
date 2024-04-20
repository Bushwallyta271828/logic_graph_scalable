'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/_types/parse-types.tsx';

function LogicalFormulaDependencies({parse}: {parse: LogicalFormula}): Set<string> {
  switch (parse.parseType) {
    case 'LogicalFormulaImplies':
      const left = LogicalFormulaDependencies({parse: parse.left});
      const right = LogicalFormulaDependencies({parse: parse.right});
      return new Set([...left, ...right]);
    case 'LogicalFormulaOr':
    case 'LogicalFormulaAnd':
    case 'LogicalFormulaNot':
      return LogicalFormulaDependencies({parse: parse.child});
    case 'ClaimID':
      return new Set([parse.claimID,]);
    default: throw new Error("Unrecognized parseType");
  }
}

function LogicalFormulaWithoutImpliesDependencies({parse}:
  {parse: LogicalFormulaWithoutImplies}): Set<string> {
}

function AffineExpressionDependencies({parse}: {parse: AffineExpression}): Set<string> {
}

export function immediateConstraintDependencies({parse}: {parse: ConstraintParse}): Set<string> {
}
