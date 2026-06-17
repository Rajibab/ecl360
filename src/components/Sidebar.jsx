import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  BookOpen, 
  Newspaper, 
  Trophy, 
  Users, 
  Monitor, 
  CheckSquare, 
  User, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leave', label: 'Leave Management', icon: CalendarDays, badge: '3' },
    { id: 'payroll', label: 'Payroll & Documents', icon: FileText },
    { id: 'knowledge', label: 'Knowledge Center', icon: BookOpen },
    { id: 'news', label: 'News & Announcements', icon: Newspaper, badge: '5', isNew: true },
    { id: 'recognition', label: 'Recognition & Rewards', icon: Trophy },
    { id: 'directory', label: 'Employee Directory', icon: Users },
    { id: 'assets', label: 'Asset Management', icon: Monitor },
    { id: 'tasks', label: 'Task Management', icon: CheckSquare },
  ];

  const bottomNavItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <div className="logo-wrap" style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <img 
            src="/logo.png" 
            alt="ECL 360" 
            style={{ 
              height: '36px', 
              maxWidth: sidebarCollapsed ? '36px' : '200px', 
              objectFit: 'contain', 
              transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
            }} 
          />
        </div>
        <button 
          className="sidebar-toggle-btn" 
          id="sidebarToggleBtn" 
          aria-label="Toggle Sidebar"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="icon-sm" />
          ) : (
            <PanelLeftClose className="icon-sm" />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id} className={`nav-item ${isActive ? 'active' : ''}`}>
                <a 
                  href={`#${item.id}`} 
                  className="nav-link" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                    if (setMobileOpen) setMobileOpen(false);
                  }}
                >
                  <span className="nav-icon"><Icon className="icon-sm" /></span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.isNew ? 'new' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            );
          })}

          <li className="nav-divider"></li>

          {bottomNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id} className={`nav-item ${isActive ? 'active' : ''}`}>
                <a 
                  href={`#${item.id}`} 
                  className="nav-link" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.id);
                    if (setMobileOpen) setMobileOpen(false);
                  }}
                >
                  <span className="nav-icon"><Icon className="icon-sm" /></span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer - User mini profile */}
      <div className="sidebar-footer">
        <div className="user-mini" onClick={() => setCurrentPage('profile')}>
          <div className="user-avatar-sm">JD</div>
          <div className="user-mini-info">
            <span className="user-mini-name">John Doe</span>
            <span className="user-mini-role">Senior Engineer</span>
          </div>
          <button className="user-mini-action" aria-label="Logout" onClick={(e) => e.stopPropagation()}>
            <LogOut className="icon-xs" />
          </button>
        </div>
      </div>
    </aside>
  );
}
