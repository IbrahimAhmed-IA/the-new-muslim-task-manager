export type DayOfWeek = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type Priority = 'low' | 'medium' | 'high';

// Define effort weights for each priority level
export const EffortWeights: Record<Priority, number> = {
  low: 10,
  medium: 30,
  high: 60,
};

export interface Task {
  id: string;
  title: string;
  day: DayOfWeek;
  priority: Priority;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeeklyScore {
  id: string;
  weekNumber: number;
  year: number;
  completionPercentage: number;
  pomodoroCount: number;
  endDate: string; // ISO string of when the week ended
}
