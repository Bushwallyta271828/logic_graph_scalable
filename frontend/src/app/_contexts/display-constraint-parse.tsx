'use client';

import {
  LogicalFormula,
  LogicalFormulaWithoutImplies,
  ConditionalProbabilityAssignment,
  AffineExpression,
  AffineEquation,
  ConstraintParse
} from '@/app/_types/parse-types.tsx'; 

//TODO: only show parentheses when order of operations demands it!

export function displayLogicalFormulaWithoutImplies({parse, substitutions}:
  {parse: LogicalFormulaWithoutImplies, substitutions: {[claimID: string]: string}}) {
  switch (parse.parseType) {
    case 'LogicalFormulaWithoutImpliesOr':
      //Since or has the lowest precedence, we can safely omit parentheses.
      const subDisplays = parse.children.map((child) =>
        displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions}));
      return subDisplays.join(' or ');
    case 'LogicalFormulaWithoutImpliesAnd':
      const subDisplays = parse.children.map((child) =>
        "( "+displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions})+" )");
      return subDisplays.join(' and ');
    case 'LogicalFormulaWithoutImpliesNot':
      
    default: throw new Error('Unrecognized parseType');
  }
}

export function displayAffineExpression({parse, substitutions}:
  {parse: AffineExpression, substitutions: {[claimID: string]: string}}) {
  switch (parse.parseType) {
    case 'AffineExpressionAddition': 
    case 'AffineExpressionMultiplication':
    case 'AffineExpressionProbability':
    case 'AffineExpressionConstant':
    default: throw new Error('Unrecognized parseType');
  }
}

export function displayConstraintParse({parse, substitutions}: 
  {parse: ConstraintParse, substitutions: {[claimID: string]: string}}) {
  switch (parse.parseType) {
    case 'LogicalFormulaImplies':
    case 'LogicalFormulaOr':
    case 'LogicalFormulaAnd':
    case 'LogicalFormulaNot':
    case 'ClaimID': 
    case 'ConditionalProbabilityAssignment':
    case 'AffineEquation':
    default: throw new Error('Unrecognized parseType');
  }
}
