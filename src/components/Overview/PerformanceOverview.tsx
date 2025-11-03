import { LuDollarSign, LuEye, LuTrendingUp, LuUsers } from 'react-icons/lu';

const PerformanceOverview = () => {
  return (
    <div className="p-5 border border-gray-200 rounded-lg bg-white mt-5">
      <h1 className="text-lg font-semibold">Performace Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5">
        <div className="flex flex-col text-center items-center justify-center gap-2 p-4 rounded-lg bg-[#EFF6FF]">
          <LuTrendingUp className="text-[#006EF0] text-3xl" />
          <p className="text-xl">24,891</p>
          <p className="text-sm">Total Visitors (Month)</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuEye className="text-[#006EF0] text-3xl" />
          <p className="text-xl">145,672</p>
          <p className="text-sm">Page Views (Month)</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuDollarSign className="text-[#006EF0] text-3xl" />
          <p className="text-xl">$2.4M</p>
          <p className="text-sm">Total Listing Value</p>
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-3 p-4 rounded-lg bg-[#EFF6FF]">
          <LuUsers className="text-[#006EF0] text-3xl" />
          <p className="text-xl">5,234</p>
          <p className="text-sm">Active App Users</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
