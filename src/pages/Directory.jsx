import React, { useState } from 'react';
import { 
  Search, 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Users 
} from 'lucide-react';

export default function Directory({ showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const employees = [
    {
      id: 'e1',
      name: 'Amit Kumar',
      role: 'Lead Engineer',
      dept: 'Production',
      manager: 'Sunita Rao',
      email: 'amit.k@ecl360.com',
      phone: '+91 98765 43210',
      initials: 'AK',
      color: 'linear-gradient(135deg, #10B981, #059669)',
      topClass: 'green-top'
    },
    {
      id: 'e2',
      name: 'Priya Sharma',
      role: 'Quality Specialist',
      dept: 'Quality Assurance',
      manager: 'Sunita Rao',
      email: 'priya.s@ecl360.com',
      phone: '+91 98765 43211',
      initials: 'PS',
      color: 'linear-gradient(135deg, #6366F1, #4F46E5)',
      topClass: 'indigo-top'
    },
    {
      id: 'e3',
      name: 'Rajesh Patel',
      role: 'Senior Supervisor',
      dept: 'Operations',
      manager: 'Sunita Rao',
      email: 'rajesh.p@ecl360.com',
      phone: '+91 98765 43212',
      initials: 'RP',
      color: 'linear-gradient(135deg, #F97316, #EA580C)',
      topClass: 'orange-top'
    },
    {
      id: 'e4',
      name: 'Vikram Malhotra',
      role: 'HSE Specialist',
      dept: 'HSE',
      manager: 'Sunita Rao',
      email: 'vikram.m@ecl360.com',
      phone: '+91 98765 43213',
      initials: 'VM',
      color: 'linear-gradient(135deg, #EF4444, #DC2626)',
      topClass: 'red-top'
    },
    {
      id: 'e5',
      name: 'Sunita Rao',
      role: 'Operations Manager',
      dept: 'Operations',
      manager: 'Plant Director',
      email: 'sunita.r@ecl360.com',
      phone: '+91 98765 43214',
      initials: 'SR',
      color: 'linear-gradient(135deg, #0D9488, #0F766E)',
      topClass: 'teal-top'
    },
    {
      id: 'e6',
      name: 'Neha Gupta',
      role: 'HR Specialist',
      dept: 'HR',
      manager: 'Sunita Rao',
      email: 'neha.g@ecl360.com',
      phone: '+91 98765 43215',
      initials: 'NG',
      color: 'linear-gradient(135deg, #EC4899, #DB2777)',
      topClass: 'pink-top' // CSS has custom linear-gradients
    }
  ];

  // Filtering
  const filteredEmployees = employees.filter(emp => {
    const matchesDept = deptFilter === 'all' || emp.dept === deptFilter;
    const searchStr = `${emp.name} ${emp.role} ${emp.dept} ${emp.manager}`.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || searchStr.includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="directory-content" id="page-directory">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Directory</h1>
          <p className="page-subtitle">Find contact information and chat with team members across departments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="dir-filters" style={{ margin: '1.5rem 0', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div className="dir-search-full" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, border: '1.5px solid var(--color-border)', borderRadius: '10px', background: 'var(--color-surface)', padding: '8px 12px' }}>
          <Search className="icon-sm" style={{ color: 'var(--color-text-3)' }} />
          <input 
            type="text" 
            placeholder="Search by name, role, department..." 
            id="directorySearchInput" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'none', border: 'none', fontSize: '0.875rem', color: 'var(--color-text)', width: '100%', outline: 'none' }}
          />
        </div>
        <select 
          className="form-input dir-select" 
          id="directoryDeptSelect" 
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          style={{ width: '220px', backgroundColor: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', borderRadius: '10px', height: '42px', padding: '0 12px' }}
        >
          <option value="all">All Departments</option>
          <option value="Production">Production</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="Operations">Operations</option>
          <option value="HSE">HSE</option>
          <option value="HR">HR</option>
        </select>
      </div>

      {filteredEmployees.length === 0 ? (
        <div id="dirEmptyState" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-surface)', border: '1px dashed var(--color-border)', borderRadius: '12px' }}>
          <Users style={{ width: '48px', height: '48px', color: 'var(--color-text-4)', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--color-text-3)', fontSize: '0.875rem' }}>No employees match your search criteria.</p>
        </div>
      ) : (
        <div className="emp-dir-grid" id="directoryGrid">
          {filteredEmployees.map(emp => (
            <div key={emp.id} className="emp-profile-card compact">
              <div className="emp-card-header">
                <div className="emp-avatar" style={{ background: emp.color }}>
                  {emp.initials}
                </div>
                <div className="emp-header-info">
                  <h3 className="emp-name">{emp.name}</h3>
                  <p className="emp-designation">{emp.role}</p>
                </div>
              </div>
              <div className="emp-card-body">
                <div className="emp-badges">
                  <span className="emp-badge dept"><Briefcase className="icon-xs" /> {emp.dept}</span>
                  <span className="emp-badge manager"><User className="icon-xs" /> {emp.manager}</span>
                </div>
                <div className="emp-contact-row">
                  <a href={`mailto:${emp.email}`} className="emp-contact-link" title={emp.email}>
                    <Mail className="icon-xs" /> <span>{emp.email}</span>
                  </a>
                  <a href={`tel:${emp.phone}`} className="emp-contact-link" title={emp.phone}>
                    <Phone className="icon-xs" /> <span>{emp.phone}</span>
                  </a>
                </div>
                <div className="emp-card-actions">
                  <button 
                    className="emp-action-btn email" 
                    onClick={() => showToast('info', 'Email', `Composing email to ${emp.name}...`)}
                  >
                    <Mail className="icon-xs" /> Email
                  </button>
                  <button 
                    className="emp-action-btn chat" 
                    onClick={() => showToast('success', 'Chat', `Starting chat with ${emp.name}...`)}
                  >
                    <MessageSquare className="icon-xs" /> Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
