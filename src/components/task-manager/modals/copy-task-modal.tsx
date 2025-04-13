'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { DayOfWeek } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';

interface CopyTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskIds: string[];
  onTasksCopied: () => void;
}

export default function CopyTaskModal({
  isOpen,
  onClose,
  taskIds,
  onTasksCopied,
}: CopyTaskModalProps) {
  const { copyTasks } = useTaskContext();
  const [destination, setDestination] = useState<DayOfWeek>('saturday');

  const handleCopy = () => {
    if (taskIds.length === 0) return;

    copyTasks(taskIds, destination);
    onTasksCopied();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy Tasks To</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="copy-destination" className="text-sm font-medium">
              Destination Day
            </label>
            <select
              id="copy-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value as DayOfWeek)}
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCopy}>
            Copy Tasks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
