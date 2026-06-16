import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  Factory, 
  PartyPopper, 
  CheckSquare, 
  Newspaper 
} from 'lucide-react';

export default function News({ showToast }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tabs layout
  const tabs = [
    { key: 'all', label: 'All News' },
    { key: 'safety', label: 'Safety & HSE' },
    { key: 'policy', label: 'Policies' },
    { key: 'plant', label: 'Plant Notices' },
    { key: 'general', label: 'Corporate' },
  ];

  // News dataset
  const newsArticles = [
    {
      id: 'n1',
      title: 'Q2 Safety Audit Schedule & Preparation',
      desc: 'The HSE department will conduct the Q2 Safety and Hazard Compliance Audit across all production lines starting next Monday. All supervisors must ensure PPE compliance and update their logbooks prior to inspections.',
      category: 'safety',
      badge: 'Urgent',
      badgeClass: 'urgent',
      featured: true,
      gradClass: 'blue-grad',
      icon: ShieldAlert,
      date: 'Jun 13, 2025',
      readTime: '3 min read',
      author: 'Vikram Malhotra (HSE)',
      emailInfo: 'The detailed PDF guide has been sent to your email.'
    },
    {
      id: 'n2',
      title: 'Updated Leave Carry-Forward Policy',
      desc: 'HR has announced revised carry-forward rules for earned leaves. Starting 2026, employees can carry forward a maximum of 15 leaves to the next calendar year.',
      category: 'policy',
      badge: 'Policy',
      badgeClass: 'policy',
      featured: false,
      gradClass: 'purple-grad',
      icon: FileText,
      date: 'Jun 10, 2025',
      readTime: '4 min read',
      author: 'Neha Gupta (HR)',
      emailInfo: 'Full policy PDF is available in the Knowledge Center.'
    },
    {
      id: 'n3',
      title: 'Plant 2 Line C Maintenance Shut Down',
      desc: 'Scheduled preventive maintenance of extrusion machine C is set for Saturday, June 21, from 06:00 AM to 06:00 PM. Production will shift temporarily to Line B.',
      category: 'plant',
      badge: 'Plant 2',
      badgeClass: 'plant',
      featured: false,
      gradClass: 'orange-grad',
      icon: Factory,
      date: 'Jun 05, 2025',
      readTime: '2 min read',
      author: 'Rajesh Patel (Ops)',
      emailInfo: 'Maintenance checklist is assigned to technicians.'
    },
    {
      id: 'n4',
      title: 'Annual Employee Health Checkup Drive',
      desc: 'The annual health checkup drive is starting on July 1. Registration is mandatory on the platform under HR Wellness Services. Checkups will be conducted at the Plant 2 dispensary.',
      category: 'general',
      badge: 'Corporate',
      badgeClass: 'general',
      featured: false,
      gradClass: 'green-grad',
      icon: PartyPopper,
      date: 'May 28, 2025',
      readTime: '5 min read',
      author: 'HR Wellness',
      emailInfo: 'Registration slots are now open in wellness portal.'
    },
    {
      id: 'n5',
      title: '100% Safety Compliance Award Achieved',
      desc: 'ECL 360 celebrates achieving 200 consecutive accident-free days at Plant 2. Operations manager congratulates all teams and supervisors on this outstanding record.',
      category: 'safety',
      badge: 'Safety',
      badgeClass: 'safety',
      featured: false,
      gradClass: 'teal-grad',
      icon: CheckSquare,
      date: 'May 15, 2025',
      readTime: '3 min read',
      author: 'Sunita Rao (Ops)',
      emailInfo: 'A commemorative team lunch will be organized next week!'
    }
  ];

  // Filtering logic
  const filteredArticles = newsArticles.filter(art => {
    const matchesTab = activeTab === 'all' || art.category === activeTab;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleReadMore = (art) => {
    showToast('info', art.title, art.emailInfo);
  };

  return (
    <div className="news-content" id="page-news">
      <div className="page-header">
        <div>
          <h1 className="page-title">News &amp; Announcements</h1>
          <p className="page-subtitle">Stay informed about company updates, safety rules, and plant notices</p>
        </div>
        <div className="table-search" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid var(--color-border)', borderRadius: '10px', background: 'var(--color-surface)', padding: '6px 12px' }}>
          <Search className="icon-xs" style={{ color: 'var(--color-text-3)' }} />
          <input 
            type="text" 
            placeholder="Search announcements..." 
            id="newsSearchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'none', border: 'none', color: 'var(--color-text)', fontSize: '0.8125rem', outline: 'none' }}
          />
        </div>
      </div>

      <div className="news-filter-tabs" style={{ margin: '1.5rem 0', display: 'flex', gap: '8px' }}>
        {tabs.map(t => (
          <span 
            key={t.key} 
            className={`news-tab ${activeTab === t.key ? 'active' : ''}`} 
            onClick={() => setActiveTab(t.key)}
            style={{ cursor: 'pointer' }}
          >
            {t.label}
          </span>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div id="newsEmptyState" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-surface)', border: '1px dashed var(--color-border)', borderRadius: '12px' }}>
          <Newspaper style={{ width: '48px', height: '48px', color: 'var(--color-text-4)', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--color-text-3)', fontSize: '0.875rem' }}>No news articles matches your search query or category.</p>
        </div>
      ) : (
        <div className="news-full-grid" id="newsGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredArticles.map(art => {
            const IconComp = art.icon;
            
            return (
              <div key={art.id} className={`news-card ${art.featured ? 'featured' : ''}`} style={art.featured ? { gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' } : {}}>
                <div className={`news-thumb ${art.featured ? 'featured-thumb' : ''} ${art.gradClass}`} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {art.featured && <span className="news-badge-new">NEW</span>}
                  <span className={`news-category-badge ${art.badgeClass}`} style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    {art.badge}
                  </span>
                  <IconComp className="news-thumb-icon" style={{ color: 'white', fontSize: '2.5rem', opacity: 0.5, width: '48px', height: '48px' }} />
                </div>
                <div className="news-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span className="news-date" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--color-text-3)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar className="icon-xs" /> {art.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock className="icon-xs" /> {art.readTime}</span>
                  </span>
                  <h3 className="news-title" style={{ fontSize: art.featured ? '1.25rem' : '1rem', fontWeight: '700', color: 'var(--color-text)' }}>{art.title}</h3>
                  <p className="news-desc" style={{ fontSize: '0.8125rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{art.desc}</p>
                  <div className="news-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                    <span className="news-author" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-3)' }}>
                      <User className="icon-xs" /> {art.author}
                    </span>
                    <button className="news-read-btn" onClick={() => handleReadMore(art)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--blue-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Read More <ArrowRight className="icon-xs" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
