import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  TrendingUp,
  Pill,
  Microscope,
  Target,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    // Initialize AOS-like animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [productsRef, productsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [ctaRef, ctaInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero-section"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Advancing Healthcare
              <span className="gradient-text"> Innovation</span>
            </h1>
            <p className="hero-subtitle">
              Delivering quality pharmaceutical solutions that improve lives across India. 
              Trusted by healthcare professionals and patients for over a decade.
            </p>
            <div className="hero-buttons">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
              >
                Explore Products
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image">
              <div className="floating-elements">
                <motion.div
                  className="floating-pill"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Pill size={40} />
                </motion.div>
                <motion.div
                  className="floating-microscope"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Microscope size={40} />
                </motion.div>
                <motion.div
                  className="floating-target"
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <Target size={40} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <Users size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {statsInView && <CountUp end={1000} duration={2} />}+
              </h3>
              <p className="stat-label">Healthcare Partners</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Globe size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {statsInView && <CountUp end={25} duration={2} />}+
              </h3>
              <p className="stat-label">Cities Served</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Award size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {statsInView && <CountUp end={100} duration={2} />}+
              </h3>
              <p className="stat-label">Products Developed</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <TrendingUp size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {statsInView && <CountUp end={15} duration={2} />}+
              </h3>
              <p className="stat-label">Years of Excellence</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="features-section"
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>Why Choose Inolife Healthcare?</h2>
          <p>Leading the way in pharmaceutical quality with patient-focused solutions across India</p>
        </div>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <Heart size={32} />
            </div>
            <h3>Patient-Centric Approach</h3>
            <p>Every product we develop is designed with patient outcomes and quality of life in mind.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Quality Assurance</h3>
            <p>Rigorous testing and quality control processes ensure the highest standards of safety and efficacy.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <Microscope size={32} />
            </div>
            <h3>Quality Manufacturing</h3>
            <p>State-of-the-art manufacturing facilities ensuring the highest quality standards for all our products.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <Globe size={32} />
            </div>
            <h3>Pan-India Presence</h3>
            <p>Making healthcare accessible across India through strategic partnerships and distribution networks.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Preview Section */}
      <motion.section 
        ref={productsRef}
        className="products-preview-section"
        initial={{ opacity: 0 }}
        animate={productsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>Our Leading Products</h2>
          <p>Discover our comprehensive portfolio of pharmaceutical solutions</p>
        </div>
        <div className="products-grid">
          <motion.div
            className="product-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={productsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="product-icon">
              <Pill size={48} />
            </div>
            <h3>Vitogermina</h3>
            <p>Advanced Protein supplement with digestive enzymes.</p>
            <div className="product-features">
              <span><CheckCircle size={16} /> FDA Approved</span>
              <span><CheckCircle size={16} /> Clinically Tested</span>
            </div>
          </motion.div>
          <motion.div
            className="product-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={productsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="product-icon">
              <Target size={48} />
            </div>
            <h3>ImmunoShield</h3>
            <p>Next-generation immunotherapy for enhanced immune system support and protection.</p>
            <div className="product-features">
              <span><CheckCircle size={16} /> Breakthrough Technology</span>
              <span><CheckCircle size={16} /> Enhanced Efficacy</span>
            </div>
          </motion.div>
          <motion.div
            className="product-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={productsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="product-icon">
              <Star size={48} />
            </div>
            <h3>NeuroVital</h3>
            <p>Innovative neurological support formula for cognitive health and brain function.</p>
            <div className="product-features">
              <span><CheckCircle size={16} /> Quality Assured</span>
              <span><CheckCircle size={16} /> Patient Preferred</span>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="view-all-products"
          initial={{ opacity: 0 }}
          animate={productsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        ref={testimonialsRef}
        className="testimonials-section"
        initial={{ opacity: 0 }}
        animate={testimonialsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2>What Healthcare Professionals Say</h2>
          <p>Trusted by medical professionals across India</p>
        </div>
        <div className="testimonials-grid">
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="testimonial-content">
              <p>"Inolife's products have consistently delivered excellent results for my patients. Their commitment to quality is unmatched."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Dr. Priya Sharma</h4>
                <p>Cardiologist, Apollo Hospital</p>
              </div>
              <div className="rating">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="testimonial-content">
              <p>"The innovative approach of Inolife Healthcare has revolutionized how we treat certain conditions. Highly recommended."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Dr. Rajesh Kumar</h4>
                <p>Neurologist, Fortis Hospital</p>
              </div>
              <div className="rating">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="testimonial-content">
              <p>"Their patient-centric approach and reliable products make Inolife our preferred pharmaceutical partner."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Dr. Anjali Patel</h4>
                <p>Primary Care Physician</p>
              </div>
              <div className="rating">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="cta-section"
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="cta-content">
          <h2>Ready to Transform Healthcare?</h2>
          <p>Join us in our mission to improve lives through innovative pharmaceutical solutions</p>
          <div className="cta-buttons">
            <motion.button
              className="btn-primary"
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="btn-outline"
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Team
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
