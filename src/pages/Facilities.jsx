import './Facilities.css'

const facilities = [
  {
    emoji: '🏨',
    title: 'Accommodation',
    desc: 'Comfortable lodging arrangements provided for all registered players throughout the tournament duration.',
    color: 'gold',
  },
  {
    emoji: '👕',
    title: 'Official Jersey',
    desc: 'Every player receives an official NGPL team jersey as part of their registration package.',
    color: 'blue',
  },
  {
    emoji: '🍽️',
    title: 'Food & Nutrition',
    desc: 'Nutritious meals and refreshments provided throughout the tournament to keep players at peak performance.',
    color: 'green',
  },
  {
    emoji: '⚡',
    title: 'Energy Drinks',
    desc: 'Professional energy drinks supplied during matches to maintain energy levels and hydration on the field.',
    color: 'gold',
  },
  {
    emoji: '🦺',
    title: 'Match Officials',
    desc: 'Qualified and certified match officials ensuring fair play and professional match management.',
    color: 'blue',
  },
  {
    emoji: '⚖️',
    title: 'Official Umpires',
    desc: 'Experienced, certified umpires officiating all matches for a professional, unbiased tournament environment.',
    color: 'silver',
  },
  {
    emoji: '🎙️',
    title: 'Commentary',
    desc: 'Live professional match commentary adding to the excitement and professional atmosphere of every game.',
    color: 'red',
  },
  {
    emoji: '📺',
    title: 'Live Streaming',
    desc: 'All matches are streamed live, giving players visibility and letting their families and fans watch every moment.',
    color: 'gold',
  },
  {
    emoji: '🏏',
    title: 'Cricket Equipment',
    desc: 'High-quality cricket equipment and match gear provided, ensuring all players can perform at their best.',
    color: 'green',
  },
]

export default function Facilities() {
  return (
    <div className="facilities-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Facilities</div>
          <h1 className="page-header__title">
            World-Class <span className="gold-text">Facilities</span>
          </h1>
          <p className="page-header__sub">
            NGPL provides everything you need to compete at your best. From accommodation to live streaming — we've got you covered.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-label">Everything Included</div>
        <h2 className="section-title">Complete <span className="gold-text">Tournament Experience</span></h2>
        <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
          Every registered player gets access to all facilities below. No hidden costs, no extra charges for the basics.
        </p>

        <div className="facilities-grid">
          {facilities.map((f, i) => (
            <div key={i} className={`facility-card facility-card--${f.color}`}>
              <div className="facility-card__emoji">{f.emoji}</div>
              <h3 className="facility-card__title">{f.title}</h3>
              <p className="facility-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* All-Inclusive Banner */}
        <div className="facilities-all-inc">
          <div className="facilities-all-inc__left">
            <div className="facilities-all-inc__icon">✅</div>
            <div>
              <h3 className="facilities-all-inc__title">All Inclusive Package</h3>
              <p className="facilities-all-inc__sub">
                All 9 facilities listed above are included with your grade registration. NGPL believes in providing a complete, professional experience for every player.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
