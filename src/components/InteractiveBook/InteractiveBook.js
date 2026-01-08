import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './InteractiveBook.css';

// Set up PDF.js worker - use local worker to avoid CDN fetch issues
pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;

const InteractiveBook = ({ story, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);

  // S3 bucket URL for PDFs
  const S3_PDF_BASE_URL = "https://rekhawpc.s3.ap-south-2.amazonaws.com/pdfs/";
  
  // PDF mapping for each story ID - loaded from AWS S3
  const pdfPaths = {
    1: `${S3_PDF_BASE_URL}Diza.pdf`,
    2: `${S3_PDF_BASE_URL}Aashritha.pdf`,
    3: `${S3_PDF_BASE_URL}Tapasya.pdf`,
    4: `${S3_PDF_BASE_URL}Manoj%20Kumar.pdf`,
    5: `${S3_PDF_BASE_URL}Karan.pdf`,
    6: `${S3_PDF_BASE_URL}Pranay.pdf`,
    7: `${S3_PDF_BASE_URL}Rishikesh%20Reddy.pdf`,
    8: `${S3_PDF_BASE_URL}Sai%20Teja%20Manthena.pdf`,
    9: `${S3_PDF_BASE_URL}Thirupathi%20Rao.pdf`
  };

  // Get the PDF path for current story
  const currentPdfPath = pdfPaths[story.id] || `${S3_PDF_BASE_URL}default.pdf`;

  // Open book animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBookOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Load PDF when component mounts
  useEffect(() => {
    console.log('Loading PDF from:', currentPdfPath);
    console.log('Story ID:', story.id, 'Story Name:', story.name);
    setPdfLoading(true);
    setPdfError(false);
    
    // Test if PDF file is accessible
    fetch(currentPdfPath, { method: 'HEAD' })
      .then(response => {
        console.log('PDF accessibility check:', response.status, response.statusText);
        if (!response.ok) {
          console.error('PDF file not accessible:', currentPdfPath);
        }
      })
      .catch(error => {
        console.error('PDF accessibility error:', error);
      });
  }, [currentPdfPath, story.id, story.name]);

  // Force re-render when numPages changes
  useEffect(() => {
    if (numPages) {
      console.log('PDF loaded with', numPages, 'pages. Creating individual book pages.');
    }
  }, [numPages]);

  // PDF Document handlers with better error handling
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('PDF loaded successfully:', numPages, 'pages');
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setPdfLoading(false);
    setPdfError(true);
  };

  // Simple PDF Viewer Component - Direct rendering without fallback
  const SimplePDFViewer = ({ pdfPath, pageNumber = 1 }) => {
    return (
      <div className="pdf-viewer-wrapper">
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error('PDF load error:', error);
            onDocumentLoadError(error);
          }}
          loading={
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          }
          error={
            <div className="pdf-error">
              <div className="error-icon">📄</div>
              <h3>PDF Loading Error</h3>
              <p>Unable to load PDF. Please try refreshing the page.</p>
              <div className="placeholder-content">
                <h4>{story.name}</h4>
                <p>{story.role}</p>
                <p>{story.achievement}</p>
                <blockquote>"{story.quote}"</blockquote>
              </div>
            </div>
          }
          options={{
            cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
            cMapPacked: true,
            standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
          }}
        >
          <Page 
            pageNumber={pageNumber}
            width={Math.min(window.innerWidth * 0.35, 350)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page-render"
            loading={
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Rendering page {pageNumber}...</p>
              </div>
            }
            onLoadSuccess={() => console.log(`✓ Page ${pageNumber} rendered successfully`)}
            onLoadError={(error) => {
              console.error(`Page ${pageNumber} render error:`, error);
            }}
          />
        </Document>
      </div>
    );
  };

  // Create book pages dynamically - Cover + each PDF page as separate book page
  const createBookPages = () => {
    const bookPages = [
      // Cover Page
      {
        type: 'cover',
        content: (
          <div className="cover-page">
            <div className="cover-title">{story.name}</div>
            <div className="cover-subtitle">{story.role}</div>
            <div className="cover-image">
              <img 
                src={story.image} 
                alt={story.name}
                onError={(e) => {
                  console.error(`Failed to load cover image for ${story.name}:`, story.image);
                  e.target.style.display = 'none';
                }}
                onLoad={() => console.log(`✓ Cover image loaded for ${story.name}`)}
              />
            </div>
            <div className="cover-achievement">{story.achievement}</div>
            <div className="cover-footer">WPC Telangana Success Story</div>
            <div className="pdf-info">
              <div className="pdf-icon">📖</div>
              <p>Turn the page to read the complete story</p>
            </div>
          </div>
        )
      }
    ];

    // Add individual PDF pages as separate book pages
    if (numPages && numPages > 0) {
      for (let i = 1; i <= numPages; i++) {
        bookPages.push({
          type: 'pdf',
          pageNumber: i,
          content: (
            <div className="pdf-page" key={`pdf-page-${i}`}>
              <SimplePDFViewer pdfPath={currentPdfPath} pageNumber={i} />
              <div className="pdf-page-number">
                Page {i} of {numPages}
              </div>
            </div>
          )
        });
      }
    } else {
      // If PDF not loaded yet, show initial PDF page
      bookPages.push({
        type: 'pdf',
        pageNumber: 1,
        content: (
          <div className="pdf-page">
            <SimplePDFViewer pdfPath={currentPdfPath} pageNumber={1} />
            {!pdfLoading && !pdfError && numPages && numPages > 1 && (
              <div className="pdf-page-info-bottom">
                <p>This PDF has {numPages} pages. Turn pages to view all content.</p>
              </div>
            )}
          </div>
        )
      });
    }

    return bookPages;
  };

  // Use dynamic pages
  const pages = createBookPages();

  const nextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsPageTurning(false);
      }, 600);
    }
  }, [currentPage, pages.length]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsPageTurning(false);
      }, 600);
    }
  }, [currentPage]);

  const goToPage = useCallback((pageIndex) => {
    if (pageIndex !== currentPage && pageIndex >= 0 && pageIndex < pages.length) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsPageTurning(false);
      }, 600);
    }
  }, [currentPage, pages.length]);

  const closeBook = useCallback(() => {
    setIsBookOpen(false);
    setTimeout(() => {
      onClose();
    }, 800);
  }, [onClose]);

  // Keyboard navigation
  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        nextPage();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        prevPage();
        break;
      case 'Escape':
        event.preventDefault();
        closeBook();
        break;
      default:
        break;
    }
  }, [nextPage, prevPage, closeBook]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="interactive-book-overlay">
      <div className="book-container">
        {/* Close Button */}
        <button className="close-book-btn" onClick={closeBook}>
          ✕
        </button>

        {/* Book */}
        <div className={`interactive-book ${isBookOpen ? 'open' : 'closed'}`}>
          {/* Book Spine */}
          <div className="book-spine">
            <div className="spine-text">{story.name}</div>
          </div>

          {/* Left Page */}
          <div className={`book-page left-page ${isPageTurning ? 'turning' : ''}`}>
            <div className="page-content">
              {currentPage > 0 && pages[currentPage - 1] && (
                <>
                  {pages[currentPage - 1].content}
                  <div className="page-number">{currentPage}</div>
                </>
              )}
            </div>
          </div>

          {/* Right Page */}
          <div className="book-page right-page">
            <div className="page-content">
              {pages[currentPage] && (
                <>
                  {pages[currentPage].content}
                  <div className="page-number">{currentPage + 1}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="book-navigation">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevPage}
            disabled={currentPage <= 0}
          >
            ← Previous Page
          </button>

          <div className="page-info">
            {currentPage === 0 ? (
              <span>Cover</span>
            ) : pages[currentPage] && pages[currentPage].pageNumber ? (
              <span>Page {pages[currentPage].pageNumber} of {numPages || '?'}</span>
            ) : (
              <span>PDF Story</span>
            )}
          </div>

          <div className="page-indicators">
            {pages.map((page, index) => (
              <button
                key={index}
                className={`page-dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => goToPage(index)}
                title={
                  page.type === 'cover' 
                    ? 'Cover Page' 
                    : page.pageNumber 
                      ? `PDF Page ${page.pageNumber}` 
                      : 'PDF Story'
                }
              />
            ))}
          </div>

          <button 
            className="nav-btn next-btn" 
            onClick={nextPage}
            disabled={currentPage >= pages.length - 1}
          >
            Next Page →
          </button>
        </div>

        {/* PDF Download Option */}
        {currentPage > 0 && !pdfError && (
          <div className="pdf-actions">
            <a 
              href={currentPdfPath} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pdf-download-btn"
              title="Open PDF in new window"
            >
              📄 Open PDF
            </a>
          </div>
        )}

        {/* Keyboard Shortcuts */}
        <div className="keyboard-help">
          <p>Use ← → arrow keys to turn pages • Press ESC to close • Each PDF page is displayed individually</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBook;