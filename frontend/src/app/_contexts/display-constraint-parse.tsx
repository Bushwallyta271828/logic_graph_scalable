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

function maybeWrap({wrap, text}: {wrap: boolean, text: string}) {
  //This function potentially wraps text in a pair of parentheses,
  //depending on the value of wrap.
  if (wrap) {return "( "+text+" )";} else {return text;}
}

function displayClaim({claimID, substitutions}:
  {claimID: string, substitutions: {[claimID: string]: string}}) {
  //This function attempts to perform a substitution.
  if (!substitutions.has(claimID)) {throw new Error("Unrecognized claim ID");}
  return "["+claimID+": "+substitutions[claimID]+"]";
}

function displayLogicalFormula({parse, substitutions}:
  {parse: LogicalFormula, substitutions: {[claimID: string]: string}}) {
  //TODO: Make correct!
  switch (parse.parseType) {
    case 'LogicalFormulaImplies':
      const left = maybeWrap({
        wrap: parse.left.parseType === 'LogicalFormulaImplies',
        text: displayLogicalFormula({parse: parse.left, substitutions: substitutions}),
      });
      const right = maybeWrap({
        wrap: parse.right.parseType === 'LogicalFormulaImplies',
        text: displayLogicalFormula({parse: parse.right, substitutions: substitutions}),
      });
      return left + " implies " + right;
    case 'LogicalFormulaOr':
      const subDisplays = parse.children.map((child) =>
        displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions}));
      return subDisplays.join(' or ');
    case 'LogicalFormulaAnd':
      const subDisplays = parse.children.map((child) => maybeWrap({
        wrap: (child.parseType === 'LogicalFormulaWithoutImpliesOr'),
        text: displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions}),
      }));
      return subDisplays.join(' and ');
    case 'LogicalFormulaNot':
      return "not " + maybeWrap({
        wrap: ['LogicalFormulaWithoutImpliesOr', 'LogicalFormulaWithoutImpliesAnd']
          .includes(parse.child.parseType),
        text: displayLogicalFormulaWithoutImplies(
          {parse: parse.child, substitutions: substitutions}),
      });
    case 'ClaimID':
      return displayClaim({claimID: parse.claimID, substitutions: substitutions});
    default: throw new Error('Unrecognized parseType');
  }
}

function displayLogicalFormulaWithoutImplies({parse, substitutions}:
  {parse: LogicalFormulaWithoutImplies, substitutions: {[claimID: string]: string}}) {
  switch (parse.parseType) {
    case 'LogicalFormulaWithoutImpliesOr':
      const subDisplays = parse.children.map((child) =>
        displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions}));
      return subDisplays.join(' or ');
    case 'LogicalFormulaWithoutImpliesAnd':
      const subDisplays = parse.children.map((child) => maybeWrap({
        wrap: (child.parseType === 'LogicalFormulaWithoutImpliesOr'),
        text: displayLogicalFormulaWithoutImplies(
          {parse: child, substitutions: substitutions}),
      }));
      return subDisplays.join(' and ');
    case 'LogicalFormulaWithoutImpliesNot':
      return "not " + maybeWrap({
        wrap: ['LogicalFormulaWithoutImpliesOr', 'LogicalFormulaWithoutImpliesAnd']
          .includes(parse.child.parseType),
        text: displayLogicalFormulaWithoutImplies(
          {parse: parse.child, substitutions: substitutions}),
      });
    case 'ClaimID':
      return displayClaim({claimID: parse.claimID, substitutions: substitutions});
    default: throw new Error('Unrecognized parseType');
  }
}

export function displayAffineExpression({parse, substitutions}:
  {parse: AffineExpression, substitutions: {[claimID: string]: string}}) {
  switch (parse.parseType) {
    case 'AffineExpressionAddition':
      const subDisplays = parse.children.map((child) => 
        displayAffineExpression({parse: child, substitutions: substitutions}));
      if (subDisplays.length === 0) {throw new Error("no children");}
      let display = subDisplays[0];
      for (let i = 1; i < subDisplays.length; i++) {
        const trimmedSubDisplay = subDisplays[i].trim(); //Trimming probably not needed
        if (trimmedSubDisplay.startsWith('-')) {
          display += " - " + trimmedSubDisplay.slice(1);
        } else {
          display += " + " + trimmedSubDisplay;
        }
      }
      return display;
    case 'AffineExpressionMultiplication':
      const childDisplay = displayAffineExpression(
        {parse: parse.child, substitutions: substitutions});
      const wrap = ['AffineExpressionAddition',
        'AffineExpressionMultiplication', //to handle signs
        'AffineExpressionConstant', //to handle signs
      ].includes(parse.child.parseType);
      const maybeWrapped = maybeWrap({wrap: wrap, text: childDisplay});
      if (parse.coefficient === 1) {
        return maybeWrapped;
      } else if (parse.coefficient === -1) {
        return "-" + maybeWrapped;
      } else {
        return parse.coefficient.toString() + "*" + maybeWrapped;
      }
    case 'AffineExpressionProbability':
      return "P( " + displayLogicalFormulaWithoutImplies(
        {parse: parse.child, substitutions: substitutions}) + " )";
    case 'AffineExpressionConstant':
      return parse.constant.toString();
    default: throw new Error('Unrecognized parseType');
  }
}

export function displayConstraintParse({parse, substitutions}: 
  {parse: ConstraintParse, substitutions: {[claimID: string]: string}}) {
  if ([
    'LogicalFormulaImplies',
    'LogicalFormulaOr',
    'LogicalFormulaAnd',
    'LogicalFormulaNot',
    'ClaimID',
  ].includes(parse.parseType)) {
    return displayLogicalFormula({parse: parse, substitutions: substitutions});
  }
  else if (parse.parseType === 'ConditionalProbabilityAssignment') {
    const leftDisplay = displayLogicalFormulaWithoutImplies(
      {parse: parse.conditionalLeftFormula, substitutions: substitutions});
    const rightDisplay = displayLogicalFormulaWithoutImplies(
      {parse: parse.conditionalRightFormula, substitutions: substitutions});
    return "P( "+leftDisplay+" | "+rightDisplay+" ) = "+parse.probability.toString();
  }
  else if (parse.parseType === 'AffineEquation') {
    const leftDisplay = displayAffineExpression(
      {parse: parse.left, substitutions: substitutions});
    const rightDisplay = displayAffineExpression(
      {parse: parse.right, substitutions: substitutions});
    return leftDisplay + " = " + rightDisplay;
  }
  else {throw new Error('Unrecognized parseType');}
}
