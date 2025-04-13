import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { type Task, type DayOfWeek, type Priority, EffortWeights } from '@/lib/types';
import { getTasks, saveTasks } from '@/lib/storage';
import { toast } from 'sonner';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, day: DayOfWeek, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
  copyTasks: (taskIds: string[], targetDay: DayOfWeek) => void;
  uncheckAllTasks: () => void;
  sortTasks: () => void;
  getTasksByDay: (day: DayOfWeek) => Task[];
  getDayProgress: (day: DayOfWeek) => number;
  getOverallProgress: () => number;
  selectedTasks: string[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  toggleSelectTask: (taskId: string, selected: boolean) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, day: DayOfWeek, priority: Priority) => {
    if (!title.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: title.trim(),
      day,
      priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success('Task added successfully');
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success('Task deleted');
  };

  const editTask = (id: string, updates: Partial<Omit<Task, 'id'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    toast.success('Task updated');
  };

  const copyTasks = (taskIds: string[], targetDay: DayOfWeek) => {
    const tasksToCopy = tasks.filter((task) => taskIds.includes(task.id));

    const newTasks = tasksToCopy.map((task) => ({
      ...task,
      id: Date.now() + Math.random().toString(),
      day: targetDay,
    }));

    setTasks((prevTasks) => [...prevTasks, ...newTasks]);
    toast.success(`${newTasks.length} task(s) copied to ${targetDay}`);
  };

  const uncheckAllTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: false }))
    );
    toast.success('All tasks unchecked');
  };

  const sortTasks = () => {
    setTasks((prevTasks) => {
      const priorityOrder: Record<Priority, number> = {
        high: 1,
        medium: 2,
        low: 3,
      };

      return [...prevTasks].sort((a, b) => {
        // First sort by priority
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // Then by completion status (incomplete first)
        if (a.completed !== b.completed) return a.completed ? 1 : -1;

        // Finally by title
        return a.title.localeCompare(b.title);
      });
    });

    toast.success('Tasks sorted by priority');
  };

  const getTasksByDay = (day: DayOfWeek): Task[] => {
    return tasks.filter((task) => task.day === day);
  };

  // Calculate progress based on weighted effort
  const getDayProgress = (day: DayOfWeek): number => {
    const dayTasks = getTasksByDay(day);
    if (dayTasks.length === 0) return 100;

    // Calculate weighted totals
    let totalWeight = 0;
    let completedWeight = 0;

    for (const task of dayTasks) {
      const taskWeight = EffortWeights[task.priority];
      totalWeight += taskWeight;

      if (task.completed) {
        completedWeight += taskWeight;
      }
    }

    return Math.round((completedWeight / totalWeight) * 100);
  };

  const getOverallProgress = (): number => {
    if (tasks.length === 0) return 100;

    // Calculate weighted totals for all tasks
    let totalWeight = 0;
    let completedWeight = 0;

    for (const task of tasks) {
      const taskWeight = EffortWeights[task.priority];
      totalWeight += taskWeight;

      if (task.completed) {
        completedWeight += taskWeight;
      }
    }

    return Math.round((completedWeight / totalWeight) * 100);
  };

  const toggleSelectTask = (taskId: string, selected: boolean) => {
    setSelectedTasks((prev) =>
      selected
        ? [...prev, taskId]
        : prev.filter((id) => id !== taskId)
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        copyTasks,
        uncheckAllTasks,
        sortTasks,
        getTasksByDay,
        getDayProgress,
        getOverallProgress,
        selectedTasks,
        setSelectedTasks,
        toggleSelectTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
