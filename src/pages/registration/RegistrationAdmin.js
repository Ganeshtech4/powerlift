import React, { useEffect, useState } from 'react';

// Admin panel for managing Registration PDFs in S3 (prefix: pdfs/)
// Expected deterministic filenames:
//  - wpc-registration-form.pdf
//  - wpc-id-card-form.pdf
// Uses /api/s3/upload with forceName to store predictable keys.
// Requires server patch enabling forceName (already added).

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const TARGET_FILES = [
  { key: 'wpc-registration-form.pdf', label: 'Registration Form PDF' },
  { key: 'wpc-id-card-form.pdf', label: 'ID Card PDF' }
];

const RegistrationAdmin = () => {
  const [auth, setAuth] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [existing, setExisting] = useState({});
  const [uploading, setUploading] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('registrationAdmin') === 'true') {
      setAuth(true);
      refreshStatus();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple client-side gate (replace with real auth later)
    if (passInput === 'Rekhawpc@2023') {
      localStorage.setItem('registrationAdmin', 'true');
      setAuth(true);
      refreshStatus();
    } else {
      setMessage('Invalid admin passcode');
    }
  };

  const refreshStatus = async () => {
    setLoading(true);
    const status = {};
    for (const f of TARGET_FILES) {
      try {
        const res = await fetch(`${API_BASE}/api/s3/exists/pdfs/${encodeURIComponent(f.key)}`);
        const data = await res.json();
        status[f.key] = !!data.exists;
      } catch {
        status[f.key] = false;
      }
    }
    setExisting(status);
    setLoading(false);
  };

  const uploadFile = async (file, targetName) => {
    setUploading(u => ({ ...u, [targetName]: true }));
    setMessage('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'pdfs');
      fd.append('forceName', targetName); // deterministic name
      const res = await fetch(`${API_BASE}/api/s3/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Upload failed');
      setMessage(`${targetName} uploaded successfully.`);
      await refreshStatus();
    } catch (err) {
      setMessage(`Upload error for ${targetName}: ${err.message}`);
    } finally {
      setUploading(u => ({ ...u, [targetName]: false }));
    }
  };

  const handleSelect = (e, targetName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setMessage('Only PDF files are allowed.');
      return;
    }
    uploadFile(file, targetName);
    e.target.value = '';
  };

  const removeKey = async (targetName) => {
    if (!window.confirm(`Delete ${targetName}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/s3/delete/pdfs/${encodeURIComponent(targetName)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Delete failed');
      setMessage(`${targetName} deleted.`);
      await refreshStatus();
    } catch (err) {
      setMessage(`Delete error: ${err.message}`);
    }
  };

  if (!auth) {
    return (
      <div className="registration-admin" style={{ maxWidth: 600, margin: '40px auto', padding: '24px', border: '1px solid #ddd', borderRadius: 12 }}>
        <h3 style={{ marginBottom: 16 }}>Registration Admin Login</h3>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: 12 }}>
          <input
            type="password"
            placeholder="Admin Passcode"
            value={passInput}
            onChange={e => setPassInput(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 18px', borderRadius: 8, background: '#ff1493', color: '#fff', border: 'none', fontWeight: 600 }}>Login</button>
        </form>
        {message && <p style={{ color: 'red', marginTop: 12 }}>{message}</p>}
        <p style={{ fontSize: 12, marginTop: 16, color: '#666' }}>Temporary client-side gate. Replace with secure auth workflow.</p>
      </div>
    );
  }

  return (
    <div className="registration-admin" style={{ maxWidth: 900, margin: '40px auto', padding: '32px', border: '1px solid #ddd', borderRadius: 16, background: '#fafafa' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <h3 style={{ margin: 0 }}>Registration PDF Management</h3>
        <button onClick={refreshStatus} disabled={loading} style={{ padding: '8px 16px', borderRadius: 8, background: '#007bff', color: '#fff', border: 'none', fontWeight: 600 }}>
          {loading ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>
      <p style={{ fontSize: 14, marginTop: 8 }}>Upload or replace official registration PDFs. Files are served to users from <code>/pdfs/&lt;filename&gt;</code>.</p>
      {message && <div style={{ marginTop: 12, padding: '10px 14px', background: '#fff4f8', border: '1px solid #ffb8d9', color: '#c60055', borderRadius: 8 }}>{message}</div>}

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
        {TARGET_FILES.map(f => {
          const exists = existing[f.key];
          return (
            <div key={f.key} style={{ background: '#fff', border: '1px solid #e3e3e3', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h4 style={{ margin: 0 }}>{f.label}</h4>
              <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Key: <code>pdfs/{f.key}</code></p>
              <div style={{ fontSize: 13, fontWeight: 600, color: exists ? '#0a8f45' : '#b30000' }}>
                Status: {exists ? 'Present' : 'Missing'}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <label style={{ flex: 1 }}>
                  <input
                    type="file"
                    accept="application/pdf"
                    disabled={uploading[f.key]}
                    onChange={(e) => handleSelect(e, f.key)}
                    style={{ width: '100%', padding: '8px 0' }}
                  />
                </label>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  onClick={() => window.open(`${API_BASE}/pdfs/${encodeURIComponent(f.key)}`, '_blank')}
                  disabled={!exists}
                  style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: exists ? '#ff1493' : '#999', color: '#fff', fontWeight: 600 }}
                >
                  Preview
                </button>
                <button
                  onClick={() => removeKey(f.key)}
                  disabled={!exists || uploading[f.key]}
                  style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#dc3545', color: '#fff', fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
              {uploading[f.key] && <div style={{ fontSize: 12, color: '#666' }}>Uploading...</div>}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 32, fontSize: 12, color: '#555', lineHeight: 1.5 }}>
        <strong>Instructions:</strong>
        <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
          <li>Only PDF files are allowed.</li>
          <li>Files stored with exact keys for stable public URLs.</li>
          <li>End-user page uses these keys via <code>/pdfs/&lt;filename&gt;</code> proxy.</li>
          <li>Deleting a file instantly removes public access.</li>
          <li>Change passcode by implementing real auth later (do not rely on client gate in production).</li>
        </ul>
      </div>
    </div>
  );
};

export default RegistrationAdmin;
