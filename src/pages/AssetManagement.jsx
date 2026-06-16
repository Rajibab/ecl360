import React, { useState } from 'react';
import { 
  Monitor, 
  GitPullRequest, 
  CheckCircle, 
  Laptop, 
  Keyboard 
} from 'lucide-react';

export default function AssetManagement({ 
  activeAssetRequestCount, 
  setActiveAssetRequestCount, 
  showToast 
}) {
  const [assetCategory, setAssetCategory] = useState('Laptop Upgrade');
  const [urgency, setUrgency] = useState('Standard');
  const [justification, setJustification] = useState('');

  // Initial asset history
  const [requestHistory, setRequestHistory] = useState([
    {
      id: 'r1',
      asset: 'Apple iPad Pro 11"',
      date: 'May 10, 2025',
      urgency: 'Standard',
      justification: 'For on-site machinery inspect apps testing',
      status: 'Approved'
    },
    {
      id: 'r2',
      asset: 'Jabra Evolve 65 Headset',
      date: 'Jun 14, 2025',
      urgency: 'High',
      justification: 'Frequent client calls and team sync meetings',
      status: 'Pending IT Review'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!justification) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });

    const newRequest = {
      id: 'r_' + (requestHistory.length + 1),
      asset: assetCategory,
      date: dateStr,
      urgency: urgency,
      justification: justification,
      status: 'Pending IT Review'
    };

    setRequestHistory([newRequest, ...requestHistory]);
    setActiveAssetRequestCount(prev => prev + 1);
    showToast('success', 'Request Submitted', `Your IT request for "${assetCategory}" has been registered.`);

    // Reset fields
    setJustification('');
  };

  const assignedHardware = [
    {
      id: 'ECL-LP-1024',
      name: 'Dell Latitude 5520 Laptop',
      spec: 'S/N: 5X8Y9Z1 · 16GB RAM · 512GB SSD',
      date: 'May 12, 2023',
      condition: 'Good',
      status: 'Active',
      icon: Laptop,
      iconColor: 'blue'
    },
    {
      id: 'ECL-MON-0822',
      name: 'Samsung 27" LED Monitor',
      spec: 'S/N: SE27M99 · FHD · IPS Panel',
      date: 'Jun 01, 2023',
      condition: 'Good',
      status: 'Active',
      icon: Monitor,
      iconColor: 'purple'
    },
    {
      id: 'ECL-ACC-3941',
      name: 'Logitech MK270 Wireless Combo',
      spec: 'S/N: LOGI77X · Keyboard & Optical Mouse',
      date: 'Jun 01, 2023',
      condition: 'Good',
      status: 'Active',
      icon: Keyboard,
      iconColor: 'orange'
    }
  ];

  return (
    <div className="assets-content" id="page-assets">
      <div className="page-header">
        <div>
          <h1 className="page-title">Asset Management</h1>
          <p className="page-subtitle">Track your assigned hardware, inspect conditions, and request upgrades</p>
        </div>
      </div>

      {/* Stats row using standard class */}
      <div className="cards-row-3" style={{ margin: '1.5rem 0 2rem' }}>
        <div className="card stat-card blue-stat">
          <div className="stat-icon-wrap blue"><Laptop className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Assigned Assets</p>
            <h2 className="stat-value">3</h2>
            <p className="stat-sub">1 Laptop, 1 Monitor, 1 Accessories combo</p>
          </div>
        </div>
        <div className="card stat-card orange-stat">
          <div className="stat-icon-wrap orange"><GitPullRequest className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Active Requests</p>
            <h2 className="stat-value" id="activeAssetRequestCount">{activeAssetRequestCount}</h2>
            <p className="stat-sub">Awaiting IT allocation</p>
          </div>
        </div>
        <div className="card stat-card green-stat">
          <div className="stat-icon-wrap green"><CheckCircle className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Compliance &amp; Health</p>
            <h2 className="stat-value">100%</h2>
            <p className="stat-sub">All devices verified this quarter</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '1.5rem' }}>
        {/* Assigned Hardware */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <h2 className="card-title">My Assigned Hardware</h2>
          </div>
          <div className="table-wrap">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Asset Details</th>
                  <th>Asset ID</th>
                  <th>Assigned Date</th>
                  <th>Condition</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignedHardware.map(item => {
                  const IconComp = item.icon;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="asset-name-wrap">
                          <div className={`asset-icon-sm ${item.iconColor}`}>
                            <IconComp className="icon-sm" />
                          </div>
                          <div>
                            <div className="asset-name">{item.name}</div>
                            <div className="asset-serial">{item.spec}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="asset-id">{item.id}</span></td>
                      <td>{item.date}</td>
                      <td><span className="condition-good">{item.condition}</span></td>
                      <td><span className="status-badge active">{item.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request Form */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <h2 className="card-title">Request New Hardware</h2>
          </div>
          <form className="leave-form" id="assetRequestForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Asset Category</label>
              <select 
                className="form-input" 
                value={assetCategory}
                onChange={(e) => setAssetCategory(e.target.value)}
                required
              >
                <option value="Laptop Upgrade">Laptop Upgrade (Dev/Pro)</option>
                <option value="External Monitor">External Monitor (27" / 4K)</option>
                <option value="Jabra Evolve 65 Headset">Noise Cancelling Headset</option>
                <option value="Wireless Keyboard/Mouse">Wireless Keyboard &amp; Mouse</option>
                <option value="iPad Pro 11">Tablet Device (iPad Pro)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Urgency</label>
              <select 
                className="form-input"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                required
              >
                <option value="Standard">Standard (5-7 days)</option>
                <option value="High">High (2-3 days)</option>
                <option value="Critical">Critical (Immediate blocker)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Business Justification</label>
              <textarea 
                className="form-input form-textarea" 
                placeholder="Explain why this equipment is needed for your project/role..." 
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Submit IT Request</button>
          </form>
        </div>
      </div>

      {/* History table */}
      <div className="card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <h2 className="card-title">Asset Request History</h2>
        </div>
        <div className="table-wrap">
          <table className="modern-table" id="assetHistoryTable">
            <thead>
              <tr>
                <th>Requested Asset</th>
                <th>Request Date</th>
                <th>Urgency</th>
                <th>Justification</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requestHistory.map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: '600' }}>{req.asset}</td>
                  <td>{req.date}</td>
                  <td>{req.urgency}</td>
                  <td style={{ color: 'var(--color-text-2)' }}>{req.justification}</td>
                  <td>
                    <span 
                      className={`status-badge ${req.status === 'Approved' ? 'active' : 'maintenance'}`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
