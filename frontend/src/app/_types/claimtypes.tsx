export type DefinitionClaim = {
  claimID: string;
  author: string;
  claimType: "Definition";
  text: string;
  definitions: DefinitionClaim[];
}

export type TextClaim = {
  claimID: string;
  author: string;
  claimType: "Text";
  text: string;
  definitions: DefinitionClaim[];
}

export type Claim = DefinitionClaim | TextClaim
