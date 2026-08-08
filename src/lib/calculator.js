// Calculator library used by CLI and tests
// Supported operations (documented in CLI): add, sub, mul, div

function toNumber(str) {
  const n = Number(str);
  return Number.isFinite(n) ? n : NaN;
}

function compute(op, a, b) {
  // Normalize op
  const operation = (op || '').trim();
  if (operation === 'add') return a + b;
  if (operation === 'sub') return a - b;
  if (operation === 'mul') return a * b;
  if (operation === 'div') {
    if (b === 0) {
      const e = new Error('Division by zero');
      e.code = 'DIV_BY_ZERO';
      throw e;
    }
    return a / b;
  }
  const e = new Error(`Unknown operation: ${op}`);
  e.code = 'UNKNOWN_OP';
  throw e;
}

module.exports = { toNumber, compute };
