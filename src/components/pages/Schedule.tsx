import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ScheduleEvent {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'missed';
  priority: 'high' | 'medium' | 'low';
  color: string;
  duration?: number; // in minutes
  type: 'study' | 'break' | 'exam' | 'assignment' | 'revision';
}

interface WeeklyGoal {
  subject: string;
  targetHours: number;
  completedHours: number;
  percentage: number;
  color: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  // Sample data
  const [scheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      title: 'Mathematics Study Session',
      subject: 'Mathematics - Calculus',
      chapter: 'Chapter 12: Limits and Derivatives',
      startTime: '09:00',
      endTime: '11:00',
      date: '2024-09-19',
      status: 'completed',
      priority: 'high',
      color: '#10b981',
      duration: 120,
      type: 'study'
    },
    {
      id: '2',
      title: 'Physics Practice',
      subject: 'Physics - Mechanics',
      chapter: 'Chapter 8: Rotational Motion',
      startTime: '14:30',
      endTime: '16:00',
      date: '2024-09-19',
      status: 'in-progress',
      priority: 'high',
      color: '#3b82f6',
      duration: 90,
      type: 'study'
    },
    {
      id: '3',
      title: 'Chemistry Quiz',
      subject: 'Chemistry - Organic',
      startTime: '10:00',
      endTime: '11:30',
      date: '2024-09-20',
      status: 'upcoming',
      priority: 'high',
      color: '#ef4444',
      duration: 90,
      type: 'exam'
    },
    {
      id: '4',
      title: 'Biology Assignment',
      subject: 'Biology - Cell Structure',
      startTime: '15:00',
      endTime: '17:00',
      date: '2024-09-20',
      status: 'upcoming',
      priority: 'medium',
      color: '#8b5cf6',
      duration: 120,
      type: 'assignment'
    },
    {
      id: '5',
      title: 'Break Time',
      subject: 'Rest',
      startTime: '12:00',
      endTime: '12:30',
      date: '2024-09-19',
      status: 'completed',
      priority: 'low',
      color: '#f59e0b',
      duration: 30,
      type: 'break'
    }
  ]);

  const [weeklyGoals] = useState<WeeklyGoal[]>([
    { subject: 'Mathematics', targetHours: 8, completedHours: 6.5, percentage: 81, color: '#10b981' },
    { subject: 'Physics', targetHours: 6, completedHours: 4.2, percentage: 70, color: '#3b82f6' },
    { subject: 'Chemistry', targetHours: 5, completedHours: 3.8, percentage: 76, color: '#ef4444' },
    { subject: 'Biology', targetHours: 4, completedHours: 2.1, percentage: 53, color: '#8b5cf6' }
  ]);

  // Get current week dates
  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return scheduleEvents.filter(event => event.date === dateStr);
  };

  const getTotalHoursToday = () => {
    const today = new Date();
    const todayEvents = getEventsForDate(today);
    return todayEvents.reduce((total, event) => total + (event.duration || 0), 0) / 60;
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
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: '#6b7280'
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

    headerActions: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    } as React.CSSProperties,

    viewToggle: {
      display: 'flex',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.75rem',
      padding: '0.25rem'
    } as React.CSSProperties,

    viewButton: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      background: 'transparent',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: '#6b7280'
    } as React.CSSProperties,

    viewButtonActive: {
      backgroundColor: 'white',
      color: '#6366f1',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    } as React.CSSProperties,

    addButton: {
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
      gridTemplateColumns: '300px 1fr',
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

    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    } as React.CSSProperties,

    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827',
      margin: '0'
    } as React.CSSProperties,

    todayStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1rem'
    } as React.CSSProperties,

    statCard: {
      textAlign: 'center' as const,
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.75rem'
    } as React.CSSProperties,

    statValue: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    statLabel: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    } as React.CSSProperties,

    weeklyGoals: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    } as React.CSSProperties,

    goalItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem'
    } as React.CSSProperties,

    goalInfo: {
      flex: 1
    } as React.CSSProperties,

    goalSubject: {
      fontSize: '0.925rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    goalProgress: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    } as React.CSSProperties,

    goalPercentage: {
      fontSize: '0.875rem',
      fontWeight: '700',
      color: '#10b981'
    } as React.CSSProperties,

    calendar: {
      backgroundColor: 'white',
      borderRadius: '1.5rem',
      padding: '2rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    } as React.CSSProperties,

    calendarHeader: {
      display: 'flex',
      justifyContent: 'between',
      alignItems: 'center',
      marginBottom: '2rem'
    } as React.CSSProperties,

    calendarNav: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    } as React.CSSProperties,

    navButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.25rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      color: '#6b7280'
    } as React.CSSProperties,

    monthYear: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      minWidth: '200px',
      textAlign: 'center' as const
    } as React.CSSProperties,

    weekView: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '1rem'
    } as React.CSSProperties,

    dayColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    } as React.CSSProperties,

    dayHeader: {
      textAlign: 'center' as const,
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.75rem',
      marginBottom: '0.5rem'
    } as React.CSSProperties,

    dayName: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    dayDate: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#111827'
    } as React.CSSProperties,

    dayHeaderToday: {
      backgroundColor: '#eff6ff',
      color: '#3b82f6'
    } as React.CSSProperties,

    eventsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      minHeight: '200px'
    } as React.CSSProperties,

    eventCard: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.8125rem'
    } as React.CSSProperties,

    eventTitle: {
      fontWeight: '600',
      marginBottom: '0.25rem',
      fontSize: '0.875rem'
    } as React.CSSProperties,

    eventTime: {
      color: '#6b7280',
      fontSize: '0.75rem'
    } as React.CSSProperties,

    eventStatus: {
      display: 'inline-block',
      padding: '0.125rem 0.5rem',
      borderRadius: '1rem',
      fontSize: '0.6875rem',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginTop: '0.25rem'
    } as React.CSSProperties,

    statusCompleted: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    } as React.CSSProperties,

    statusInProgress: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    } as React.CSSProperties,

    statusUpcoming: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    } as React.CSSProperties,

    statusMissed: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    } as React.CSSProperties,

    quickActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '2rem'
    } as React.CSSProperties,

    quickActionCard: {
      padding: '1.5rem',
      textAlign: 'center' as const,
      backgroundColor: '#f8fafc',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    } as React.CSSProperties,

    quickActionIcon: {
      fontSize: '2rem',
      marginBottom: '0.75rem'
    } as React.CSSProperties,

    quickActionTitle: {
      fontSize: '0.925rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    quickActionDesc: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    } as React.CSSProperties,

    upcomingEvents: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    } as React.CSSProperties,

    upcomingEventCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb'
    } as React.CSSProperties,

    eventColorBar: {
      width: '4px',
      height: '60px',
      borderRadius: '2px',
      flexShrink: 0
    } as React.CSSProperties,

    upcomingEventInfo: {
      flex: 1
    } as React.CSSProperties,

    upcomingEventTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    upcomingEventSubject: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    upcomingEventTime: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    } as React.CSSProperties,

    upcomingEventMeta: {
      textAlign: 'right' as const
    } as React.CSSProperties,

    eventDuration: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    } as React.CSSProperties,

    eventType: {
      fontSize: '0.75rem',
      color: '#6b7280',
      textTransform: 'capitalize' as const
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

  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    console.log('Selected event:', event);
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
    console.log('Add new event');
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return { ...styles.eventStatus, ...styles.statusCompleted };
      case 'in-progress':
        return { ...styles.eventStatus, ...styles.statusInProgress };
      case 'upcoming':
        return { ...styles.eventStatus, ...styles.statusUpcoming };
      case 'missed':
        return { ...styles.eventStatus, ...styles.statusMissed };
      default:
        return styles.eventStatus;
    }
  };

  const upcomingEvents = scheduleEvents
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime())
    .slice(0, 5);

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
              <h1 style={styles.headerTitle}>Study Schedule</h1>
              <p style={styles.headerSubtitle}>Manage your study sessions and track progress</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.viewToggle}>
              {['day', 'week', 'month'].map((mode) => (
                <button
                  key={mode}
                  style={{
                    ...styles.viewButton,
                    ...(viewMode === mode ? styles.viewButtonActive : {})
                  }}
                  onClick={() => setViewMode(mode as 'day' | 'week' | 'month')}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            <button style={styles.addButton} onClick={handleAddEvent}>
              <span>+</span>
              Add Session
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Today's Summary */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Today's Summary</h3>
            </div>
            <div style={styles.todayStats}>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{getEventsForDate(new Date()).length}</div>
                <div style={styles.statLabel}>Sessions</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{getTotalHoursToday().toFixed(1)}h</div>
                <div style={styles.statLabel}>Total Time</div>
              </div>
            </div>
          </div>

          {/* Weekly Goals */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Weekly Goals</h3>
            </div>
            <div style={styles.weeklyGoals}>
              {weeklyGoals.map((goal, index) => (
                <div key={index} style={styles.goalItem}>
                  <div style={styles.goalInfo}>
                    <div style={styles.goalSubject}>{goal.subject}</div>
                    <div style={styles.goalProgress}>
                      {goal.completedHours}h / {goal.targetHours}h
                    </div>
                  </div>
                  <div style={{ ...styles.goalPercentage, color: goal.color }}>
                    {goal.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Upcoming Events</h3>
            </div>
            <div style={styles.upcomingEvents}>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  style={styles.upcomingEventCard}
                  onClick={() => handleEventClick(event)}
                >
                  <div style={{ ...styles.eventColorBar, backgroundColor: event.color }} />
                  <div style={styles.upcomingEventInfo}>
                    <div style={styles.upcomingEventTitle}>{event.title}</div>
                    <div style={styles.upcomingEventSubject}>{event.subject}</div>
                    <div style={styles.upcomingEventTime}>
                      {event.date} • {event.startTime} - {event.endTime}
                    </div>
                  </div>
                  <div style={styles.upcomingEventMeta}>
                    <div style={styles.eventDuration}>{event.duration}m</div>
                    <div style={styles.eventType}>{event.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <div
              style={styles.quickActionCard}
              onClick={() => handleQuickAction('quickSession')}
            >
              <div style={styles.quickActionIcon}>⚡</div>
              <div style={styles.quickActionTitle}>Quick Session</div>
              <div style={styles.quickActionDesc}>Start a 25-min focus session</div>
            </div>
            <div
              style={styles.quickActionCard}
              onClick={() => handleQuickAction('planWeek')}
            >
              <div style={styles.quickActionIcon}>📅</div>
              <div style={styles.quickActionTitle}>Plan Week</div>
              <div style={styles.quickActionDesc}>Auto-schedule study sessions</div>
            </div>
            <div
              style={styles.quickActionCard}
              onClick={() => handleQuickAction('setReminder')}
            >
              <div style={styles.quickActionIcon}>⏰</div>
              <div style={styles.quickActionTitle}>Set Reminder</div>
              <div style={styles.quickActionDesc}>Create study notifications</div>
            </div>
          </div>

          {/* Calendar */}
          <div style={styles.calendar}>
            <div style={styles.calendarHeader}>
              <div style={styles.calendarNav}>
                <button style={styles.navButton} onClick={() => navigateWeek('prev')}>
                  ←
                </button>
                <div style={styles.monthYear}>
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button style={styles.navButton} onClick={() => navigateWeek('next')}>
                  →
                </button>
              </div>
            </div>

            {/* Week View */}
            <div style={styles.weekView}>
              {weekDates.map((date, index) => (
                <div key={index} style={styles.dayColumn}>
                  <div
                    style={{
                      ...styles.dayHeader,
                      ...(isToday(date) ? styles.dayHeaderToday : {})
                    }}
                  >
                    <div style={styles.dayName}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div style={styles.dayDate}>{date.getDate()}</div>
                  </div>
                  <div style={styles.eventsList}>
                    {getEventsForDate(date).map((event) => (
                      <div
                        key={event.id}
                        style={{
                          ...styles.eventCard,
                          backgroundColor: event.color + '15',
                          borderColor: event.color
                        }}
                        onClick={() => handleEventClick(event)}
                      >
                        <div style={{ ...styles.eventTitle, color: event.color }}>
                          {event.title}
                        </div>
                        <div style={styles.eventTime}>
                          {event.startTime} - {event.endTime}
                        </div>
                        <div style={getStatusStyle(event.status)}>
                          {event.status.replace('-', ' ')}
                        </div>
                      </div>
                    ))}
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
          <Link to="/analytics" style={styles.footerLink}>
            <span>📊</span> View Analytics
          </Link>
          <Link to="/settings" style={styles.footerLink}>
            <span>⚙️</span> Settings
          </Link>
        </div>
        <div style={styles.footerInfo}>
          Last updated: {new Date().toLocaleString()}
        </div>
      </footer>
    </div>
  );
};

export default Schedule;
