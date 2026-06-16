import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Bell, MessageSquare, Menu, ChevronDown } from 'lucide-react';

export default function TopHeader({ 
  darkMode, 
  setDarkMode, 
  setCurrentPage, 
  showToast,
  setMobileOpen
}) {
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const messagesRef = useRef(null);
  const notificationsRef = useRef(null);

  const [msgList, setMsgList] = useState([
    { id: 1, sender: 'Priya Rao', text: 'Hey, did you review the plant upgrade safety specs?', time: '10m ago', initials: 'PR', color: 'linear-gradient(135deg, #10B981, #059669)', unread: true },
    { id: 2, sender: 'Amit Kumar', text: 'Task completed: Q2 maintenance check report uploaded.', time: '2h ago', initials: 'AK', color: 'linear-gradient(135deg, #1E40AF, #4F46E5)', unread: true },
    { id: 3, sender: 'Meena Nair', text: 'Annual performance evaluation cycles start next week.', time: '1d ago', initials: 'MN', color: 'linear-gradient(135deg, #EA580C, #F97316)', unread: false }
  ]);

  const [notifList, setNotifList] = useState([
    { id: 1, title: 'Leave Approved', desc: 'Your sick leave request for June 18 has been approved.', time: '1h ago', unread: true },
    { id: 2, title: 'New Task Assigned', desc: 'Amit Kumar assigned you "Review Safety Standard SOP".', time: '3h ago', unread: true },
    { id: 3, title: 'Recognition Received', desc: 'Priya Rao nominated you for the "Safety Champion" award.', time: '1d ago', unread: true },
    { id: 4, title: 'System Notice', desc: 'Weekly server maintenance scheduled for Sunday 2:00 AM.', time: '2d ago', unread: false }
  ]);

  const unreadMessagesCount = msgList.filter(m => m.unread).length;
  const unreadNotificationsCount = notifList.filter(n => n.unread).length;

  const handleMarkAllMessagesRead = (e) => {
    e.stopPropagation();
    setMsgList(msgList.map(m => ({ ...m, unread: false })));
    showToast('success', 'Messages', 'All messages marked as read.');
  };

  const handleMarkAllNotificationsRead = (e) => {
    e.stopPropagation();
    setNotifList(notifList.map(n => ({ ...n, unread: false })));
    showToast('success', 'Notifications', 'All notifications marked as read.');
  };

  const handleMessageClick = (msg) => {
    setMsgList(msgList.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    showToast('info', `Message from ${msg.sender}`, msg.text);
    setShowMessages(false);
  };

  const handleNotificationClick = (notif) => {
    setNotifList(notifList.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    showToast('info', notif.title, notif.desc);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGlobalSearch = (e) => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) {
        showToast('info', 'Global Search', `Searching for "${q}" across the platform...`);
        e.target.value = '';
      }
    }
  };

  return (
    <header className="top-header" id="topHeader">
      <div className="header-left">
        <button 
          className="mobile-menu-btn" 
          id="mobileMenuBtn" 
          onClick={() => setMobileOpen(true)}
          aria-label="Open Mobile Menu"
          style={{ display: 'flex' }}
        >
          <Menu className="icon-sm" />
        </button>
        <div className="search-wrap">
          <Search className="search-icon icon-sm" />
          <input 
            type="text" 
            placeholder="Search documents, employees, announcements..." 
            id="globalSearch" 
            className="search-input"
            onKeyDown={handleGlobalSearch}
            aria-label="Global search"
          />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      <div className="header-right">
        <button 
          className="header-btn" 
          id="themeToggleBtn" 
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {darkMode ? (
            <Moon className="icon-sm" id="themeIcon" />
          ) : (
            <Sun className="icon-sm" id="themeIcon" />
          )}
        </button>
        
        <div className="header-dropdown-container" ref={messagesRef}>
          <button 
            className="header-btn" 
            aria-label="Messages"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
            }}
          >
            <MessageSquare className="icon-sm" />
            {unreadMessagesCount > 0 && <span className="header-badge">{unreadMessagesCount}</span>}
          </button>
          
          {showMessages && (
            <div className="header-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-title">Messages</span>
                {unreadMessagesCount > 0 && (
                  <button className="dropdown-clear" onClick={handleMarkAllMessagesRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="dropdown-list">
                {msgList.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`dropdown-item ${msg.unread ? 'unread' : ''}`}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div className="dropdown-item-avatar" style={{ background: msg.color }}>
                      {msg.initials}
                    </div>
                    <div className="dropdown-item-body">
                      <p className="dropdown-item-title">{msg.sender}</p>
                      <p className="dropdown-item-desc">{msg.text}</p>
                      <span className="dropdown-item-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="dropdown-footer-btn" onClick={() => { setCurrentPage('directory'); setShowMessages(false); }}>
                  Open Directory
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="header-dropdown-container" ref={notificationsRef}>
          <button 
            className="header-btn" 
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
            }}
          >
            <Bell className="icon-sm" />
            {unreadNotificationsCount > 0 && <span className="header-badge pulse">{unreadNotificationsCount}</span>}
          </button>

          {showNotifications && (
            <div className="header-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-title">Notifications</span>
                {unreadNotificationsCount > 0 && (
                  <button className="dropdown-clear" onClick={handleMarkAllNotificationsRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="dropdown-list">
                {notifList.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`dropdown-item ${notif.unread ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div className="dropdown-item-body">
                      <p className="dropdown-item-title">{notif.title}</p>
                      <p className="dropdown-item-desc">{notif.desc}</p>
                      <span className="dropdown-item-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="dropdown-footer-btn" onClick={() => { setCurrentPage('news'); setShowNotifications(false); }}>
                  View All Announcements
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="header-divider" style={{ width: '1px', height: '24px', background: 'var(--color-border)', margin: '0 8px' }}></div>

        <div 
          className="header-profile" 
          id="headerProfile"
          onClick={() => setCurrentPage('profile')}
        >
          <div className="profile-avatar">JD</div>
          <div className="profile-info">
            <span className="profile-name">John Doe</span>
            <span className="profile-role">Senior Engineer</span>
          </div>
          <ChevronDown className="icon-xs profile-chevron" />
        </div>
      </div>
    </header>
  );
}
