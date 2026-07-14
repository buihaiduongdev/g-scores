import { Menu } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onMenuToggle: () => void;
}

export function Header({ activeTab, onMenuToggle }: HeaderProps) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 z-10 sticky top-0 shrink-0">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-bold text-slate-800 capitalize">
        {activeTab.replace("-", " ")}
      </h2>

      <div className="w-10 lg:hidden" />
    </header>
  );
}
