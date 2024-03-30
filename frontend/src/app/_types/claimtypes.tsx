export type TextClaim = {
  claimID: string;
  author: string;
  claimType: 'Text';
  text: string;
  definitionClaimIDs: string[];
};

export type DefinitionClaim = {
  claimID: string;
  author: string;
  claimType: 'Definition';
  text: string;
  definitionClaimIDs: string[];
};

export type ZerothOrderClaim = {
  claimID: string;
  author: string;
  claimType: 'ZerothOrder';
  formula: number; //TODO: fix this type!
};

export type Claim =
  | TextClaim
  | DefinitionClaim
  | ZerothOrderClaim;
