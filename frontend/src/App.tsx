import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SearchScores } from './pages/SearchScores';
import { Reports } from './pages/Reports';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden text-slate-800">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        <Header activeTab={activeTab} onMenuToggle={() => setSidebarOpen(true)} />

        {/* Scrollable Content Area */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {activeTab === 'search' && <SearchScores />}

            {activeTab === 'reports' && <Reports />}

            {activeTab === 'dashboard' && <Dashboard />}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h3 className="text-2xl font-extrabold text-slate-900 capitalize mb-4">Settings</h3>
                <p className="text-slate-500">This module is currently under development.</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
