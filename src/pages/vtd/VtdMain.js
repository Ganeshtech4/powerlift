import React from "react";
import { Link } from "react-router-dom";
import { fetchVtdBooks } from "../../utils/vtdApi";

const fallbackCardImage = (title) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23667eea"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20"%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E`;

const VtdMain = () => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadBooks = async () => {
      try {
        setLoading(true);
        const items = await fetchVtdBooks();

        if (isMounted) {
          setBooks(items.filter((book) => book.isActive && book.pdfUrl));
          setError("");
        }
      } catch (loadError) {
        if (isMounted) {
          setError("VTD books are not available right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className="blog-page collaboration-page"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: isMobile ? "40px 0" : "80px 0",
      }}
    >
      <div className="container">
        <div
          className="section-title text-center"
          style={{ marginBottom: isMobile ? "30px" : "60px" }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              VTD RESOURCES
            </span>
          </div>
          <h2
            className="section-title__title"
            style={{
              fontSize: isMobile ? "28px" : "48px",
              fontWeight: "800",
              color: "#2d3748",
              marginBottom: "15px",
              lineHeight: 1.2,
            }}
          >
            VTD Books
          </h2>
          <p
            className="section-title__text"
            style={{
              fontSize: isMobile ? "14px" : "18px",
              color: "#718096",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Admin-managed VTD educational books, resources, and training PDFs from the WPC Telangana community.
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i> Loading VTD books...
          </div>
        ) : error ? (
          <div className="empty-state">
            <p>{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <p>No VTD books have been published yet.</p>
          </div>
        ) : (
          <div className="row">
            {books.map((book, index) => (
              <div key={book.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="inspire-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inspire-card__img">
                    <img
                      src={book.coverImageUrl || fallbackCardImage(book.title)}
                      alt={book.title}
                      onError={(event) => {
                        event.target.src = fallbackCardImage(book.title);
                      }}
                    />
                    <div className="inspire-card__badge">
                      <span
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "#fff",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: isMobile ? "10px" : "12px",
                          fontWeight: "600",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {book.subtitle || "VTD Book"}
                      </span>
                    </div>
                  </div>

                  <div className="inspire-card__content">
                    <h3
                      className="inspire-card__name"
                      style={{ fontSize: isMobile ? "18px" : "20px" }}
                    >
                      {book.title}
                    </h3>
                    <p
                      className="inspire-card__quote"
                      style={{ fontSize: isMobile ? "13px" : "14px" }}
                    >
                      {book.quote ? `"${book.quote}"` : "Open the book PDF to read more."}
                    </p>
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inspire-card__btn inspire-card__btn--pdf"
                      style={{
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        width: "100%",
                        justifyContent: "center",
                        marginTop: "auto",
                      }}
                    >
                      <span>Read PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "40px" : "60px",
            padding: isMobile ? "30px 20px" : "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: isMobile ? "20px" : "28px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            Want to learn more about VTD?
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: isMobile ? "14px" : "16px",
              marginBottom: "20px",
            }}
          >
            Access comprehensive VTD training resources, educational materials, and guidelines curated by WPC Telangana.
          </p>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button
              type="button"
              className="inspire-cta-btn"
              style={{
                padding: isMobile ? "12px 24px" : "15px 40px",
                background: "#fff",
                color: "#667eea",
                border: "none",
                borderRadius: "50px",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Get in Touch
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .inspire-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .inspire-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .loading-state,
        .empty-state {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 18px;
          padding: 32px;
          text-align: center;
          color: #4a5568;
          margin-bottom: 30px;
        }

        .inspire-card__img {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .inspire-card__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .inspire-card:hover .inspire-card__img img {
          transform: scale(1.1);
        }

        .inspire-card__badge {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 2;
        }

        .inspire-card__content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .inspire-card__name {
          color: #2d3748;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .inspire-card__quote {
          color: #718096;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
          font-style: italic;
        }

        .inspire-card__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          color: #fff;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .inspire-card__btn:hover {
          gap: 12px;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
          color: #fff;
        }

        .inspire-card__btn--pdf:hover {
          box-shadow: 0 10px 25px rgba(245, 87, 108, 0.4);
        }

        .inspire-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3) !important;
          background: #f7fafc !important;
        }

        @media (max-width: 767px) {
          .loading-state,
          .empty-state {
            padding: 24px;
          }

          .inspire-card__img {
            height: 220px;
          }

          .inspire-card__content {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default VtdMain;
