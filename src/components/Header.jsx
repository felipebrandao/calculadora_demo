import React from 'react';
import { Volume2, VolumeX, Keyboard, Calculator } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenShortcuts,
}) {
  return (
    <header className="header-bar">
      <div className="header-inner">
        {/* Brand / Logo */}
        <div className="brand-group">
          <div className="brand-logo">
            <Calculator size={22} className="brand-icon" />
          </div>
          <div className="brand-meta">
            <div className="brand-title">CalcPrecision</div>
            <span className="brand-engine">Motor v2.4</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Navegação da calculadora">
          <button
            className={`nav-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
            type="button"
          >
            Soma &amp; Subtração
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
            type="button"
          >
            Histórico Analítico
          </button>
        </nav>

        {/* Action Utilities */}
        <div className="header-actions">
          {/* Sound Toggle */}
          <button
            className={`btn-util ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(prev => !prev)}
            title={soundEnabled ? 'Desativar som de teclas' : 'Ativar som tátil'}
            type="button"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hide-on-mobile">{soundEnabled ? 'Som: Ativado' : 'Som: Desativado'}</span>
          </button>

          {/* Keyboard Shortcuts Dialog Trigger */}
          <button
            className="btn-util"
            onClick={onOpenShortcuts}
            title="Ver atalhos do teclado"
            type="button"
          >
            <Keyboard size={16} />
            <span className="hide-on-mobile">Atalhos</span>
            <kbd className="kbd-badge">?</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
