import * as Lint from 'tslint';
import {BinaryExpression, forEachChild, Node, SourceFile, SyntaxKind} from 'typescript';

const ASSERTION_EXPRESSION_NAMES = ['always', 'never'];

export class Rule extends Lint.Rules.AbstractRule {
  static readonly metadata: Lint.IRuleMetadata = {
    ruleName: 'assertions-no-explicit-boolean',
    type: 'maintainability',
    description: `Forces.`,
    options: null,
    optionsDescription: 'Not configurable.',
    rationale: `Disallowing passing explicit boolean true or false to the assert() method reduces the amount of false-positives.`,
    typescriptOnly: false,
  };

  apply(sourceFile: SourceFile): Lint.RuleFailure[] {
    return super.applyWithFunction(sourceFile, walk);
  }
}

function walk(context: Lint.WalkContext<void>): void {
  return forEachChild(context.sourceFile, callback);

  function callback(node: Node): void {
    if (node.kind >= SyntaxKind.FirstTypeNode && node.kind <= SyntaxKind.LastTypeNode) {
      return;
    }
    if (node.kind === SyntaxKind.CallExpression && ASSERTION_EXPRESSION_NAMES.includes((node as any).expression.text)) {
      const conditionArgument = (node as any).arguments[0];
      if (conditionArgument.kind === SyntaxKind.TrueKeyword || conditionArgument.kind === SyntaxKind.FalseKeyword) {
        return context.addFailureAtNode(conditionArgument, getFailureString(conditionArgument.getText()));
      }
      if (conditionArgument.kind === SyntaxKind.BinaryExpression) {
        return walkBinaryExpression(context, conditionArgument);
      }
    }

    return forEachChild(node, callback);
  }
}

function walkBinaryExpression(context: Lint.WalkContext<void>, expression: BinaryExpression): void {
  if (
    expression.operatorToken.kind !== SyntaxKind.EqualsEqualsEqualsToken &&
    expression.operatorToken.kind !== SyntaxKind.ExclamationEqualsEqualsToken
  ) {
    [expression.left, expression.right].forEach((side) => {
      if (side.kind === SyntaxKind.TrueKeyword || side.kind === SyntaxKind.FalseKeyword) {
        return context.addFailureAtNode(side, getFailureString(side.getText()));
      }
      if (side.kind === SyntaxKind.BinaryExpression) {
        return walkBinaryExpression(context, side as BinaryExpression);
      }
    });
  }
}

function getFailureString(value: string): string {
  return `Assertions cannot be called with condition argument "${value}" directly`;
}
