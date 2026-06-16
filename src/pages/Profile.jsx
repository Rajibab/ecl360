import React from 'react';
import { 
  MapPin 
} from 'lucide-react';

export default function Profile() {
  const profileDetails = {
    name: 'John Doe',
    role: 'Senior Engineer',
    dept: 'Production Department',
    empId: 'ECL-EMP-1082',
    doj: 'March 12, 2022',
    email: 'john.doe@ecl360.com',
    location: 'Plant 2 · Shift A',
    manager: 'Sunita Rao (Operations Manager)',
    skills: ['Process Control', 'Machine Safety', 'Root Cause Analysis', 'Plant Maintenance'],
  };

  return (
    <div className="profile-content" id="page-profile">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">View your employment identity and details</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Profile Card Summary */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-bg-orb orb-1" style={{ top: '-40px', right: '-40px', width: '120px', height: '120px' }}></div>
          <div className="hero-avatar" style={{ margin: '0 0 1.25rem 0' }}>
            <div className="hero-avatar-ring" style={{ width: '96px', height: '96px', fontSize: '2rem', fontWeight: '800' }}>JD</div>
            <span className="hero-avatar-status online" style={{ width: '16px', height: '16px', border: '3px solid var(--color-surface)' }}></span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>{profileDetails.name}</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--blue-primary)', fontWeight: '600', marginTop: '2px' }}>{profileDetails.role}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
            <MapPin className="icon-xs" /> {profileDetails.location}
          </p>

          <div style={{ width: '100%', borderTop: '1px solid var(--color-border)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-4)', textTransform: 'uppercase', fontWeight: '700' }}>Employee ID</span>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{profileDetails.empId}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-4)', textTransform: 'uppercase', fontWeight: '700' }}>Email Address</span>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)' }}>{profileDetails.email}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-4)', textTransform: 'uppercase', fontWeight: '700' }}>Line Manager</span>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-2)' }}>{profileDetails.manager}</p>
            </div>
          </div>
        </div>

        {/* Detailed Profile Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="card-header" style={{ marginBottom: '1.25rem' }}>
              <h2 className="card-title">Employment Information</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Full Name</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{profileDetails.name}</span>
              </div>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Designation</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{profileDetails.role}</span>
              </div>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Department</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{profileDetails.dept}</span>
              </div>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Joining Date</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{profileDetails.doj}</span>
              </div>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Work Station</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>Plant 2 Dispensary Row A</span>
              </div>
              <div className="profile-info-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span className="pinfo-label" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>Contract Status</span>
                <span className="pinfo-val" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--emerald)' }}>Permanent</span>
              </div>
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <h2 className="card-title">Professional Skills &amp; Specialties</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {profileDetails.skills.map(skill => (
                <span 
                  key={skill} 
                  style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(30,64,175,0.08)', 
                    color: 'var(--blue-primary)', 
                    padding: '6px 12px', 
                    borderRadius: '20px',
                    fontWeight: '500' 
                  }}
                >
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
