import React from 'react';

/**
 * WeightChart
 * Visualizes the pet's weight over time using pure CSS animations.
 */
const WeightChart = ({ logs = [] }) => {
  if (logs.length === 0) return <p className="empty-msg">No weight data available.</p>;

  // Sort logs chronologically
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Find max weight to scale the bars properly
  const maxWeight = Math.max(...sortedLogs.map(l => l.weight), 1);

  return (
    <div className="weight-chart" style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '15px', marginTop: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
      {sortedLogs.map(log => {
        // Calculate height relative to the max weight
        const heightPct = Math.max((log.weight / maxWeight) * 100, 5); 
        return (
          <div key={log.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '40px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '8px' }}>
              {log.weight}
            </span>
            <div 
              style={{
                width: '100%',
                maxWidth: '40px',
                height: `${heightPct}%`,
                background: 'linear-gradient(to top, var(--primary), var(--secondary))',
                borderRadius: '4px 4px 0 0',
                transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            ></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', whiteSpace: 'nowrap' }}>
              {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WeightChart;
