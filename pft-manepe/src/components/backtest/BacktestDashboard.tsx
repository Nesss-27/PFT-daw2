'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BacktestDashboard() {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Payload estructurado con las reglas lógicas requeridas por tu FastAPI
  const ejecutarBacktest = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      tickers: ['AAPL', 'MSFT'],
      start_date: '2023-01-01',
      capital_inicial: 150000.0,
      condiciones_compra: [
        { indicador1: 'SMA', param1: 21, operador: '>', indicador2: 'SMA', param2: 50 },
        { indicador1: 'RSI', param1: 14, operador: '<', indicador2: 'VALUE', param2: 70.0 }
      ],
      condiciones_venta: [
        { indicador1: 'SMA', param1: 21, operador: '<', indicador2: 'SMA', param2: 50 }
      ]
    };

    try {
      const res = await fetch('/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setResultados(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Configuración de los datos para Chart.js
  const chartData = resultados ? {
    labels: resultados.grafica.fechas,
    datasets: [
      {
        label: 'Estrategia Personalizada',
        data: resultados.grafica.estrategia_neto,
        borderColor: '#10B981', // Verde
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.1,
        pointRadius: 0, // Optimiza rendimiento omitiendo los puntos individuales
      },
      {
        label: 'S&P 500 Benchmark',
        data: resultados.grafica.sp500_neto,
        borderColor: '#6B7280', // Gris
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        tension: 0.1,
        pointRadius: 0,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      x: { grid: { display: false } },
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Screener Quant Backtesting</h1>
      <button 
        onClick={ejecutarBacktest} 
        disabled={loading}
        style={{ padding: '10px 20px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {loading ? 'Procesando...' : 'Ejecutar Simulación'}
      </button>

      {error && <p style={{ color: '#EF4444', marginTop: '16px' }}>{error}</p>}

      {resultados && (
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <div style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
              <h3>Retorno Neto</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{resultados.resultados_netos.retorno_neto_porcentaje}%</p>
            </div>
            <div style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
              <h3>Max Drawdown</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444' }}>{resultados.resultados_netos.maximo_drawdown}%</p>
            </div>
            <div style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
              <h3>Ratio Sharpe</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{resultados.resultados_netos.ratio_sharpe}</p>
            </div>
            <div style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px' }}>
              <h3>Operaciones</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{resultados.resultados_netos.numero_operaciones}</p>
            </div>
          </div>

          <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px' }}>
            <Line data={chartData!} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}