import React from 'react';
import { 
  FileText, 
  Receipt, 
  Landmark, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Eye, 
  Download 
} from 'lucide-react';

export default function Payroll({ showToast }) {
  const handleView = (docName) => {
    showToast('info', 'Opening Document', `Loading viewer for ${docName}...`);
  };

  const handleDownload = (docName) => {
    showToast('success', 'Download Started', `Your download for ${docName} has begun.`);
  };

  return (
    <div className="payroll-content" id="page-payroll">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payroll &amp; Documents</h1>
          <p className="page-subtitle">Access all your payroll information and official documents</p>
        </div>
      </div>

      <div className="payroll-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
        {/* Monthly Payslips */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon blue" style={{ background: 'rgba(30,64,175,0.1)', color: 'var(--blue-primary)', padding: '10px', borderRadius: '8px' }}>
              <FileText className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Monthly Payslip</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Download your monthly salary slips</p>
            </div>
          </div>
          <div className="payroll-months" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['May 2025', 'Apr 2025', 'Mar 2025'].map(month => (
              <div key={month} className="month-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-2)', fontSize: '0.8125rem' }}>
                <span style={{ fontWeight: '500' }}>{month}</span>
                <div className="month-actions" style={{ display: 'flex', gap: '6px' }}>
                  <button className="doc-btn view" onClick={() => handleView(`Payslip - ${month}`)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Eye className="icon-xs" /> View
                  </button>
                  <button className="doc-btn download" onClick={() => handleDownload(`Payslip - ${month}`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Download className="icon-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary History */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon green" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald)', padding: '10px', borderRadius: '8px' }}>
              <Receipt className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Salary History</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>View your salary progression over time</p>
            </div>
          </div>
          <div className="salary-bars" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '0.5rem' }}>
            <div className="sal-bar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="sal-bar-label" style={{ fontSize: '0.75rem', width: '36px', color: 'var(--color-text-3)' }}>2023</span>
              <div className="sal-bar-track" style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="sal-bar-fill" style={{ width: '70%', height: '100%', background: 'var(--blue-primary)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
              </div>
              <span className="sal-bar-val" style={{ fontSize: '0.75rem', fontWeight: '600', width: '56px', textAlign: 'right' }}>₹72,000</span>
            </div>
            <div className="sal-bar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="sal-bar-label" style={{ fontSize: '0.75rem', width: '36px', color: 'var(--color-text-3)' }}>2024</span>
              <div className="sal-bar-track" style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="sal-bar-fill" style={{ width: '80%', height: '100%', background: 'var(--blue-primary)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
              </div>
              <span className="sal-bar-val" style={{ fontSize: '0.75rem', fontWeight: '600', width: '56px', textAlign: 'right' }}>₹82,000</span>
            </div>
            <div className="sal-bar-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="sal-bar-label" style={{ fontSize: '0.75rem', width: '36px', color: 'var(--color-text-3)' }}>2025</span>
              <div className="sal-bar-track" style={{ flex: 1, height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="sal-bar-fill green-fill" style={{ width: '92%', height: '100%', background: 'var(--emerald)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
              </div>
              <span className="sal-bar-val" style={{ fontSize: '0.75rem', fontWeight: '600', width: '56px', textAlign: 'right' }}>₹94,500</span>
            </div>
          </div>
        </div>

        {/* Form-16 */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon orange" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--amber)', padding: '10px', borderRadius: '8px' }}>
              <Landmark className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Form-16</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Income Tax certificate documents</p>
            </div>
          </div>
          <div className="payroll-months" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['AY 2024-25', 'AY 2023-24'].map(year => (
              <div key={year} className="month-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-2)', fontSize: '0.8125rem' }}>
                <span style={{ fontWeight: '500' }}>{year}</span>
                <div className="month-actions" style={{ display: 'flex', gap: '6px' }}>
                  <button className="doc-btn view" onClick={() => handleView(`Form-16 - ${year}`)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Eye className="icon-xs" /> View
                  </button>
                  <button className="doc-btn download" onClick={() => handleDownload(`Form-16 - ${year}`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Download className="icon-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Letter */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon purple" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--purple)', padding: '10px', borderRadius: '8px' }}>
              <Award className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Appointment Letter</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Your official employment appointment letter</p>
            </div>
          </div>
          <div className="payroll-months" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div className="month-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-2)', fontSize: '0.8125rem' }}>
              <span style={{ fontWeight: '500' }}>March 12, 2022</span>
              <div className="month-actions" style={{ display: 'flex', gap: '6px' }}>
                <button className="doc-btn view" onClick={() => handleView('Appointment Letter')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                  <Eye className="icon-xs" /> View
                </button>
                <button className="doc-btn download" onClick={() => handleDownload('Appointment Letter')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                  <Download className="icon-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Increment Letters */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon emerald" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--emerald)', padding: '10px', borderRadius: '8px' }}>
              <TrendingUp className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Increment Letters</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Annual increment and revision letters</p>
            </div>
          </div>
          <div className="payroll-months" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[
              { label: 'January 2025 – 15% Hike', name: 'Increment Letter 2025' },
              { label: 'January 2024 – 12% Hike', name: 'Increment Letter 2024' }
            ].map(item => (
              <div key={item.label} className="month-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-2)', fontSize: '0.8125rem' }}>
                <span style={{ fontWeight: '500' }}>{item.label}</span>
                <div className="month-actions" style={{ display: 'flex', gap: '6px' }}>
                  <button className="doc-btn view" onClick={() => handleView(item.name)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Eye className="icon-xs" /> View
                  </button>
                  <button className="doc-btn download" onClick={() => handleDownload(item.name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Download className="icon-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HR Policies */}
        <div className="card payroll-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="payroll-card-icon red" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--red)', padding: '10px', borderRadius: '8px' }}>
              <ShieldCheck className="icon-md" />
            </div>
            <div>
              <h3 className="payroll-card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>HR Policies</h3>
              <p className="payroll-card-desc" style={{ fontSize: '0.75rem', color: 'var(--color-text-3)' }}>Company policies and employee handbook</p>
            </div>
          </div>
          <div className="payroll-months" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[
              { label: 'Employee Handbook 2025', name: 'Employee Handbook 2025' },
              { label: 'Leave Policy v2.1', name: 'Leave Policy v2.1' }
            ].map(policy => (
              <div key={policy.label} className="month-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-2)', fontSize: '0.8125rem' }}>
                <span style={{ fontWeight: '500' }}>{policy.label}</span>
                <div className="month-actions" style={{ display: 'flex', gap: '6px' }}>
                  <button className="doc-btn view" onClick={() => handleView(policy.name)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Eye className="icon-xs" /> View
                  </button>
                  <button className="doc-btn download" onClick={() => handleDownload(policy.name)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-2)' }}>
                    <Download className="icon-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
