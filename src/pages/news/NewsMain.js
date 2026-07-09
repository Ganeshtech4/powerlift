import React, { useState, useEffect, useCallback } from 'react';
import './News.css';

const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

/* ── helpers ─────────────────────────────── */
const fmtDate = (d) => {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return d; }
};

/* ── Lightbox ─────────────────────────────── */
function Lightbox({ items, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [zoomed, setZoomed] = useState(false);

  const prev = useCallback(() => { setZoomed(false); setCurrent(c => (c - 1 + items.length) % items.length); }, [items.length]);
  const next = useCallback(() => { setZoomed(false); setCurrent(c => (c + 1) % items.length); }, [items.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, prev, next]);

  const item = items[current];
  return (
    <div className="news-lightbox" onClick={onClose}>
      <div className="news-lightbox__counter">{current + 1} / {items.length}</div>

      <button className="news-lightbox__close" onClick={onClose} aria-label="Close">
        <i className="fa fa-times" />
      </button>

      {items.length > 1 && (
        <>
          <button className="news-lightbox__nav news-lightbox__nav--prev"
            onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <i className="fa fa-chevron-left" />
          </button>
          <button className="news-lightbox__nav news-lightbox__nav--next"
            onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">
            <i className="fa fa-chevron-right" />
          </button>
        </>
      )}

      <div className="news-lightbox__inner" onClick={e => e.stopPropagation()}>
        <img
          className={`news-lightbox__img ${zoomed ? 'zoomed' : ''}`}
          src={item.image_url}
          alt={item.title}
          onClick={() => setZoomed(z => !z)}
          style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
        />
      </div>

      <div className="news-lightbox__caption">
        <div className="news-lightbox__caption-title">{item.title}</div>
        <div className="news-lightbox__caption-meta">
          {item.category && <span>{item.category}</span>}
          {item.published_date && <span> &nbsp;·&nbsp; {fmtDate(item.published_date)}</span>}
        </div>
        <div className="news-lightbox__zoom-hint">Click image to zoom · Arrow keys to navigate · Esc to close</div>
      </div>
    </div>
  );
}

/* ── Skeleton ─────────────────────────────── */
function SkeletonGrid() {
  return (
    <div className="news-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="news-skeleton__card">
          <div className="news-skeleton__img" />
          <div className="news-skeleton__body">
            <div className="news-skeleton__line news-skeleton__line--short" />
            <div className="news-skeleton__line news-skeleton__line--title" />
            <div className="news-skeleton__line news-skeleton__line--title" style={{ width: '80%' }} />
            <div className="news-skeleton__line news-skeleton__line--date" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main ─────────────────────────────────── */
export default function NewsMain() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/news/?published_only=true`);
        if (res.ok) setNews(await res.json());
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Filter logic
  const filtered = news.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(news.map(n => n.category).filter(Boolean)))];

  const featured = filtered.find(n => n.is_featured) || filtered[0];
  // Grid excludes the featured item (if any)
  const grid = filtered.filter(n => n.id !== featured?.id);
  // All items for lightbox nav (featured first)
  const lightboxItems = featured ? [featured, ...grid] : [...grid];

  const openLightbox = (item) => {
    const idx = lightboxItems.findIndex(n => n.id === item.id);
    setLightbox({ open: true, index: idx });
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="news-hero">
        <div className="container">
          <span className="news-hero__tag">Federation Media</span>
          <h1 className="news-hero__title">Latest News &amp; Media</h1>
          <p className="news-hero__subtitle">
            Stay informed with the latest newspaper coverage, official federation announcements,
            and championship updates from WPC–Telangana.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="news-section">
        <div className="container">
          <div className="gallery-layout">
            {/* Left Sidebar with Filters */}
            <aside className="gallery-sidebar">
              <div className="gallery-sidebar-card">
                <div className="gallery-sidebar-copy">
                  <span className="gallery-kicker">Browse</span>
                  <h2 className="gallery-title">News Archive</h2>
                  <p>Filter and search through all published news, announcements, and media coverage.</p>
                </div>

                {/* Search */}
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '16px',
                        zIndex: 2
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  )}
                </div>

                {/* Category Filters */}
                <div className="gallery-filter-stack">
                  {categories.map((category) => {
                    const count = category === 'all'
                      ? news.length
                      : news.filter((item) => item.category === category).length;

                    return (
                      <button
                        key={category}
                        className={`gallery-filter-btn ${filterCategory === category ? 'active' : ''}`}
                        onClick={() => setFilterCategory(category)}
                      >
                        <span className="gallery-filter-label">
                          {category === 'all' ? 'All News' : category}
                        </span>
                        <span className="gallery-filter-count">{count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="gallery-sidebar-stats">
                  <div>
                    <span>Total News</span>
                    <strong>{news.length}</strong>
                  </div>
                  <div>
                    <span>Showing</span>
                    <strong>{filtered.length}</strong>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="gallery-content">

          {loading ? (
            <SkeletonGrid />
          ) : filtered.length === 0 ? (
            <div className="news-empty">
              <div className="news-empty__icon"><i className="fa fa-newspaper" /></div>
              <p className="news-empty__text">
                {searchTerm || filterCategory !== 'all'
                  ? 'No news items match your search or filter.'
                  : 'No news has been published yet.'}
              </p>
              {(searchTerm || filterCategory !== 'all') && (
                <button
                  onClick={() => { setSearchTerm(''); setFilterCategory('all'); }}
                  style={{
                    marginTop: '16px',
                    padding: '10px 20px',
                    background: 'linear-gradient(90deg,#c0392b,#1a5276)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* ── Featured ── */}
              {featured && (
                <>
                  <p className="news-section__label">Featured Coverage</p>
                  <h2 className="news-section__title">In The Spotlight</h2>
                  <div className="news-featured">
                    <div className="news-featured__img-wrap">
                      <span className="news-featured__badge">Featured</span>
                      <img src={featured.image_url} alt={featured.title} loading="lazy" />
                    </div>
                    <div className="news-featured__body">
                      <p className="news-featured__category">{featured.category || 'General'}</p>
                      <h3 className="news-featured__title">{featured.title}</h3>
                      {featured.description && (
                        <p className="news-featured__desc">{featured.description}</p>
                      )}
                      <div className="news-featured__meta">
                        <span><i className="fa fa-calendar" />{fmtDate(featured.published_date)}</span>
                      </div>
                      <button className="news-featured__btn" onClick={() => openLightbox(featured)}>
                        <i className="fa fa-expand" /> View Full Image
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── Grid ── */}
              {grid.length > 0 && (
                <>
                  <p className="news-section__label">All Coverage</p>
                  <h2 className="news-section__title">News Archive</h2>
                  <div className="news-grid">
                    {grid.map((item) => (
                      <article key={item.id} className="news-card" onClick={() => openLightbox(item)}>
                        <div className="news-card__img-wrap">
                          <img src={item.thumbnail_url || item.image_url} alt={item.title} loading="lazy" />
                          <div className="news-card__overlay">
                            <div className="news-card__zoom-icon"><i className="fa fa-search-plus" /></div>
                          </div>
                        </div>
                        <div className="news-card__body">
                          <p className="news-card__category">{item.category || 'General'}</p>
                          <h4 className="news-card__title">{item.title}</h4>
                          <p className="news-card__date">
                            <i className="fa fa-calendar" />{fmtDate(item.published_date)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox.open && (
        <Lightbox
          items={lightboxItems}
          index={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
        />
      )}
    </>
  );
}
