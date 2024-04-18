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

export type Probability = { type: 'Probability', child: LogicalFormulaWithoutImplies }

export type ConditionalProbability =
  { type: 'ConditionalProbability',
    left: LogicalFormulaWithoutImplies,
    right: LogicalFormulaWithoutImplies,
  }

export type 
