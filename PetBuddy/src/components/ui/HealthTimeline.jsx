

const HealthTimeline = ({ logs = [] }) => {
  if (logs.length === 0) {
    return <p className="empty-msg">No medical history recorded yet.</p>;
  }

  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="health-timeline">
      {sortedLogs.map((log, index) => (
        <div key={log.id || index} className={`timeline-item stagger-${(index % 5) + 1}`}>
          <div className="timeline-dot"></div>
          <div className="timeline-content card glass">
            <div className="timeline-header">
              <span className="timeline-date">{new Date(log.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="timeline-badge">{log.type}</span>
            </div>
            <h4 className="timeline-title">{log.title || 'Health Milestone'}</h4>
            <p className="timeline-note">{log.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthTimeline;
