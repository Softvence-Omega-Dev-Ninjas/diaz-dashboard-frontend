 
import Navbar from '@/components/shared/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 lg:ml-[280px] xl:ml-80 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout