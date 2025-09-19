import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSessions } from '../../services/sessionStore';
import type { SavedSession } from '../../services/sessionStore';

interface SessionData {
  id: string;
  subject: string;
  focusScore: number;
  duration: number;
  date: string;
  time: string;
  color: 'green' | 'yellow' | 'red';
}

interface DistractionData {
  name: string;
  duration: string;
  icon: string;
  color: string;
}

interface InsightData {
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  icon: string;
}

const Analytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [timeFilter, setTimeFilter] = useState('Last 7 days');

  // Load saved sessions from localStorage
  const [saved, setSaved] = useState<SavedSession[]>([]);
  useEffect(() => { setSaved(getSessions()); }, []);
  const sessionsData: SessionData[] = useMemo(() => {
    if (!saved.length) return [];
    return saved.map(s => {
      const start = new Date(s.startIso);
      const end = new Date(s.endIso);
      const durationMin = Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));
      const when = start.toLocaleDateString();
      const time = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const color: SessionData['color'] = s.averageFocus >= 85 ? 'green' : s.averageFocus >= 60 ? 'yellow' : 'red';
      return { id: s.id, subject: s.subject, focusScore: Math.round(s.averageFocus), duration: durationMin, date: when, time, color };
    });
  }, [saved]);

  const latest = saved[0];
  const currentSession = latest ? {
    subject: latest.subject,
    chapter: 'Session Summary',
    date: new Date(latest.startIso).toLocaleDateString(),
    startTime: new Date(latest.startIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date(latest.endIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: `${Math.max(1, Math.round((new Date(latest.endIso).getTime() - new Date(latest.startIso).getTime())/60000))} minutes`,
    focusScore: Math.round(latest.averageFocus),
    focusedTime: `${Math.round(latest.averageFocus/100 * Math.max(1, Math.round((new Date(latest.endIso).getTime() - new Date(latest.startIso).getTime())/60000)))} min`,
    distractedTime: `${Math.max(0, Math.round((1 - latest.averageFocus/100) * Math.max(1, Math.round((new Date(latest.endIso).getTime() - new Date(latest.startIso).getTime())/60000))))} min`,
    productivityScore: latest.averageFocus >= 85 ? 'A+' : latest.averageFocus >= 70 ? 'A' : latest.averageFocus >= 50 ? 'B' : 'C'
  } : {
    subject: 'No saved sessions yet',
    chapter: 'Start a session from Dashboard',
    date: '-', startTime: '-', endTime: '-', duration: '-', focusScore: 0, focusedTime: '0 min', distractedTime: '0 min', productivityScore: '-'
  };

  const distractionBreakdown: DistractionData[] = [
    { name: 'Instagram', duration: '1.8 min', icon: '📷', color: '#E91E63' },
    { name: 'YouTube', duration: '1.2 min', icon: '📺', color: '#FF0000' },
    { name: 'Phone Usage', duration: '0.5 min', icon: '📱', color: '#2196F3' }
  ];

  const insights: InsightData[] = [
    {
      type: 'success',
      title: 'Excellent Focus Duration',
      message: 'You maintained focus for 94% of your session, which is above your average of 87%. Keep up the great work!',
      icon: '✅'
    },
    {
      type: 'warning',
      title: 'Social Media Distraction Pattern',
      message: 'Instagram notifications interrupted you twice. Try enabling "Do Not Disturb" mode or using a website blocker during study sessions.',
      icon: '⚠️'
    },
    {
      type: 'info',
      title: 'Optimal Study Time',
      message: 'Your focus peaks during afternoon sessions (2-4 PM). Consider scheduling your most challenging subjects during this time.',
      icon: '💡'
    },
    {
      type: 'error',
      title: 'Weekly Goal Progress',
      message: 'You\'re 73% toward your weekly focus goal of 25 hours. You need 6.75 more focused hours this week.',
      icon: '📊'
    }
  ];

  // Build a simple timeline from saved scores (every point == one reading)
  const timelineData = useMemo(() => {
    if (!latest?.scores?.length) return [] as { time: string; type: 'focused' | 'distracted' }[];
    const now = new Date(latest.endIso);
    return latest.scores.map((s, i) => ({
      time: `${i}`,
      type: s >= 60 ? 'focused' : 'distracted'
    }));
  }, [latest]);

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '0'
    } as React.CSSProperties,

    header: {
      backgroundColor: 'white',
      padding: '2rem',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky' as const,
      top: 0,
      zIndex: 10
    } as React.CSSProperties,

    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    } as React.CSSProperties,

    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    } as React.CSSProperties,

    backButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease'
    } as React.CSSProperties,

    headerTitle: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#111827',
      margin: '0 0 0.5rem 0'
    } as React.CSSProperties,

    headerSubtitle: {
      fontSize: '1rem',
      color: '#6b7280',
      margin: '0'
    } as React.CSSProperties,

    exportButton: {
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '0.875rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    } as React.CSSProperties,

    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      gap: '2rem',
      alignItems: 'start'
    } as React.CSSProperties,

    sidebar: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem'
    } as React.CSSProperties,

    content: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem'
    } as React.CSSProperties,

    card: {
      backgroundColor: 'white',
      borderRadius: '1.5rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    } as React.CSSProperties,

    searchSection: {
      marginBottom: '2rem'
    } as React.CSSProperties,

    searchInput: {
      width: '100%',
      padding: '0.875rem 1rem 0.875rem 2.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      fontSize: '0.95rem',
      marginBottom: '1rem',
      background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/%3e%3c/svg%3e") no-repeat 0.75rem center`,
      backgroundSize: '1rem'
    } as React.CSSProperties,

    filterRow: {
      display: 'flex',
      gap: '1rem'
    } as React.CSSProperties,

    select: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      backgroundColor: 'white'
    } as React.CSSProperties,

    sessionsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    } as React.CSSProperties,

    sessionItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    } as React.CSSProperties,

    sessionInfo: {
      flex: 1
    } as React.CSSProperties,

    sessionSubject: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    sessionMeta: {
      fontSize: '0.8125rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    sessionStats: {
      textAlign: 'right' as const
    } as React.CSSProperties,

    focusScore: {
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    focusScoreGreen: {
      color: '#10b981'
    } as React.CSSProperties,

    focusScoreYellow: {
      color: '#f59e0b'
    } as React.CSSProperties,

    focusScoreRed: {
      color: '#ef4444'
    } as React.CSSProperties,

    duration: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    } as React.CSSProperties,

    sessionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem'
    } as React.CSSProperties,

    sessionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '0.5rem'
    } as React.CSSProperties,

    sessionChapter: {
      fontSize: '1rem',
      color: '#6b7280'
    } as React.CSSProperties,

    sessionActions: {
      display: 'flex',
      gap: '0.75rem'
    } as React.CSSProperties,

    actionButton: {
      padding: '0.75rem 1.25rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none'
    } as React.CSSProperties,

    pdfButton: {
      backgroundColor: '#ef4444',
      color: 'white'
    } as React.CSSProperties,

    emailButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    } as React.CSSProperties,

    sessionDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      marginBottom: '2rem'
    } as React.CSSProperties,

    detailItem: {
      textAlign: 'center' as const
    } as React.CSSProperties,

    detailLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    detailValue: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#111827'
    } as React.CSSProperties,

    performanceSection: {
      marginBottom: '2rem'
    } as React.CSSProperties,

    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1.5rem'
    } as React.CSSProperties,

    performanceGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      alignItems: 'center'
    } as React.CSSProperties,

    focusScoreContainer: {
      textAlign: 'center' as const
    } as React.CSSProperties,

    circularProgress: {
      position: 'relative' as const,
      width: '150px',
      height: '150px',
      margin: '0 auto 1rem'
    } as React.CSSProperties,

    progressSvg: {
      transform: 'rotate(-90deg)',
      width: '100%',
      height: '100%'
    } as React.CSSProperties,

    progressBackground: {
      fill: 'none',
      stroke: '#f3f4f6',
      strokeWidth: 12
    } as React.CSSProperties,

    progressFill: {
      fill: 'none',
      stroke: '#10b981',
      strokeWidth: 12,
      strokeLinecap: 'round' as const,
      strokeDasharray: '283',
      strokeDashoffset: '17', // 94% of 283
      transition: 'stroke-dashoffset 1s ease'
    } as React.CSSProperties,

    progressText: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '2rem',
      fontWeight: '800',
      color: '#111827'
    } as React.CSSProperties,

    progressLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      textAlign: 'center' as const
    } as React.CSSProperties,

    performanceStats: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    } as React.CSSProperties,

    statRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem'
    } as React.CSSProperties,

    statLabel: {
      fontSize: '0.925rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    statValue: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827'
    } as React.CSSProperties,

    statValueGreen: {
      color: '#10b981'
    } as React.CSSProperties,

    statValueRed: {
      color: '#ef4444'
    } as React.CSSProperties,

    statValueBlue: {
      color: '#3b82f6'
    } as React.CSSProperties,

    distractionSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      alignItems: 'start'
    } as React.CSSProperties,

    pieChartContainer: {
      textAlign: 'center' as const
    } as React.CSSProperties,

    pieChart: {
      width: '200px',
      height: '200px',
      margin: '0 auto 1rem'
    } as React.CSSProperties,

    distractionList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem'
    } as React.CSSProperties,

    distractionItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem'
    } as React.CSSProperties,

    distractionInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    } as React.CSSProperties,

    distractionIcon: {
      fontSize: '1.25rem'
    } as React.CSSProperties,

    distractionName: {
      fontSize: '0.925rem',
      fontWeight: '500',
      color: '#111827'
    } as React.CSSProperties,

    distractionDuration: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280'
    } as React.CSSProperties,

    insight: {
      fontSize: '0.925rem',
      color: '#d97706',
      fontStyle: 'italic',
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#fef3c7',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    timelineSection: {
      marginTop: '2rem'
    } as React.CSSProperties,

    timeline: {
      display: 'flex',
      alignItems: 'end',
      gap: '0.5rem',
      padding: '2rem 0',
      borderBottom: '2px solid #e5e7eb',
      marginBottom: '1rem'
    } as React.CSSProperties,

    timelineBar: {
      width: '60px',
      borderRadius: '0.25rem 0.25rem 0 0',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '0.5rem'
    } as React.CSSProperties,

    timelineBarFocused: {
      height: '80px',
      backgroundColor: '#10b981'
    } as React.CSSProperties,

    timelineBarDistracted: {
      height: '30px',
      backgroundColor: '#ef4444'
    } as React.CSSProperties,

    timelineTime: {
      fontSize: '0.8125rem',
      color: '#6b7280',
      marginTop: '0.5rem'
    } as React.CSSProperties,

    timelineLegend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem'
    } as React.CSSProperties,

    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    } as React.CSSProperties,

    legendDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    } as React.CSSProperties,

    legendDotGreen: {
      backgroundColor: '#10b981'
    } as React.CSSProperties,

    legendDotRed: {
      backgroundColor: '#ef4444'
    } as React.CSSProperties,

    legendDotYellow: {
      backgroundColor: '#f59e0b'
    } as React.CSSProperties,

    insightsGrid: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    } as React.CSSProperties,

    insightCard: {
      padding: '1.5rem',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem'
    } as React.CSSProperties,

    insightCardSuccess: {
      backgroundColor: '#f0fdfa',
      borderColor: '#a7f3d0'
    } as React.CSSProperties,

    insightCardWarning: {
      backgroundColor: '#fffbeb',
      borderColor: '#fde68a'
    } as React.CSSProperties,

    insightCardInfo: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe'
    } as React.CSSProperties,

    insightCardError: {
      backgroundColor: '#faf5ff',
      borderColor: '#e9d5ff'
    } as React.CSSProperties,

    insightIcon: {
      fontSize: '1.25rem',
      flexShrink: 0
    } as React.CSSProperties,

    insightContent: {
      flex: 1
    } as React.CSSProperties,

    insightTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    } as React.CSSProperties,

    insightMessage: {
      fontSize: '0.925rem',
      color: '#4b5563',
      lineHeight: '1.5',
      margin: 0
    } as React.CSSProperties,

    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '2rem',
      marginTop: '2rem',
      borderTop: '1px solid #e5e7eb'
    } as React.CSSProperties,

    footerLinks: {
      display: 'flex',
      gap: '2rem'
    } as React.CSSProperties,

    footerLink: {
      color: '#6366f1',
      textDecoration: 'none',
      fontSize: '0.925rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      transition: 'all 0.3s ease'
    } as React.CSSProperties,

    footerInfo: {
      color: '#9ca3af',
      fontSize: '0.8125rem'
    } as React.CSSProperties,

    // Responsive styles
    '@media (max-width: 1200px)': {
      main: {
        gridTemplateColumns: '1fr',
        gap: '1.5rem'
      },
      sidebar: {
        order: 2
      },
      content: {
        order: 1
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <Link to="/dashboard" style={styles.backButton}>
              ←
            </Link>
            <div>
              <h1 style={styles.headerTitle}>Session Analytics & Reports</h1>
              <p style={styles.headerSubtitle}>Track your focus patterns and get insights</p>
            </div>
          </div>
          <button style={styles.exportButton} onClick={handleExport}>
            <span>⬇</span>
            Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Search and Filters */}
          <div style={styles.card}>
            <div style={styles.searchSection}>
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.filterRow}>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  style={styles.select}
                >
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                </select>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={styles.select}
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>All time</option>
                </select>
              </div>
            </div>

            {/* Sessions List */}
            <div style={styles.sessionsList}>
              {sessionsData.map((session) => (
                <div
                  key={session.id}
                  style={styles.sessionItem}
                  onClick={() => console.log('Selected session:', session.id)}
                >
                  <div style={styles.sessionInfo}>
                    <div style={styles.sessionSubject}>{session.subject}</div>
                    <div style={styles.sessionMeta}>
                      {session.date}, {session.time}
                    </div>
                  </div>
                  <div style={styles.sessionStats}>
                    <div
                      style={{
                        ...styles.focusScore,
                        ...(session.color === 'green' ? styles.focusScoreGreen :
                           session.color === 'yellow' ? styles.focusScoreYellow :
                           styles.focusScoreRed)
                      }}
                    >
                      {session.focusScore}%
                    </div>
                    <div style={styles.duration}>{session.duration} min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Session Details */}
          <div style={styles.card}>
            <div style={styles.sessionHeader}>
              <div>
                <h2 style={styles.sessionTitle}>{currentSession.subject}</h2>
                <p style={styles.sessionChapter}>{currentSession.chapter}</p>
              </div>
              <div style={styles.sessionActions}>
                <button style={{...styles.actionButton, ...styles.pdfButton}}>
                  📄 PDF
                </button>
                <button style={{...styles.actionButton, ...styles.emailButton}}>
                  ✉️ Email
                </button>
              </div>
            </div>

            <div style={styles.sessionDetails}>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Date</div>
                <div style={styles.detailValue}>{currentSession.date}</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Start Time</div>
                <div style={styles.detailValue}>{currentSession.startTime}</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>End Time</div>
                <div style={styles.detailValue}>{currentSession.endTime}</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Duration</div>
                <div style={styles.detailValue}>{currentSession.duration}</div>
              </div>
            </div>
          </div>

          {/* Focus Performance */}
          <div style={styles.card}>
            <div style={styles.performanceSection}>
              <h3 style={styles.sectionTitle}>Focus Performance</h3>
              <div style={styles.performanceGrid}>
                <div style={styles.focusScoreContainer}>
                  <div style={styles.circularProgress}>
                    <svg style={styles.progressSvg}>
                      <circle
                        cx="75"
                        cy="75"
                        r="45"
                        style={styles.progressBackground}
                      />
                      <circle
                        cx="75"
                        cy="75"
                        r="45"
                        style={{...styles.progressFill, strokeDashoffset: `${283 - Math.max(0, Math.min(100, currentSession.focusScore)) / 100 * 283}`}}
                      />
                    </svg>
                    <div style={styles.progressText}>{currentSession.focusScore}%</div>
                  </div>
                  <div style={styles.progressLabel}>Focus Score</div>
                </div>

                <div style={styles.performanceStats}>
                  <div style={styles.statRow}>
                    <div style={styles.statLabel}>
                      <span style={{color: '#10b981'}}>●</span> Focused Time
                    </div>
                    <div style={{...styles.statValue, ...styles.statValueGreen}}>
                      {currentSession.focusedTime}
                    </div>
                  </div>
                  <div style={styles.statRow}>
                    <div style={styles.statLabel}>
                      <span style={{color: '#ef4444'}}>●</span> Distracted Time
                    </div>
                    <div style={{...styles.statValue, ...styles.statValueRed}}>
                      {currentSession.distractedTime}
                    </div>
                  </div>
                  <div style={styles.statRow}>
                    <div style={styles.statLabel}>
                      <span style={{color: '#3b82f6'}}>●</span> Productivity Score
                    </div>
                    <div style={{...styles.statValue, ...styles.statValueBlue}}>
                      {currentSession.productivityScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distraction Breakdown */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Distraction Breakdown</h3>
            <div style={styles.distractionSection}>
              <div style={styles.pieChartContainer}>
                <svg style={styles.pieChart} viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#E91E63"
                    strokeWidth="20"
                    strokeDasharray="51.4 100"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#FF0000"
                    strokeWidth="20"
                    strokeDasharray="34.3 100"
                    strokeDashoffset="-51.4"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="20"
                    strokeDasharray="14.3 100"
                    strokeDashoffset="-85.7"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="35" y="25" fontSize="8" fill="#E91E63">Instagram: 51.4%</text>
                  <text x="15" y="85" fontSize="8" fill="#FF0000">YouTube: 34.3%</text>
                  <text x="5" y="45" fontSize="8" fill="#2196F3">Phone: 14.3%</text>
                </svg>
              </div>

              <div style={styles.distractionList}>
                {distractionBreakdown.map((distraction, index) => (
                  <div key={index} style={styles.distractionItem}>
                    <div style={styles.distractionInfo}>
                      <span style={{...styles.distractionIcon, color: distraction.color}}>
                        {distraction.icon}
                      </span>
                      <span style={styles.distractionName}>{distraction.name}</span>
                    </div>
                    <span style={styles.distractionDuration}>{distraction.duration}</span>
                  </div>
                ))}
                <div style={styles.insight}>
                  <span>💡</span>
                  <span>Social media was your main distraction. Consider using website blockers during study time.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Timeline */}
          <div style={styles.card}>
            <div style={styles.timelineSection}>
              <h3 style={styles.sectionTitle}>Session Timeline</h3>
              <div style={styles.timeline}>
                {timelineData.length ? timelineData.map((point, index) => (
                  <div key={index} style={styles.timelineBar}>
                    <div style={ point.type === 'focused' ? styles.timelineBarFocused : styles.timelineBarDistracted } />
                    <div style={styles.timelineTime}>{point.time}</div>
                  </div>
                )) : (<div style={{ color: '#6b7280' }}>No trend data yet. End a session to see your focus timeline.</div>)}
              </div>
              <div style={styles.timelineLegend}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendDot, ...styles.legendDotGreen}}></div>
                  <span>Focused</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendDot, ...styles.legendDotRed}}></div>
                  <span>Distracted</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendDot, ...styles.legendDotYellow}}></div>
                  <span>Break</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Powered Insights */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🤖 AI-Powered Insights</h3>
            <div style={styles.insightsGrid}>
              {insights.map((insight, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.insightCard,
                    ...(insight.type === 'success' ? styles.insightCardSuccess :
                       insight.type === 'warning' ? styles.insightCardWarning :
                       insight.type === 'info' ? styles.insightCardInfo :
                       styles.insightCardError)
                  }}
                >
                  <div style={styles.insightIcon}>{insight.icon}</div>
                  <div style={styles.insightContent}>
                    <h4 style={styles.insightTitle}>{insight.title}</h4>
                    <p style={styles.insightMessage}>{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <Link to="/dashboard" style={styles.footerLink}>
            <span>🏠</span> Back to Dashboard
          </Link>
          <Link to="/settings" style={styles.footerLink}>
            <span>⚙️</span> Settings
          </Link>
          <Link to="/help" style={styles.footerLink}>
            <span>❓</span> Help
          </Link>
        </div>
        <div style={styles.footerInfo}>
          Last updated: Dec 18, 2024 at 3:00 PM
        </div>
      </footer>
    </div>
  );
};

export default Analytics;
