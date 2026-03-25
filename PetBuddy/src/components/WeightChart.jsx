import { useEffect, useState } from 'react';

const WeightChart = ({ logs = [] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (logs.length === 0) return <p className="empty-msg">No weight data available.</p>;

  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

  const width = 500;
  const height = 150;
  const padding = 30;
  
  const maxWeight = Math.max(...sortedLogs.map(l => l.weight), 1);
  const minWeight = Math.min(...sortedLogs.map(l => l.weight), 0);
  const range = maxWeight - minWeight || 1;

  const points = sortedLogs.map((log, i) => {
    const x = padding + (i * (width - padding * 2)) / (sortedLogs.length - 1 || 1);
    const y = height - padding - ((log.weight - minWeight) * (height - padding * 2)) / range;
    return { x, y, weight: log.weight, date: log.date };
  });

  const linePath = points.length > 1 
    ? points.reduce((acc, p, i, a) => {
        if (i === 0) return `M ${p.x},${p.y}`;
        const prev = a[i - 1];
        const cp1x = prev.x + (p.x - prev.x) / 2;
        return `${acc} C ${cp1x},${prev.y} ${cp1x},${p.y} ${p.x},${p.y}`;
      }, '')
    : `M ${points[0].x},${points[0].y} L ${points[0].x + 1},${points[0].y}`;

  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;

  return (
    <div className="weight-chart-container" style={{ width: '100%', overflowX: 'auto', padding: '10px 0' }}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ width: '100%', height: 'auto', minWidth: '400px' }}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>

        {}
        {points.map((p, i) => (
          <text 
            key={`text-${i}`} 
            x={p.x} 
            y={height - 5} 
            fontSize="10" 
            textAnchor="middle" 
            fill="var(--text-muted)"
          >
            {new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </text>
        ))}

        {}
        <path 
          d={areaPath} 
          fill="url(#chartGradient)" 
          style={{ 
            opacity: isMounted ? 1 : 0, 
            transition: 'opacity 1s ease-in' 
          }} 
        />

        {}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset={isMounted ? "0" : "1000"}
          style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {}
        {points.map((p, i) => (
          <g key={`point-${i}`} style={{ opacity: isMounted ? 1 : 0, transition: `opacity 0.5s ease-out ${i * 0.1 + 1}s` }}>
            <circle 
              cx={p.x} 
              cy={p.y} 
              r="4" 
              fill="var(--bg-card)" 
              stroke="var(--primary)" 
              strokeWidth="2" 
            />
            <text 
              x={p.x} 
              y={p.y - 10} 
              fontSize="12" 
              fontWeight="bold" 
              textAnchor="middle" 
              fill="var(--text-dark)"
            >
              {p.weight}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WeightChart;
