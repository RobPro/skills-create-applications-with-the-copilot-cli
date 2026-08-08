#!/usr/bin/env node
// Simple Node.js CLI calculator
// Supported operations:
// - add       : addition (a + b)
// - sub       : subtraction (a - b)
// - mul       : multiplication (a * b)
// - div       : division (a / b)
// Usage examples:
//   node src/calculator.js add 2 3      -> prints 5
//   node src/calculator.js div 4 2      -> prints 2
//   node src/calculator.js              -> interactive mode

const readline = require('readline');

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, sub, mul, div');
  console.log('Or run with no args for interactive mode.');
}

function toNumber(str) {
  const n = Number(str);
  return Number.isFinite(n) ? n : NaN;
}

function compute(op, a, b) {
  // Supported operations commented at top
  switch (op) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      if (b === 0) {
        console.error('Error: Division by zero');
        process.exit(2);
      }
      return a / b;
    default:
      console.error(`Unknown operation: ${op}`);
      printUsage();
      process.exit(1);
  }
}

function runNonInteractive(args) {
  if (args.length < 3) {
    printUsage();
    process.exit(1);
  }

  const op = args[0];
  const a = toNumber(args[1]);
  const b = toNumber(args[2]);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both operands must be valid numbers');
    process.exit(1);
  }

  const result = compute(op, a, b);
  console.log(result);
}

function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('Operation (add, sub, mul, div): ', (op) => {
    rl.question('First number: ', (aStr) => {
      rl.question('Second number: ', (bStr) => {
        const a = toNumber(aStr.trim());
        const b = toNumber(bStr.trim());

        if (Number.isNaN(a) || Number.isNaN(b)) {
          console.error('Error: Both operands must be valid numbers');
          rl.close();
          process.exit(1);
        }

        const result = compute(op.trim(), a, b);
        console.log(result);
        rl.close();
      });
    });
  });
}

// Entry point
const argv = process.argv.slice(2);
if (argv.length === 0) {
  runInteractive();
} else {
  runNonInteractive(argv);
}
