import {IRuleMetadata, RuleFailure, WalkContext, Rules, Replacement} from 'tslint';
import {CallExpression, Expression, forEachChild, Node, SourceFile, SyntaxKind} from 'typescript';
import RandExp = require('randexp');

const ASSERTION_EXPRESSION_NAMES = ['always', 'never'];

const DEFAULT_REGEX = /^.*$/;

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'assertions-code',
    type: 'maintainability',
    description: `Checks if always() and never() code match a pattern.`,
    options: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string',
          },
          {
            const: false,
          },
        ],
      },
    },
    hasFix: true,
    optionsDescription: 'Not configurable.',
    rationale: 'Enforcing code pattern makes it easier to find buggy code.',
    typescriptOnly: false,
  };

  apply(sourceFile: SourceFile): RuleFailure[] {
    return super.applyWithFunction(sourceFile, walk, this.ruleArguments[0]);
  }
}

function walk(context: WalkContext<any>): void {
  return forEachChild(context.sourceFile, callback);

  function callback(node: Node): void {
    if (node.kind >= SyntaxKind.FirstTypeNode && node.kind <= SyntaxKind.LastTypeNode) {
      return;
    }
    if (node.kind === SyntaxKind.CallExpression) {
      if (ASSERTION_EXPRESSION_NAMES.includes((node as CallExpression).expression.getText())) {
        const patterns = context.options ?? [];
        const args = Array.from((node as CallExpression).arguments);
        const firstArgument = args.shift();

        if (args.length < patterns.length) {
          const lastArgument = args[args.length - 1] ?? firstArgument;
          const numberOfMissingArgs = patterns.length - args.length;
          const missingPatterns = patterns.slice(patterns.length - numberOfMissingArgs);

          return context.addFailure(
            lastArgument.getEnd(),
            lastArgument.getEnd() + 1,
            getArgumentCountFailureString(patterns.length, args.length),
            fixArgumentCountFailure(lastArgument.getEnd(), missingPatterns)
          );
        }

        args.forEach((arg, index) => {
          const option = patterns[index];
          if (option === false) {
            return;
          }
          const pattern = new RegExp(option) ?? DEFAULT_REGEX;
          if (arg.kind !== SyntaxKind.StringLiteral) {
            return;
          }
          const stringValue = arg.getText().slice(1, -1);
          if (pattern.test(stringValue)) {
            return;
          }
          return context.addFailureAt(arg.getStart(), arg.getWidth(), getPatternFailureString(pattern), fixPatternFailure(arg, pattern));
        });
      }
    }
    return forEachChild(node, callback);
  }
}

function getPatternFailureString(pattern: RegExp): string {
  return `Assertion code has to match ${pattern}.`;
}

function fixPatternFailure(expression: Expression, pattern: RegExp): Replacement {
  const randExp = new RandExp(pattern);
  const fix = randExp.gen();
  const start = expression.getStart();
  const end = expression.getEnd();
  const length = end - start;
  const quoteType = expression.getText()[0];
  return new Replacement(start, length, `${quoteType}${fix}${quoteType}`);
}

function getArgumentCountFailureString(expected: number, provided: number) {
  if (provided === 0) {
    return `Expected code`;
  }
  if (provided === 1) {
    return `Expected ${expected} assertion messages but only ${provided} was provided.`;
  }
  return `Expected ${expected} assertion messages but only ${provided} were provided.`;
}

function fixArgumentCountFailure(start: number, patterns: ReadonlyArray<RegExp | false>): Replacement {
  const fixes = patterns.map((pattern, index) => {
    if (pattern === false) {
      return `''`;
    }
    const randExp = new RandExp(pattern);
    return `'${randExp.gen()}'`;
  });
  return Replacement.appendText(start, ', ' + fixes.join(', '));
}
