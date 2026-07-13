interface HeaderProps {
  activeTab: string;
}

export function Header({ activeTab }: HeaderProps) {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0 shrink-0">
      <h2 className="text-xl font-bold text-slate-800 capitalize">
        {activeTab.replace("-", " ")}
      </h2>
    </header>
  );
}
