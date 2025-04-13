'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { DayOfWeek, Priority } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';

export default function TaskInput() {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState<string>('');
  const [day, setDay] = useState<DayOfWeek>('saturday');
  const [priority, setPriority] = useState<Priority>('low');

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title, day, priority);
      setTitle('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
        className="md:flex-1"
      />

      <select
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

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>

      <Button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Add Task
      </Button>
    </div>
  );
}
