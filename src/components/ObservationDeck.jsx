import React from 'react';
import { Delete, Copy, RotateCcw } from 'lucide-react';

export default function ObservationDeck({
  currentVal,
  formulaTape,
  activeOp,
  onBackspace,
  onCopy,
  onClearAll,
}) {
  // Dynamically adapt font size based on length of displayed string
  const getDisplayClass = (text) => {
    const len = (text || '').length;
    if (len > 18) return 'display-num-xs';
    if (len > 14) return 'display-num-sm';
    if (len > 10) return 'display-num-md';
    return 'display-num-lg';
  };

  return (
    <div className="observation-deck">
      {/* Top Deck Controls Bar */}
      <div className="deck-header">
        <div className="deck-status-group">
          {/* Operation Status Badge */}
          {activeOp === '+' ? (
            <span className="op-badge op-badge-add">
              <span className="badge-dot dot-add"></span>
              <span>SOMA (+)</span>
            </span>
          ) : activeOp === '-' ? (
            <span className="op-badge op-badge-sub">
              <span className="badge-dot dot-sub"></span>
              <span>SUBTRAÇÃO (−)</span>
            </span>
          ) : (
            <span className="op-badge op-badge-neutral">
              <span className="badge-dot dot-neutral"></span>
              <span>NEUTRO</span>
            </span>
          )}

          <span className="register-label font-mono">REG_A: ATIVO</span>
        </div>

        {/* Action icons */}
        <div className="deck-quick-actions">
          <button
            className="deck-action-btn"
            onClick={onCopy}
            title="Copiar resultado atual"
            type="button"
          >
            <Copy size={15} />
            <span className="hide-on-mobile">Copiar</span>
          </button>
          <button
            className="deck-action-btn delete-btn"
            onClick={onBackspace}
            title="Apagar último dígito (Backspace)"
            type="button"
          >
            <Delete size={15} />
            <span className="hide-on-mobile">⌫</span>
          </button>
          <button
            className="deck-action-btn clear-btn"
            onClick={onClearAll}
            title="Limpar tudo (Esc)"
            type="button"
          >
            <RotateCcw size={15} />
            <span>Limpar (C)</span>
          </button>
        </div>
      </div>

      {/* Formula Tape Expression */}
      <div className="formula-tape font-mono" title="Fita da operação">
        <span>{formulaTape || '0'}</span>
      </div>

      {/* Main Display Readout */}
      <div className="main-display-container">
        <div
          className={`main-display-value font-mono tabular-nums ${getDisplayClass(currentVal)}`}
          title={currentVal}
        >
          {currentVal}
        </div>
      </div>
    </div>
  );
}
