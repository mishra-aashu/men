import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info', // 'success', 'error', 'warning', 'info'
    duration: 3000,
  });

  const show = useCallback((message, type = 'info', duration = 3000) => {
    setToast({
      visible: true,
      message,
      type,
      duration,
    });
  }, []);

  const hide = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const success = useCallback((message, duration = 3000) => show(message, 'success', duration), [show]);
  const error = useCallback((message, duration = 3000) => show(message, 'error', duration), [show]);
  const warning = useCallback((message, duration = 3000) => show(message, 'warning', duration), [show]);
  const info = useCallback((message, duration = 3000) => show(message, 'info', duration), [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, hide }}>
      {children}
      {toast.visible && (
        <Toast
          key={`${toast.message}-${toast.type}`}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onHide={hide}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
