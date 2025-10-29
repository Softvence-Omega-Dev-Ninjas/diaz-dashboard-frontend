import { useState } from 'react';

const Notifications = () => {
    const [newListingNotif, setNewListingNotif] = useState(true);
    const [newSellerNotif, setNewSellerNotif] = useState(true);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Email Notifications</h2>
            
            <div className="space-y-4 md:space-y-6">
                {/* New Listing Submitted */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">New Listing Submitted</h3>
                        <p className="text-sm text-gray-500 mt-1">Notify when sellers submit new listings</p>
                    </div>
                    <button
                        onClick={() => setNewListingNotif(!newListingNotif)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            newListingNotif ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                newListingNotif ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* New Seller Registration */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">New Seller Registration</h3>
                        <p className="text-sm text-gray-500 mt-1">Notify when new sellers register</p>
                    </div>
                    <button
                        onClick={() => setNewSellerNotif(!newSellerNotif)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            newSellerNotif ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                newSellerNotif ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notifications;