import {
  LayoutDashboard,
  Search,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronRight,
  X,
} from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "search", label: "Search Scores", icon: Search },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}: SidebarProps) {
  const handleSelect = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-72 bg-[#0B1120] text-white flex flex-col z-40 shadow-2xl shrink-0 transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="absolute top-0 left-0 w-full h-64 bg-indigo-500/10 blur-[80px] pointer-events-none"></div>

        <div className="h-20 flex items-center justify-between px-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-tr from-indigo-500 to-cyan-400 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
              G-Scores
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-8 px-4 overflow-y-auto relative z-10">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">
            Main Menu
          </h2>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item.id)}
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                      isActive
                        ? "bg-indigo-500/10 text-indigo-400 font-semibold"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={clsx(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-indigo-400"
                            : "text-slate-500 group-hover:text-slate-300",
                        )}
                      />
                      {item.label}
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-indigo-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
