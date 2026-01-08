import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from '../../components/Layout/Footer';
import BackToTop from '../../components/elements/BackToTop';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import Header from "../../components/Layout/Header";
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';

import "./results.css";

const bannerbg = `/images/resources/schedule-one-1-6.jpg`;
const navImg1 = `/images/logo wpc.png`;

// Helper function to generate image paths
function getImagePaths(folderPath, fileNumbers) {
  return fileNumbers.map(num => `/images/results/${folderPath}/${num}.png`);
}

const resultsData = {
  "AF FITNESS STUDIO": getImagePaths("AF FITNESS STUDIO", [1,2,3,4,5]),
  "DISTRICT COMBINED RESULTS": getImagePaths("DISTRICT COMBINED RESULTS", [1,2,3,4,6,7,8,9]),
  "FITNESS SECRET": getImagePaths("FITNESS SECRET", [1,2,3,4,5,6,7]),
  "Gym point": getImagePaths("Gym point", [1,2,3,4,5,6]),
  "NATIONAL SELECTED PLAYERS": getImagePaths("NATIONAL SELECTED PLAYERS", 
    Array.from({length: 35}, (_, i) => i + 1)),
  "Origin Fitness": getImagePaths("Origin Fitness", [1,2,3,4,5,6]),
  "Ozzie FITNESS CENTER": getImagePaths("Ozzie FITNESS CENTER", [1,2,3,4,5,6]),
  "Pottens FITNESS": getImagePaths("Pottens FITNESS", [1,2,3,4,5]),
  "SD Fitness": getImagePaths("SD Fitness", [1,2,3,4]),
  "STATE SELECTED PLAYERS LIST": getImagePaths("STATE SELECTED PLAYERS LIST", [1,2,3,4,5,6]),
};

const resultDescriptions = {
  "AF FITNESS STUDIO": "AF Fitness Studio athletes showcased exceptional strength and discipline.",
  "DISTRICT COMBINED RESULTS": "District-level champions who performed outstandingly across categories.",
  "FITNESS SECRET": "Team Fitness Secret continues to inspire with powerful performances.",
  "Gym point": "Gym Point members delivered strong results with great competitive spirit.",
  "NATIONAL SELECTED PLAYERS": "Athletes who qualified for National championship level.",
  "Origin Fitness": "Origin Fitness participants demonstrated superior conditioning and performance.",
  "Ozzie FITNESS CENTER": "Ozzie Fitness Center athletes displayed remarkable discipline.",
  "Pottens FITNESS": "Pottens Fitness continues developing rising champions.",
  "SD Fitness": "SD Fitness has shown continuous progress with strong results.",
  "STATE SELECTED PLAYERS LIST": "Athletes selected to represent the state in competitions."
};

const ResultsMain = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const images = resultsData[decodedCategory] || [];
  const description = resultDescriptions[decodedCategory] || "";

  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => setIsVisible(window.scrollY > 300);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ LIGHTBOX / FULLSCREEN VIEWER STATE
  const [currentIndex, setCurrentIndex] = useState(null);

  const openViewer = (index) => setCurrentIndex(index);
  const closeViewer = () => setCurrentIndex(null);

  const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const showPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // ✅ Swipe Support
  let startX = 0;
  const onTouchStart = (e) => (startX = e.touches[0].clientX);
  const onTouchMove = (e) => {
    if (!startX) return;
    let endX = e.touches[0].clientX;
    if (startX - endX > 50) showNext();
    if (endX - startX > 50) showPrev();
  };

  return (
    <React.Fragment>

      <Header navImg={navImg1} parentMenu="Results" activeMenu="/results" />

      <SiteBreadcrumb pageTitle="Results" pageName="Results" breadcrumbsImg={bannerbg} />

      <div className="container mx-auto px-4 py-16">
        <Link to="/results" className="inline-block mb-8 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-all">
          ← Back to Results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-extrabold text-pink-600 mb-6">{decodedCategory}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
          </div>

          <div className="center-image-grid">
            {images.map((src, index) => (
              <div key={index} className="image-card" onClick={() => openViewer(index)}>
                <img 
                  src={src} 
                  alt={`${decodedCategory} result ${index + 1}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${src}`);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log(`✓ Loaded: ${src}`)}
                />
              </div>
            ))}
          </div>
        </div>

        <CtaTwo />
        <BackToTop scroll={isVisible} />
        <Footer />
      </div>

      {/* ✅ Fullscreen Image Viewer */}
      {currentIndex !== null && (
        <div className="viewer-overlay" onClick={closeViewer} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
          <span className="viewer-close" onClick={closeViewer}>×</span>
          <span className="viewer-prev" onClick={(e) => { e.stopPropagation(); showPrev(); }}>‹</span>
          <img src={images[currentIndex]} alt="" className="viewer-image" />
          <span className="viewer-next" onClick={(e) => { e.stopPropagation(); showNext(); }}>›</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default ResultsMain;
