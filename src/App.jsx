import React, { useEffect, useState } from 'react'

export default function App() {
  const [refId, setRefId] = useState('WA-000000')
  const [currentSection, setCurrentSection] = useState(1)
  const [name, setName] = useState('Muhammad Saqib')
  const [countryCode, setCountryCode] = useState('+92')
  const [phone, setPhone] = useState('3478936242')
  const [selectedEmailType, setSelectedEmailType] = useState(null)
  const [previewSubject, setPreviewSubject] = useState('')
  const [previewBody, setPreviewBody] = useState('Loading email content...')

  useEffect(() => {
    const rand = Math.floor(100000 + Math.random() * 900000)
    const id = 'WA-' + rand
    setRefId(id)
  }, [])

  useEffect(() => {
    if (currentSection === 3) updateEmailPreview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, selectedEmailType, name, countryCode, phone])

  function formatNumber(country, number) {
    // Try to format US-like numbers, fallback to raw
    const digits = number.replace(/\D/g, '')
    if (digits.length === 10) {
      return `${country} ${digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2$3')}`
    }
    return `${country} ${number}`
  }

  function nextSection(next) {
    if (next === 2 && (!name.trim() || !phone.trim())) {
      alert('Please enter your name and WhatsApp number first.')
      return
    }
    if (next === 3 && !selectedEmailType) {
      alert('Please select an email type first.')
      return
    }
    setCurrentSection(next)
  }

  function prevSection(prev) {
    setCurrentSection(prev)
  }

  function selectEmailType(type) {
    setSelectedEmailType(type)
  }

  function updateEmailPreview() {
    const formattedNumber = formatNumber(countryCode, phone)
    let subject, body

    if (selectedEmailType === 'recovery') {
      subject = `Account Recovery Request - WhatsApp Number ${formattedNumber}`
      body = `Dear WhatsApp Support Team,

I hope you are doing well.

I am writing this email to kindly request a review of my WhatsApp account which has been banned recently. I believe this ban may have been applied by mistake, as I have not knowingly violated any WhatsApp Terms of Service or Community Guidelines.

My WhatsApp number is:
📞 ${formattedNumber}

This number is very important to me as I use it for personal communication, family contact, and daily use. I always try to follow WhatsApp rules and use the app responsibly.

If any activity from my account unintentionally violated your policies, I sincerely apologize and assure you that it will not happen again in the future. I kindly request you to please review my account and restore access if possible.

Thank you for your time and support. I look forward to your positive response.

Kind regards,
${name}
Pakistan`
    } else {
      subject = `Permanent Ban Request - WhatsApp Number ${formattedNumber}`
      body = `Dear WhatsApp Support Team,

I hope you are doing well.

I am writing this email to request the permanent ban of my WhatsApp number due to serious security concerns. I believe my WhatsApp account may have been hacked or accessed by someone else without my permission, and there is a risk that it could be misused.

My WhatsApp number is:
📞 ${formattedNumber}

To avoid any misuse, scams, or illegal activity from my number, I kindly request you to please permanently ban or deactivate this WhatsApp account as soon as possible.

This request is being made for my personal safety and security, as the number may have fallen into the wrong hands.

Thank you for your understanding and prompt support. I will appreciate your quick action in this matter.

Kind regards,
${name}
Pakistan`
    }

    setPreviewSubject(subject)
    setPreviewBody(body)
  }

  function sendEmail() {
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and WhatsApp number first.')
      return
    }
    if (!selectedEmailType) {
      alert('Please select an email type first.')
      return
    }

    const formattedNumber = formatNumber(countryCode, phone)
    const recipient = 'support@whatsapp.com'
    const subject = previewSubject || `WhatsApp Support - ${formattedNumber}`
    const body = previewBody || ''

    // Open mail client
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    // Update UI state briefly (could be enhanced)
    window.location.href = mailtoLink
    // Show a quick UI feedback
    showSuccessMessage()
  }

  function showSuccessMessage() {
    // Simple alert; can be replaced with in-app toast
    const el = document.createElement('div')
    el.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm'
    el.innerHTML = `
      <div class="flex items-start">
        <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-bold">Email App Opened!</p>
          <p class="text-sm mt-1">Your email is ready. Just click <strong>SEND</strong> in your email app to submit to WhatsApp Support.</p>
        </div>
      </div>
    `
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 6000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md glass-card overflow-hidden">
        {/* Header */}
        <div className="whatsapp-dark-green p-8 text-white text-center relative">
          <div className="flex justify-center mb-3">
            <svg viewBox="0 0 24 24" width="50" height="50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">WhatsApp Support</h1>
          <p className="text-green-100 text-sm opacity-90">Account Management Tool</p>
          <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full">
            <p className="text-[10px] font-mono" id="refId">{refId}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <div className={`${currentSection === 1 ? 'step-active' : currentSection > 1 ? 'step-completed' : 'step-active'} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>1</div>
              <span className="text-xs font-medium text-gray-700">Your Info</span>
            </div>
            <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className={`${currentSection === 2 ? 'step-active' : currentSection > 2 ? 'step-completed' : 'step-inactive'} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>2</div>
              <span className={`text-xs font-medium ${currentSection >= 2 ? 'text-gray-700' : 'text-gray-500'}`}>Choose Action</span>
            </div>
            <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className={`${currentSection === 3 ? 'step-active' : 'step-inactive'} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>3</div>
              <span className="text-xs font-medium text-gray-500">Send Email</span>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-6">
          {/* Section 1 */}
          <div className={`form-section space-y-6 ${currentSection !== 1 ? 'hidden-section' : ''}`}>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Your Information</label>

              <div className="space-y-3">
                <input
                  type="text"
                  id="userName"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />

                <div className="flex space-x-2">
                  <select id="countryCode" className="w-1/3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                    <option value="+92">🇵🇰 +92</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                  </select>

                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="WhatsApp Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-2/3 bg-gray-50 border border-gray-200 rounded-xl p-4 text-lg font-medium focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-[11px] text-blue-800 leading-normal">
                Your information will be used to generate the support email. The email will open in your email app with all details pre-filled.
              </p>
            </div>

            <button
              onClick={() => nextSection(2)}
              className="whatsapp-btn w-full whatsapp-green hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>Continue to Next Step</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Section 2 */}
          <div className={`form-section hidden-section space-y-6 ${currentSection !== 2 ? 'hidden-section' : ''}`}>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-4">Select Email Type</label>

              <div className="space-y-4">
                <div
                  className={`email-option recovery border border-gray-200 rounded-xl p-5 hover:shadow-md ${selectedEmailType === 'recovery' ? 'selected' : ''}`}
                  onClick={() => selectEmailType('recovery')}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Account Recovery Request</h3>
                      <p className="text-sm text-gray-600 mt-1">Request WhatsApp to review and unban your account if it was banned by mistake.</p>
                      <div className="mt-3 text-xs text-green-600 font-medium">
                        ✓ Use if your account was banned
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`email-option ban border border-gray-200 rounded-xl p-5 hover:shadow-md ${selectedEmailType === 'ban' ? 'selected' : ''}`}
                  onClick={() => selectEmailType('ban')}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Permanent Ban Request</h3>
                      <p className="text-sm text-gray-600 mt-1">Request WhatsApp to permanently ban your account due to security concerns.</p>
                      <div className="mt-3 text-xs text-red-600 font-medium">
                        ⚠️ Use if account is hacked or compromised
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-yellow-800">
                  <span className="font-bold">Important:</span> Please select carefully. Once sent, the request will be processed by WhatsApp's support team.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => prevSection(1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
              <button
                onClick={() => nextSection(3)}
                id="continueBtn"
                className={`flex-1 ${selectedEmailType ? 'whatsapp-green text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500'} font-medium py-4 rounded-xl transition-all flex items-center justify-center space-x-2`}
                disabled={!selectedEmailType}
              >
                <span>Continue</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Section 3 */}
          <div className={`form-section hidden-section space-y-6 ${currentSection !== 3 ? 'hidden-section' : ''}`}>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2">Email Preview</label>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="text-sm font-medium">support@whatsapp.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Reference</p>
                    <p className="text-sm font-mono font-bold text-green-600" id="previewRefId">{refId}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500">Subject</p>
                  <p className="text-sm font-medium" id="previewSubject">{previewSubject}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Email Body Preview</p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="text-sm text-gray-700 whitespace-pre-line" id="previewBody">
                      {previewBody}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-800">Ready to Send!</p>
                  <p className="text-xs text-green-700 mt-1">Click the button below. Your email app will open with this pre-written email. Just click "Send" in your email app.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => prevSection(2)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
              <button
                onClick={sendEmail}
                className="pulse flex-1 whatsapp-green hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
                id="sendButton"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Open Email to Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Official WhatsApp Support Tool • Muhammad Saqib</p>
        </div>
      </div>
    </div>
  )
}