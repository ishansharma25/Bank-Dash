import React from 'react';
import NavigationBar from '../Component/NavigationBar';
import OverviewNavBar from '@/Component/OverviewNavBar';
import Transfer from '@/Component/Transfer';
import Dashboard from './Dashboard';
import { useAuth } from '../Context/AuthContext';
export default function LandingPage() {

  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation sidebar */}
      <NavigationBar />
      
      {/* Main content area */}
      <div className="flex flex-col min-h-screen lg:ml-64">
        {/* Top navigation bar */}
        <OverviewNavBar />
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 mt-24 lg:mt-16">
          {/* Your page content goes here */}
          <div className="grid gap-4">
            <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>


                {/*---------------------------------------------*/}
                <div>
                  <Dashboard></Dashboard>
                </div>
        
               {/*---------------------------------------------*/}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}