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
  | { parseType: 'LogicalFormulaOr'; left: LogicalFormula; right: LogicalFormula; }
  | { parseType: 'LogicalFormulaAnd'; left: LogicalFormula; right: LogicalFormula; }
  | { parseType: 'LogicalFormulaNot'; child: LogicalFormula; }
  | { parseType: 'ClaimID'; value: string; };

export type LogicalFormulaWithoutImplies =
  | {
    parseType: 'LogicalFormulaWithoutImpliesOr';
    left: LogicalFormulaWithoutImplies;
    right: LogicalFormulaWithoutImplies;
  } | {
    parseType: 'LogicalFormulaWithoutImpliesAnd';
    left: LogicalFormulaWithoutImplies;
    right: LogicalFormulaWithoutImplies;
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
  | { parseType: 'AffineExpressionAddition'; left: AffineExpression; right: AffineExpression; }
  | { parseType: 'AffineExpressionSubtraction'; left: AffineExpression; right: AffineExpression; }
  | { parseType: '' }; //TODO

export type AffineEquation = {
  parseType: 'AffineEquation';
  left: AffineExpression;
  right: AffineExpression;
};
  
