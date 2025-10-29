import { LuCircleCheckBig, LuShip, LuStar, LuUserCheck } from "react-icons/lu";

const OverviewCards = () => {
    return (
       <div className="grid grid-cols-4 gap-5 py-6">
                <div className="flex items-center gap-3 justify-between bg-[#003235] text-white px-3 py-4 rounded-lg">
                    <div className="space-y-1">
                        <p className="text-xs">Total Yachts Listed</p>
                        <h1 className="text-xl">1.247</h1>
                        <p className="text-xs">+12% from last month</p>
                    </div>
                    <LuShip className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-3 justify-between bg-[#00555A] text-white px-3 py-4 rounded-lg">
                    <div className="space-y-1">
                        <p className="text-xs">Pending Approvals</p>
                        <h1 className="text-xl">23</h1>
                        <p className="text-xs">Needs attention</p>
                    </div>
                    <LuCircleCheckBig className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-3 justify-between bg-[#007B82] text-white px-3 py-4 rounded-lg">
                    <div className="space-y-1">
                        <p className="text-xs">Verified Sellers</p>
                        <h1 className="text-xl">342</h1>
                        <p className="text-xs">+8 this week</p>
                    </div>
                    <LuUserCheck className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-3 justify-between bg-[#00A3AC] text-white px-3 py-4 rounded-lg">
                    <div className="space-y-1">
                        <p className="text-xs">Featured Yachts</p>
                        <h1 className="text-xl">48</h1>
                        <p className="text-xs">Active listings</p>
                    </div>
                    <LuStar className="h-8 w-8 text-white" />
                </div>
            </div>
    );
};

export default OverviewCards;