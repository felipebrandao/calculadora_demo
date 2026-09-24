import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ObservationDeck from './components/ObservationDeck';
import ExecutionMatrix from './components/ExecutionMatrix';
import AnalyticsPanel from './components/AnalyticsPanel';
import KeyboardModal from './components/KeyboardModal';
import Toast from './components/Toast';
import {
  formatLocaleNumber,
  parseLocaleNumber,
  safeMath,
} from './utils/calculator';
import { playKeyClick } from './utils/audio';
import { Calculator } from 'lucide-react';
import './App.css';

export default function App() {
  // Calculator State
  const [currentVal, setCurrentVal] = useState('0');
  const [previousVal, setPreviousVal] = useState(null);
  const [activeOp, setActiveOp] = useState(null);
  const [formulaTape, setFormulaTape] = useState('');
  const [shouldResetInput, setShouldResetInput] = useState(false);

  // App UI State
  const [activeTab, setActiveTab] = useState('calculator');
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sound Preferences (persisted in localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('calcprecision_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('calcprecision_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // History State (persisted in localStorage)
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('calcprecision_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('calcprecision_history', JSON.stringify(history));
    } catch {
      // Storage quota exceeded or disabled
    }
  }, [history]);

  // Toast Helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  }, []);

  // --- Calculator Operations ---

  const handleDigit = useCallback((digit) => {
    playKeyClick('digit', soundEnabled);
    setCurrentVal((prev) => {
      if (shouldResetInput) {
        setShouldResetInput(false);
        return digit;
      }
      if (prev === '0' && digit !== ',') {
        return digit;
      }
      return prev + digit;
    });
  }, [shouldResetInput, soundEnabled]);

  const handleDecimal = useCallback(() => {
    playKeyClick('digit', soundEnabled);
    setCurrentVal((prev) => {
      if (shouldResetInput) {
        setShouldResetInput(false);
        return '0,';
      }
      if (!prev.includes(',')) {
        return prev + ',';
      }
      return prev;
    });
  }, [shouldResetInput, soundEnabled]);

  const handleOperator = useCallback((op) => {
    playKeyClick('operator', soundEnabled);
    const curNum = parseLocaleNumber(currentVal);

    if (previousVal !== null && activeOp && !shouldResetInput) {
      // Chain computation before setting next operator
      const intermediate = safeMath(previousVal, curNum, activeOp);
      setPreviousVal(intermediate);
      setCurrentVal(formatLocaleNumber(intermediate));
      setFormulaTape(`${formatLocaleNumber(intermediate)} ${op}`);
    } else {
      setPreviousVal(curNum);
      setFormulaTape(`${formatLocaleNumber(curNum)} ${op}`);
    }

    setActiveOp(op);
    setShouldResetInput(true);
  }, [currentVal, previousVal, activeOp, shouldResetInput, soundEnabled]);

  const handleEquals = useCallback(() => {
    if (previousVal === null || !activeOp) return;
    playKeyClick('equals', soundEnabled);

    const operand2 = parseLocaleNumber(currentVal);
    const result = safeMath(previousVal, operand2, activeOp);
    const completedFormula = `${formatLocaleNumber(previousVal)} ${activeOp} ${formatLocaleNumber(operand2)} =`;

    // Add entry to history ledger
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      op1: previousVal,
      op2: operand2,
      op: activeOp,
      result: result,
    };

    setHistory((prev) => [newEntry, ...prev]);
    setFormulaTape(completedFormula);
    setCurrentVal(formatLocaleNumber(result));
    setPreviousVal(null);
    setActiveOp(null);
    setShouldResetInput(true);
  }, [previousVal, activeOp, currentVal, soundEnabled]);

  const handleClearAll = useCallback(() => {
    playKeyClick('clear', soundEnabled);
    setCurrentVal('0');
    setPreviousVal(null);
    setActiveOp(null);
    setFormulaTape('');
    setShouldResetInput(false);
  }, [soundEnabled]);

  const handleClearEntry = useCallback(() => {
    playKeyClick('clear', soundEnabled);
    setCurrentVal('0');
    setShouldResetInput(false);
  }, [soundEnabled]);

  const handleBackspace = useCallback(() => {
    playKeyClick('digit', soundEnabled);
    if (shouldResetInput) return;
    setCurrentVal((prev) => {
      if (prev.length > 1) {
        const next = prev.slice(0, -1);
        return next === '-' || next === '-0' ? '0' : next;
      }
      return '0';
    });
  }, [shouldResetInput, soundEnabled]);

  const handleToggleSign = useCallback(() => {
    playKeyClick('digit', soundEnabled);
    if (currentVal === '0') return;
    setCurrentVal((prev) => {
      if (prev.startsWith('-')) {
        return prev.substring(1);
      }
      return '-' + prev;
    });
  }, [currentVal, soundEnabled]);

  const handlePercentage = useCallback(() => {
    playKeyClick('operator', soundEnabled);
    const curNum = parseLocaleNumber(currentVal);
    let calculated = 0;
    if (previousVal !== null) {
      calculated = safeMath(previousVal * (curNum / 100), 0, '+');
    } else {
      calculated = curNum / 100;
    }
    setCurrentVal(formatLocaleNumber(calculated));
    setShouldResetInput(true);
  }, [currentVal, previousVal, soundEnabled]);

  const handleSubtotal = useCallback(() => {
    playKeyClick('equals', soundEnabled);
    if (previousVal !== null && activeOp) {
      const operand2 = parseLocaleNumber(currentVal);
      const subtotal = safeMath(previousVal, operand2, activeOp);
      setPreviousVal(subtotal);
      setCurrentVal(formatLocaleNumber(subtotal));
      setFormulaTape(`Subtotal Parcial: ${formatLocaleNumber(subtotal)}`);
      setShouldResetInput(true);
      showToast(`Subtotal parcial: ${formatLocaleNumber(subtotal)}`);
    } else {
      showToast(`Valor atual: ${currentVal}`);
    }
  }, [previousVal, activeOp, currentVal, showToast, soundEnabled]);

  const handleQuickDelta = useCallback((delta) => {
    playKeyClick('quick', soundEnabled);
    const curNum = parseLocaleNumber(currentVal);
    const nextVal = safeMath(curNum, delta, '+');
    setCurrentVal(formatLocaleNumber(nextVal));
    setShouldResetInput(false);
    showToast(`${delta > 0 ? '+' : ''}${delta} aplicado`);
  }, [currentVal, showToast, soundEnabled]);

  const handleRecallValue = useCallback((val) => {
    playKeyClick('quick', soundEnabled);
    setCurrentVal(formatLocaleNumber(val));
    setShouldResetInput(true);
    showToast(`Resultado ${formatLocaleNumber(val)} injetado no visor.`);
  }, [showToast, soundEnabled]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    showToast('Histórico apagado com sucesso.');
  }, [showToast]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentVal);
      showToast(`Valor ${currentVal} copiado para a área de transferência!`);
    } catch {
      showToast('Falha ao copiar valor.');
    }
  }, [currentVal, showToast]);

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is inside an input or modal is open
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '+' || (e.key === '=' && e.shiftKey)) {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClearAll();
      } else if (e.key === ',' || e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleClearEntry();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleSubtotal();
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleDigit,
    handleOperator,
    handleEquals,
    handleBackspace,
    handleClearAll,
    handleDecimal,
    handlePercentage,
    handleClearEntry,
    handleSubtotal,
  ]);

  return (
    <div className="app-wrapper">
      {/* Background Ambient Glows */}
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Stage */}
      <main className="main-content">
        {/* Sub-Header Operational Bar */}
        <section className="sub-header-bar">
          <div className="sub-header-title-group">
            <div className="sub-header-icon">
              <Calculator size={22} />
            </div>
            <div>
              <h1 className="page-title">Calculadora de Soma e Subtração</h1>
              <p className="page-subtitle">Modo Aditivo &amp; Diferencial com Histórico em Tempo Real</p>
            </div>
          </div>
        </section>

        {/* Dual Pane Layout */}
        <div className="dual-pane-layout">
          {/* Left Pane: Calculator Core (Observation Deck + Execution Matrix) */}
          <section className="calc-core-panel" aria-label="Núcleo de Cálculo">
            <ObservationDeck
              currentVal={currentVal}
              formulaTape={formulaTape}
              activeOp={activeOp}
              onBackspace={handleBackspace}
              onCopy={handleCopy}
              onClearAll={handleClearAll}
            />

            <ExecutionMatrix
              onDigit={handleDigit}
              onDecimal={handleDecimal}
              onOperator={handleOperator}
              onEquals={handleEquals}
              onClearEntry={handleClearEntry}
              onToggleSign={handleToggleSign}
              onPercentage={handlePercentage}
              onSubtotal={handleSubtotal}
              onQuickDelta={handleQuickDelta}
              activeOp={activeOp}
            />
          </section>

          {/* Right Pane: Bento Analytics & History Ledger */}
          <AnalyticsPanel
            history={history}
            onClearHistory={handleClearHistory}
            onRecallValue={handleRecallValue}
            onShowToast={showToast}
          />
        </div>

        {/* Shortcuts Quick Summary Bar at Bottom */}
        <footer className="shortcuts-footer-bar">
          <div className="shortcuts-summary-title">
            <span>Atalhos Rápidos:</span>
          </div>
          <div className="shortcuts-summary-tags font-mono">
            <span className="shortcut-tag"><kbd>0-9</kbd> Números</span>
            <span className="shortcut-tag"><kbd className="text-primary">+</kbd> Somar</span>
            <span className="shortcut-tag"><kbd className="text-secondary">−</kbd> Subtrair</span>
            <span className="shortcut-tag"><kbd>Enter</kbd> Calcular</span>
            <span className="shortcut-tag"><kbd>Esc</kbd> Limpar Tudo</span>
            <span className="shortcut-tag"><kbd>⌫</kbd> Apagar</span>
            <span className="shortcut-tag"><kbd>S</kbd> Subtotal</span>
            <span className="shortcut-tag"><kbd>?</kbd> Todos atalhos</span>
          </div>
        </footer>
      </main>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Floating Notification Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
