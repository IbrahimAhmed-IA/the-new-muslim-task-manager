'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import type { Task } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditTaskModal from './modals/edit-task-modal';
import { EffortWeights } from '@/lib/types';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: (taskId: string, selected: boolean) => void;
}

export default function TaskItem({ task, isSelected, onSelect }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskContext();
  const [showEditModal, setShowEditModal] = useState(false);

  const priorityClass = `task-${task.priority}`;

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleSelectChange = (checked: boolean) => {
    onSelect(task.id, checked);
  };

  return (
    <>
      <div className={`task-item ${priorityClass}`}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleSelectChange}
          className="mr-1"
          aria-label="Select task for batch actions"
        />

        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          id={`task-${task.id}`}
        />

        <label
          htmlFor={`task-${task.id}`}
          className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
        >
          <span className="flex items-center gap-2">
            {task.title}
            <span className="text-xs text-gray-500 capitalize">
              {task.priority}
            </span>
          </span>
        </label>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditModal(true)}
            className="p-1 h-auto"
          >
            <FaEdit className="text-blue-500" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1 h-auto"
          >
            <FaTrash className="text-red-500" />
          </Button>
        </div>
      </div>

      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
      />
    </>
  );
}
