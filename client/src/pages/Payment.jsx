import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id');
  const queryStatus = searchParams.get('status');

  const [activeTab, setActiveTab] = useState('pay'); // 'pay' | 'verify'
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    service: searchParams.get('service') || 'Web & SaaS Development',
    amount: searchParams.get('amount') || '',
    description: searchParams.get('package') ? `Payment for ${searchParams.get('package')}` : 'Project milestone payment',
    paymentMethod: 'upi'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Verification tab state
  const [verifyId, setVerifyId] = useState(queryId || '');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  // Handle callback or status in URL
  useEffect(() => {
    if (queryId) {
      handleDirectVerify(queryId);
    }
  }, [queryId]);

  const handleDirectVerify = async (id) => {
    setVerifying(true);
    try {
      const res = await api.get(`/payments/verify/${id}`);
      setVerifyResult(res.data.data);
      setActiveTab('verify');
    } catch (err) {
      setVerifyResult({
        error: err.response?.data?.message || 'Unable to retrieve transaction status'
      });
      setActiveTab('verify');
    } finally {
      setVerifying(false);
    }
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        amount: Number(formData.amount),
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        description: formData.description,
        paymentMethod: formData.paymentMethod
      };

      const res = await api.post('/payments/create', payload);
      const data = res.data.data;

      // If PhonePe returned gateway payload
      if (data.gatewayPayload && data.gatewayPayload.endpoint) {
        // In live mode with gateway
        setResult(data);
      } else {
        // Demo / safe mode: record created
        setResult(data);
      }
    } catch (err) {
      console.error('Payment create error:', err);
      setResult({
        error: err.response?.data?.message || 'Payment initialization failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = async (e) => {
    e.preventDefault();
    if (!verifyId.trim()) return;
    await handleDirectVerify(verifyId.trim());
  };

  const quickAmounts = [5000, 15000, 30000, 50000, 100000];

  return (
    <div className="payment-page">
      <section className="pagehero">
        <div className="container">
          <span className="kicker">CLIENT BILLING & PAYMENTS</span>
          <h1>Secure Project Payment Portal</h1>
          <p>
            Make milestone deposits, settle development invoices, or verify existing transaction status securely.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px' }}>
            <button
              type="button"
              className={`btn ${activeTab === 'pay' ? 'primary' : 'outline'}`}
              onClick={() => setActiveTab('pay')}
            >
              Make a Payment
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'verify' ? 'primary' : 'outline'}`}
              onClick={() => setActiveTab('verify')}
            >
              Verify Transaction Status
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container narrow">
          {activeTab === 'pay' ? (
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>Project Milestone Payment</h2>
                <p style={{ color: 'var(--secondary-text)', fontSize: '14px', margin: 0 }}>
                  Payments are encrypted and processed with server-side signature validation.
                </p>
              </div>

              {result && !result.error ? (
                <div className="payment-success-box animate-fade-in" style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '14px' }}>✅</div>
                  <h2 style={{ color: 'var(--primary-blue)', marginBottom: '8px' }}>Payment Initiated / Completed</h2>
                  <p style={{ color: 'var(--secondary-text)', marginBottom: '20px' }}>
                    Reference Transaction ID: <strong style={{ color: 'var(--primary-text)' }}>{result.transactionId || result.reference}</strong>
                  </p>

                  <div className="receipt-details card" style={{ textAlign: 'left', background: 'var(--card-hover-bg)', marginBottom: '24px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--secondary-text)' }}>Customer:</span>
                      <strong>{result.customerName || formData.customerName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--secondary-text)' }}>Service:</span>
                      <strong>{result.service || formData.service}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--secondary-text)' }}>Amount:</span>
                      <strong style={{ color: 'var(--primary-blue)', fontSize: '18px' }}>₹{Number(result.amount).toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--secondary-text)' }}>Status:</span>
                      <span className="badge" style={{ background: '#10B981', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {result.status?.toUpperCase() || 'SUCCESS'}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                      href={`https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20have%20completed%20payment%20of%20INR%20${result.amount}%20for%20${encodeURIComponent(result.service)}.%20Transaction%20ID:%20${result.transactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary"
                    >
                      💬 Send Receipt on WhatsApp
                    </a>
                    <button
                      type="button"
                      className="btn outline"
                      onClick={() => window.print()}
                    >
                      Print Receipt
                    </button>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => {
                        setResult(null);
                        setFormData({
                          customerName: '',
                          email: '',
                          phone: '',
                          service: 'Web & SaaS Development',
                          amount: '',
                          description: 'Project milestone payment',
                          paymentMethod: 'upi'
                        });
                      }}
                    >
                      Make Another Payment
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreatePayment} className="form">
                  {result && result.error && (
                    <div className="alert error" style={{ marginBottom: '20px' }}>
                      {result.error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <label>
                      <span>Full Name *</span>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      />
                    </label>

                    <label>
                      <span>Email Address *</span>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '14px' }}>
                    <label>
                      <span>Phone / WhatsApp *</span>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </label>

                    <label>
                      <span>Service / Category *</span>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="Web & SaaS Development">Web & SaaS Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI Solutions & Chatbots">AI Solutions & Chatbots</option>
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Automation & Digital Systems">Automation & Digital Systems</option>
                        <option value="Monthly Retainer / Maintenance">Monthly Retainer / Maintenance</option>
                        <option value="Custom Milestone Work">Custom Milestone Work</option>
                      </select>
                    </label>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label>
                      <span>Payment Amount (INR ₹) *</span>
                      <input
                        type="number"
                        required
                        min="100"
                        placeholder="e.g. 25000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        style={{ fontSize: '18px', fontWeight: 700 }}
                      />
                    </label>

                    {/* Quick Amount Chips */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className="btn ghost small"
                          style={{ padding: '4px 10px', fontSize: '12px' }}
                          onClick={() => setFormData({ ...formData, amount: amt.toString() })}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label>
                      <span>Payment Method *</span>
                      <div className="grid two" style={{ marginTop: '8px', gap: '10px' }}>
                        {[
                          ['upi', '⚡ UPI (GPay, PhonePe, Paytm)', 'Instant transfer via any UPI app'],
                          ['phonepe', '📱 PhonePe PG', 'Official PhonePe payment gateway'],
                          ['card', '💳 Debit / Credit Card', 'Visa, MasterCard, RuPay cards'],
                          ['netbanking', '🏦 Net Banking / NEFT', 'All major Indian banks']
                        ].map(([key, label, desc]) => (
                          <div
                            key={key}
                            className={`card payment-method-option ${formData.paymentMethod === key ? 'active' : ''}`}
                            onClick={() => setFormData({ ...formData, paymentMethod: key })}
                            style={{
                              padding: '14px',
                              cursor: 'pointer',
                              borderColor: formData.paymentMethod === key ? 'var(--primary-blue)' : undefined,
                              background: formData.paymentMethod === key ? 'rgba(37,99,235,0.05)' : undefined
                            }}
                          >
                            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
                            <div style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>{desc}</div>
                          </div>
                        ))}
                      </div>
                    </label>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label>
                      <span>Invoice / Milestone Description</span>
                      <input
                        type="text"
                        placeholder="e.g. Sprint 1 Kickoff Milestone"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn primary full"
                    disabled={loading}
                    style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '16px' }}
                  >
                    {loading ? 'Processing Payment...' : `Pay ₹${formData.amount ? Number(formData.amount).toLocaleString('en-IN') : '0'} Securely →`}
                  </button>

                  <p style={{ textAlign: 'center', color: 'var(--secondary-text)', fontSize: '12px', marginTop: '12px' }}>
                    🔒 256-bit SSL encrypted. Payment receipts are automatically issued and linked to your transaction ID.
                  </p>
                </form>
              )}
            </div>
          ) : (
            /* Verification Tab */
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>Verify Transaction Status</h2>
                <p style={{ color: 'var(--secondary-text)', fontSize: '14px', margin: 0 }}>
                  Enter your reference Transaction ID (e.g. TR-...) to check status and print receipts.
                </p>
              </div>

              <form onSubmit={handleManualVerify} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="text"
                  required
                  placeholder="Enter Transaction ID (e.g. TR-M1K2-9842)"
                  value={verifyId}
                  onChange={(e) => setVerifyId(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn primary" disabled={verifying}>
                  {verifying ? 'Verifying...' : 'Verify Status'}
                </button>
              </form>

              {verifyResult && (
                <div>
                  {verifyResult.error ? (
                    <div className="alert error">
                      {verifyResult.error}
                    </div>
                  ) : (
                    <div className="receipt-box card animate-fade-in" style={{ background: 'var(--card-hover-bg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span className="kicker" style={{ margin: 0 }}>TRANSACTION STATUS</span>
                        <span
                          className="badge"
                          style={{
                            background: verifyResult.verified ? '#10B981' : '#F59E0B',
                            color: '#FFFFFF',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '12px'
                          }}
                        >
                          {verifyResult.status?.toUpperCase()}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                        <div>
                          <div style={{ color: 'var(--secondary-text)', fontSize: '12px' }}>Transaction ID</div>
                          <strong>{verifyResult.transactionId}</strong>
                        </div>
                        <div>
                          <div style={{ color: 'var(--secondary-text)', fontSize: '12px' }}>Customer Name</div>
                          <strong>{verifyResult.customerName || 'N/A'}</strong>
                        </div>
                        <div>
                          <div style={{ color: 'var(--secondary-text)', fontSize: '12px' }}>Service</div>
                          <strong>{verifyResult.service || 'Technology Solutions'}</strong>
                        </div>
                        <div>
                          <div style={{ color: 'var(--secondary-text)', fontSize: '12px' }}>Amount</div>
                          <strong style={{ color: 'var(--primary-blue)', fontSize: '18px' }}>
                            ₹{Number(verifyResult.amount).toLocaleString('en-IN')}
                          </strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <a
                          href={`https://wa.me/918308367073?text=Hello%20TechRizers%2C%20inquiry%20regarding%20Transaction%20ID:%20${verifyResult.transactionId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn small outline"
                        >
                          💬 Contact Support for this Transaction
                        </a>
                        <button
                          type="button"
                          className="btn small ghost"
                          onClick={() => window.print()}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
