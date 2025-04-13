'use client';

import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import Providers from '@/providers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// We'll move the component that uses the context inside the Providers
const MithaqContent = () => {
  // Import inside the component to avoid context issues
  const { useWeeklyScoreContext } = require('@/context/weekly-score-context');
  const { weeklyScores, checkWeekEnd, getCurrentWeekNumber, getCurrentYear } = useWeeklyScoreContext();

  React.useEffect(() => {
    checkWeekEnd();
  }, [checkWeekEnd]);

  // Sort scores by year (descending) and then by week number (descending)
  const sortedScores = [...weeklyScores].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Most recent year first
    }
    return b.weekNumber - a.weekNumber; // Most recent week first
  });

  return (
    <div className="py-6 w-full">
      <header className="py-6 bg-gradient text-white text-center">
        <h1 className="text-3xl font-bold">Mithaq Al-Tatwir</h1>
        <p className="mt-2">Weekly Progress Tracking</p>
      </header>

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-md shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Current Week</h2>
          <p className="text-lg mb-4">
            Week {getCurrentWeekNumber()} of {getCurrentYear()}
          </p>
        </div>

        {sortedScores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedScores.map((score) => (
              <Card key={score.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <CardTitle>
                    Week {score.weekNumber}, {score.year}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Task Completion</p>
                      <div className="flex items-center gap-2">
                        <Progress value={score.completionPercentage} className="h-2 flex-1" />
                        <span className="text-sm font-medium">{score.completionPercentage}%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Pomodoros Completed</p>
                      <p className="text-2xl font-bold">{score.pomodoroCount}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Ended on {new Date(score.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm p-6 text-center">
            <p className="text-lg text-gray-500">No weekly records yet. Your progress will be tracked and displayed here at the end of each week.</p>
            <p className="mt-2 text-sm text-gray-400">Weekly records are saved after Friday at 12:00 AM</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MithaqPage() {
  return (
    <Providers>
      <MainLayout>
        <MithaqContent />
      </MainLayout>
    </Providers>
  );
}
