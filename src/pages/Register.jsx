import { useState, useRef } from 'react'
import { CheckCircle, Upload, ArrowRight, AlertCircle, User, Phone, Mail, MapPin, Calendar, Activity, Clock, Camera, Loader } from 'lucide-react'
import './Register.css'

const PLAYING_ROLES = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper-Batsman']
const EXPERIENCE_LEVELS = [
  'Beginner (0–1 years)',
  'Developing (1–3 years)',
  'Intermediate (3–5 years)',
  'Advanced (5–8 years)',
  'Experienced (8+ years)',
]

const initialForm = {
  fullName: '',
  dob: '',
  mobile: '',
  email: '',
  city: '',
  playingRole: '',
  experience: '',
  emergencyContact: '',
  photo: null,
}

const initialErrors = {}

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Full name is required'
  if (!form.dob) errors.dob = 'Date of birth is required'
  else {
    const age = Math.floor((Date.now() - new Date(form.dob)) / 31557600000)
    if (age < 15) errors.dob = 'Players must be 15 years or older'
  }
  if (!form.mobile.trim()) errors.mobile = 'Mobile number is required'
  else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errors.mobile = 'Enter a valid 10-digit Indian mobile number'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address'
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.playingRole) errors.playingRole = 'Please select your playing role'
  if (!form.experience) errors.experience = 'Please select your experience level'
  if (!form.emergencyContact.trim()) errors.emergencyContact = 'Emergency contact number is required'
  else if (!/^[6-9]\d{9}$/.test(form.emergencyContact.trim())) errors.emergencyContact = 'Enter a valid 10-digit mobile number'
  if (!form.photo) errors.photo = 'Please upload your player photo'
  return errors
}

