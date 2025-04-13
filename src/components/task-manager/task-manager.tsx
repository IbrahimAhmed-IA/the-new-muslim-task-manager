'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TaskColumn from './task-column';
import TaskInput from './task-input';
import { useTaskContext } from '@/context/task-context';
import type { DayOfWeek } from '@/lib/types';
import CopyTaskModal from './modals/copy-task-modal';
import AzanTimes from '@/components/azan/azan-times';

export default function TaskManager() {
  const {
    getOverallProgress,
    uncheckAllTasks,
    sortTasks,
    selectedTasks,
    setSelectedTasks
  } = useTaskContext();

  const [showCopyModal, setShowCopyModal] = useState(false);

  const progressPercentage = getOverallProgress();

  const handleCopyTasks = () => {
    if (selectedTasks.length === 0) return;
    setShowCopyModal(true);
  };

  const handleCopyModalClose = () => {
    setShowCopyModal(false);
  };

  const handleUncheckAllTasks = () => {
    uncheckAllTasks();
  };

  const days: DayOfWeek[] = [
    'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'
  ];

  return (
    <div className="task-manager w-full">
      {/* Header */}
      <header className="py-6 bg-gradient text-white text-center">
        <h1 className="text-3xl font-bold">Muslim Task Manager</h1>
        <AzanTimes />
      </header>

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* Progress Overview */}
        <div className="bg-white rounded-md shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <span id="progressPercentage" className="text-lg font-medium mb-2 sm:mb-0">
              {progressPercentage}% Complete
            </span>

            <Progress
              value={progressPercentage}
              className="h-2 w-full sm:w-4/5"
            />
          </div>

          {/* Task Input Form */}
          <TaskInput />

          {/* Task Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <Button
              onClick={handleCopyTasks}
              disabled={selectedTasks.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Copy Selected Tasks
            </Button>

            <Button
              onClick={handleUncheckAllTasks}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Uncheck All Tasks
            </Button>

            <Button
              onClick={sortTasks}
              className="sm:col-span-2 bg-blue-500 hover:bg-blue-600"
            >
              Sort Tasks
            </Button>
          </div>
        </div>

        {/* Day Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {days.map((day) => (
            <TaskColumn
              key={day}
              day={day}
            />
          ))}
        </div>
      </div>

      {/* Copy Task Modal */}
      <CopyTaskModal
        isOpen={showCopyModal}
        onClose={handleCopyModalClose}
        taskIds={selectedTasks}
        onTasksCopied={() => {
          setSelectedTasks([]);
          setShowCopyModal(false);
        }}
      />
    </div>
  );
}
