'use client';

import { useTaskContext } from '@/context/task-context';
import type { DayOfWeek } from '@/lib/types';
import TaskItem from './task-item';
import { Progress } from '@/components/ui/progress';

interface TaskColumnProps {
  day: DayOfWeek;
}

export default function TaskColumn({
  day,
}: TaskColumnProps) {
  const { getTasksByDay, getDayProgress, selectedTasks, toggleSelectTask } = useTaskContext();

  const tasks = getTasksByDay(day);
  const progress = getDayProgress(day);

  // Format the day name to title case
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="day-column">
      <h3>{formatDayName(day)}</h3>

      <div className="mb-4">
        <span className="text-sm text-gray-500 mb-1 block">
          Progress: {progress}%
        </span>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center p-4">No tasks for this day</div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTasks.includes(task.id)}
              onSelect={toggleSelectTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