export default function Register() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) {
      setErrors(err => ({ ...err, [name]: '' }))
    }
  }

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors(err => ({ ...err, photo: 'Please upload a valid image file (JPG, PNG, etc.)' }))
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(err => ({ ...err, photo: 'Photo must be under 5MB' }))
      return
    }
    setForm(f => ({ ...f, photo: file }))
    setErrors(err => ({ ...err, photo: '' }))
    const reader = new FileReader()
    reader.onload = ev => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll to first error
      const first = document.querySelector('.reg-field--error')
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  if (submitted) {
    return <SuccessScreen name={form.fullName} role={form.playingRole} />
  }

  return (
    <div className="register-page">

      <div className="page-header">
        <div className="page-header__bg">
          <div className="page-header__orb page-header__orb--gold" />
          <div className="page-header__orb page-header__orb--blue" />
          <div className="page-header__grid" />
        </div>
        <div className="page-header__content section">
          <div className="section-label">Registration</div>
          <h1 className="page-header__title">
            Your Next Chapter <span className="gold-text">Starts Here</span>
          </h1>
          <p className="page-header__sub">
            Register for NGPL Season 1 for just ₹199. Fill in your details below and let your cricket journey begin.
          </p>
        </div>
      </div>

      <section className="section register-section">
        <div className="register-layout">

          {/* Sidebar Info */}
          <div className="register-sidebar">
            <div className="register-sidebar__card">
              <div className="register-sidebar__fee">
                <span className="register-sidebar__fee-label">Registration Fee</span>
                <span className="register-sidebar__fee-amount">₹199</span>
              </div>
              <div className="register-sidebar__divider" />
              <div className="register-sidebar__points">
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Open to players 15+ years</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Grade selection after trials</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Official jersey included</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Accommodation & meals provided</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Live streaming of all matches</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Professional umpires & commentary</span>
                </div>
              </div>
              <div className="register-sidebar__divider" />
              <div className="register-sidebar__venue">
                <MapPin size={14} className="register-sidebar__venue-icon" />
                <div>
                  <div className="register-sidebar__venue-name">Tau Devi Lal Stadium</div>
                  <div className="register-sidebar__venue-loc">Gurgaon, Haryana</div>
                </div>
              </div>
            </div>

            <div className="register-sidebar__prize-peek">
              <div className="register-sidebar__prize-label">Winner Prize</div>
              <div className="register-sidebar__prize-amount">₹61,000</div>
              <div className="register-sidebar__prize-sub">Could be yours</div>
            </div>
          </div>

          {/* Form */}
          <div className="register-form-wrap">
            <form className="register-form" onSubmit={handleSubmit} noValidate>

              <div className="reg-section-title">Personal Information</div>

              {/* Full Name */}
              <div className={`reg-field ${errors.fullName ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="fullName">
                  <User size={14} /> Full Name <span className="reg-required">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="reg-input"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.fullName && <div className="reg-error"><AlertCircle size={12} />{errors.fullName}</div>}
              </div>

              {/* DOB */}
              <div className={`reg-field ${errors.dob ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="dob">
                  <Calendar size={14} /> Date of Birth <span className="reg-required">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  className="reg-input"
                  value={form.dob}
                  onChange={handleChange}
                  max={new Date(Date.now() - 15 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
                {errors.dob && <div className="reg-error"><AlertCircle size={12} />{errors.dob}</div>}
                <div className="reg-hint">Must be 15 years or older</div>
              </div>

              {/* Mobile */}
              <div className={`reg-field ${errors.mobile ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="mobile">
                  <Phone size={14} /> Mobile Number <span className="reg-required">*</span>
                </label>
                <div className="reg-input-prefix">
                  <span className="reg-prefix">+91</span>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    className="reg-input reg-input--prefixed"
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    autoComplete="tel"
                  />
                </div>
                {errors.mobile && <div className="reg-error"><AlertCircle size={12} />{errors.mobile}</div>}
              </div>

              {/* Email */}
              <div className={`reg-field ${errors.email ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="email">
                  <Mail size={14} /> Email Address <span className="reg-required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="reg-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <div className="reg-error"><AlertCircle size={12} />{errors.email}</div>}
              </div>

              {/* City */}
              <div className={`reg-field ${errors.city ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="city">
                  <MapPin size={14} /> City <span className="reg-required">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="reg-input"
                  placeholder="Your city"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                />
                {errors.city && <div className="reg-error"><AlertCircle size={12} />{errors.city}</div>}
              </div>

              <div className="reg-section-title" style={{ marginTop: '2rem' }}>Cricket Profile</div>

              {/* Playing Role */}
              <div className={`reg-field ${errors.playingRole ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="playingRole">
                  <Activity size={14} /> Playing Role <span className="reg-required">*</span>
                </label>
                <select
                  id="playingRole"
                  name="playingRole"
                  className="reg-input reg-select"
                  value={form.playingRole}
                  onChange={handleChange}
                >
                  <option value="">Select your playing role</option>
                  {PLAYING_ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.playingRole && <div className="reg-error"><AlertCircle size={12} />{errors.playingRole}</div>}
              </div>

              {/* Experience */}
              <div className={`reg-field ${errors.experience ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="experience">
                  <Clock size={14} /> Cricket Experience <span className="reg-required">*</span>
                </label>
                <select
                  id="experience"
                  name="experience"
                  className="reg-input reg-select"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option value="">Select experience level</option>
                  {EXPERIENCE_LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
                {errors.experience && <div className="reg-error"><AlertCircle size={12} />{errors.experience}</div>}
              </div>

              <div className="reg-section-title" style={{ marginTop: '2rem' }}>Emergency & Photo</div>

              {/* Emergency Contact */}
              <div className={`reg-field ${errors.emergencyContact ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="emergencyContact">
                  <Phone size={14} /> Emergency Contact Number <span className="reg-required">*</span>
                </label>
                <div className="reg-input-prefix">
                  <span className="reg-prefix">+91</span>
                  <input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="tel"
                    className="reg-input reg-input--prefixed"
                    placeholder="Parent / Guardian mobile number"
                    value={form.emergencyContact}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
                {errors.emergencyContact && <div className="reg-error"><AlertCircle size={12} />{errors.emergencyContact}</div>}
              </div>

              {/* Photo Upload */}
              <div className={`reg-field ${errors.photo ? 'reg-field--error' : ''}`}>
                <label className="reg-label">
                  <Camera size={14} /> Player Photo <span className="reg-required">*</span>
                </label>
                <div
                  className={`reg-upload ${photoPreview ? 'reg-upload--has-photo' : ''}`}
                  onClick={() => fileRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
                  aria-label="Upload player photo"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Player preview" className="reg-upload__preview" />
                  ) : (
                    <div className="reg-upload__inner">
                      <Upload size={28} className="reg-upload__icon" />
                      <span className="reg-upload__main">Click to upload your photo</span>
                      <span className="reg-upload__sub">JPG, PNG, WEBP up to 5MB</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhoto}
                  aria-label="Upload player photo"
                />
                {photoPreview && (
                  <button
                    type="button"
                    className="reg-upload__change"
                    onClick={() => fileRef.current?.click()}
                  >
                    Change Photo
                  </button>
                )}
                {errors.photo && <div className="reg-error"><AlertCircle size={12} />{errors.photo}</div>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg reg-submit"
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="reg-spinner" />
                    Submitting Registration...
                  </>
                ) : (
                  <>
                    REGISTER NOW — ₹199
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="reg-disclaimer">
                By registering, you confirm that all provided information is accurate. Registration fee of ₹199 is to be paid as per NGPL payment instructions. Grade-specific fees apply after trial selection.
              </p>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}

function SuccessScreen({ name, role }) {
  return (
    <div className="success-screen">
      <div className="success-screen__bg">
        <div className="success-screen__orb success-screen__orb--gold" />
        <div className="success-screen__orb success-screen__orb--blue" />
        <div className="success-screen__grid" />
      </div>
      <div className="success-screen__content">
        <div className="success-icon">
          <CheckCircle size={48} />
        </div>
        <div className="success-badge">Registration Successful!</div>
        <h1 className="success-title">
          Welcome to <span className="gold-text">NGPL!</span>
        </h1>
        <p className="success-name">
          🏏 {name} — <span>{role}</span>
        </p>
        <p className="success-desc">
          Your registration has been received successfully. Our team will review your application and contact you with further details about the trial schedule at <strong>Tau Devi Lal Stadium, Gurgaon</strong>.
        </p>
        <div className="success-steps">
          <div className="success-step">
            <div className="success-step__num">1</div>
            <div className="success-step__text">Registration Submitted ✅</div>
          </div>
          <div className="success-step-arrow">→</div>
          <div className="success-step">
            <div className="success-step__num">2</div>
            <div className="success-step__text">Trial Notification (Coming Soon)</div>
          </div>
          <div className="success-step-arrow">→</div>
          <div className="success-step">
            <div className="success-step__num">3</div>
            <div className="success-step__text">Grade Selection</div>
          </div>
          <div className="success-step-arrow">→</div>
          <div className="success-step">
            <div className="success-step__num">4</div>
            <div className="success-step__text">Tournament Begins</div>
          </div>
        </div>
        <div className="success-tagline">Play • Compete • Be the Next Gen Star</div>
      </div>
    </div>
  )
}
