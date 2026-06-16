import React from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  const iconMap = {
    success: CheckCircle,
    info: Info,
    warning: AlertTriangle,
    error: XCircle,
  };

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map(toast => {
        const Icon = iconMap[toast.type] || Info;
        return (
          <div key={toast.id} className="toast" style={{ animation: 'slideInToast 0.3s ease' }}>
            <div className={`toast-icon ${toast.type}`}>
              <Icon className="icon-sm" />
            </div>
            <div className="toast-content">
              <p className="toast-title">{toast.title}</p>
              <p className="toast-msg">{toast.message}</p>
            </div>
            <button 
              onClick={() => removeToast(toast.id)} 
              style={{ 
                color: 'var(--color-text-4)', 
                padding: '4px', 
                borderRadius: '6px', 
                transition: 'all 150ms',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X className="icon-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
