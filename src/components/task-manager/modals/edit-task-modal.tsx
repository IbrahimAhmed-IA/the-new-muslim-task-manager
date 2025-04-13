'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Task, DayOfWeek, Priority } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
}: EditTaskModalProps) {
  const { editTask } = useTaskContext();

  const [title, setTitle] = useState<string>(task.title);
  const [day, setDay] = useState<DayOfWeek>(task.day);
  const [priority, setPriority] = useState<Priority>(task.priority);

  // Reset form when task changes
  useEffect(() => {
    setTitle(task.title);
    setDay(task.day);
    setPriority(task.priority);
  }, [task]);

  const handleSubmit = () => {
    editTask(task.id, {
      title,
      day,
      priority,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="edit-task-title" className="text-sm font-medium">
              Task Title
            </label>
            <Input
              id="edit-task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="edit-task-day" className="text-sm font-medium">
              Day
            </label>
            <select
              id="edit-task-day"
              value={day}
              onChange={(e) => setDay(e.target.value as DayOfWeek)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="edit-task-priority" className="text-sm font-medium">
              Priority
            </label>
            <select
              id="edit-task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
