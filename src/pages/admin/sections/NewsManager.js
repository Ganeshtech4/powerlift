import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';

const fmtDate = (d) => {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return d; }
};

/* ════════════════════════════════════════════ */
const NewsManager = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/news/');
      setNews(res.data);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this news item?')) return;
    try {
      await axiosInstance.delete(`/news/${id}`);
      fetchNews();
    } catch {
      alert('Delete failed.');
    }
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      await axiosInstance.put(`/news/${item.id}`, { status: newStatus });
      fetchNews();
    } catch {
      alert('Status update failed.');
    }
  };

  const toggleFeatured = async (item) => {
    try {
      await axiosInstance.put(`/news/${item.id}`, { is_featured: !item.is_featured });
      fetchNews();
    } catch {
      alert('Update failed.');
    }
  };

  /* ── filtering ── */
  const filtered = news.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || n.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: news.length,
    published: news.filter(n => n.status === 'published').length,
    draft: news.filter(n => n.status === 'draft').length,
    featured: news.filter(n => n.is_featured).length,
  };

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <div className="partnerships-manager"> {/* reuse existing manager CSS */}

      {/* Header */}
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-newspaper" /> News &amp; Media</h2>
          <p className="subtitle">Manage newspaper coverage, announcements, and championship updates</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/admin/news/new')}>
          <i className="fas fa-plus" /> Add News
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: 'Total', value: counts.all, icon: 'newspaper', cls: 'total' },
          { label: 'Published', value: counts.published, icon: 'check-circle', cls: 'assigned' },
          { label: 'Draft', value: counts.draft, icon: 'edit', cls: 'available' },
          { label: 'Featured', value: counts.featured, icon: 'star', cls: 'total' },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div className="stat-icon"><i className={`fas fa-${s.icon}`} /></div>
            <div className="stat-content"><h3>{s.value}</h3><p>{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filters-section" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-box" style={{ flex: 1, minWidth: 200 }}>
          <i className="fas fa-search" />
          <input type="text" placeholder="Search by title or category…"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}
        >
          <option value="all">All Status ({counts.all})</option>
          <option value="published">Published ({counts.published})</option>
          <option value="draft">Draft ({counts.draft})</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: 32, color: '#c0392b' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
          <i className="fas fa-newspaper" style={{ fontSize: 48, marginBottom: 16, display: 'block' }} />
          <p style={{ fontSize: 18, fontWeight: 600 }}>No news items found.</p>
          <button className="btn-primary" onClick={() => navigate('/admin/news/new')} style={{ marginTop: 16 }}>
            <i className="fas fa-plus" /> Add First News Item
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.thumbnail_url || item.image_url}
                      alt={item.title}
                      style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: 260 }}>
                    <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </div>
                  </td>
                  <td>
                    <span style={{
                      background: '#f1f5f9', color: '#475569',
                      padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600
                    }}>
                      {item.category || 'General'}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: '#64748b' }}>{fmtDate(item.published_date)}</td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(item)}
                      title={item.is_featured ? 'Remove featured' : 'Set as featured'}
                      style={{
                        background: 'none', border: 'none', fontSize: 18, cursor: 'pointer',
                        color: item.is_featured ? '#f59e0b' : '#cbd5e1'
                      }}
                    >
                      <i className="fas fa-star" />
                    </button>
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                      background: item.status === 'published' ? '#dcfce7' : '#fef9c3',
                      color: item.status === 'published' ? '#166534' : '#92400e',
                    }}>
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-edit" onClick={() => navigate(`/admin/news/edit/${item.id}`)} title="Edit">
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        onClick={() => toggleStatus(item)}
                        title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                        style={{
                          padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13,
                          background: item.status === 'published' ? '#fef9c3' : '#dcfce7',
                          color: item.status === 'published' ? '#92400e' : '#166534',
                        }}
                      >
                        <i className={`fas fa-${item.status === 'published' ? 'eye-slash' : 'eye'}`} />
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(item.id)} title="Delete">
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
