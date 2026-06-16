import React from 'react';
import { MapPin, Mail, User as UserIcon } from 'lucide-react';

export default function Profile({ tasks = [], leaveHistory = [], userPointsBalance = 0, activeAssetRequestCount = 0 }) {
  const profileDetails = {
    name: 'John Doe',
    role: 'Senior Engineer',
    dept: 'Production Department',
    empId: 'ECL-EMP-1082',
    doj: 'March 12, 2022',
    email: 'john.doe@ecl360.com',
    location: 'Plant 2 · Shift A',
    manager: 'Sunita Rao',
    skills: ['Process Control', 'Machine Safety', 'Root Cause Analysis', 'Plant Maintenance'],
  };

  // Calculate dynamic stats
  const activeTasksCount = tasks.filter(t => t.assignee.includes('John Doe') && t.status !== 'completed').length;
  
  const casualLeavesApplied = leaveHistory.filter(l => l.type === 'Casual Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);
  const sickLeavesApplied = leaveHistory.filter(l => l.type === 'Sick Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);
  const earnedLeavesApplied = leaveHistory.filter(l => l.type === 'Earned Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);
  const totalLeavesRemaining = Math.max(0, 8 - casualLeavesApplied) + Math.max(0, 12 - sickLeavesApplied) + Math.max(0, 6 - earnedLeavesApplied);

  return (
    <div className="profile-content" id="page-profile">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">View your employment identity and details</p>
        </div>
      </div>

      <div className="profile-layout">
        {/* Left Column: Avatar & Summary Card */}
        <div className="profile-left-col">
          <div className="card profile-main-card">
            <div className="profile-hero-bg"></div>
            <div className="profile-avatar-section">
              <div className="profile-avatar-lg">JD</div>
              <span className="profile-avatar-online"></span>
            </div>
            
            <div className="profile-main-info">
              <h2 className="profile-full-name">{profileDetails.name}</h2>
              <p className="profile-main-role">{profileDetails.role}</p>
              <div className="profile-emp-id">ID: {profileDetails.empId}</div>
            </div>

            <div className="profile-stats-row">
              <div className="profile-stat">
                <span className="pstat-val">{userPointsBalance}</span>
                <span className="pstat-label">Points Balance</span>
              </div>
              <div className="profile-stat">
                <span className="pstat-val">{activeTasksCount}</span>
                <span className="pstat-label">Active Tasks</span>
              </div>
              <div className="profile-stat">
                <span className="pstat-val">{totalLeavesRemaining}d</span>
                <span className="pstat-label">Leaves Left</span>
              </div>
            </div>

            <div className="profile-links">
              <div className="profile-link">
                <MapPin className="icon-xs" />
                <span>{profileDetails.location}</span>
              </div>
              <div className="profile-link">
                <Mail className="icon-xs" />
                <span>{profileDetails.email}</span>
              </div>
              <div className="profile-link">
                <UserIcon className="icon-xs" />
                <span>Reports to {profileDetails.manager}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Profile Info */}
        <div className="profile-right-col">
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div className="card-header" style={{ marginBottom: 'var(--space-4)' }}>
              <h2 className="card-title">Employment Information</h2>
            </div>
            
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="pinfo-label">Full Name</span>
                <span className="pinfo-val">{profileDetails.name}</span>
              </div>
              <div className="profile-info-item">
                <span className="pinfo-label">Designation</span>
                <span className="pinfo-val">{profileDetails.role}</span>
              </div>
              <div className="profile-info-item">
                <span className="pinfo-label">Department</span>
                <span className="pinfo-val">{profileDetails.dept}</span>
              </div>
              <div className="profile-info-item">
                <span className="pinfo-label">Joining Date</span>
                <span className="pinfo-val">{profileDetails.doj}</span>
              </div>
              <div className="profile-info-item">
                <span className="pinfo-label">Work Station</span>
                <span className="pinfo-val">Plant 2 Dispensary Row A</span>
              </div>
              <div className="profile-info-item">
                <span className="pinfo-label">Contract Status</span>
                <span className="pinfo-val" style={{ color: 'var(--emerald)' }}>Permanent</span>
              </div>
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="card" style={{ padding: 'var(--space-5)' }}>
            <div className="card-header" style={{ marginBottom: 'var(--space-4)' }}>
              <h2 className="card-title">Professional Skills &amp; Specialties</h2>
            </div>
            <div className="profile-skills-list">
              {profileDetails.skills.map(skill => (
                <span key={skill} className="profile-skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
