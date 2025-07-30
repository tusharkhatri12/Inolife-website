import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  Lightbulb,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [valuesRef, valuesInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [teamRef, teamInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centric',
      description: 'Every decision we make is guided by what\'s best for our patients and their families.'
    },
    {
      icon: Shield,
      title: 'Quality & Safety',
      description: 'We maintain the highest standards of quality and safety in all our products and processes.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously push boundaries to develop breakthrough treatments and solutions.'
    },
    {
      icon: Globe,
      title: 'Pan-India Impact',
      description: 'We strive to make healthcare accessible to people across India, regardless of their location.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and teamwork to achieve greater outcomes.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue excellence in everything we do, from manufacturing to patient care.'
    }
  ];

  const team = [
    {
      name: 'Mrs. Mohini Khatri',
      position: 'Chief Executive Officer',
      image: '👩‍⚕️',
      bio: 'Leading Inolife Healthcare with over 20 years of experience in pharmaceutical manufacturing and distribution.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Mr. Sanjay Khatri',
      position: 'Regional Head',
      image: '👨‍💼',
      bio: 'Overseeing medical affairs and ensuring the highest standards of product quality and safety.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Mr.Davendar Kumar',
      position: 'Marketing Representative',
      image: '👨‍💼',
      bio: 'Ensuring operational excellence and quality standards across all our facilities.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Mr. Zakki Ahmed',
      position: 'Sales Representative',
      image: '👨‍💼',
      bio: 'Leading our quality assurance initiatives with focus on maintaining the highest standards.',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Mrs. Riya Khatri',
      position: 'HR Manager',
      image: '👩‍💼',
      bio: 'Leading our quality assurance initiatives with focus on maintaining the highest standards.',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Inolife Healthcare was established with a vision to transform healthcare through innovation.'
    },
    {
      year: '2013',
      title: 'First Product Launch',
      description: 'Successfully launched our flagship cardiovascular product, marking our entry into the market.'
    },
    {
      year: '2016',
      title: 'Regional Expansion',
      description: 'Expanded operations to 15 states across India, establishing strong regional presence and partnerships.'
    },
    {
      year: '2019',
      title: 'Quality Milestone',
      description: 'Achieved major milestone in quality standards, leading to regulatory approvals across India.'
    },
    {
      year: '2022',
      title: 'Digital Transformation',
      description: 'Launched comprehensive digital health platform to improve patient outcomes.'
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Continuing to expand our portfolio with quality pharmaceutical solutions across India.'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="about-hero"
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
            About Inolife Healthcare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Delivering quality pharmaceutical solutions to improve lives across India since 2010
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        ref={missionRef}
        className="mission-section"
        initial={{ opacity: 0 }}
        animate={missionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="mission-content">
            <motion.div
              className="mission-card"
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="card-icon">
                <Target size={48} />
              </div>
              <h2>Our Mission</h2>
              <p>
                To advance healthcare through quality pharmaceutical solutions that improve patient outcomes 
                and enhance quality of life. We are committed to providing safe, effective, and accessible 
                treatments that address medical needs across India.
              </p>
            </motion.div>

            <motion.div
              className="mission-card"
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="card-icon">
                <TrendingUp size={48} />
              </div>
              <h2>Our Vision</h2>
              <p>
                To be a trusted pharmaceutical company recognized for quality products, 
                exceptional patient care, and reliable healthcare solutions that improve 
                lives across India.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        ref={valuesRef}
        className="values-section"
        initial={{ opacity: 0 }}
        animate={valuesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do at Inolife Healthcare</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="value-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        ref={timelineRef}
        className="timeline-section"
        initial={{ opacity: 0 }}
        animate={timelineInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our company's history</p>
          </div>
          
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
        <div className="section-container">
          <div className="stats-grid">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="stat-icon">
                <Award size={40} />
              </div>
              <h3>15+</h3>
              <p>Years of Excellence</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="stat-icon">
                <Globe size={40} />
              </div>
              <h3>25+</h3>
              <p>Cities Served</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="stat-icon">
                <Users size={40} />
              </div>
              <h3>500+</h3>
              <p>Healthcare Partners</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="stat-icon">
                <Star size={40} />
              </div>
              <h3>50+</h3>
              <p>Products Manufactured</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="team-section"
        initial={{ opacity: 0 }}
        animate={teamInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
            <p>Meet the experts driving quality and excellence at Inolife Healthcare</p>
          </div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="member-image">
                  <span className="member-emoji">{member.image}</span>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <p className="bio">{member.bio}</p>
                  <div className="social-links">
                    <a href={member.linkedin} className="social-link">
                      <Linkedin size={16} />
                    </a>
                    <a href={member.twitter} className="social-link">
                      <Twitter size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section
        className="contact-cta-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Partner With Us?</h2>
            <p>Join us in our mission to provide quality healthcare and improve lives across India</p>
            <div className="cta-buttons">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
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
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About; 