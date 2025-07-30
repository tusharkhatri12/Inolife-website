import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Send, User, Mail, Phone, GraduationCap, Briefcase, AlertCircle } from 'lucide-react';
import ApiService from '../services/apiService';
import '../styles/Modal.css';

const ResumeSubmissionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    preferredPosition: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const resumeData = {
        ...formData,
        resumeName: formData.resume?.name || 'No file uploaded'
      };

      const result = await ApiService.submitResume(resumeData);
      onClose();
      // alert(result.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                <Upload size={24} />
                Submit Your Resume
              </h2>
              <button
                onClick={onClose}
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-section">
                <h3>
                  <User size={18} />
                  Personal Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <User size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Mail size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <Phone size={16} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <Briefcase size={16} />
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 3-5 years"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <GraduationCap size={16} />
                    Education *
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., B.Pharm, M.Pharm"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <Briefcase size={18} />
                  Professional Details
                </h3>
                <div className="form-group">
                  <label>
                    Skills & Expertise
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your key skills and expertise..."
                  />
                </div>
                <div className="form-group">
                  <label>
                    Preferred Position
                  </label>
                  <input
                    type="text"
                    name="preferredPosition"
                    value={formData.preferredPosition}
                    onChange={handleInputChange}
                    placeholder="e.g., Sales Representative, Quality Control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <Upload size={16} />
                    Resume (PDF) *
                  </label>
                  <div 
                    className="file-upload-container"
                    onClick={() => document.getElementById('resume-upload').click()}
                  >
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      className="file-input"
                    />
                    <div className="file-upload-display">
                      {formData.resume ? (
                        <>
                          <Upload size={20} />
                          <span className="file-name">{formData.resume.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          <span className="file-placeholder">Click to upload your resume (PDF only)</span>
                        </>
                      )}
                    </div>
                  </div>
                  {error && (
                    <div className="error-message">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Resume
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeSubmissionModal;
              