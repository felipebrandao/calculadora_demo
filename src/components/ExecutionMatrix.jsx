import React from 'react';

export default function ExecutionMatrix({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClearEntry,
  onToggleSign,
  onPercentage,
  onSubtotal,
  onQuickDelta,
  activeOp,
}) {
  return (
    <div className="execution-matrix-wrapper">
      {/* Rapid Delta Quick Chips */}
      <div className="quick-chips-bar">
        <span className="chips-label font-mono">Deltas:</span>
        <div className="chips-group add-chips">
          <button
            type="button"
            className="chip-btn chip-add tactile-key font-mono"
            onClick={() => onQuickDelta(10)}
            title="Adicionar 10"
          >
            +10
          </button>
          <button
            type="button"
            className="chip-btn chip-add tactile-key font-mono"
            onClick={() => onQuickDelta(100)}
            title="Adicionar 100"
          >
            +100
          </button>
          <button
            type="button"
            className="chip-btn chip-add tactile-key font-mono"
            onClick={() => onQuickDelta(1000)}
            title="Adicionar 1.000"
          >
            +1.000
          </button>
        </div>

        <div className="chips-divider"></div>

        <div className="chips-group sub-chips">
          <button
            type="button"
            className="chip-btn chip-sub tactile-key font-mono"
            onClick={() => onQuickDelta(-10)}
            title="Subtrair 10"
          >
            −10
          </button>
          <button
            type="button"
            className="chip-btn chip-sub tactile-key font-mono"
            onClick={() => onQuickDelta(-100)}
            title="Subtrair 100"
          >
            −100
          </button>
          <button
            type="button"
            className="chip-btn chip-sub tactile-key font-mono"
            onClick={() => onQuickDelta(-1000)}
            title="Subtrair 1.000"
          >
            −1.000
          </button>
        </div>
      </div>

      {/* Main Keypad Grid */}
      <div className="keypad-grid">
        {/* Row 1 */}
        <button
          type="button"
          className="key-btn key-utility tactile-key font-mono"
          onClick={onClearEntry}
          title="Limpar Entrada Atual (CE)"
        >
          CE
        </button>
        <button
          type="button"
          className="key-btn key-utility tactile-key font-mono"
          onClick={onToggleSign}
          title="Inverter Sinal (±)"
        >
          ±
        </button>
        <button
          type="button"
          className="key-btn key-utility tactile-key font-mono"
          onClick={onPercentage}
          title="Porcentagem (%)"
        >
          %
        </button>
        <button
          type="button"
          className={`key-btn key-op key-sub tactile-key font-mono ${activeOp === '-' ? 'op-active' : ''}`}
          onClick={() => onOperator('-')}
          title="Subtração (-)"
        >
          <span className="op-symbol">−</span>
          <span className="op-key-label">[-]</span>
        </button>

        {/* Row 2 */}
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('7')}
        >
          7
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('8')}
        >
          8
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('9')}
        >
          9
        </button>
        <button
          type="button"
          className={`key-btn key-op key-add tactile-key font-mono ${activeOp === '+' ? 'op-active' : ''}`}
          onClick={() => onOperator('+')}
          title="Soma (+)"
        >
          <span className="op-symbol">+</span>
          <span className="op-key-label">[+]</span>
        </button>

        {/* Row 3 */}
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('4')}
        >
          4
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('5')}
        >
          5
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('6')}
        >
          6
        </button>
        <button
          type="button"
          className="key-btn key-subtotal tactile-key"
          onClick={onSubtotal}
          title="Calcular Subtotal Parcial"
        >
          <span className="subtotal-title font-mono">SUBTOTAL</span>
          <span className="subtotal-sub">Parcial</span>
        </button>

        {/* Row 4 & 5 */}
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('1')}
        >
          1
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('2')}
        >
          2
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={() => onDigit('3')}
        >
          3
        </button>

        {/* Equals CTA button - Tall span 2 rows */}
        <button
          type="button"
          className="key-btn key-equals tactile-key"
          onClick={onEquals}
          title="Executar Cálculo (Enter ou =)"
        >
          <span className="equals-symbol font-mono">=</span>
          <span className="equals-kbd font-mono">[Enter]</span>
        </button>

        {/* Row 5 */}
        <button
          type="button"
          className="key-btn key-num key-zero tactile-key font-mono"
          onClick={() => onDigit('0')}
        >
          0
        </button>
        <button
          type="button"
          className="key-btn key-num tactile-key font-mono"
          onClick={onDecimal}
          title="Separador Decimal (,)"
        >
          ,
        </button>
      </div>
    </div>
  );
}
