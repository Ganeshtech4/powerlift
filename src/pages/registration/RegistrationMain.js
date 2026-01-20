import React, { useState, useEffect } from 'react';



const RegistrationMain = () => {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [documents, setDocuments] = useState([]);
    const [checking, setChecking] = useState(false);
    const [missingDocs, setMissingDocs] = useState([]);

    // Use relative URL to work with Nginx proxy
    const API_BASE = process.env.REACT_APP_API_BASE || '';

    // Define desired PDF filenames that should exist in S3 under prefix 'pdfs/'
    // IMPORTANT: Upload these exact filenames to S3 bucket 'rekhawpc' inside folder 'pdfs/'
    const targetDocs = [
        {
            // Actual S3 key present per INSPIRE_PDF_INTEGRATION.md
            fileName: 'Application_.pdf', // S3 object key: pdfs/Application_.pdf
            label: 'WPC Registration Form',
            description: 'Official registration form for WPC Telangana competitions'
        },
        {
            // Actual S3 key present per INSPIRE_PDF_INTEGRATION.md
            fileName: 'ID card_.pdf', // S3 object key: pdfs/ID card_.pdf
            label: 'WPC ID Card Form',
            description: 'Athlete identification card form'
        }
    ];

    // Build document list with proxy URLs
    useEffect(() => {
        const list = targetDocs.map(d => ({
            value: d.fileName,
            label: d.label,
            description: d.description,
            url: `${API_BASE}/pdfs/${encodeURIComponent(d.fileName)}`
        }));
        setDocuments(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API_BASE]);

    // Optional: verify existence of each PDF via /api/s3/exists
    useEffect(() => {
        let cancelled = false;
        const check = async () => {
            setChecking(true);
            const missing = [];
            for (const doc of targetDocs) {
                try {
                    const res = await fetch(`${API_BASE}/api/s3/exists/pdfs/${encodeURIComponent(doc.fileName)}`);
                    const data = await res.json();
                    if (!data.exists) missing.push(doc.fileName);
                } catch (e) {
                    // If error, mark as missing
                    missing.push(doc.fileName);
                }
            }
            if (!cancelled) {
                setMissingDocs(missing);
                setChecking(false);
            }
        };
        check();
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [API_BASE]);

    const handleDownload = () => {
        if (!selectedDocument) {
            alert('Please select a document to download');
            return;
        }
        const selectedDoc = documents.find(doc => doc.value === selectedDocument);
        if (!selectedDoc) {
            alert('Document not found');
            return;
        }
        const link = document.createElement('a');
        link.href = selectedDoc.url;
        link.download = selectedDoc.value;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDocumentChange = (e) => {
        setSelectedDocument(e.target.value);
    };

    return (
        <section className="registration-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">WPC Telangana Documents</span>
                    </div>
                    <h2 className="section-title__title">Registration & Documents</h2>
                    <p className="section-title__text">
                        Download official registration forms, rules, and guidelines for WPC Telangana powerlifting competitions.
                    </p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="registration-form">
                            <div className="registration-form__download-section">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="registration-form__input-box">
                                            <label className="registration-form__label">
                                                Select Document to Download:
                                            </label>
                                            <select
                                                value={selectedDocument}
                                                onChange={handleDocumentChange}
                                                className="registration-form__select"
                                            >
                                                <option value="">-- Choose a Document --</option>
                                                {documents.map((doc) => (
                                                    <option key={doc.value} value={doc.value}>
                                                        {doc.label}{missingDocs.includes(doc.value) ? ' (Missing in S3)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {selectedDocument && (
                                        <div className="col-12">
                                            <div className="registration-form__document-info">
                                                <h4 className="document-title">
                                                    {documents.find(doc => doc.value === selectedDocument)?.label}
                                                </h4>
                                                <p className="document-description">
                                                    {documents.find(doc => doc.value === selectedDocument)?.description}
                                                </p>
                                                {missingDocs.includes(selectedDocument) && (
                                                    <p style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
                                                        File not found in S3 (pdfs/{selectedDocument}). Upload it to bucket 'rekhawpc'.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="col-12">
                                        <div className="registration-form__btn-box">
                                            <button 
                                                type="button" 
                                                className="thm-btn registration-form__btn"
                                                onClick={handleDownload}
                                                disabled={!selectedDocument}
                                            >
                                                Download PDF
                                                <span className="icon-download"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="registration-form__documents-list">
                                <h3 className="documents-list__title">Available Documents:</h3>
                                <div className="row">
                                    {documents.map((doc) => (
                                        <div key={doc.value} className="col-xl-6 col-lg-6 col-md-12">
                                            <div className="document-card">
                                                <div className="document-card__icon">
                                                    <i className="icon-file-pdf"></i>
                                                </div>
                                                <div className="document-card__content">
                                                    <h4 className="document-card__title">{doc.label}</h4>
                                                    <p className="document-card__description">{doc.description}</p>
                                                    {missingDocs.includes(doc.value) && (
                                                        <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                                            Missing in S3 (upload to pdfs/{doc.value})
                                                        </p>
                                                    )}
                                                    <button 
                                                        className="document-card__btn"
                                                        disabled={missingDocs.includes(doc.value)}
                                                        onClick={() => {
                                                            const link = document.createElement('a');
                                                            link.href = doc.url;
                                                            link.download = doc.value;
                                                            link.target = '_blank';
                                                            link.rel = 'noopener noreferrer';
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }}
                                                    >
                                                        {missingDocs.includes(doc.value) ? 'Upload Needed' : 'Download'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {checking && (
                                    <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Checking S3 for files...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationMain;
