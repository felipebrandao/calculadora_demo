import React from 'react';
import { X, Keyboard, CheckCircle2 } from 'lucide-react';

export default function KeyboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 - 9', desc: 'Inserir dígitos numéricos' },
    { key: '+', desc: 'Operação de Adição (Soma)' },
    { key: '-', desc: 'Operação de Subtração' },
    { key: 'Enter ou =', desc: 'Executar e gravar na fita de auditoria' },
    { key: 'Backspace', desc: 'Apagar último dígito inserido' },
    { key: 'Esc', desc: 'Limpar tudo (Reset Geral)' },
    { key: 'c ou C', desc: 'Limpar entrada atual (Clear Entry)' },
    { key: ', ou .', desc: 'Separador decimal' },
    { key: '%', desc: 'Calcular percentual relativo' },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <Keyboard size={18} />
            </div>
            <div>
              <h3 className="modal-title font-headline">Atalhos de Teclado</h3>
              <p className="modal-subtitle">Controle a calculadora sem tirar as mãos do teclado</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="shortcuts-grid">
            {shortcuts.map((sc, index) => (
              <div key={index} className="shortcut-row">
                <kbd className="shortcut-key font-mono">{sc.key}</kbd>
                <span className="shortcut-desc">{sc.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-tip">
            <CheckCircle2 size={15} className="text-primary" />
            <span>O teclado numérico físico (Numpad) é totalmente suportado.</span>
          </div>
          <button className="modal-primary-btn" onClick={onClose} type="button">
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
