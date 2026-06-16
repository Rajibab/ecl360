import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  Grid, 
  Shield, 
  Settings, 
  Users, 
  PlayCircle, 
  HelpCircle, 
  Factory, 
  CheckSquare, 
  FileText, 
  Download, 
  Eye, 
  ChevronDown, 
  ExternalLink, 
  Play,
  BookOpen
} from 'lucide-react';

export default function KnowledgeCenter({ showToast }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [faqOpen, setFaqOpen] = useState({ 0: true }); // Default first FAQ open

  // Category metadata matching data-cat keys
  const categories = [
    { key: 'all', label: 'All Documents', icon: Grid },
    { key: 'safety', label: 'Safety & HSE', icon: Shield },
    { key: 'sop', label: 'SOPs & Procedures', icon: Settings },
    { key: 'hr', label: 'HR Policies', icon: Users },
    { key: 'video', label: 'Training Videos', icon: PlayCircle },
    { key: 'faq', label: 'FAQs', icon: HelpCircle },
    { key: 'production', label: 'Production', icon: Factory },
    { key: 'quality', label: 'Quality Assurance', icon: CheckSquare },
  ];

  // Raw documents database
  const initialDocs = [
    // Safety & HSE
    { id: 'd1', title: 'Safety SOP – Confined Space Entry v3.2', categories: ['safety'], type: 'pdf', label: 'SOP', date: 'Jun 13, 2025' },
    { id: 'd2', title: 'Fire Evacuation Plan – Plant 2 (Updated)', categories: ['safety'], type: 'pdf', label: 'Emergency', date: 'Jun 5, 2025' },
    { id: 'd3', title: 'Chemical Handling & MSDS Guidelines v2.0', categories: ['safety'], type: 'pdf', label: 'Safety', date: 'Apr 22, 2025' },
    { id: 'd4', title: 'PPE Usage & Maintenance Manual', categories: ['safety'], type: 'pdf', label: 'Manual', date: 'Mar 10, 2025' },

    // SOPs & Procedures
    { id: 'd5', title: 'Machine Startup & Shutdown SOP – Line A', categories: ['sop'], type: 'pdf', label: 'SOP', date: 'May 30, 2025' },
    { id: 'd6', title: 'Equipment Calibration Procedure v1.8', categories: ['sop'], type: 'pdf', label: 'SOP', date: 'Apr 15, 2025' },
    { id: 'd7', title: 'Production Line Manual v4.0 – Full Edition', categories: ['sop', 'production'], type: 'pdf', label: 'Manual', date: 'Apr 20, 2025' },

    // HR Policies
    { id: 'd8', title: 'Leave Policy FAQs – 2025 Edition', categories: ['hr', 'faq'], type: 'faq', label: 'FAQ', date: '15 questions' },
    { id: 'd9', title: 'Employee Handbook 2025 v3.0', categories: ['hr'], type: 'pdf', label: 'Policy', date: 'Jan 1, 2025' },
    { id: 'd10', title: 'POSH Policy & Grievance Redressal 2025', categories: ['hr', 'faq'], type: 'pdf', label: 'Compliance', date: 'Feb 15, 2025' },

    // Training Videos
    { id: 'd11', title: 'Employee Onboarding – Module 1: Company Overview', categories: ['video', 'hr'], type: 'video', label: 'Video', date: '45 min' },
    { id: 'd12', title: 'Fire Safety & Emergency Procedures Training', categories: ['video', 'safety'], type: 'video', label: 'Video', date: '28 min' },
    { id: 'd13', title: 'Quality Inspection Techniques – Module 3', categories: ['video', 'quality'], type: 'video', label: 'Video', date: '33 min' },
    { id: 'd14', title: 'Leadership Skills for Engineers – Full Course', categories: ['video'], type: 'video', label: 'Video', date: '55 min' },
  ];

  // FAQ list
  const faqs = [
    { q: 'How do I apply for earned leave?', a: 'Navigate to Leave Management from the sidebar, click "Apply Leave", select "Earned Leave", fill in the dates and reason, then submit. Your manager will be notified automatically.' },
    { q: 'Where can I find my Form-16 for income tax filing?', a: 'Form-16 is available under Payroll & Documents → Form-16 (TDS Certificate). It is typically available by June 30 for the previous financial year.' },
    { q: 'How do I update my emergency contact information?', a: 'Go to My Profile → Personal tab → Emergency Contact and click "Add Emergency Contact". Changes reflect immediately and require no manager approval.' },
    { q: 'How do I request a new asset or equipment?', a: 'Navigate to Asset Management and click "Request Asset". Fill in the asset type, business justification, and urgency. Your manager approves and IT delivers within 5–7 working days.' },
    { q: 'How is the monthly Net Take-Home salary calculated?', a: 'Net = Gross Earnings − (PF + Professional Tax + TDS + ESI). A detailed breakdown is available in Payroll & Documents each month.' },
    { q: 'What is the process for asset return when leaving the company?', a: 'Contact your HR Business Partner who will initiate the asset return clearance. All assets must be returned within 2 working days of the last working day.' },
  ];

  // Helper: get document counts per category key
  const getCatCount = (catKey) => {
    if (catKey === 'all') return initialDocs.length;
    return initialDocs.filter(d => d.categories.includes(catKey)).length;
  };

  // Filter docs
  const filteredDocs = initialDocs.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.categories.includes(activeCategory);
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleUpload = () => {
    showToast('info', 'Document Upload', 'Select a document to upload to ECL 360 knowledge repository.');
  };

  const handleView = (docTitle) => {
    showToast('info', 'Document Viewer', `Opening "${docTitle}"...`);
  };

  const handleDownload = (docTitle) => {
    showToast('success', 'Download Started', `"${docTitle}" download has started successfully.`);
  };

  return (
    <div className="knowledge-content" id="page-knowledge">
      <div className="page-header">
        <div>
          <h1 className="page-title">Knowledge Center</h1>
          <p className="page-subtitle">Access SOPs, training materials, FAQs, and more</p>
        </div>
        <button className="btn-primary" onClick={handleUpload}>
          <Upload className="icon-sm" /> Upload Document
        </button>
      </div>

      <div className="kb-search-bar" style={{ display: 'flex', gap: '10px', margin: '1.25rem 0', background: 'var(--color-bg-2)', border: '1.5px solid var(--color-border)', borderRadius: '10px', padding: '6px 12px', alignItems: 'center' }}>
        <Search className="icon-sm" style={{ color: 'var(--color-text-3)' }} />
        <input 
          type="text" 
          placeholder="Search knowledge base — documents, videos, FAQs..." 
          className="kb-search-full" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ background: 'none', border: 'none', width: '100%', outline: 'none', color: 'var(--color-text)', fontSize: '0.875rem' }}
        />
        <button className="btn-primary-sm" style={{ padding: '6px 16px', borderRadius: '8px' }}>Search</button>
      </div>

      <div className="kb-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Categories Sidebar */}
        <div className="kb-sidebar">
          <h3 className="kb-sidebar-title" style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-3)', marginBottom: '0.75rem' }}>Categories</h3>
          <ul className="kb-cat-list" id="kbCategoryList" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {categories.map(cat => {
              const IconComp = cat.icon;
              return (
                <li 
                  key={cat.key} 
                  className={`kb-cat-item ${activeCategory === cat.key ? 'active' : ''}`} 
                  onClick={() => setActiveCategory(cat.key)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', color: activeCategory === cat.key ? 'var(--blue-primary)' : 'var(--color-text-2)', background: activeCategory === cat.key ? 'rgba(30,64,175,0.08)' : 'transparent', fontWeight: activeCategory === cat.key ? '600' : '400', transition: 'all 0.15s ease' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconComp className="icon-xs" /> {cat.label}
                  </span>
                  <span className="kb-cat-count" style={{ fontSize: '0.75rem', background: activeCategory === cat.key ? 'rgba(30,64,175,0.15)' : 'var(--border-light)', color: activeCategory === cat.key ? 'var(--blue-primary)' : 'var(--color-text-3)', padding: '2px 6px', borderRadius: '10px' }}>
                    {getCatCount(cat.key)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: '24px' }}>
            <h3 className="kb-sidebar-title" style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-3)', marginBottom: '0.75rem' }}>Recently Viewed</h3>
            <ul className="kb-cat-list" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li className="kb-cat-item" style={{ fontSize: '0.8rem', cursor: 'default', color: 'var(--color-text-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText className="icon-xs" style={{ color: 'var(--red)' }} /> Safety SOP v3.2
              </li>
              <li className="kb-cat-item" style={{ fontSize: '0.8rem', cursor: 'default', color: 'var(--color-text-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlayCircle className="icon-xs" style={{ color: 'var(--indigo)' }} /> Onboarding Module 1
              </li>
              <li className="kb-cat-item" style={{ fontSize: '0.8rem', cursor: 'default', color: 'var(--color-text-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle className="icon-xs" style={{ color: 'var(--emerald)' }} /> Leave Policy FAQ
              </li>
            </ul>
          </div>
        </div>

        {/* Main KB Section */}
        <div className="kb-main">
          <div className="kb-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 id="kbSectionHeading" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              {categories.find(c => c.key === activeCategory)?.label || 'All Documents'}
            </h2>
            <span className="section-count" id="kbDocCount" style={{ fontSize: '0.8125rem', color: 'var(--color-text-3)' }}>
              {filteredDocs.length} item{filteredDocs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredDocs.length === 0 ? (
            <div id="kbEmptyState" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-surface)', border: '1px dashed var(--color-border)', borderRadius: '12px' }}>
              <BookOpen style={{ width: '48px', height: '48px', color: 'var(--color-text-4)', display: 'block', margin: '0 auto 12px' }} />
              <p style={{ color: 'var(--color-text-3)', fontSize: '0.875rem' }}>No documents found matching the search or category.</p>
            </div>
          ) : (
            <div className="kb-docs-grid" id="kbDocsGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredDocs.map(doc => {
                const isVideo = doc.type === 'video';
                const isFaq = doc.type === 'faq';

                return (
                  <div key={doc.id} className="kb-doc-card">
                    <div className={`kb-doc-card-icon ${doc.type}-icon`}>
                      {isVideo ? <PlayCircle className="icon-md" /> : 
                       isFaq ? <HelpCircle className="icon-md" /> : 
                       <FileText className="icon-md" />}
                    </div>
                    <div className="kb-doc-card-body">
                      <h4 className="kb-doc-card-title">{doc.title}</h4>
                      <p className="kb-doc-card-meta">
                        <span style={{ textTransform: 'capitalize' }}>{doc.categories.join(' & ')}</span> · {doc.date}
                      </p>
                      <div className="kb-doc-card-footer">
                        <span className={`kb-doc-tag ${doc.type}`}>{doc.label}</span>
                        <div className="kb-doc-actions">
                          <button 
                            className="doc-btn view" 
                            onClick={() => handleView(doc.title)}
                            title="View Document"
                          >
                            {isVideo ? <Play className="icon-xs" /> : 
                             isFaq ? <ExternalLink className="icon-xs" /> : 
                             <Eye className="icon-xs" />}
                          </button>
                          {!isFaq && (
                            <button 
                              className="doc-btn download" 
                              onClick={() => handleDownload(doc.title)}
                              title="Download File"
                            >
                              <Download className="icon-xs" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* FAQ Accordion Section */}
          <div className="kb-section-title" style={{ marginTop: '2.5rem', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❓</span> Frequently Asked Questions
            </h2>
          </div>

          <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${faqOpen[idx] ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <ChevronDown className="icon-sm faq-chevron" style={{ transform: faqOpen[idx] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {faqOpen[idx] && (
                  <div className="faq-a" style={{ display: 'block' }}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
