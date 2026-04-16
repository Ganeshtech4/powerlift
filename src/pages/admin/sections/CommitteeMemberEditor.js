import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadMultipleToS3, uploadToS3 } from '../../../utils/s3Upload';
import './CommitteeMemberEditor.css';

const emptyForm = {
  name: '',
  role: '',
  photo_url: '',
  certificate_urls: [],
  phone: '',
  email: '',
  description: '',
  highlight: '',
  achievementsText: '',
  leadership: '',
  philosophy: '',
  is_featured: false,
  order: 0,
  is_active: true,
};

const CommitteeMemberEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [certificatesUploading, setCertificatesUploading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    const loadMember = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/committee-members/${id}`);
        const member = response.data;
        if (!isMounted) {
          return;
        }

        setFormData({
          name: member.name || '',
          role: member.role || '',
          photo_url: member.photo_url || '',
          certificate_urls: Array.isArray(member.certificate_urls) ? member.certificate_urls.filter(Boolean) : [],
          phone: member.phone || '',
          email: member.email || '',
          description: member.description || '',
          highlight: member.highlight || '',
          achievementsText: Array.isArray(member.achievements) ? member.achievements.join('\n') : '',
          leadership: member.leadership || '',
          philosophy: member.philosophy || '',
          is_featured: member.is_featured ?? false,
          order: Number(member.order ?? 0),
          is_active: member.is_active ?? true,
        });
      } catch (error) {
        console.error('Error loading team member:', error);
        alert('Failed to load team member');
        navigate('/admin/dashboard?section=committee');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMember();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleProfileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setProfileUploading(true);
      const response = await uploadToS3(file, 'committee/profile');
      const imageUrl = response.url || response;
      setFormData((current) => ({ ...current, photo_url: imageUrl }));
    } catch (error) {
      console.error('Error uploading profile image:', error);
      alert('Failed to upload profile image');
    } finally {
      setProfileUploading(false);
      event.target.value = '';
    }
  };

  const handleCertificateUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      return;
    }

    try {
      setCertificatesUploading(true);
      const response = await uploadMultipleToS3(files, 'committee/certificates');
      const uploadedUrls = Array.isArray(response.urls)
        ? response.urls
        : Array.isArray(response.files)
          ? response.files.map((file) => file.url).filter(Boolean)
          : [];

      setFormData((current) => ({
        ...current,
        certificate_urls: [...current.certificate_urls, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Error uploading certificates:', error);
      alert('Failed to upload certificates');
    } finally {
      setCertificatesUploading(false);
      event.target.value = '';
    }
  };

  const removeCertificate = (certificateUrl) => {
    setFormData((current) => ({
      ...current,
      certificate_urls: current.certificate_urls.filter((url) => url !== certificateUrl),
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.role.trim()) {
      alert('Name and role are required');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        photo_url: formData.photo_url || null,
        certificate_urls: formData.certificate_urls.filter(Boolean),
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        description: formData.description.trim() || null,
        highlight: formData.highlight.trim() || null,
        achievements: formData.achievementsText
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        leadership: formData.leadership.trim() || null,
        philosophy: formData.philosophy.trim() || null,
        is_featured: formData.is_featured,
        order: Number(formData.order) || 0,
        is_active: formData.is_active,
      };

      if (id) {
        await axiosInstance.put(`/committee-members/${id}`, payload);
      } else {
        await axiosInstance.post('/committee-members/', payload);
      }

      navigate('/admin/dashboard?section=committee');
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!saving) {
      navigate('/admin/dashboard?section=committee');
    }
  };

  if (loading) {
    return (
      <div className="committee-editor-loading">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <p>Loading team member...</p>
      </div>
    );
  }

  return (
    <div className="committee-editor">
      <div className="committee-editor__header">
        <div>
          <button type="button" className="committee-editor__back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i>
            Back to team members
          </button>
          <h1>{id ? 'Edit Team Member' : 'Add Team Member'}</h1>
          <p>Use one clear profile image, type the role manually, and keep certificates in a separate gallery.</p>
        </div>
        <div className="committee-editor__actions">
          <button type="button" className="committee-editor__button committee-editor__button--secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="committee-editor__button committee-editor__button--primary"
            onClick={handleSave}
            disabled={saving || profileUploading || certificatesUploading}
          >
            <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
            {saving ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </div>

      <div className="committee-editor__layout">
        <section className="committee-editor__panel committee-editor__panel--main">
          <div className="committee-editor__grid">
            <div className="committee-editor__field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="committee-editor__field">
              <label htmlFor="role">Role</label>
              <input id="role" name="role" type="text" value={formData.role} onChange={handleInputChange} placeholder="Enter role manually" required />
            </div>
          </div>

          <div className="committee-editor__grid">
            <div className="committee-editor__field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="committee-editor__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>

          <div className="committee-editor__grid">
            <div className="committee-editor__field">
              <label htmlFor="highlight">Highlight</label>
              <input id="highlight" name="highlight" type="text" value={formData.highlight} onChange={handleInputChange} placeholder="Example: International referee" />
            </div>
            <div className="committee-editor__field">
              <label htmlFor="order">Display Order</label>
              <input
                id="order"
                name="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(event) => setFormData((current) => ({ ...current, order: Number(event.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="committee-editor__toggles">
            <button
              type="button"
              className={`committee-editor__toggle ${formData.is_active ? 'committee-editor__toggle--on' : ''}`}
              onClick={() => setFormData((current) => ({ ...current, is_active: !current.is_active }))}
            >
              <span>Status</span>
              <strong>{formData.is_active ? 'Active' : 'Inactive'}</strong>
            </button>
            <button
              type="button"
              className={`committee-editor__toggle ${formData.is_featured ? 'committee-editor__toggle--on' : ''}`}
              onClick={() => setFormData((current) => ({ ...current, is_featured: !current.is_featured }))}
            >
              <span>Featured</span>
              <strong>{formData.is_featured ? 'Yes' : 'No'}</strong>
            </button>
          </div>

          <div className="committee-editor__field">
            <label htmlFor="description">Summary</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange} />
          </div>

          <div className="committee-editor__field">
            <label htmlFor="achievementsText">Achievements</label>
            <textarea
              id="achievementsText"
              name="achievementsText"
              rows="5"
              value={formData.achievementsText}
              onChange={handleInputChange}
              placeholder="One achievement per line"
            />
          </div>

          <div className="committee-editor__grid">
            <div className="committee-editor__field">
              <label htmlFor="leadership">Leadership</label>
              <textarea id="leadership" name="leadership" rows="5" value={formData.leadership} onChange={handleInputChange} />
            </div>
            <div className="committee-editor__field">
              <label htmlFor="philosophy">Philosophy</label>
              <textarea id="philosophy" name="philosophy" rows="5" value={formData.philosophy} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        <aside className="committee-editor__panel committee-editor__panel--side">
          <div className="committee-editor__asset-block">
            <div className="committee-editor__asset-header">
              <h2>Profile Image</h2>
              <p>One image only. This is the main public photo.</p>
            </div>
            <div className="committee-editor__profile-preview">
              {formData.photo_url ? (
                <img src={formData.photo_url} alt={formData.name || 'Profile preview'} />
              ) : (
                <div className="committee-editor__profile-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleProfileUpload} disabled={profileUploading} />
            {formData.photo_url && (
              <button
                type="button"
                className="committee-editor__text-button"
                onClick={() => setFormData((current) => ({ ...current, photo_url: '' }))}
              >
                Remove profile image
              </button>
            )}
            {profileUploading && <p className="committee-editor__status">Uploading profile image...</p>}
          </div>

          <div className="committee-editor__asset-block">
            <div className="committee-editor__asset-header">
              <h2>Certificates</h2>
              <p>Upload certificates separately so they do not replace the main profile image.</p>
            </div>
            <input type="file" accept="image/*" multiple onChange={handleCertificateUpload} disabled={certificatesUploading} />
            {certificatesUploading && <p className="committee-editor__status">Uploading certificates...</p>}
            <div className="committee-editor__certificate-grid">
              {formData.certificate_urls.map((certificateUrl, index) => (
                <div key={`${certificateUrl}-${index}`} className="committee-editor__certificate-card">
                  <img src={certificateUrl} alt={`Certificate ${index + 1}`} />
                  <button type="button" onClick={() => removeCertificate(certificateUrl)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommitteeMemberEditor;