import { LuCircleCheckBig, LuShip, LuStar, LuUserCheck } from 'react-icons/lu';

const RecentActivity = () => {
  return (
    <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow flex flex-col">
      <div className="flex items-center gap-10 justify-between">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <p className="text-sm cursor-pointer hover:text-blue-600">View All</p>
      </div>
      <ul className="my-10 space-y-3 flex-1 overflow-y-auto">
        <li className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
          <div className="bg-[#006EF01A] p-3 rounded-full">
            <LuShip className="h-6 w-6 text-[#006EF0]" />
          </div>
          <div className="space-y-1">
            <p>New yacht submitted by Royal Marine</p>
            <p className="text-xs">2 minutes ago</p>
          </div>
        </li>
        <li className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
          <div className="bg-[#006EF01A] p-3 rounded-full">
            <LuUserCheck className="h-6 w-6 text-[#006EF0]" />
          </div>
          <div className="space-y-1">
            <p>Seller BlueWaveYachts verified</p>
            <p className="text-xs">16 minutes ago</p>
          </div>
        </li>
        <li className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
          <div className="bg-[#006EF01A] p-3 rounded-full">
            <LuStar className="h-6 w-6 text-[#006EF0]" />
          </div>
          <div className="space-y-1">
            <p>New app banner uploaded</p>
            <p className="text-xs">1 hour ago</p>
          </div>
        </li>
        <li className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg">
          <div className="bg-[#006EF01A] p-3 rounded-full">
            <LuCircleCheckBig className="h-6 w-6 text-[#006EF0]" />
          </div>
          <div className="space-y-1">
            <p>Listing approved: 2024 SeaVee 370z</p>
            <p className="text-xs">2 hour ago</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RecentActivity;
