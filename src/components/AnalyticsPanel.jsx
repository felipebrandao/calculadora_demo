import React from 'react';
import {
  Wallet,
  PlusCircle,
  MinusCircle,
  TrendingUp,
  Receipt,
  Download,
  Trash2,
  CornerDownLeft,
  FileSpreadsheet,
  FileCode,
} from 'lucide-react';
import { formatLocaleNumber, exportHistoryCSV, exportHistoryJSON } from '../utils/calculator';

export default function AnalyticsPanel({
  history,
  onClearHistory,
  onRecallValue,
  onShowToast,
}) {
  // Aggregate Metrics from history
  const totalAdds = history.filter(h => h.op === '+').length;
  const totalSubs = history.filter(h => h.op === '-').length;

  const sumValues = history
    .filter(h => h.op === '+')
    .reduce((acc, curr) => acc + (Number(curr.op2) || 0), 0);

  const subValues = history
    .filter(h => h.op === '-')
    .reduce((acc, curr) => acc + (Number(curr.op2) || 0), 0);

  // Latest calculated balance or cumulative balance
  const currentBalance = history.length > 0 ? history[0].result : 0;

  const handleExportCSV = () => {
    if (history.length === 0) {
      onShowToast('Nenhum dado para exportar.');
      return;
    }
    exportHistoryCSV(history);
    onShowToast('Histórico exportado em CSV com sucesso!');
  };

  const handleExportJSON = () => {
    if (history.length === 0) {
      onShowToast('Nenhum dado para exportar.');
      return;
    }
    exportHistoryJSON(history);
    onShowToast('Histórico exportado em JSON com sucesso!');
  };

  return (
    <aside className="analytics-panel">
      {/* Bento Analytics Overview Cards */}
      <div className="bento-grid">
        {/* Total Acumulado Card */}
        <div className="bento-card bento-card-main">
          <div className="bento-header">
            <span className="bento-label font-mono">SALDO ACUMULADO</span>
            <div className="bento-icon-wrapper primary-glow">
              <Wallet size={16} />
            </div>
          </div>
          <div className="bento-body">
            <span className="bento-hero-val font-mono tabular-nums">
              {formatLocaleNumber(currentBalance, 2)}
            </span>
            <span className="bento-currency font-mono">BRL</span>
          </div>
        </div>

        {/* Somas Totais Card */}
        <div className="bento-card bento-card-stat">
          <div className="bento-header">
            <div className="stat-title-group text-primary">
              <PlusCircle size={15} />
              <span className="font-mono">SOMAS</span>
            </div>
            <span className="stat-badge font-mono">{totalAdds}</span>
          </div>
          <div className="stat-value font-mono tabular-nums text-primary">
            +{formatLocaleNumber(sumValues, 2)}
          </div>
        </div>

        {/* Subtrações Totais Card */}
        <div className="bento-card bento-card-stat">
          <div className="bento-header">
            <div className="stat-title-group text-secondary">
              <MinusCircle size={15} />
              <span className="font-mono">SUBTRAÇÕES</span>
            </div>
            <span className="stat-badge font-mono">{totalSubs}</span>
          </div>
          <div className="stat-value font-mono tabular-nums text-secondary">
            −{formatLocaleNumber(subValues, 2)}
          </div>
        </div>

        {/* Razão / Proporção Card */}
        <div className="bento-card bento-card-stat">
          <div className="bento-header">
            <div className="stat-title-group text-muted">
              <TrendingUp size={15} />
              <span className="font-mono">RAZÃO</span>
            </div>
            <span className="stat-badge font-mono">+/-</span>
          </div>
          <div className="stat-value font-mono tabular-nums">
            {totalAdds}:{totalSubs}
          </div>
        </div>
      </div>

      {/* History Ledger Section */}
      <div className="history-ledger-card">
        {/* Ledger Header & Actions */}
        <div className="ledger-header">
          <div className="ledger-title-group">
            <Receipt size={18} className="text-muted" />
            <h2 className="ledger-heading font-headline">Histórico de Operações</h2>
          </div>

          <div className="ledger-action-bar">
            {/* Export Menu */}
            <div className="export-btn-group">
              <button
                type="button"
                className="btn-ledger-action"
                onClick={handleExportCSV}
                title="Exportar como CSV"
              >
                <FileSpreadsheet size={14} />
                <span className="hide-on-mobile">CSV</span>
              </button>
              <button
                type="button"
                className="btn-ledger-action"
                onClick={handleExportJSON}
                title="Exportar como JSON"
              >
                <FileCode size={14} />
                <span className="hide-on-mobile">JSON</span>
              </button>
            </div>

            {/* Clear History */}
            {history.length > 0 && (
              <button
                type="button"
                className="btn-ledger-action clear-history-btn"
                onClick={onClearHistory}
                title="Limpar todo o histórico"
              >
                <Trash2 size={14} />
                <span className="hide-on-mobile">Limpar</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable History Cards */}
        <div className="ledger-list-container">
          {history.length === 0 ? (
            <div className="ledger-empty-state">
              <div className="empty-icon-circle">
                <Receipt size={24} />
              </div>
              <p className="empty-title">Nenhuma operação realizada ainda.</p>
              <p className="empty-subtitle">
                Utilize [+] ou [−] para calcular e pressione [=] para registrar nesta fita.
              </p>
            </div>
          ) : (
            <div className="ledger-items-stack">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="ledger-item-card tactile-key"
                  onClick={() => onRecallValue(item.result)}
                  title="Clique para injetar este resultado no visor"
                >
                  <div className="item-meta-row">
                    <span className={`item-badge ${item.op === '+' ? 'badge-add' : 'badge-sub'}`}>
                      {item.op === '+' ? '+ Soma' : '− Subtração'}
                    </span>
                    <span className="item-timestamp font-mono">{item.timestamp}</span>
                    <span className="item-recall-prompt">
                      <CornerDownLeft size={13} />
                      <span>Reusar</span>
                    </span>
                  </div>

                  <div className="item-values-row">
                    <span className="item-formula font-mono">
                      {formatLocaleNumber(item.op1)} {item.op} {formatLocaleNumber(item.op2)} =
                    </span>
                    <span className="item-result font-mono tabular-nums font-bold">
                      {formatLocaleNumber(item.result)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="ledger-footer-info font-mono">
          <span>Clique em qualquer linha para reusar o resultado</span>
          <span>{history.length} {history.length === 1 ? 'registro' : 'registros'}</span>
        </div>
      </div>
    </aside>
  );
}
