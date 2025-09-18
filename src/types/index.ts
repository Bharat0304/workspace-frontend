export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    plan: 'free' | 'pro' | 'premium';
  }
  
  export interface Session {
    id: string;
    subject: string;
    chapter: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    focusScore: number;
    distractions: number;
    productivity: string;
  }
  
  export interface Analytics {
    focusTime: string;
    weeklyAvgFocus: number;
    goalsCompleted: number;
    dayStreak: number;
    distractionBreakdown: DistractionData[];
  }
  
  export interface DistractionData {
    app: string;
    time: number;
    instances: number;
  }
  
  export interface Schedule {
    id: string;
    subject: string;
    chapter: string;
    startTime: string;
    endTime: string;
    status: 'upcoming' | 'in-progress' | 'completed';
  }
  