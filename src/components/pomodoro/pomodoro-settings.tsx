'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { usePomodoroContext } from '@/context/pomodoro-context';

interface PomodoroSettingsProps {
  onClose: () => void;
}

export default function PomodoroSettings({ onClose }: PomodoroSettingsProps) {
  const { settings, updateSettings } = usePomodoroContext();

  const [workDuration, setWorkDuration] = useState(settings.workDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval);
  const [autoStartBreaks, setAutoStartBreaks] = useState(settings.autoStartBreaks);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(settings.autoStartPomodoros);

  const handleSubmit = () => {
    updateSettings({
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      longBreakInterval,
      autoStartBreaks,
      autoStartPomodoros,
    });

    onClose();
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Timer Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="work-duration" className="text-sm font-medium">
              Focus Duration (minutes)
            </label>
            <Input
              id="work-duration"
              type="number"
              min={1}
              max={60}
              value={workDuration}
              onChange={(e) => setWorkDuration(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="short-break-duration" className="text-sm font-medium">
              Short Break Duration (minutes)
            </label>
            <Input
              id="short-break-duration"
              type="number"
              min={1}
              max={30}
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="long-break-duration" className="text-sm font-medium">
              Long Break Duration (minutes)
            </label>
            <Input
              id="long-break-duration"
              type="number"
              min={1}
              max={60}
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="long-break-interval" className="text-sm font-medium">
              Long Break Interval (pomodoros)
            </label>
            <Input
              id="long-break-interval"
              type="number"
              min={1}
              max={10}
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number.parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-start-breaks"
              checked={autoStartBreaks}
              onCheckedChange={(checked) => setAutoStartBreaks(!!checked)}
            />
            <label
              htmlFor="auto-start-breaks"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto-start breaks
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-start-pomodoros"
              checked={autoStartPomodoros}
              onCheckedChange={(checked) => setAutoStartPomodoros(!!checked)}
            />
            <label
              htmlFor="auto-start-pomodoros"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto-start pomodoros
            </label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
