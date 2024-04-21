import { ConstraintParse } from '@/app/_types/parse-types';

export function potentialClaimID({candidate}: {candidate: string}): boolean {
  //Specifies whether a string would make a valid Claim ID.
  return /^[a-z0-9]+$/i.test(candidate) && !['implies', 'or', 'and', 'not'].includes(candidate);
}

export type TextClaim = {
  claimID: string; //Must satisfy potentialClaimID
  author: string;
  claimType: 'text';
  text: string;
  dependencies: Set<string>; //Can include invalid Claim IDs
  definitionClaimIDs: string[]; //Can include invalid Claim IDs
};

export type DefinitionClaim = {
  claimID: string; //Must satisfy potentialClaimID
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
  claimID: string; //Must satisfy potentialClaimID
  author: string;
  claimType: 'zeroth-order';
  text: string;
  dependencies: Set<string>; //Can include unrecognized Claim IDs
  parse: ConstraintParse | null; //Can reference unrecognized Claim IDs
};

export type Claim =
  | TextClaim
  | DefinitionClaim
  | ZerothOrderClaim;
