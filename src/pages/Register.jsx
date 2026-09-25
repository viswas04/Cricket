import { useState, useRef } from 'react'
import {
  CheckCircle, Upload, ArrowRight, AlertCircle, User, Phone, Mail,
  MapPin, Calendar, Activity, Clock, Camera, Loader, Copy, CreditCard,
  Smartphone, ShieldCheck, ClipboardCheck, QrCode
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import './Register.css'

/* ─── Constants ─────────────────────────────────────────────── */
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwFbDLI0DVLX-P-zhgr85XYtwWFbimKiLZFasMgDUwfsrYncs_M_goicb7Gdqevuw1C/exec'

const UPI_ID   = '7989318524-2@ybl'
const UPI_NAME = 'Next%20Gen%20Premier%20League'
const UPI_AMT  = '199'
const UPI_LINK = `upi://pay?pa=7989318524-2@ybl&pn=${UPI_NAME}&am=${UPI_AMT}&cu=INR`

const PLAYING_ROLES    = ['Batsman', 'Bowler', 'All-Rounder', 'Wicket Keeper-Batsman']
const EXPERIENCE_LEVELS = [
  'Beginner (0–1 years)',
  'Developing (1–3 years)',
  'Intermediate (3–5 years)',
  'Advanced (5–8 years)',
  'Experienced (8+ years)',
]

/* ─── Helpers ────────────────────────────────────────────────── */
// Fallback-only: used when the server response cannot be read.
// Server (Apps Script) is the authoritative source of sequential IDs.
function localFallbackId() {
  const year = new Date().getFullYear()
  const ts   = String(Date.now()).slice(-4)
  return `NGPL-${year}-${ts}`
}

function calcAge(dob) {
  return Math.floor((Date.now() - new Date(dob)) / 31557600000)
}


/* ─── Validation ────────────────────────────────────────────── */
const initialForm = {
  fullName: '', dob: '', mobile: '', email: '',
  city: '', playingRole: '', experience: '', emergencyContact: '', photo: null,
}

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Full name is required'
  if (!form.dob) errors.dob = 'Date of birth is required'
  else if (calcAge(form.dob) < 15) errors.dob = 'Players must be 15 years or older'
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

/* ─── Main Component ─────────────────────────────────────────── */
export default function Register() {
  // step: 'form' | 'payment' | 'confirm' | 'done'
  const [step, setStep]               = useState('form')
  const [form, setForm]               = useState(initialForm)
  const [errors, setErrors]           = useState({})
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading]         = useState(false)
  const [submitError, setSubmitError] = useState('')
  const fileRef                       = useRef()

  // Payment step state
  const [registrationId, setRegistrationId] = useState('')
  const [copiedUpi, setCopiedUpi]           = useState(false)
  const [upiClicked, setUpiClicked]         = useState(false)

  // UTR step state
  const [utr, setUtr]               = useState('')
  const [utrError, setUtrError]     = useState('')
  const [utrLoading, setUtrLoading] = useState(false)
  const [utrSubmitErr, setUtrSubmitErr] = useState('')

  // Done screen
  const [finalData, setFinalData]   = useState(null)

  /* ── Form handlers ── */
  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }))
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

  /* ── Step 1: Submit Registration Form ── */
  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const first = document.querySelector('.reg-field--error')
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    setSubmitError('')

    try {
      const age = calcAge(form.dob)
      const now = new Date().toISOString().split('T')[0]

      const body = new URLSearchParams()
      body.append('action',             'registration')
      body.append('fullName',           form.fullName)
      body.append('dateOfBirth',        form.dob)
      body.append('age',                String(age))
      body.append('mobileNumber',       form.mobile)
      body.append('email',              form.email)
      body.append('city',               form.city)
      body.append('playingRole',        form.playingRole)
      body.append('cricketExperience',  form.experience)
      body.append('emergencyContact',   form.emergencyContact)
      body.append('playerPhoto',        photoPreview || '')
      body.append('registrationStatus', 'New')
      body.append('paymentStatus',      'Payment Verification Pending')
      body.append('paymentAmount',      '199')
      body.append('paymentDate',        now)

      // Use cors mode so we can read the server-generated UNIQUE ID back
      let serverRegId = ''
      try {
        const res  = await fetch(APPS_SCRIPT_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body:    body.toString(),
        })
        const json = await res.json()
        if (json && json.uniqueId) {
          serverRegId = json.uniqueId          // e.g. NGPL-2026-0001
        }
      } catch {
        // Network or CORS issue – fall through to localFallbackId
      }

      // Use server ID if obtained, otherwise fall back to local timestamp-based ID
      const regId = serverRegId || localFallbackId()

      setRegistrationId(regId)
      setStep('payment')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('Unable to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Step 3: Submit UTR ── */
  async function handleUtrSubmit(e) {
    e.preventDefault()
    const trimmedUtr = utr.trim()

    if (!trimmedUtr) {
      setUtrError('UTR / Transaction ID is required')
      return
    }
    if (trimmedUtr.length < 6) {
      setUtrError('Please enter a valid UTR / Transaction ID (minimum 6 characters)')
      return
    }

    setUtrLoading(true)
    setUtrSubmitErr('')
    setUtrError('')

    try {
      const now = new Date().toISOString().split('T')[0]

      const body = new URLSearchParams()
      body.append('action',         'paymentUpdate')
      body.append('registrationId', registrationId)
      body.append('utrId',          trimmedUtr)
      body.append('paymentStatus',  'Payment Verification Pending')
      body.append('paymentAmount',  '199')
      body.append('paymentDate',    now)

      // cors mode – response is informational only, no blocking on failure
      try {
        await fetch(APPS_SCRIPT_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body:    body.toString(),
        })
      } catch {
        // Network hiccup – UTR is still shown to user; admin can reconcile manually
      }

      setFinalData({
        registrationId,
        name: form.fullName,
        role: form.playingRole,
        utr: trimmedUtr,
      })
      setStep('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setUtrSubmitErr('Unable to submit payment details. Please try again.')
    } finally {
      setUtrLoading(false)
    }
  }

  /* ── UPI copy ── */
  async function handleCopyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopiedUpi(true)
      setTimeout(() => setCopiedUpi(false), 2500)
    } catch {
      // clipboard not available — user can copy manually
    }
  }

  /* ── Render ── */
  if (step === 'done')    return <DoneScreen data={finalData} />
  if (step === 'payment') return (
    <PaymentSection
      registrationId={registrationId}
      onNext={() => { setStep('confirm'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
    />
  )
  if (step === 'confirm') return (
    <UtrSection
      utr={utr}
      setUtr={setUtr}
      utrError={utrError}
      setUtrError={setUtrError}
      utrLoading={utrLoading}
      utrSubmitErr={utrSubmitErr}
      registrationId={registrationId}
      handleUtrSubmit={handleUtrSubmit}
    />
  )

  /* ── Registration Form ── */
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
                  <span>Accommodation &amp; meals provided</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Live streaming of all matches</span>
                </div>
                <div className="register-sidebar__point">
                  <CheckCircle size={15} className="reg-point-icon reg-point-icon--gold" />
                  <span>Professional umpires &amp; commentary</span>
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
                  id="fullName" name="fullName" type="text" className="reg-input"
                  placeholder="Enter your full name" value={form.fullName}
                  onChange={handleChange} autoComplete="name"
                />
                {errors.fullName && <div className="reg-error"><AlertCircle size={12} />{errors.fullName}</div>}
              </div>

              {/* DOB */}
              <div className={`reg-field ${errors.dob ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="dob">
                  <Calendar size={14} /> Date of Birth <span className="reg-required">*</span>
                </label>
                <input
                  id="dob" name="dob" type="date" className="reg-input"
                  value={form.dob} onChange={handleChange}
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
                    id="mobile" name="mobile" type="tel"
                    className="reg-input reg-input--prefixed"
                    placeholder="10-digit mobile number"
                    value={form.mobile} onChange={handleChange}
                    maxLength={10} autoComplete="tel"
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
                  id="email" name="email" type="email" className="reg-input"
                  placeholder="your@email.com" value={form.email}
                  onChange={handleChange} autoComplete="email"
                />
                {errors.email && <div className="reg-error"><AlertCircle size={12} />{errors.email}</div>}
              </div>

              {/* City */}
              <div className={`reg-field ${errors.city ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="city">
                  <MapPin size={14} /> City <span className="reg-required">*</span>
                </label>
                <input
                  id="city" name="city" type="text" className="reg-input"
                  placeholder="Your city" value={form.city}
                  onChange={handleChange} autoComplete="address-level2"
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
                  id="playingRole" name="playingRole"
                  className="reg-input reg-select"
                  value={form.playingRole} onChange={handleChange}
                >
                  <option value="">Select your playing role</option>
                  {PLAYING_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.playingRole && <div className="reg-error"><AlertCircle size={12} />{errors.playingRole}</div>}
              </div>

              {/* Experience */}
              <div className={`reg-field ${errors.experience ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="experience">
                  <Clock size={14} /> Cricket Experience <span className="reg-required">*</span>
                </label>
                <select
                  id="experience" name="experience"
                  className="reg-input reg-select"
                  value={form.experience} onChange={handleChange}
                >
                  <option value="">Select experience level</option>
                  {EXPERIENCE_LEVELS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
                {errors.experience && <div className="reg-error"><AlertCircle size={12} />{errors.experience}</div>}
              </div>

              <div className="reg-section-title" style={{ marginTop: '2rem' }}>Emergency &amp; Photo</div>

              {/* Emergency Contact */}
              <div className={`reg-field ${errors.emergencyContact ? 'reg-field--error' : ''}`}>
                <label className="reg-label" htmlFor="emergencyContact">
                  <Phone size={14} /> Emergency Contact Number <span className="reg-required">*</span>
                </label>
                <div className="reg-input-prefix">
                  <span className="reg-prefix">+91</span>
                  <input
                    id="emergencyContact" name="emergencyContact" type="tel"
                    className="reg-input reg-input--prefixed"
                    placeholder="Parent / Guardian mobile number"
                    value={form.emergencyContact} onChange={handleChange}
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
                  role="button" tabIndex={0}
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
                  ref={fileRef} type="file" accept="image/*"
                  style={{ display: 'none' }} onChange={handlePhoto}
                  aria-label="Upload player photo"
                />
                {photoPreview && (
                  <button type="button" className="reg-upload__change" onClick={() => fileRef.current?.click()}>
                    Change Photo
                  </button>
                )}
                {errors.photo && <div className="reg-error"><AlertCircle size={12} />{errors.photo}</div>}
              </div>

              {submitError && (
                <div className="reg-global-error">
                  <AlertCircle size={18} /> {submitError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg reg-submit"
                disabled={loading}
                id="register-submit-btn"
              >
                {loading ? (
                  <><Loader size={18} className="reg-spinner" /> SUBMITTING REGISTRATION...</>
                ) : (
                  <>REGISTER NOW — ₹199 <ArrowRight size={18} /></>
                )}
              </button>

              <p className="reg-disclaimer">
                By registering, you confirm that all provided information is accurate. Registration fee of ₹199
                is to be paid as per NGPL payment instructions. Grade-specific fees apply after trial selection.
              </p>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}

/* ─── Payment Section ────────────────────────────────────────── */
function PaymentSection({ registrationId, onNext }) {
  return (
    <div className="pay-page">
      <div className="pay-page__bg">
        <div className="pay-page__orb pay-page__orb--gold" />
        <div className="pay-page__orb pay-page__orb--blue" />
        <div className="pay-page__grid" />
      </div>

      <div className="pay-page__inner section">
        {/* Step indicator */}
        <div className="pay-steps">
          <div className="pay-step pay-step--done">
            <span className="pay-step__num">✓</span><span>Registration</span>
          </div>
          <div className="pay-step__line" />
          <div className="pay-step pay-step--active">
            <span className="pay-step__num">2</span><span>Payment</span>
          </div>
          <div className="pay-step__line" />
          <div className="pay-step">
            <span className="pay-step__num">3</span><span>Confirm</span>
          </div>
        </div>

        {/* QR Card */}
        <div className="qr-only-card">
          <div className="qr-only-box" id="upi-qr-code">
            <QRCodeSVG
              value={UPI_LINK}
              size={260}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="qr-only-upi-id">{UPI_ID}</div>
        </div>

        {/* Continue */}
        <button
          type="button"
          className="btn btn-primary btn-lg pay-continue-btn"
          onClick={onNext}
          id="continue-to-confirm-btn"
        >
          I HAVE PAID — CONTINUE <ArrowRight size={18} />
        </button>

        <div className="pay-reg-id-note">
          Registration ID: <strong>{registrationId}</strong>
        </div>
      </div>
    </div>
  )
}


/* ─── UTR Confirmation Section ───────────────────────────────── */
function UtrSection({ utr, setUtr, utrError, setUtrError, utrLoading, utrSubmitErr, registrationId, handleUtrSubmit }) {
  return (
    <div className="pay-page">
      <div className="pay-page__bg">
        <div className="pay-page__orb pay-page__orb--gold" />
        <div className="pay-page__orb pay-page__orb--blue" />
        <div className="pay-page__grid" />
      </div>

      <div className="pay-page__inner section">
        {/* Step indicator */}
        <div className="pay-steps">
          <div className="pay-step pay-step--done">
            <span className="pay-step__num">✓</span><span>Registration</span>
          </div>
          <div className="pay-step__line" />
          <div className="pay-step pay-step--done">
            <span className="pay-step__num">✓</span><span>Payment</span>
          </div>
          <div className="pay-step__line" />
          <div className="pay-step pay-step--active">
            <span className="pay-step__num">3</span><span>Confirm</span>
          </div>
        </div>

        <div className="pay-card">
          <div className="pay-card__header">
            <div className="pay-card__icon pay-card__icon--blue"><ClipboardCheck size={28} /></div>
            <div className="pay-card__header-text">
              <div className="pay-card__label">PAYMENT CONFIRMATION</div>
              <div className="pay-card__sub">Enter your transaction details below</div>
            </div>
          </div>

          <div className="pay-card__divider" />

          <form onSubmit={handleUtrSubmit} noValidate>
            <div className={`reg-field ${utrError ? 'reg-field--error' : ''}`}>
              <label className="reg-label" htmlFor="utr-input">
                <ShieldCheck size={14} /> UTR / Transaction ID <span className="reg-required">*</span>
              </label>
              <input
                id="utr-input"
                type="text"
                className="reg-input utr-input"
                placeholder="e.g. 426813205689 or T2609XXXX"
                value={utr}
                onChange={e => {
                  setUtr(e.target.value)
                  if (utrError) setUtrError('')
                }}
                autoComplete="off"
                spellCheck={false}
              />
              {utrError && <div className="reg-error"><AlertCircle size={12} />{utrError}</div>}
              <div className="reg-hint">
                Find your UTR in the UPI app under transaction history after payment.
              </div>
            </div>

            {utrSubmitErr && (
              <div className="reg-global-error" style={{ marginTop: '1rem' }}>
                <AlertCircle size={18} /> {utrSubmitErr}
              </div>
            )}

            <div className="utr-info-box">
              <div className="utr-info-row">
                <span className="utr-info-label">Registration ID</span>
                <span className="utr-info-value">{registrationId}</span>
              </div>
              <div className="utr-info-row">
                <span className="utr-info-label">Amount Paid</span>
                <span className="utr-info-value utr-info-value--gold">₹199</span>
              </div>
              <div className="utr-info-row">
                <span className="utr-info-label">UPI ID</span>
                <span className="utr-info-value">{UPI_ID}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg reg-submit"
              disabled={utrLoading}
              id="confirm-payment-btn"
            >
              {utrLoading ? (
                <><Loader size={18} className="reg-spinner" /> SUBMITTING PAYMENT DETAILS...</>
              ) : (
                <><ShieldCheck size={18} /> CONFIRM PAYMENT</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ─── Done Screen ────────────────────────────────────────────── */
function DoneScreen({ data }) {
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
        <div className="success-badge">REGISTRATION SUBMITTED</div>
        <h1 className="success-title">
          Welcome to <span className="gold-text">NGPL!</span>
        </h1>
        <p className="success-name">
          🏏 {data.name} — <span>{data.role}</span>
        </p>

        {/* Registration ID card */}
        <div className="done-id-card">
          <div className="done-id-row">
            <span className="done-id-label">Registration ID</span>
            <span className="done-id-value">{data.registrationId}</span>
          </div>
          <div className="done-id-divider" />
          <div className="done-id-row">
            <span className="done-id-label">Payment Status</span>
            <span className="done-id-status">⏳ Payment Verification Pending</span>
          </div>
          <div className="done-id-divider" />
          <div className="done-id-row">
            <span className="done-id-label">UTR / Transaction ID</span>
            <span className="done-id-value done-id-value--mono">{data.utr}</span>
          </div>
        </div>

        <p className="success-desc">
          Your payment will be verified by the NGPL team within 24–48 hours.
          You will be contacted on your registered mobile number and email once verified.
        </p>

        <div className="success-steps">
          <div className="success-step">
            <div className="success-step__num">1</div>
            <div className="success-step__text">Registration Submitted ✅</div>
          </div>
          <div className="success-step-arrow">→</div>
          <div className="success-step">
            <div className="success-step__num">2</div>
            <div className="success-step__text">Payment Verification ⏳</div>
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
