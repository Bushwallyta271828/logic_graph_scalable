import { ConstraintParse } from '@/app/_types/parse-types';

export type TextClaim = {
  claimID: string;
  author: string;
  claimType: 'text';
  text: string;
  dependencies: Set<string>; //should reflect definitionClaimIDs
  definitionClaimIDs: string[];
};

export type DefinitionClaim = {
  claimID: string;
  author: string;
  claimType: 'definition';
  text: string;
  dependencies: Set<string>; //should reflect definitionClaimIDs
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
  dependencies: Set<string>; //should reflect parse
  parse: ConstraintParse | null;
};

export type Claim =
  | TextClaim
  | DefinitionClaim
  | ZerothOrderClaim;
