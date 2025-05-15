'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

// Icons
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
  loading?: boolean;
}

const StatCard = ({ title, value, icon: Icon, trend, change, loading = false }: StatCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M12 7a1 1 0 01-.707-1.707L16.586 1H12a1 1 0 110-2h7a1 1 0 011 1v7a1 1 0 11-2 0V3.414l-5.293 5.293A1 1 0 0112 7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    down: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M12 13a1 1 0 01-.707.293L12 15.586V13zm0-12a1 1 0 00-1-1H4a1 1 0 00-1 1v7a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414L5.414 4H11a1 1 0 001-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    neutral: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  if (loading) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${trendColors[trend]}`}>
                    {trendIcons[trend]}
                    <span className="sr-only">
                      {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'No change'} by
                    </span>
                    {change}
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};



interface StatItem {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  { 
    name: 'Total Users', 
    value: '2,345', 
    change: '+12%', 
    changeType: 'increase',
    icon: UsersIcon 
  },
  { 
    name: 'Total Posts', 
    value: '1,234', 
    change: '+5.4%', 
    changeType: 'increase',
    icon: DocumentTextIcon
  },
  { 
    name: 'Active Sessions', 
    value: '573', 
    change: '-3.2%', 
    changeType: 'decrease',
    icon: UserGroupIcon
  },
  { 
    name: 'Avg. Engagement', 
    value: '42.8%', 
    change: '+2.1%', 
    changeType: 'increase',
    icon: ChartBarIcon
  },
];

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statsData, setStatsData] = useState<StatItem[]>(stats);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  // Simulate data fetching
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }

    if (status === 'authenticated') {
      // Simulate API call
      const timer = setTimeout(() => {
        setStatsData([
          { ...stats[0], value: '2,789' },
          { ...stats[1], value: '1,542' },
          { ...stats[2], value: '623' },
          { ...stats[3], value: '45.2%' },
        ]);

        const mockActivities: ActivityItem[] = [
          { 
            id: 1, 
            user: session.user?.name || 'Admin User', 
            action: 'logged in to the dashboard', 
            time: formatTimeAgo(new Date()),
            avatar: session.user?.name?.charAt(0).toUpperCase() || 'A'
          },
          { 
            id: 2, 
            user: 'John Doe', 
            action: 'created a new post', 
            time: formatTimeAgo(new Date(Date.now() - 1000 * 60 * 5)), // 5 minutes ago
            avatar: 'JD' 
          },
          { 
            id: 3, 
            user: 'Jane Smith', 
            action: 'updated user settings', 
            time: formatTimeAgo(new Date(Date.now() - 1000 * 60 * 60)), // 1 hour ago
            avatar: 'JS' 
          },
          { 
            id: 4, 
            user: 'Bob Johnson', 
            action: 'deleted a comment', 
            time: formatTimeAgo(new Date(Date.now() - 1000 * 60 * 60 * 3)), // 3 hours ago
            avatar: 'BJ' 
          },
        ];

        setRecentActivity(mockActivities);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status, router, session]);

  if (status === 'loading' || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  const welcomeMessage = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {welcomeMessage}, {session.user?.name?.split(' ')[0] || 'Admin'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your site today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            trend={stat.changeType === 'increase' ? 'up' : 'down'}
            change={stat.change}
            loading={isLoading}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </button>
          </div>
          
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <div className="animate-pulse h-10 w-10 rounded-full bg-gray-200 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivity.length - 1 && (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-start space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">
                              {activity.avatar}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">
                                {activity.user}
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              {activity.action}
                            </p>
                          </div>
                          <div className="mt-2 text-sm text-gray-500 flex items-center">
                            <ClockIcon className="mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                            <time dateTime={new Date().toISOString()}>
                              {activity.time}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}