import { useState } from 'react';
import { 
  Briefcase, 
  Factory, 
  CalendarPlus, 
  FileDown, 
  PlusCircle, 
  CalendarDays, 
  Sun, 
  Megaphone, 
  Trophy, 
  BookOpen, 
  Search, 
  FileText, 
  PlayCircle, 
  HelpCircle, 
  Download, 
  Play, 
  FolderOpen, 
  Eye, 
  Users, 
  Mail, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Paperclip, 
  CheckCircle2, 
  CalendarCheck, 
  FileCheck, 
  ArrowRight,
  Clock,
  MessageSquare,
  User
} from 'lucide-react';

export default function Dashboard({ 
  setCurrentPage, 
  showToast, 
  tasks, 
  leaveHistory 
}) {
  const [kbSearch, setKbSearch] = useState('');
  const [kbCategory, setKbCategory] = useState('all');
  const [docSearch, setDocSearch] = useState('');

  const todayStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate leave balances
  // Casual Leaves: 8 max, Sick: 12 max, Earned: 6 max (from initial stats)
  const casualLeavesApplied = leaveHistory.filter(l => l.type === 'Casual Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);
  const sickLeavesApplied = leaveHistory.filter(l => l.type === 'Sick Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);
  const earnedLeavesApplied = leaveHistory.filter(l => l.type === 'Earned Leave' && l.status === 'Approved').reduce((acc, curr) => acc + parseInt(curr.days), 0);

  const casualRemaining = Math.max(0, 8 - casualLeavesApplied);
  const sickRemaining = Math.max(0, 12 - sickLeavesApplied);
  const earnedRemaining = Math.max(0, 6 - earnedLeavesApplied);

  // Circular stroke-dashoffset math (max circum = 201)
  const casualOffset = 201 - (201 * casualRemaining) / 8;
  const sickOffset = 201 - (201 * sickRemaining) / 12;
  const earnedOffset = 201 - (201 * earnedRemaining) / 6;

  // Knowledge Center list
  const kbDocs = [
    { name: 'Safety SOP v3.2', category: 'sops', type: 'pdf', meta: 'Updated 2 days ago' },
    { name: 'Onboarding Video Series', category: 'videos', type: 'video', meta: 'HR · 45 mins' },
    { name: 'Leave Policy FAQ', category: 'faqs', type: 'faq', meta: 'HR Dept · 15 items' },
  ];

  // Filtering mini knowledge list
  const filteredKbDocs = kbDocs.filter(doc => {
    const matchesCategory = kbCategory === 'all' || doc.category === kbCategory;
    const matchesSearch = doc.name.toLowerCase().includes(kbSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Document downloads handlers
  const handleDocAction = (type, docName) => {
    if (type === 'view') {
      showToast('info', 'Opening Document', `Loading viewer for "${docName}"...`);
    } else {
      showToast('success', 'Download Started', `"${docName}" download has begun.`);
    }
  };

  // Contacts searching
  const contacts = [
    { name: 'Amit Kumar', role: 'Lead Engineer', dept: 'Production', initials: 'AK', colorClass: 'blue' },
    { name: 'Priya Rao', role: 'HSE Officer', dept: 'Safety', initials: 'PR', colorClass: 'green' },
    { name: 'Rajan Singh', role: 'Quality Analyst', dept: 'QA', initials: 'RS', colorClass: 'purple' },
    { name: 'Meena Nair', role: 'HR Manager', dept: 'HR', initials: 'MN', colorClass: 'orange' }
  ];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(docSearch.toLowerCase()) || 
    c.dept.toLowerCase().includes(docSearch.toLowerCase())
  );

  return (
    <section className="page" id="page-dashboard">
      {/* WELCOME HERO */}
      <div className="hero-card">
        <div className="hero-bg-orb orb-1"></div>
        <div className="hero-bg-orb orb-2"></div>
        <div className="hero-left">
          <div className="hero-avatar">
            <div className="hero-avatar-ring">JD</div>
            <span className="hero-avatar-status online"></span>
          </div>
          <div className="hero-text">
            <p className="hero-greeting">Good Morning 👋</p>
            <h1 className="hero-name">John Doe</h1>
            <p className="hero-meta">
              <span className="hero-badge-role"><Briefcase className="icon-xs" /> Senior Engineer</span>
              <span className="hero-dot">·</span>
              <span className="hero-badge-dept"><Factory className="icon-xs" /> Production Department</span>
            </p>
            <p className="hero-date" id="heroDynamicDate">{todayStr}</p>
          </div>
        </div>
        <div className="hero-actions">
          <button className="hero-action-btn primary" onClick={() => setCurrentPage('leave')}>
            <CalendarPlus className="icon-sm" />
            <span>Apply Leave</span>
          </button>
          <button className="hero-action-btn secondary" onClick={() => setCurrentPage('payroll')}>
            <FileDown className="icon-sm" />
            <span>View Payslip</span>
          </button>
          <button className="hero-action-btn accent" onClick={() => setCurrentPage('tasks')}>
            <PlusCircle className="icon-sm" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* ROW 1: SUMMARY CARDS */}
      <div className="cards-grid-2x2">
        {/* Leave Balance Card */}
        <div className="card leave-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap blue">
                <CalendarDays className="icon-sm" />
              </div>
              <h2 className="card-title">Leave Balance</h2>
            </div>
            <span className="card-tag">FY 2025-26</span>
          </div>
          <div className="leave-circles">
            <div className="leave-circle-item">
              <div className="circular-progress">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-border)" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#1E40AF" strokeWidth="7"
                    strokeDasharray="201" strokeDashoffset={casualOffset} strokeLinecap="round"
                    transform="rotate(-90 40 40)"/>
                </svg>
                <span className="circle-val">{casualRemaining}</span>
              </div>
              <p className="circle-label">Casual</p>
            </div>
            <div className="leave-circle-item">
              <div className="circular-progress">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-border)" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#10B981" strokeWidth="7"
                    strokeDasharray="201" strokeDashoffset={sickOffset} strokeLinecap="round"
                    transform="rotate(-90 40 40)"/>
                </svg>
                <span className="circle-val">{sickRemaining}</span>
              </div>
              <p className="circle-label">Sick</p>
            </div>
            <div className="leave-circle-item">
              <div className="circular-progress">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-border)" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#F59E0B" strokeWidth="7"
                    strokeDasharray="201" strokeDashoffset={earnedOffset} strokeLinecap="round"
                    transform="rotate(-90 40 40)"/>
                </svg>
                <span className="circle-val">{earnedRemaining}</span>
              </div>
              <p className="circle-label">Earned</p>
            </div>
          </div>
        </div>

        {/* Upcoming Holidays Card */}
        <div className="card holiday-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap emerald">
                <Sun className="icon-sm" />
              </div>
              <h2 className="card-title">Upcoming Holidays</h2>
            </div>
          </div>
          <ul className="holiday-list">
            <li className="holiday-item">
              <div className="holiday-cal">
                <span className="cal-month">JUL</span>
                <span className="cal-day">4</span>
              </div>
              <div className="holiday-info">
                <p className="holiday-name">Independence Day</p>
                <p className="holiday-days"><Clock className="icon-xs" style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> 19 days away</p>
              </div>
              <span className="holiday-badge gazetted">National</span>
            </li>
            <li className="holiday-item">
              <div className="holiday-cal">
                <span className="cal-month">AUG</span>
                <span className="cal-day">15</span>
              </div>
              <div className="holiday-info">
                <p className="holiday-name">Freedom Day</p>
                <p className="holiday-days"><Clock className="icon-xs" style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> 61 days away</p>
              </div>
              <span className="holiday-badge">Restricted</span>
            </li>
            <li className="holiday-item">
              <div className="holiday-cal">
                <span className="cal-month">OCT</span>
                <span className="cal-day">2</span>
              </div>
              <div className="holiday-info">
                <p className="holiday-name">Gandhi Jayanti</p>
                <p className="holiday-days"><Clock className="icon-xs" style={{ display: 'inline', verticalAlign: 'text-bottom' }} /> 109 days away</p>
              </div>
              <span className="holiday-badge gazetted">National</span>
            </li>
          </ul>
        </div>

        {/* Announcements Card */}
        <div className="card announcement-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap indigo">
                <Megaphone className="icon-sm" />
              </div>
              <h2 className="card-title">Announcements</h2>
            </div>
            <span className="card-new-badge">3 New</span>
          </div>
          <ul className="announce-list">
            <li className="announce-item unread">
              <span className="announce-dot red"></span>
              <div className="announce-body">
                <p className="announce-title">Q2 Safety Audit Schedule Released</p>
                <p className="announce-meta">HR Department · 2 hours ago</p>
              </div>
              <span className="badge-chip urgent">Urgent</span>
            </li>
            <li className="announce-item unread">
              <span className="announce-dot blue"></span>
              <div className="announce-body">
                <p className="announce-title">New Work From Home Policy – Effective July 1</p>
                <p className="announce-meta">Management · Yesterday</p>
              </div>
              <span className="badge-chip info">Policy</span>
            </li>
            <li className="announce-item">
              <span className="announce-dot gray"></span>
              <div className="announce-body">
                <p className="announce-title">Production Plant Shutdown – June 22</p>
                <p className="announce-meta">Plant Manager · 3 days ago</p>
              </div>
              <span className="badge-chip neutral">Notice</span>
            </li>
            <li className="announce-item">
              <span className="announce-dot gray"></span>
              <div className="announce-body">
                <p className="announce-title">Annual Town Hall – July 8, 2025</p>
                <p className="announce-meta">CEO Office · 5 days ago</p>
              </div>
              <span className="badge-chip green">Event</span>
            </li>
          </ul>
        </div>

        {/* Recognition Card */}
        <div className="card recognition-mini-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap gold">
                <Trophy className="icon-sm" />
              </div>
              <h2 className="card-title">Recognition</h2>
            </div>
          </div>
          <div className="recog-items">
            <div className="recog-item star">
              <div className="recog-avatar-wrap">
                <div className="recog-avatar">AK</div>
                <span className="recog-award-icon">🏆</span>
              </div>
              <div className="recog-info">
                <p className="recog-name">Amit Kumar</p>
                <p className="recog-title">Employee of Month</p>
                <div className="recog-stars">★★★★★</div>
              </div>
            </div>
            <div className="recog-item safety">
              <div className="recog-avatar-wrap">
                <div className="recog-avatar green">PR</div>
                <span className="recog-award-icon">🛡️</span>
              </div>
              <div className="recog-info">
                <p className="recog-name">Priya Rao</p>
                <p className="recog-title">Safety Champion</p>
                <div className="recog-stars green">★★★★☆</div>
              </div>
            </div>
            <div className="recog-item performer">
              <div className="recog-avatar-wrap">
                <div className="recog-avatar indigo">RS</div>
                <span className="recog-award-icon">⭐</span>
              </div>
              <div className="recog-info">
                <p className="recog-name">Rajan Singh</p>
                <p className="recog-title">Star Performer</p>
                <div className="recog-stars indigo">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: MINI WIDGETS */}
      <div className="cards-row-3">
        {/* Knowledge Center Card */}
        <div className="card knowledge-mini-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap blue">
                <BookOpen className="icon-sm" />
              </div>
              <h2 className="card-title">Knowledge Center</h2>
            </div>
            <button className="card-link-btn" onClick={() => setCurrentPage('knowledge')}>View All</button>
          </div>
          <div className="kb-search-mini">
            <Search className="icon-xs" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={kbSearch}
              onChange={(e) => setKbSearch(e.target.value)}
              className="kb-input" 
            />
          </div>
          <div className="kb-chips">
            {[
              { key: 'all', label: 'All' },
              { key: 'sops', label: 'SOPs' },
              { key: 'videos', label: 'Videos' },
              { key: 'faqs', label: 'FAQs' }
            ].map(tab => (
              <span 
                key={tab.key} 
                className={`kb-chip ${kbCategory === tab.key ? 'active' : ''}`}
                onClick={() => setKbCategory(tab.key)}
              >
                {tab.label}
              </span>
            ))}
          </div>
          <ul className="kb-doc-list">
            {filteredKbDocs.map(doc => (
              <li key={doc.name} className="kb-doc-item">
                <div className={`kb-doc-icon ${doc.type}`}>
                  {doc.type === 'pdf' ? <FileText className="icon-xs" /> : 
                   doc.type === 'video' ? <PlayCircle className="icon-xs" /> : 
                   <HelpCircle className="icon-xs" />}
                </div>
                <div className="kb-doc-info">
                  <p className="kb-doc-name">{doc.name}</p>
                  <p className="kb-doc-meta">{doc.meta}</p>
                </div>
                <button className="kb-doc-action" onClick={() => handleDocAction(doc.type === 'video' ? 'view' : 'download', doc.name)}>
                  {doc.type === 'video' ? <Play className="icon-xs" /> : <Download className="icon-xs" />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Documents Card */}
        <div className="card docs-mini-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap indigo">
                <FolderOpen className="icon-sm" />
              </div>
              <h2 className="card-title">Recent Documents</h2>
            </div>
            <button className="card-link-btn" onClick={() => setCurrentPage('payroll')}>View All</button>
          </div>
          <ul className="doc-list">
            <li className="doc-item">
              <div className="doc-icon-pdf"><FileText className="icon-sm" /></div>
              <div className="doc-info">
                <p className="doc-name">Payslip – May 2025</p>
                <p className="doc-meta">Generated Jun 1, 2025</p>
              </div>
              <div className="doc-actions">
                <button className="doc-btn view" onClick={() => handleDocAction('view', 'Payslip - May 2025')}><Eye className="icon-xs" /></button>
                <button className="doc-btn download" onClick={() => handleDocAction('download', 'Payslip - May 2025')}><Download className="icon-xs" /></button>
              </div>
            </li>
            <li className="doc-item">
              <div className="doc-icon-pdf green"><FileText className="icon-sm" /></div>
              <div className="doc-info">
                <p className="doc-name">Form-16 (AY 2024-25)</p>
                <p className="doc-meta">Issued Apr 15, 2025</p>
              </div>
              <div className="doc-actions">
                <button className="doc-btn view" onClick={() => handleDocAction('view', 'Form-16 (AY 24-25)')}><Eye className="icon-xs" /></button>
                <button className="doc-btn download" onClick={() => handleDocAction('download', 'Form-16 (AY 24-25)')}><Download className="icon-xs" /></button>
              </div>
            </li>
            <li className="doc-item">
              <div className="doc-icon-pdf orange"><FileText className="icon-sm" /></div>
              <div className="doc-info">
                <p className="doc-name">Appointment Letter</p>
                <p className="doc-meta">Issued Mar 12, 2022</p>
              </div>
              <div className="doc-actions">
                <button className="doc-btn view" onClick={() => handleDocAction('view', 'Appointment Letter')}><Eye className="icon-xs" /></button>
                <button className="doc-btn download" onClick={() => handleDocAction('download', 'Appointment Letter')}><Download className="icon-xs" /></button>
              </div>
            </li>
          </ul>
        </div>

        {/* Team Directory Card */}
        <div className="card dir-mini-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon-wrap emerald">
                <Users className="icon-sm" />
              </div>
              <h2 className="card-title">Team Directory</h2>
            </div>
            <button className="card-link-btn" onClick={() => setCurrentPage('directory')}>View All</button>
          </div>
          <div className="dir-search-mini">
            <Search className="icon-xs" />
            <input 
              type="text" 
              placeholder="Find an employee..." 
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              className="kb-input" 
            />
          </div>
          <ul className="dir-list">
            {filteredContacts.map(c => (
              <li key={c.name} className="dir-item">
                <div className={`dir-avatar ${c.colorClass}`}>{c.initials}</div>
                <div className="dir-info">
                  <p className="dir-name">{c.name}</p>
                  <p className="dir-meta">{c.dept} · {c.role}</p>
                </div>
                <div className="dir-actions" style={{ display: 'flex', gap: '4px' }}>
                  <button className="dir-btn" onClick={() => showToast('info', 'Email', `Composing email to ${c.name}...`)}><Mail className="icon-xs" /></button>
                  <button className="dir-btn" onClick={() => showToast('success', 'Chat', `Starting chat with ${c.name}...`)}><MessageSquare className="icon-xs" /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MY TASKS SECTION */}
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <div className="section-title-wrap">
          <h2 className="section-title">My Tasks</h2>
          <span className="section-count">{tasks.filter(t => t.status !== 'completed').length} active</span>
        </div>
        <div className="section-actions">
          <button className="btn-outline-sm" onClick={() => setCurrentPage('tasks')}><Filter className="icon-xs" /> Filter</button>
          <button className="btn-primary-sm" onClick={() => setCurrentPage('tasks')}><Plus className="icon-xs" /> Add Task</button>
        </div>
      </div>

      {/* Task Kanban Swimlanes (Dashboard Mini-version) */}
      <div className="task-kanban">
        {/* TO DO Column */}
        <div className="task-column">
          <div className="task-col-header todo" style={{ borderBottom: 'none' }}>
            <div className="col-title-wrap">
              <span className="col-dot todo"></span>
              <h3 className="col-title">To Do</h3>
              <span className="col-count">{tasks.filter(t => t.status === 'todo').length}</span>
            </div>
            <button className="col-add-btn" onClick={() => setCurrentPage('tasks')}><Plus className="icon-xs" /></button>
          </div>
          <div className="task-cards-list">
            {tasks.filter(t => t.status === 'todo').slice(0, 2).map(task => (
              <div key={task.id} className="task-card" onClick={() => setCurrentPage('tasks')}>
                <div className="task-card-top">
                  <span className={`priority-badge ${task.priority}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                  <button className="task-menu-btn" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="icon-xs" /></button>
                </div>
                <p className="task-title">{task.title}</p>
                <p className="task-assigned">Assigned by: {task.assignee}</p>
                <div className="task-card-footer">
                  <span className="task-due"><Calendar className="icon-xs" /> {task.dueDate}</span>
                  {task.attachments > 0 && <span className="task-attach"><Paperclip className="icon-xs" /> {task.attachments}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="task-column">
          <div className="task-col-header inprogress" style={{ borderBottom: 'none' }}>
            <div className="col-title-wrap">
              <span className="col-dot inprogress"></span>
              <h3 className="col-title">In Progress</h3>
              <span className="col-count">{tasks.filter(t => t.status === 'inprogress').length}</span>
            </div>
            <button className="col-add-btn" onClick={() => setCurrentPage('tasks')}><Plus className="icon-xs" /></button>
          </div>
          <div className="task-cards-list">
            {tasks.filter(t => t.status === 'inprogress').slice(0, 2).map(task => (
              <div key={task.id} className="task-card active-task" onClick={() => setCurrentPage('tasks')}>
                <div className="task-card-top">
                  <span className={`priority-badge ${task.priority}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                  <button className="task-menu-btn" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="icon-xs" /></button>
                </div>
                <p className="task-title">{task.title}</p>
                <p className="task-assigned">Assigned by: {task.assignee}</p>
                <div className="task-progress-bar">
                  <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                </div>
                <p className="task-progress-text">{task.progress}% Complete</p>
                <div className="task-card-footer">
                  <span className="task-due"><Calendar className="icon-xs" /> {task.dueDate}</span>
                  {task.attachments > 0 && <span className="task-attach"><Paperclip className="icon-xs" /> {task.attachments}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPLETED Column */}
        <div className="task-column">
          <div className="task-col-header completed" style={{ borderBottom: 'none' }}>
            <div className="col-title-wrap">
              <span className="col-dot completed"></span>
              <h3 className="col-title">Completed</h3>
              <span className="col-count">{tasks.filter(t => t.status === 'completed').length}</span>
            </div>
          </div>
          <div className="task-cards-list">
            {tasks.filter(t => t.status === 'completed').slice(0, 2).map(task => (
              <div key={task.id} className="task-card done-task" onClick={() => setCurrentPage('tasks')}>
                <div className="task-card-top">
                  <span className="priority-badge done">Done</span>
                  <CheckCircle2 className="icon-sm done-check" />
                </div>
                <p className="task-title done-text">{task.title}</p>
                <p className="task-assigned">Completed {task.dueDate.replace('Closed ', '')}</p>
                <div className="task-card-footer">
                  <span className="task-due done-text"><CalendarCheck className="icon-xs" /> {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS & ANNOUNCEMENTS BOTTOM SECTION */}
      <div className="section-header" style={{ marginTop: '1rem' }}>
        <div className="section-title-wrap">
          <h2 className="section-title">News &amp; Announcements</h2>
          <span className="section-badge-new">5 New</span>
        </div>
        <button className="btn-outline-sm" onClick={() => setCurrentPage('news')}>View All</button>
      </div>

      <div className="news-grid">
        {/* Featured audit news card */}
        <div className="news-card featured">
          <div className="news-thumb featured-thumb blue-grad">
            <span className="news-badge-new">New</span>
            <span className="news-category-badge">Company Notice</span>
            <Megaphone className="news-thumb-icon" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="news-body">
            <p className="news-date"><Calendar className="icon-xs" /> June 15, 2025</p>
            <h3 className="news-title">Q2 Safety Audit Schedule Released for All Plant Divisions</h3>
            <p className="news-desc">The HSE department has released the comprehensive safety audit schedule for Q2 2025. All department heads are requested to ensure compliance and readiness before the audit date.</p>
            <div className="news-footer">
              <span className="news-author"><User className="icon-xs" /> HSE Department</span>
              <button className="news-read-btn" onClick={() => showToast('info', 'Safety Audit Notice', 'The detailed PDF guide has been sent to your email.')}>Read More <ArrowRight className="icon-xs" /></button>
            </div>
          </div>
        </div>

        {/* Revised WFH policy card */}
        <div className="news-card">
          <div className="news-thumb green-grad">
            <span className="news-badge-new">New</span>
            <span className="news-category-badge policy">Policy</span>
            <FileCheck className="news-thumb-icon" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="news-body">
            <p className="news-date"><Calendar className="icon-xs" /> June 14, 2025</p>
            <h3 className="news-title">Revised Work From Home Policy Effective July 1, 2025</h3>
            <p className="news-desc">Management has approved a revised WFH policy allowing up to 3 days per week for eligible employees. Check your eligibility on the HR portal.</p>
            <div className="news-footer">
              <span className="news-author"><User className="icon-xs" /> HR Management</span>
              <button className="news-read-btn" onClick={() => showToast('info', 'Leave Policy', 'Full policy PDF is available in the Knowledge Center.')}>Read More <ArrowRight className="icon-xs" /></button>
            </div>
          </div>
        </div>

        {/* Conveyor upgrade card */}
        <div className="news-card">
          <div className="news-thumb orange-grad">
            <span className="news-category-badge plant">Plant Update</span>
            <Factory className="news-thumb-icon" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="news-body">
            <p className="news-date"><Calendar className="icon-xs" /> June 12, 2025</p>
            <h3 className="news-title">Plant-3 Production Line Upgrade Completed Successfully</h3>
            <p className="news-desc">The Plant-3 production line upgrade project has been completed ahead of schedule. The new automated conveyor system is now fully operational.</p>
            <div className="news-footer">
              <span className="news-author"><User className="icon-xs" /> Plant Manager</span>
              <button className="news-read-btn" onClick={() => showToast('info', 'Maintenance Schedule', 'Maintenance checklist is assigned to technicians.')}>Read More <ArrowRight className="icon-xs" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
