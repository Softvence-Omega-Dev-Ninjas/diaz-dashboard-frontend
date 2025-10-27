 
import Navbar from '@/components/shared/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-[200px]">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout