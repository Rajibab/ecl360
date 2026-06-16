import React, { useState } from 'react';
import { 
  Shield, 
  Bell, 
  Eye, 
  Lock, 
  Globe 
} from 'lucide-react';

export default function Settings({ showToast, darkMode, setDarkMode }) {
  const [activeSubTab, setActiveSubTab] = useState('security');
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [leaveNotify, setLeaveNotify] = useState(true);
  const [annNotify, setAnnNotify] = useState(true);
  const [taskNotify, setTaskNotify] = useState(false);
  const [payNotify, setPayNotify] = useState(true);

  // Appearance state
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState('expanded');

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(true);
  const [displayEmail, setDisplayEmail] = useState(true);
  const [displayPhone, setDisplayPhone] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);

  // Language & Region state
  const [language, setLanguage] = useState('en-US');
  const [timezone, setTimezone] = useState('IST');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword !== confirmPassword) {
      showToast('error', 'Password Mismatch', 'New passwords do not match confirm password.');
      return;
    }

    showToast('success', 'Password Updated', 'Your account security password has been changed successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    showToast('success', 'Preferences Saved', 'Your notification alert preferences have been successfully updated.');
  };

  const handleSaveAppearance = (e) => {
    e.preventDefault();
    showToast('success', 'Appearance Updated', 'Display preferences and theme styles have been applied.');
  };

  const handleSavePrivacy = (e) => {
    e.preventDefault();
    showToast('success', 'Privacy Settings Saved', 'Your profile visibility and data sharing preferences have been updated.');
  };

  const handleSaveLocalization = (e) => {
    e.preventDefault();
    showToast('success', 'Localization Updated', `Region standards set to Language: ${language}, Timezone: ${timezone}.`);
  };

  const menuItems = [
    { key: 'security', label: 'Account & Security', icon: Shield },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'appearance', label: 'Appearance', icon: Eye },
    { key: 'privacy', label: 'Privacy', icon: Lock },
    { key: 'language', label: 'Language & Region', icon: Globe },
  ];

  return (
    <div className="settings-content" id="page-settings">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your preferences and account settings</p>
        </div>
      </div>

      <div className="settings-layout" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Left Subnav */}
        <div className="settings-nav-col">
          <ul className="settings-nav-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <li 
                  key={item.key} 
                  className={`settings-nav-item ${activeSubTab === item.key ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(item.key)}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Icon className="icon-xs" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Form Panels */}
        <div className="settings-content-col">
          {/* 1. Account & Security */}
          {activeSubTab === 'security' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                <h2 className="card-title">Account &amp; Security</h2>
              </div>
              
              <form onSubmit={handleUpdatePassword}>
                <div className="settings-section" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0' }}>
                  <h3 className="settings-section-title" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-3)', textTransform: 'uppercase', marginBottom: '8px' }}>Change Password</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="••••••••" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="••••••••" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="••••••••" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: 'fit-content', marginTop: '4px' }}>Update Password</button>
                </div>
              </form>
            </div>
          )}

          {/* 2. Notifications Tab */}
          {activeSubTab === 'notifications' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                <h2 className="card-title">Notifications Preferences</h2>
              </div>
              
              <form onSubmit={handleSaveNotifications}>
                <div className="settings-section" style={{ padding: '0' }}>
                  <h3 className="settings-section-title" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-3)', textTransform: 'uppercase', marginBottom: '12px' }}>System Alert Preferences</h3>
                  
                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Leave Approvals</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Get notified when your leave request status is updated by your manager</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={leaveNotify} onChange={() => setLeaveNotify(!leaveNotify)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>New Announcements</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Receive dashboard feed alerts for new company announcements</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={annNotify} onChange={() => setAnnNotify(!annNotify)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Task Reminders</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Get scheduled reminders about upcoming task due dates and board assignments</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={taskNotify} onChange={() => setTaskNotify(!taskNotify)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', marginBottom: '16px' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Payslip Availability</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Receive instant notifications when your monthly payslip is generated</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={payNotify} onChange={() => setPayNotify(!payNotify)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Save Preferences</button>
                </div>
              </form>
            </div>
          )}

          {/* 3. Appearance Tab */}
          {activeSubTab === 'appearance' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                <h2 className="card-title">Appearance &amp; Styling</h2>
              </div>
              
              <form onSubmit={handleSaveAppearance}>
                <div className="settings-section" style={{ padding: '0' }}>
                  <h3 className="settings-section-title" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-3)', textTransform: 'uppercase', marginBottom: '12px' }}>Theme Options</h3>
                  
                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Dark Color Mode</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Switch between light surfaces and deep dark backgrounds</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Compact Table Mode</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Reduces padding in tables and lists to fit more information on screen</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={compactMode} onChange={() => setCompactMode(!compactMode)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="form-group" style={{ margin: '16px 0' }}>
                    <label className="form-label">Sidebar Styling</label>
                    <select 
                      className="form-input" 
                      value={sidebarStyle} 
                      onChange={(e) => setSidebarStyle(e.target.value)}
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <option value="expanded">Expanded Navigation Labels (Default)</option>
                      <option value="collapsed">Compact Icon Navigation</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Apply Changes</button>
                </div>
              </form>
            </div>
          )}

          {/* 4. Privacy Tab */}
          {activeSubTab === 'privacy' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                <h2 className="card-title">Privacy &amp; Security Visibility</h2>
              </div>
              
              <form onSubmit={handleSavePrivacy}>
                <div className="settings-section" style={{ padding: '0' }}>
                  <h3 className="settings-section-title" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-3)', textTransform: 'uppercase', marginBottom: '12px' }}>Profile and Contact Visibility</h3>
                  
                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Directory Visibility</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Display profile information in the public Employee Directory search list</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={profilePublic} onChange={() => setProfilePublic(!profilePublic)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Display Email Publicly</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Allow other organization employees to see and copy your primary email</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={displayEmail} onChange={() => setDisplayEmail(!displayEmail)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Display Mobile Number</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Share your contact phone number inside profile details and directory cards</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={displayPhone} onChange={() => setDisplayPhone(!displayPhone)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', marginBottom: '16px' }}>
                    <span className="toggle-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                      <strong>Show Online Status</strong><br/>
                      <small style={{ color: 'var(--color-text-3)' }}>Display an online presence indicator status dot on your profile avatar</small>
                    </span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={activityStatus} onChange={() => setActivityStatus(!activityStatus)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Save Privacy Settings</button>
                </div>
              </form>
            </div>
          )}

          {/* 5. Language & Region Tab */}
          {activeSubTab === 'language' && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="card-header" style={{ marginBottom: '1.25rem' }}>
                <h2 className="card-title">Language &amp; Region Standards</h2>
              </div>
              
              <form onSubmit={handleSaveLocalization}>
                <div className="settings-section" style={{ padding: '0' }}>
                  <h3 className="settings-section-title" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-3)', textTransform: 'uppercase', marginBottom: '12px' }}>Localization Preferences</h3>
                  
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">System Language</label>
                    <select 
                      className="form-input" 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <option value="en-US">English (United States)</option>
                      <option value="en-IN">English (India Standard)</option>
                      <option value="hi-IN">Hindi (हिन्दी)</option>
                      <option value="es-ES">Spanish (Español)</option>
                      <option value="de-DE">German (Deutsch)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Default Timezone</label>
                    <select 
                      className="form-input" 
                      value={timezone} 
                      onChange={(e) => setTimezone(e.target.value)}
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <option value="IST">GMT +05:30 (India Standard Time)</option>
                      <option value="GMT">GMT +00:00 (Greenwich Mean Time)</option>
                      <option value="EST">GMT -05:00 (Eastern Standard Time)</option>
                      <option value="PST">GMT -08:00 (Pacific Standard Time)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="form-label">Date Format Structure</label>
                    <select 
                      className="form-input" 
                      value={dateFormat} 
                      onChange={(e) => setDateFormat(e.target.value)}
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <option value="DD/MM/YYYY">DD / MM / YYYY (e.g. 15/06/2026)</option>
                      <option value="MM/DD/YYYY">MM / DD / YYYY (e.g. 06/15/2026)</option>
                      <option value="YYYY-MM-DD">YYYY - MM - DD (e.g. 2026-06-15)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>Save Region Settings</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
