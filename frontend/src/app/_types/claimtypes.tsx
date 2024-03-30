export type Claim = {
  claimID: string;
  author: string;
};

export type TextClaim = {
  text: string;
  definitions: DefinitionClaim[];
} & Claim;

export type DefinitionClaim = {
  text: string;
  definitions: DefinitionClaim[];
} & Claim;
