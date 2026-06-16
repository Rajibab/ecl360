import { useState, useEffect, useCallback } from 'react';

// Common Infrastructure Components
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import ToastContainer from './components/ToastContainer';

// Page Components
import Dashboard from './pages/Dashboard';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import KnowledgeCenter from './pages/KnowledgeCenter';
import News from './pages/News';
import Recognition from './pages/Recognition';
import Directory from './pages/Directory';
import AssetManagement from './pages/AssetManagement';
import TaskManagement from './pages/TaskManagement';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('ecl360-theme') || 'light';
    return savedTheme === 'dark';
  });
  const [toasts, setToasts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Global shared state variables
  const [userPointsBalance, setUserPointsBalance] = useState(2450);
  const [activeAssetRequestCount, setActiveAssetRequestCount] = useState(1);

  // Shared task database (starts with 7 items)
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Review Q2 Production Report', assignee: 'Amit Kumar', priority: 'medium', dueDate: 'Jun 20', status: 'todo', progress: 0, attachments: 2 },
    { id: 't2', title: 'Update Safety SOP v3.3', assignee: 'Vikram Malhotra', priority: 'high', dueDate: 'Jun 18', status: 'todo', progress: 0, attachments: 1 },
    { id: 't3', title: 'Calibrate Extruder Line A', assignee: 'Priya Sharma', priority: 'high', dueDate: 'Jun 16 (Overdue)', status: 'inprogress', progress: 60, attachments: 4 },
    { id: 't4', title: 'Team Safety Training Session', assignee: 'John Doe (You)', priority: 'medium', dueDate: 'Jun 19', status: 'inprogress', progress: 40, attachments: 3 },
    { id: 't5', title: 'Warehouse Ventilation Upgrade', assignee: 'Sunita Rao', priority: 'high', dueDate: 'Jul 05', status: 'onhold', progress: 15, holdReason: 'Awaiting budget approval', attachments: 0 },
    { id: 't6', title: 'Monthly Safety Inventory Audit', assignee: 'John Doe (You)', priority: 'done', dueDate: 'Closed Jun 12', status: 'completed', progress: 100, attachments: 0 },
    { id: 't7', title: 'Submit Leave Request', assignee: 'John Doe (You)', priority: 'done', dueDate: 'Closed Jun 10', status: 'completed', progress: 100, attachments: 0 },
  ]);

  // Shared leave history log
  const [leaveHistory, setLeaveHistory] = useState([
    { id: 'L1', type: 'Casual Leave', dates: 'May 20 to May 21, 2025', days: '2 Days', reason: 'Personal work at home', status: 'Approved' },
    { id: 'L2', type: 'Sick Leave', dates: 'Apr 10 to Apr 10, 2025', days: '1 Day', reason: 'Fever and cold', status: 'Approved' },
    { id: 'L3', type: 'Earned Leave', dates: 'Jun 16 to Jun 17, 2025', days: '2 Days', reason: 'Family vacation trip', status: 'Pending' },
    { id: 'L4', type: 'Casual Leave', dates: 'Mar 05 to Mar 05, 2025', days: '1 Day', reason: 'Urgent banking work', status: 'Rejected' },
    { id: 'L5', type: 'Sick Leave', dates: 'Feb 14 to Feb 15, 2025', days: '2 Days', reason: 'Dental appointment check', status: 'Approved' }
  ]);

  // Toast helpers
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((type, title, message) => {
    const id = Date.now();
    const newToast = { id, type, title, message };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ecl360-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Initial theme loader
  useEffect(() => {
    // Welcome toast
    const timer = setTimeout(() => {
      showToast('success', 'Welcome back, John!', 'Your dashboard is up to date.');
    }, 100);
    return () => clearTimeout(timer);
  }, [showToast]);

  // Global search shortcut (Ctrl + K)
  useEffect(() => {
    const handleSearchKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    };
    window.addEventListener('keydown', handleSearchKey);
    return () => window.removeEventListener('keydown', handleSearchKey);
  }, []);

  // Switch page conditional renderer
  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            showToast={showToast} 
            tasks={tasks} 
            leaveHistory={leaveHistory} 
          />
        );
      case 'leave':
        return (
          <LeaveManagement 
            leaveHistory={leaveHistory} 
            setLeaveHistory={setLeaveHistory} 
            showToast={showToast} 
          />
        );
      case 'payroll':
        return <Payroll showToast={showToast} />;
      case 'knowledge':
        return <KnowledgeCenter showToast={showToast} />;
      case 'news':
        return <News showToast={showToast} />;
      case 'recognition':
        return (
          <Recognition 
            userPointsBalance={userPointsBalance} 
            setUserPointsBalance={setUserPointsBalance} 
            showToast={showToast} 
          />
        );
      case 'directory':
        return <Directory showToast={showToast} />;
      case 'assets':
        return (
          <AssetManagement 
            activeAssetRequestCount={activeAssetRequestCount} 
            setActiveAssetRequestCount={setActiveAssetRequestCount} 
            showToast={showToast} 
          />
        );
      case 'tasks':
        return (
          <TaskManagement 
            tasks={tasks} 
            setTasks={setTasks} 
            showToast={showToast} 
          />
        );
      case 'profile':
        return (
          <Profile 
            tasks={tasks}
            leaveHistory={leaveHistory}
            userPointsBalance={userPointsBalance}
            activeAssetRequestCount={activeAssetRequestCount}
          />
        );
      case 'settings':
        return (
          <Settings 
            showToast={showToast} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
        );
      default:
        return <div style={{ padding: '2rem' }}>Page under construction.</div>;
    }
  };

  return (
    <>
      {/*Collapsible Left Sidebar Menu */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        sidebarCollapsed={sidebarCollapsed} 
        setSidebarCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Wrapper with Sticky Headers and Page Contents */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} id="mainWrapper">
        <TopHeader 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          setCurrentPage={setCurrentPage} 
          showToast={showToast}
          setMobileOpen={setMobileOpen}
        />
        
        {/* Dynamic Inner Page Wrapper Container */}
        <main className="page-content" id="pageContent">
          {renderActivePage()}
        </main>
      </div>

      {/* Global mobile sidebar backdrop overlay */}
      <div 
        className={`mobile-overlay ${mobileOpen ? '' : 'hidden'}`} 
        id="mobileOverlay" 
        onClick={() => setMobileOpen(false)}
        style={{ zIndex: 90 }}
      ></div>

      {/* Action Notification Toasts container list */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
