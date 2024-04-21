import { ConstraintParse } from '@/app/_types/parse-types';

export type TextClaim = {
  claimID: string;
  author: string;
  claimType: 'text';
  text: string;
  dependencies: Set<string>; //Can include invalid Claim IDs
  definitionClaimIDs: string[]; //Can include invalid Claim IDs
};

export type DefinitionClaim = {
  claimID: string;
  author: string;
  claimType: 'definition';
  text: string;
  dependencies: Set<string>; //Can include invalid Claim IDs
  definitionClaimIDs: string[]; //Can include invalid Claim IDs
};

export type ClaimWithDefinitions = 
  | TextClaim
  | DefinitionClaim;

export type ZerothOrderClaim = {
  claimID: string;
  author: string;
  claimType: 'zeroth-order';
  text: string;
  dependencies: Set<string>; //Can include invalid Claim IDs
  parse: ConstraintParse | null; //Can reference invalid Claim IDs
};

export type Claim =
  | TextClaim
  | DefinitionClaim
  | ZerothOrderClaim;
