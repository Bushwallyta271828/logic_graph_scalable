export type LogicalFormula =
  | { parseType: 'LogicalFormulaImplies'; left: LogicalFormula; right: LogicalFormula; }
  | { parseType: 'LogicalFormulaOr'; children: LogicalFormula[]; }
  | { parseType: 'LogicalFormulaAnd'; children: LogicalFormula[]; }
  | { parseType: 'LogicalFormulaNot'; child: LogicalFormula; }
  | { parseType: 'ClaimID'; claimID: string; };

export type LogicalFormulaWithoutImplies =
  | {
    parseType: 'LogicalFormulaWithoutImpliesOr';
    children: LogicalFormulaWithoutImplies[];
  } | {
    parseType: 'LogicalFormulaWithoutImpliesAnd';
    children: LogicalFormulaWithoutImplies[];
  } | { 
    parseType: 'LogicalFormulaWithoutImpliesNot';
    child: LogicalFormulaWithoutImplies;
  } | { parseType: 'ClaimID'; claimID: string; };

export type ConditionalProbabilityAssignment = {
  parseType: 'ConditionalProbabilityAssignment';
  conditionalLeftFormula: LogicalFormulaWithoutImplies;
  conditionalRightFormula: LogicalFormulaWithoutImplies;
  probability: number;
};

export type AffineExpression = 
  | { parseType: 'AffineExpressionAddition'; children: AffineExpression[]; }
  | { parseType: 'AffineExpressionMultiplication'; coefficient: number; child: AffineExpression; }
  | { parseType: 'AffineExpressionProbability'; child: LogicalFormulaWithoutImplies; }
  | { parseType: 'AffineExpressionConstant'; constant: number; };

export type AffineEquation = {
  parseType: 'AffineEquation';
  left: AffineExpression;
  right: AffineExpression;
};

export type ConstraintParse =
  | LogicalFormula
  | ConditionalProbabilityAssignment
  | AffineEquation;
