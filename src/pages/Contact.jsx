import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  Building,
  Globe,
  ArrowRight
} from 'lucide-react';
import ApiService from '../services/apiService';
import Notification from '../components/Notification';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [contactRef, contactInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [locationsRef, locationsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await ApiService.submitContactForm(formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      setNotification({ show: true, message: 'Failed to submit form. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9871800833',
      link: 'tel:+91-9876543210'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'inolifehealthcare@gmail.com',
      link: 'mailto:info@inolife.com'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  const offices = [
    
    {
      city: 'Delhi',
      country: 'India',
      address: 'House no 12 , street no 4 west chander nagar, New Delhi 110051',
      phone: '+91 9871800833',
      email: 'inolifehealthcare@gmail.com',
      icon: Building
    },
    {
      city: 'Bangalore',
      country: 'India',
      address: '789 Tech Park, Electronic City, Bangalore 560100',
      phone: '+91 80 3456 7890',
      email: 'bangalore@inolife.com',
      icon: Building
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Information Section */}
      <motion.section
        ref={contactRef}
        className="contact-info-section"
        initial={{ opacity: 0 }}
        animate={contactInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card"
                initial={{ opacity: 0, y: 30 }}
                animate={contactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="info-icon">
                  <info.icon size={32} />
                </div>
                <h3>{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="info-link">
                    {info.value}
                  </a>
                ) : (
                  <p>{info.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="contact-form-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="products">Product Information</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Office Locations Section */}
      <motion.section
        ref={locationsRef}
        className="locations-section"
        initial={{ opacity: 0 }}
        animate={locationsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Our Office Locations</h2>
            <p>Find us at these locations across India</p>
          </div>

          <div className="offices-grid">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                className="office-card"
                initial={{ opacity: 0, y: 30 }}
                animate={locationsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="office-header">
                  <div className="office-icon">
                    <office.icon size={32} />
                  </div>
                  <div className="office-title">
                    <h3>{office.city}</h3>
                    <p>{office.country}</p>
                  </div>
                </div>

                <div className="office-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{office.address}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <a href={`tel:${office.phone}`}>{office.phone}</a>
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </div>
                </div>

                <motion.button
                  className="office-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>

          <div className="faq-grid">
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3>How can I order your products?</h3>
              <p>Our products are available through authorized healthcare providers and pharmacies. Please contact your healthcare provider for prescriptions and ordering information.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                          <h3>Do you ship across India?</h3>
            <p>Yes, we have distribution networks across major cities in India. Contact our sales team for specific city availability and shipping information.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3>What is your return policy?</h3>
              <p>We follow strict pharmaceutical industry guidelines. Returns are handled through authorized distributors and healthcare providers. Please contact your provider for return procedures.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>How can I report adverse effects?</h3>
              <p>Patient safety is our priority. Please report any adverse effects to your healthcare provider or contact our pharmacovigilance team directly through our contact form.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, message: '', type: 'success' })}
      />
    </div>
  );
};

export default Contact; 