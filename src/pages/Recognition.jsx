import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Award, 
  Heart, 
  ShoppingBag 
} from 'lucide-react';

export default function Recognition({ 
  userPointsBalance, 
  setUserPointsBalance, 
  showToast 
}) {
  const [nominee, setNominee] = useState('');
  const [category, setCategory] = useState('Safety First');
  const [reason, setReason] = useState('');

  // Initial recognitions list
  const [awards, setAwards] = useState([
    {
      id: 'aw1',
      ribbon: 'Gold Award',
      ribbonClass: 'performer',
      cardClass: 'gold-award',
      avatarBg: 'blue',
      initials: 'AK',
      trophy: '🏆',
      name: 'Amit Kumar',
      dept: 'Production · Lead Engineer',
      desc: 'Amit went above and beyond to repair the Line A extruder failure on Saturday, avoiding a major production delay. Amazing engineering!',
      stars: 5,
      tags: ['Execution', 'Problem Solving']
    },
    {
      id: 'aw2',
      ribbon: 'Safety Champion',
      ribbonClass: 'safety',
      cardClass: 'silver-award',
      avatarBg: 'green',
      initials: 'PS',
      trophy: '🛡️',
      name: 'Priya Sharma',
      dept: 'Quality Assurance · Specialist',
      desc: 'Priya identified a safety gap in chemical storage ventilation and immediately set up new air quality monitoring systems.',
      stars: 5,
      tags: ['Safety First', 'HSE']
    },
    {
      id: 'aw3',
      ribbon: 'Mentorship',
      ribbonClass: 'performer',
      cardClass: 'bronze-award',
      avatarBg: 'indigo',
      initials: 'RP',
      trophy: '🤝',
      name: 'Rajesh Patel',
      dept: 'Operations · Senior Supervisor',
      desc: 'Rajesh spent extra hours onboarding the new technician crew and teaching them line safety. Deeply appreciated.',
      stars: 3,
      tags: ['Teamwork', 'Coaching']
    },
    {
      id: 'aw4',
      ribbon: '5 Years Service',
      ribbonClass: 'service',
      cardClass: 'service-award',
      avatarBg: 'orange',
      initials: 'SR',
      trophy: '✨',
      name: 'Sunita Rao',
      dept: 'Operations · Manager',
      desc: 'Celebrating 5 years of stellar operations management at Plant 2. Inspiring leader and fantastic mentor!',
      stars: 5,
      tags: ['Excellence', 'Leadership']
    }
  ]);

  // Form submission
  const handleNominate = (e) => {
    e.preventDefault();
    if (!nominee || !reason) return;

    if (userPointsBalance < 100) {
      showToast('warning', 'Points Balance', 'Insufficient points to submit nomination. You need 100 pts.');
      return;
    }

    // Deduct points
    setUserPointsBalance(prev => prev - 100);

    const initials = nominee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newAward = {
      id: 'aw_' + (awards.length + 1),
      ribbon: category,
      ribbonClass: category === 'Safety First' ? 'safety' : 'performer',
      cardClass: 'silver-award',
      avatarBg: 'indigo',
      initials: initials,
      trophy: '✨',
      name: nominee,
      dept: 'Nominated by You',
      desc: `"${reason}"`,
      stars: 5,
      tags: [category, 'Peer Award']
    };

    setAwards([newAward, ...awards]);
    showToast('success', 'Nomination Submitted!', `You nominated ${nominee} for "${category}". 100 pts deducted.`);

    // Reset fields
    setNominee('');
    setReason('');
  };

  // Redeeming store item
  const handleRedeem = (itemName, cost) => {
    if (userPointsBalance >= cost) {
      setUserPointsBalance(prev => prev - cost);
      showToast('success', 'Reward Redeemed!', `You have redeemed a "${itemName}" for ${cost} pts. Check your email for details.`);
    } else {
      showToast('error', 'Redemption Failed', `Insufficient points. You need ${cost} pts (Current: ${userPointsBalance}).`);
    }
  };

  // Colleague options
  const nomineesList = [
    'Amit Kumar',
    'Priya Sharma',
    'Rajesh Patel',
    'Vikram Malhotra',
    'Sunita Rao'
  ];

  return (
    <div className="recognition-content" id="page-recognition">
      <div className="page-header">
        <div>
          <h1 className="page-title">Recognition &amp; Rewards</h1>
          <p className="page-subtitle">Praise your teammates, redeem points, and celebrate success together</p>
        </div>
      </div>

      <div className="recog-hero-banner" style={{ margin: '1.5rem 0' }}>
        <div className="recog-hero-text">
          <h2>🏆 Celebrate Achievements &amp; Praise Peers</h2>
          <p>Earn reward points for safety compliance, excellence, and collaborative work!</p>
        </div>
      </div>

      {/* Points Stats using standard cards-row-3 layout */}
      <div className="cards-row-3" style={{ marginBottom: '2rem' }}>
        <div className="card stat-card blue-stat">
          <div className="stat-icon-wrap blue"><Star className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Your Reward Points</p>
            <h2 className="stat-value" id="userPointsBalance">{userPointsBalance.toLocaleString()}</h2>
            <p className="stat-sub">Redeemable in the Reward Store</p>
          </div>
        </div>
        <div className="card stat-card green-stat">
          <div className="stat-icon-wrap green"><CheckCircle2 className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Safety Nominations Approved</p>
            <h2 className="stat-value">6</h2>
            <p className="stat-sub">This quarter</p>
          </div>
        </div>
        <div className="card stat-card orange-stat">
          <div className="stat-icon-wrap orange"><Award className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Recognitions Received</p>
            <h2 className="stat-value">12</h2>
            <p className="stat-sub">From colleagues &amp; managers</p>
          </div>
        </div>
      </div>

      {/* Wall of Fame */}
      <div className="kb-section-title" style={{ margin: '2rem 0 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>🏅 Wall of Fame — Recent Recognitions</h2>
      </div>

      {/* Let CSS handle columns */}
      <div className="recog-awards-grid" id="recogGrid">
        {awards.map(aw => (
          <div key={aw.id} className={`award-card ${aw.cardClass}`} style={{ position: 'relative' }}>
            <span className={`award-ribbon ${aw.ribbonClass}`}>{aw.ribbon}</span>
            <div className={`award-avatar-lg ${aw.avatarBg}`}>{aw.initials}</div>
            <div className="award-trophy">{aw.trophy}</div>
            <div className="award-name">{aw.name}</div>
            <div className="award-dept">{aw.dept}</div>
            <p className="award-achievement">{aw.desc}</p>
            <div className={`award-stars ${aw.avatarBg}`}>
              {'★'.repeat(aw.stars)}{'☆'.repeat(5 - aw.stars)}
            </div>
            <div className="award-tags">
              {aw.tags.map(t => (
                <span key={t} className={`award-tag ${aw.ribbonClass}`}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nomination Form & Store */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', marginTop: '2.5rem' }}>
        {/* Nomination Form */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <div className="card-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="card-icon-wrap orange" style={{ background: 'rgba(217,119,6,0.1)', color: 'var(--gold)', padding: '6px', borderRadius: '6px' }}>
                <Heart className="icon-sm" />
              </div>
              <h2 className="card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Nominate a Colleague</h2>
            </div>
          </div>
          <form className="leave-form" id="nominationForm" onSubmit={handleNominate}>
            <div className="form-group">
              <label className="form-label">Choose Nominee</label>
              <select 
                className="form-input" 
                value={nominee} 
                onChange={(e) => setNominee(e.target.value)} 
                required
              >
                <option value="">Select teammate...</option>
                {nomineesList.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Core Value / Category</label>
              <select 
                className="form-input" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
              >
                <option value="Safety First">Safety First &amp; HSE Compliance</option>
                <option value="Execution">Execution &amp; Operational Excellence</option>
                <option value="Collaboration">Collaboration &amp; Teamwork</option>
                <option value="Problem Solving">Problem Solving &amp; Innovation</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Describe their contribution</label>
              <textarea 
                className="form-input form-textarea" 
                placeholder="What did they do and how did it help?" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn-primary">Submit Nomination</button>
          </form>
        </div>

        {/* Reward Store */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="card-header" style={{ marginBottom: '1rem' }}>
            <div className="card-title-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="card-icon-wrap blue" style={{ background: 'rgba(79,70,229,0.1)', color: 'var(--indigo)', padding: '6px', borderRadius: '6px' }}>
                <ShoppingBag className="icon-sm" />
              </div>
              <h2 className="card-title" style={{ fontSize: '1rem', fontWeight: '700' }}>Reward Redemption Store</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { emoji: '🎁', title: 'Amazon Gift Card (₹1000)', cost: 1000 },
              { emoji: '🎒', title: 'ECL Branded Backpack', cost: 1500 },
              { emoji: '✈️', title: 'Extra Paid Leave Day', cost: 2000 },
              { emoji: '☕', title: 'Starbucks Coffee Voucher', cost: 400 }
            ].map(item => (
              <div 
                key={item.title} 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: '12px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center', 
                  gap: '8px', 
                  background: 'var(--color-bg-2)' 
                }}
              >
                <div style={{ fontSize: '1.5rem' }}>{item.emoji}</div>
                <strong style={{ fontSize: '0.8rem', lineHeight: 1.2, color: 'var(--color-text)' }}>{item.title}</strong>
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--blue-primary)', 
                    fontWeight: 700, 
                    background: 'rgba(30,64,175,0.08)', 
                    padding: '2px 6px', 
                    borderRadius: '4px' 
                  }}
                >
                  {item.cost.toLocaleString()} pts
                </span>
                <button 
                  className="btn-primary-sm" 
                  onClick={() => handleRedeem(item.title, item.cost)} 
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
