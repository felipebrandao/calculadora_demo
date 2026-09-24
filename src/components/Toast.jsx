import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <CheckCircle2 size={16} className="toast-icon text-primary" />
      <span className="toast-text font-mono">{message}</span>
    </div>
  );
}
