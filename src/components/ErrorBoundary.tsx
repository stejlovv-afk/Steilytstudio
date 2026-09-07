import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-white">
          <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-6 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Произошла небольшая ошибка
            </h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Интерфейс был защищен от сбоя. Нажмите кнопку ниже, чтобы перезагрузить приложение.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Перезагрузить страницу</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
