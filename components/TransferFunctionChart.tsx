import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TransferFunctionChartProps {
  type: 'inversion' | 'gamma';
  gammaValue?: number;
  minimal?: boolean;
}

const TransferFunctionChart: React.FC<TransferFunctionChartProps> = ({ type, gammaValue = 1, minimal = false }) => {
  const data = useMemo(() => {
    const points = [];
    const step = minimal ? 15 : 5; // Reduce points for minimal charts for perf/smoothness
    for (let u = 0; u <= 255; u += step) {
      let v = 0;
      if (type === 'inversion') {
        v = 255 - u;
      } else if (type === 'gamma') {
        // Normalize, apply gamma, denormalize
        const normalizedU = u / 255;
        const normalizedV = Math.pow(normalizedU, gammaValue);
        v = normalizedV * 255;
      }
      points.push({ u, v: Math.round(v) });
    }
    return points;
  }, [type, gammaValue, minimal]);

  return (
    <div className={`w-full bg-white rounded-xl shadow-sm border border-slate-200 ${minimal ? 'p-2 h-32' : 'p-4 h-64'}`}>
      {!minimal && (
        <h4 className="text-sm font-semibold text-slate-500 mb-2 text-center">
          Fonction de Transfert: {type === 'inversion' ? 'Inversion' : `Gamma (γ=${gammaValue})`}
        </h4>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={minimal ? { top: 5, right: 5, bottom: 5, left: 5 } : { top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={!minimal} vertical={!minimal} />
          <XAxis 
            dataKey="u" 
            type="number" 
            domain={[0, 255]} 
            hide={minimal}
            label={{ value: 'Entrée (u)', position: 'insideBottomRight', offset: -5, fontSize: 12 }} 
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            dataKey="v" 
            type="number" 
            domain={[0, 255]} 
            hide={minimal}
            label={{ value: 'Sortie (v)', angle: -90, position: 'insideLeft', fontSize: 12 }} 
            tick={{ fontSize: 10 }}
          />
          {!minimal && (
            <Tooltip 
              contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              cursor={{ stroke: '#94a3b8' }}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="v" 
            stroke={type === 'gamma' && gammaValue < 1 ? '#ef4444' : (type === 'gamma' && gammaValue > 1 ? '#3b82f6' : '#64748b')} 
            strokeWidth={minimal ? 2 : 3} 
            dot={false} 
            animationDuration={300}
          />
          <ReferenceLine x={0} stroke="#cbd5e1" />
          <ReferenceLine y={0} stroke="#cbd5e1" />
          {/* Identity Line for reference in Gamma */}
          {type === 'gamma' && (
             <Line 
             dataKey="u" 
             data={data.map(d => ({ u: d.u, v: d.u }))} 
             stroke="#cbd5e1" 
             strokeDasharray="4 4" 
             dot={false} 
             strokeWidth={1}
             isAnimationActive={false}
           />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransferFunctionChart;