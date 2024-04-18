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
  | { logicalFormulaType: 'Implies'; left: LogicalFormula; right: LogicalFormula }
  | { logicalFormulaType: 'Or'; left: LogicalFormula; right: LogicalFormula }
  | { logicalFormulaType: 'And'; left: LogicalFormula; right: LogicalFormula }
  | { logicalFormulaType: 'Not'; child: LogicalFormula }
  | { logicalFormulaType: 'ClaimID'; value: string };

export type LogicalFormulaWithoutImplies =
  | {
    logicalFormulaWithoutImpliesType: 'Or';
    left: LogicalFormulaWithoutImplies;
    right: LogicalFormulaWithoutImplies;
  } | {
    logicalFormulaWithoutImpliesType: 'And';
    left: LogicalFormulaWithoutImplies;
    right: LogicalFormulaWithoutImplies;
  } | { 
    logicalFormulaWithoutImpliesType: 'Not';
    child: LogicalFormulaWithoutImplies;
  } | {
    logicalFormulaWithoutImpliesType: 'ClaimID';
    value: string;
  };

export type Probability = { type: 'Probability', child: LogicalFormulaWithoutImplies }

export type ConditionalProbability =
  { type: 'ConditionalProbability',
    left: LogicalFormulaWithoutImplies,
    right: LogicalFormulaWithoutImplies,
  }

export type 
