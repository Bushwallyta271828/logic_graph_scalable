'use client';

import { MathJax } from 'better-react-mathjax';
import { Claim, TextClaim, DefinitionClaim, ZerothOrderClaim } from '@/app/_types/claim-types';

function TextContentBox({textClaim} : {textClaim: TextClaim}) {
  return (<p className="text-white text-sm break-words">{textClaim.text}</p>);
}

function DefinitionContentBox({definitionClaim} : {definitionClaim: DefinitionClaim}) {
  return (<p className="text-white text-sm break-words">{`"${definitionClaim.text}" is a valid definition.`}</p>);
}

function ZerothOrderContentBox({zerothOrderClaim} : {zerothOrderClaim: ZerothOrderClaim}) {
  return (
    <p className="text-white text-sm break-words">
      <MathJax>
        {zerothOrderClaim.text}
      </MathJax>
    </p>
  );
}

export function StaticContentBox({claim} : {claim: Claim}) {
  switch (claim.claimType) {
    case 'text':
      return TextContentBox({textClaim: claim});
    case 'definition':
      return DefinitionContentBox({definitionClaim: claim});
    case 'zeroth-order':
      return ZerothOrderContentBox({zerothOrderClaim: claim});
    default:
      throw new Error('Unrecognized claimType');
  }
}
