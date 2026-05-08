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
              color: "#e6f0ff",
              fontSize: isMobile ? "14px" : "16px",
              marginBottom: "25px",
              maxWidth: "600px",
              margin: "0 auto 25px auto",
            }}
          >
            Access comprehensive VTD training resources, educational materials, and guidelines curated by WPC Telangana.
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              padding: isMobile ? "12px 24px" : "15px 40px",
              background: "#fff",
              color: "#667eea",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: isMobile ? "14px" : "16px",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VtdMain;
