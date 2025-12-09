import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Overview from './pages/Overview';
import ListingManagement from './pages/ListingManagement';
import SellerManagement from './pages/SellerManagement';
import FeaturedAndHomeManagement from './pages/Featured&HomeManagement';
import ContentManagement from './pages/ContentManagement';
import UsersAndPermission from './pages/UsersAndPermission';
import AnalyticsAndReports from './pages/AnalyticsAndReports';
import Settings from './pages/Settings';
import AddListing from './pages/AddListing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: '/overview',
        element: <Overview />,
      },
      {
        path: '/listings',
        element: <ListingManagement />,
      },
      {
        path: '/listings/add',
        element: <AddListing />,
      },
      {
        path: '/sellers',
        element: <SellerManagement />,
      },
      {
        path: '/featured',
        element: <FeaturedAndHomeManagement />,
      },
      {
        path: '/content',
        element: <ContentManagement />,
      },
      {
        path: '/users',
        element: <UsersAndPermission />,
      },
      {
        path: '/analytics',
        element: <AnalyticsAndReports />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);

export default router;
