import OverviewCards from '@/components/Overview/OverviewCards';
import PerformanceOverview from '@/components/Overview/PerformanceOverview';
import QuickActions from '@/components/Overview/QuickActions';
import RecentActivity from '@/components/Overview/RecentActivity';

const Overview = () => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
      <p className="text-sm text-[#4A5565] mt-2">
        Welcome back! Here's what's happening today
      </p>
      <OverviewCards />
      <div className="flex flex-col items-center md:flex-row md:items-stretch gap-5 flex-1 min-h-0">
        <RecentActivity />
        <QuickActions />
      </div>
      <PerformanceOverview />
    </div>
  );
};

export default Overview;
