export type TextClaim = {
  claimID: string;
  author: string;
  claimType: 'text';
  text: string;
  definitionClaimIDs: string[];
};

export type DefinitionClaim = {
  claimID: string;
  author: string;
  claimType: 'definition';
  text: string;
  definitionClaimIDs: string[];
};

export type ClaimWithDefinitions = 
  | TextClaim
  | DefinitionClaim;

export type ZerothOrderClaim = {
  claimID: string;
  author: string;
  claimType: 'zeroth-order';
  text: string;
};

export type Claim =
  | TextClaim
  | DefinitionClaim
  | ZerothOrderClaim;


export type LogicalFormula =
  | { parseType: 'LogicalFormulaImplies'; left: LogicalFormula; right: LogicalFormula; }
  | { parseType: 'LogicalFormulaOr'; children: Array<LogicalFormula>; }
  | { parseType: 'LogicalFormulaAnd'; children: Array<LogicalFormula>; }
  | { parseType: 'LogicalFormulaNot'; child: LogicalFormula; }
  | { parseType: 'ClaimID'; value: string; };

export type LogicalFormulaWithoutImplies =
  | {
    parseType: 'LogicalFormulaWithoutImpliesOr';
    children: Array<LogicalFormulaWithoutImplies>;
  } | {
    parseType: 'LogicalFormulaWithoutImpliesAnd';
    children: Array<LogicalFormulaWithoutImplies>;
  } | { 
    parseType: 'LogicalFormulaWithoutImpliesNot';
    child: LogicalFormulaWithoutImplies;
  } | { parseType: 'ClaimID'; value: string; };

export type ConditionalProbabilityAssignment = {
  parseType: 'ConditionalProbabilityAssignment';
  conditionalLeftFormula: LogicalFormulaWithoutImplies;
  conditionalRightFormula: LogicalFormulaWithoutImplies;
  value: number;
};

export type AffineExpression = 
  | { parseType: 'AffineExpressionAddition'; children: Array<AffineExpression>; }
  | { parseType: 'AffineExpressionMultiplication'; coefficient: number; child: AffineExpression; }
  | { parseType: 'AffineExpressionProbability'; child: LogicalFormulaWithoutImplies; };

export type AffineEquation = {
  parseType: 'AffineEquation';
  left: AffineExpression;
  right: AffineExpression;
};
