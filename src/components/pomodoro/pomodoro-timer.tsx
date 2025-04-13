'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FaPlay, FaPause, FaRedo, FaForward, FaCog } from 'react-icons/fa';
import { usePomodoroContext } from '@/context/pomodoro-context';
import PomodoroSettings from './pomodoro-settings';

export default function PomodoroTimer() {
  const {
    isRunning,
    timerType,
    timeLeft,
    completedPomodoros,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    changeTimerType,
    pomodoroCount
  } = usePomodoroContext();

  const [showSettings, setShowSettings] = useState(false);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let totalTime = 0;

    switch (timerType) {
      case 'work':
        totalTime = settings.workDuration * 60;
        break;
      case 'shortBreak':
        totalTime = settings.shortBreakDuration * 60;
        break;
      case 'longBreak':
        totalTime = settings.longBreakDuration * 60;
        break;
    }

    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Get timer title based on type
  const getTimerTitle = () => {
    switch (timerType) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  // Get background color based on timer type
  const getTimerColor = () => {
    switch (timerType) {
      case 'work':
        return 'bg-gradient-to-r from-purple-600 to-blue-600';
      case 'shortBreak':
        return 'bg-gradient-to-r from-green-500 to-teal-400';
      case 'longBreak':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    }
  };

  return (
    <div className="py-6 w-full">
      <header className="py-6 bg-gradient text-white text-center">
        <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          {/* Timer Type Selector */}
          <div className="grid grid-cols-3 gap-2 w-full mb-6">
            <Button
              onClick={() => changeTimerType('work')}
              variant={timerType === 'work' ? 'default' : 'outline'}
              className={timerType === 'work' ? 'bg-purple-600' : ''}
            >
              Focus
            </Button>
            <Button
              onClick={() => changeTimerType('shortBreak')}
              variant={timerType === 'shortBreak' ? 'default' : 'outline'}
              className={timerType === 'shortBreak' ? 'bg-green-500' : ''}
            >
              Short Break
            </Button>
            <Button
              onClick={() => changeTimerType('longBreak')}
              variant={timerType === 'longBreak' ? 'default' : 'outline'}
              className={timerType === 'longBreak' ? 'bg-blue-500' : ''}
            >
              Long Break
            </Button>
          </div>

          {/* Timer Card */}
          <Card className="w-full">
            <CardHeader className={`text-white ${getTimerColor()}`}>
              <CardTitle className="text-center">{getTimerTitle()}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-6xl font-bold mb-6">{formatTime(timeLeft)}</h2>

                <Progress value={calculateProgress()} className="h-2 mb-6" />

                <div className="flex justify-center gap-4 mb-6">
                  {isRunning ? (
                    <Button onClick={pauseTimer} size="lg" className="bg-purple-600">
                      <FaPause className="mr-2" /> Pause
                    </Button>
                  ) : (
                    <Button onClick={startTimer} size="lg" className="bg-purple-600">
                      <FaPlay className="mr-2" /> Start
                    </Button>
                  )}

                  <Button onClick={resetTimer} variant="outline" size="icon">
                    <FaRedo />
                  </Button>

                  <Button onClick={skipTimer} variant="outline" size="icon">
                    <FaForward />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">
                    {completedPomodoros} pomodoro{completedPomodoros !== 1 && 's'} completed in this session
                  </p>

                  <p className="text-gray-600 font-semibold">
                    {pomodoroCount} pomodoro{pomodoroCount !== 1 && 's'} completed this week
                  </p>
                </div>

                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  variant="ghost"
                  className="mt-4"
                >
                  <FaCog className="mr-2" /> Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          {showSettings && <PomodoroSettings onClose={() => setShowSettings(false)} />}
        </div>
      </div>
    </div>
  );
}
