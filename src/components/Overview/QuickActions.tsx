import { LuCircleCheckBig, LuFileText, LuPlus, LuStar } from "react-icons/lu";


const QuickActions = () => {
    return (
       <div className="w-1/3 bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-col">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <ul className="mt-5 space-y-3 border-b border-gray-200 pb-5 shrink-0">
            <li className="bg-[#006EF0] text-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#005acc] transition-colors">
                <LuPlus className="h-4 w-4 text-white" />
                <span className="">Add New Yacht</span>
            </li>
            <li className="border border-gray-200  flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <LuCircleCheckBig className="h-4 w-4" />
                <span className="">Approve Listings</span>
            </li>
            <li className="border border-gray-200  flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <LuFileText className="h-4 w-4" />
                <span className="">Manage Blog Post</span>
            </li>
            <li className="border border-gray-200  flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <LuStar className="h-4 w-4" />
                <span className="">Update Featured</span>
            </li>
          </ul>
          <div className="flex-1 flex flex-col">
            <p className="text-xs mt-5 shrink-0">System Status</p>
            <ul className="space-y-2 flex-1">
              <li className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                  <p>Website</p>
                  <span className="px-2 py-1 bg-green-300 text-green-800 rounded-lg">Online</span>
              </li>
              <li className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                  <p>Mobile App</p>
                  <span className="px-2 py-1 bg-green-300 text-green-800 rounded-lg">Synced</span>
              </li>
              <li className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                  <p>Database</p>
                  <span className="px-2 py-1 bg-green-300 text-green-800 rounded-lg">Healthy</span>
              </li>
            </ul>
          </div>
        </div>
    );
};

export default QuickActions;