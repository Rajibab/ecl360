import React, { useState } from 'react';
import { CalendarDays, Clock, CheckCircle } from 'lucide-react';

export default function LeaveManagement({ leaveHistory, setLeaveHistory, showToast }) {
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [numDays, setNumDays] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [arrangement, setArrangement] = useState('');

  // Calculate dynamic stats
  const pendingCount = leaveHistory.filter(l => l.status === 'Pending').length;
  const approvedCount = leaveHistory.filter(l => l.status === 'Approved').length;

  // Leave limits: CL = 8, SL = 12, EL = 6 (Total = 26)
  const clApproved = leaveHistory.filter(l => l.type === 'Casual Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days || '0'), 0);
  const slApproved = leaveHistory.filter(l => l.type === 'Sick Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days || '0'), 0);
  const elApproved = leaveHistory.filter(l => l.type === 'Earned Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days || '0'), 0);

  const clRemaining = Math.max(0, 8 - clApproved);
  const slRemaining = Math.max(0, 12 - slApproved);
  const elRemaining = Math.max(0, 6 - elApproved);
  const totalRemaining = clRemaining + slRemaining + elRemaining;

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      showToast('error', 'Invalid Dates', 'End date cannot be before start date.');
      return;
    }

    const diffTime = Math.abs(end - start);
    const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const formattedStartDate = start.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const formattedEndDate = end.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newRequest = {
      id: 'L' + (leaveHistory.length + 1),
      type: leaveType,
      dates: `${formattedStartDate} – ${formattedEndDate}`,
      days: `${calculatedDays} day${calculatedDays > 1 ? 's' : ''}`,
      reason: reason,
      status: 'Pending',
    };

    setLeaveHistory([newRequest, ...leaveHistory]);
    showToast('success', 'Leave Applied', `Your leave request has been submitted for approval.`);

    // Reset fields
    setStartDate('');
    setEndDate('');
    setReason('');
    setArrangement('');
    setNumDays(1);
  };

  const getLhTypeClass = (type) => {
    if (type === 'Casual Leave') return 'casual';
    if (type === 'Sick Leave') return 'sick';
    return 'earned';
  };

  const getLhTypeAbbrev = (type) => {
    if (type === 'Casual Leave') return 'CL';
    if (type === 'Sick Leave') return 'SL';
    return 'EL';
  };

  return (
    <div className="leave-content" id="page-leave">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">Apply, track, and manage your leave requests</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="cards-row-3" style={{ margin: '1.5rem 0 2rem' }}>
        <div className="card stat-card blue-stat">
          <div className="stat-icon-wrap blue"><CalendarDays className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Available Leave Days</p>
            <h2 className="stat-value">{totalRemaining}</h2>
            <p className="stat-sub">{clRemaining} Casual · {slRemaining} Sick · {elRemaining} Earned</p>
          </div>
        </div>
        <div className="card stat-card orange-stat">
          <div className="stat-icon-wrap orange"><Clock className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Pending Requests</p>
            <h2 className="stat-value">{pendingCount}</h2>
            <p className="stat-sub">Awaiting manager approval</p>
          </div>
        </div>
        <div className="card stat-card green-stat">
          <div className="stat-icon-wrap green"><CheckCircle className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Approved This Year</p>
            <h2 className="stat-value">{approvedCount}</h2>
            <p className="stat-sub">Out of {leaveHistory.length} applied requests</p>
          </div>
        </div>
      </div>

      {/* Form and History columns */}
      <div className="cards-row-2">
        {/* Leave Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Apply for Leave</h2>
          </div>
          <form className="leave-form" onSubmit={handleApplyLeave}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Leave Type</label>
                <select 
                  className="form-input" 
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Number of Days</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={numDays} 
                  onChange={(e) => setNumDays(e.target.value)}
                  min="1" 
                  max="30" 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">From Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">To Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Reason</label>
              <textarea 
                className="form-input form-textarea" 
                placeholder="Brief reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Alternate Arrangement</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Who will cover your work?" 
                value={arrangement}
                onChange={(e) => setArrangement(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-outline" 
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setReason('');
                  setArrangement('');
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">Submit Request</button>
            </div>
          </form>
        </div>

        {/* Leave History List */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Leave History</h2>
            <select className="card-select">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="leave-history-list">
            {leaveHistory.map(item => (
              <div key={item.id} className="leave-history-item">
                <div className="lh-left">
                  <span className={`lh-type ${getLhTypeClass(item.type)}`}>
                    {getLhTypeAbbrev(item.type)}
                  </span>
                  <div>
                    <p className="lh-name" style={{ fontWeight: '600' }}>{item.type}</p>
                    <p className="lh-dates">{item.dates} · {item.days}</p>
                  </div>
                </div>
                <span className={`lh-status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            ))}
            {leaveHistory.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-3)', fontSize: '0.875rem' }}>
                No leaves applied yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
