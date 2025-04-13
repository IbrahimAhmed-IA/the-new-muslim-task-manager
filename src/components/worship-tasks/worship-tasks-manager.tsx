'use client';

import React, { useState } from 'react';
import { useTaskContext } from '@/context/task-context';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { DayOfWeek, Priority } from '@/lib/types';

// Define predefined worship tasks
const worshipTasks = [
  { id: 'fajr', title: 'Fajr Prayer', category: 'Daily Prayers' },
  { id: 'dhuhr', title: 'Dhuhr Prayer', category: 'Daily Prayers' },
  { id: 'asr', title: 'Asr Prayer', category: 'Daily Prayers' },
  { id: 'maghrib', title: 'Maghrib Prayer', category: 'Daily Prayers' },
  { id: 'isha', title: 'Isha Prayer', category: 'Daily Prayers' },
  { id: 'quran', title: 'Read Quran (1 page)', category: 'Quran Reading' },
  { id: 'quran5', title: 'Read Quran (5 pages)', category: 'Quran Reading' },
  { id: 'quran10', title: 'Read Quran (10 pages)', category: 'Quran Reading' },
  { id: 'quran-hizb', title: 'Read Quran (1 Hizb)', category: 'Quran Reading' },
  { id: 'quran-juz', title: 'Read Quran (1 Juz)', category: 'Quran Reading' },
  { id: 'morning-dhikr', title: 'Morning Adhkar', category: 'Adhkar' },
  { id: 'evening-dhikr', title: 'Evening Adhkar', category: 'Adhkar' },
  { id: 'sleep-dhikr', title: 'Sleep Adhkar', category: 'Adhkar' },
  { id: 'istighfar-100', title: 'Istighfar (100 times)', category: 'Dhikr' },
  { id: 'tasbih-100', title: 'Tasbih (100 times)', category: 'Dhikr' },
  { id: 'salawat-100', title: 'Salawat on Prophet (100 times)', category: 'Dhikr' },
  { id: 'duha-prayer', title: 'Duha Prayer', category: 'Optional Prayers' },
  { id: 'tahajjud', title: 'Tahajjud Prayer', category: 'Optional Prayers' },
  { id: 'witr', title: 'Witr Prayer', category: 'Optional Prayers' },
  { id: 'fast-monday', title: 'Fast (Monday)', category: 'Fasting' },
  { id: 'fast-thursday', title: 'Fast (Thursday)', category: 'Fasting' },
  { id: 'fast-white-days', title: 'Fast (White Days: 13, 14, 15)', category: 'Fasting' },
  { id: 'charity', title: 'Give Charity', category: 'Good Deeds' },
  { id: 'visit-sick', title: 'Visit the Sick', category: 'Good Deeds' },
  { id: 'help-someone', title: 'Help Someone in Need', category: 'Good Deeds' },
  { id: 'hadith-study', title: 'Study Hadith', category: 'Knowledge' },
  { id: 'islamic-lecture', title: 'Listen to Islamic Lecture', category: 'Knowledge' },
  { id: 'islamic-book', title: 'Read Islamic Book', category: 'Knowledge' },
];

// Group tasks by category
const groupedTasks = worshipTasks.reduce<Record<string, typeof worshipTasks>>((acc, task) => {
  if (!acc[task.category]) {
    acc[task.category] = [];
  }
  acc[task.category].push(task);
  return acc;
}, {});

export default function WorshipTasksManager() {
  const { addTask } = useTaskContext();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('saturday');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [applyToAllDays, setApplyToAllDays] = useState(false);

  const days: DayOfWeek[] = [
    'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'
  ];

  const handleTaskToggle = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, taskId]);
    } else {
      setSelectedTasks((prev) => prev.filter(id => id !== taskId));
    }
  };

  const handleAddTasks = () => {
    if (selectedTasks.length === 0) {
      toast.error('Please select at least one task');
      return;
    }

    const selectedTasksData = worshipTasks.filter(task => selectedTasks.includes(task.id));

    if (applyToAllDays) {
      // Add to all days with unique IDs for each task
      let addedCount = 0;
      days.forEach((day, dayIndex) => {
        selectedTasksData.forEach((task, taskIndex) => {
          // Create a unique ID for each task based on current time, day, and task
          const uniqueId = Date.now() + dayIndex + taskIndex;
          addTask(task.title, day, selectedPriority);
          addedCount++;
        });
      });
      toast.success(`Added ${addedCount} worship tasks to all days`);
    } else {
      // Add to selected day only
      selectedTasksData.forEach(task => {
        addTask(task.title, selectedDay, selectedPriority);
      });
      toast.success(`Added ${selectedTasksData.length} worship tasks to ${selectedDay}`);
    }

    // Clear selections
    setSelectedTasks([]);
  };

  const handleSelectAll = (category: string) => {
    const categoryTaskIds = groupedTasks[category].map(task => task.id);

    // Check if all tasks in this category are already selected
    const allSelected = categoryTaskIds.every(id => selectedTasks.includes(id));

    if (allSelected) {
      // If all are selected, deselect them
      setSelectedTasks(prev => prev.filter(id => !categoryTaskIds.includes(id)));
    } else {
      // If not all are selected, select all in this category
      const newSelected = [...selectedTasks];
      categoryTaskIds.forEach(id => {
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      });
      setSelectedTasks(newSelected);
    }
  };

  return (
    <div className="py-6 w-full">
      <header className="py-6 bg-gradient text-white text-center">
        <h1 className="text-3xl font-bold">Muslim's Worship Tasks</h1>
      </header>

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-md shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add Predefined Worship Tasks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Day</label>
              <Select
                value={selectedDay}
                onValueChange={(value: DayOfWeek) => setSelectedDay(value)}
                disabled={applyToAllDays}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day} className="capitalize">
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select
                value={selectedPriority}
                onValueChange={(value: Priority) => setSelectedPriority(value)}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low" className="capitalize">Low</SelectItem>
                  <SelectItem value="medium" className="capitalize">Medium</SelectItem>
                  <SelectItem value="high" className="capitalize">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox
              id="apply-all-days"
              checked={applyToAllDays}
              onCheckedChange={(checked) => setApplyToAllDays(checked === true)}
            />
            <label
              htmlFor="apply-all-days"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply to all days of the week
            </label>
          </div>

          <Button
            onClick={handleAddTasks}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={selectedTasks.length === 0}
          >
            Add Selected Tasks ({selectedTasks.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedTasks).map(([category, tasks]) => (
            <Card key={category} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle>{category}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white/10 border-white/30 text-white hover:text-blue-600 hover:bg-white"
                    onClick={() => handleSelectAll(category)}
                  >
                    {tasks.every(task => selectedTasks.includes(task.id)) ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                      <Checkbox
                        id={task.id}
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={(checked) => handleTaskToggle(task.id, checked === true)}
                      />
                      <label
                        htmlFor={task.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                      >
                        {task.title}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
