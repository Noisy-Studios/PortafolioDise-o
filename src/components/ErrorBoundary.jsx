import React from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080a0f] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-[#0f1322] border border-purple-500/30 space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-heading">Algo salió mal</h2>
            <p className="text-sm text-gray-400">
              {this.state.error?.message || "Ocurrió un error inesperado al cargar esta sección."}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Recargar página
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = import.meta.env.BASE_URL || "/";
                }}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Ir a Inicio
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
