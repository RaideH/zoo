

const ActivityRing = ({ radius = 40, stroke = 8, progress = 0, color = 'var(--primary)', label }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="activity-ring-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="var(--border)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <text 
          x="50%" 
          y="50%" 
          dy=".3em" 
          textAnchor="middle" 
          fontSize="1.1rem" 
          fontWeight="bold" 
          fill="var(--text-dark)">
          {Math.round(safeProgress)}%
        </text>
      </svg>
      {label && <span style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>}
    </div>
  );
};

export default ActivityRing;
