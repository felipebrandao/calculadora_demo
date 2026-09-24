// Precision mathematical helpers for Brazilian locale format

export function formatLocaleNumber(num, maxDecimals = 6) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const n = Number(num);
  // Round to fix floating point anomalies like 0.1 + 0.2
  const factor = Math.pow(10, maxDecimals);
  const rounded = Math.round((n + Number.EPSILON) * factor) / factor;

  return rounded.toLocaleString('pt-BR', {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  });
}

export function parseLocaleNumber(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  // Remove thousand dots and convert comma to dot
  const clean = str.toString().replace(/\./g, '').replace(',', '.');
  const val = parseFloat(clean);
  return isNaN(val) ? 0 : val;
}

export function safeMath(a, b, op) {
  const numA = Number(a) || 0;
  const numB = Number(b) || 0;
  let res = 0;
  if (op === '+') {
    res = numA + numB;
  } else if (op === '-') {
    res = numA - numB;
  } else {
    res = numB;
  }
  // Eliminate IEEE 754 precision glitch
  return parseFloat(res.toFixed(10));
}

export function exportHistoryCSV(historyItems) {
  const headers = ['Data e Hora', 'Operação', 'Operando 1', 'Operador', 'Operando 2', 'Resultado'];
  const rows = historyItems.map(item => [
    item.timestamp,
    item.op === '+' ? 'Soma' : 'Subtração',
    item.op1,
    item.op,
    item.op2,
    item.result
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF'
    + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `calculadora_historico_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportHistoryJSON(historyItems) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(historyItems, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `calculadora_historico_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
