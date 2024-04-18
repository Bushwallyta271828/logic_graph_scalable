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
  | { type: 'Implies'; left: LogicalFormula; right: LogicalFormula }
  | { type: 'Or'; left: LogicalFormula; right: LogicalFormula }
  | { type: 'And'; left: LogicalFormula; right: LogicalFormula }
  | { type: 'Not'; child: LogicalFormula }
  | { type: 'claim ID'; value: string };

export type LogicalFormulaWithoutImplies =
  | { type: 'Or'; left: LogicalFormulaWithoutImplies; right: LogicalFormulaWithoutImplies }
  | { type: 'And'; left: LogicalFormulaWithoutImplies; right: LogicalFormulaWithoutImplies }
  | { type: 'Not'; child: LogicalFormulaWithoutImplies }
  | { type: 'claim ID'; value: string };

export type Probability = { type: 'Probability', child: LogicalFormulaWithoutImplies }

export type ConditionalProbability =
  { type: 'Conditional Probability',
    left: LogicalFormulaWithoutImplies,
    right: LogicalFormulaWithoutImplies,
  }
