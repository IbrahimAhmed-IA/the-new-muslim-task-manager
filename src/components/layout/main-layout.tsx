import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaList, FaClock, FaStickyNote, FaPray, FaChartLine } from 'react-icons/fa';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col items-center py-4">
        <Link href="/">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Task Manager"
          >
            <FaList size={24} />
          </button>
        </Link>

        <Link href="/pomodoro">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/pomodoro' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Pomodoro Timer"
          >
            <FaClock size={24} />
          </button>
        </Link>

        <Link href="/worship-tasks">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/worship-tasks' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Muslim's Worship Tasks"
          >
            <FaPray size={24} />
          </button>
        </Link>

        <Link href="/notes">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/notes' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Notes"
          >
            <FaStickyNote size={24} />
          </button>
        </Link>

        <Link href="/mithaq">
          <button
            className={`sidebar-btn w-12 h-12 rounded-md mb-4 flex items-center justify-center text-white ${
              pathname === '/mithaq' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            aria-label="Mithaq Al-Tatwir"
          >
            <FaChartLine size={24} />
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
