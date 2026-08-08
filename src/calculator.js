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
const { compute, toNumber } = require('./lib/calculator');

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, sub, mul, div');
  console.log('Or run with no args for interactive mode.');
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

  try {
    const result = compute(op, a, b);
    console.log(result);
  } catch (e) {
    if (e && e.code === 'DIV_BY_ZERO') {
      console.error('Error: Division by zero');
      process.exit(2);
    }
    console.error(e.message || String(e));
    printUsage();
    process.exit(1);
  }
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

        try {
          const result = compute(op.trim(), a, b);
          console.log(result);
        } catch (e) {
          if (e && e.code === 'DIV_BY_ZERO') {
            console.error('Error: Division by zero');
            rl.close();
            process.exit(2);
          }
          console.error(e.message || String(e));
          rl.close();
          process.exit(1);
        }

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
