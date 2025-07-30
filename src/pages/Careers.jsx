import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  Award, 
  Heart, 
  Lightbulb, 
  Globe, 
  Target,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Send,
  CheckCircle,
  Star,
  Building,
  GraduationCap
} from 'lucide-react';
import JobApplicationModal from '../components/JobApplicationModal';
import ResumeSubmissionModal from '../components/ResumeSubmissionModal';
import '../styles/Careers.css';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showJobModal, setShowJobModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [cultureRef, cultureInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [jobsRef, jobsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [benefitsRef, benefitsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'sales', name: 'Sales & Marketing' },
    { id: 'operations', name: 'Operations' },
    { id: 'quality', name: 'Quality Assurance' },
    { id: 'it', name: 'Information Technology' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'hyderabad', name: 'Hyderabad' }
  ];

  const jobs = [

    {
      id: 2,
      title: 'Medical Sales Representative',
      department: 'sales',
      location: 'delhi',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹6-10 LPA',
      description: 'Build relationships with healthcare professionals and promote our pharmaceutical products.',
      requirements: [
        'Bachelor\'s degree in Life Sciences or Pharmacy',
        'Proven track record in pharmaceutical sales',
        'Strong communication and presentation skills',
        'Knowledge of healthcare industry and regulations'
      ]
    },
    {
      id: 3,
      title: 'Quality Control Manager',
      department: 'quality',
      location: 'bangalore',
      type: 'Full-time',
      experience: '4-6 years',
      salary: '₹8-12 LPA',
      description: 'Ensure compliance with regulatory standards and maintain quality control processes.',
      requirements: [
        'Bachelor\'s degree in Pharmacy or Chemistry',
        'Experience in pharmaceutical quality control',
        'Knowledge of GMP and regulatory requirements',
        'Strong attention to detail and analytical skills'
      ]
    },
    {
      id: 4,
      title: 'Quality Assurance Specialist',
      department: 'quality',
      location: 'hyderabad',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹7-11 LPA',
      description: 'Ensure product quality and compliance with regulatory standards and internal procedures.',
      requirements: [
        'Bachelor\'s degree in Pharmacy or Chemistry',
        'Experience in pharmaceutical quality assurance',
        'Knowledge of GMP and regulatory requirements',
        'Excellent organizational and communication skills'
      ]
    },
    // {
    //   id: 5,
    //   title: 'IT Systems Administrator',
    //   department: 'it',
    //   location: 'mumbai',
    //   type: 'Full-time',
    //   experience: '3-5 years',
    //   salary: '₹6-9 LPA',
    //   description: 'Maintain IT infrastructure and support digital transformation initiatives.',
    //   requirements: [
    //     'Bachelor\'s degree in Computer Science or IT',
    //     'Experience with enterprise systems and networks',
    //     'Knowledge of cybersecurity best practices',
    //     'Strong troubleshooting and problem-solving skills'
    //   ]
    // },
    {
      id: 6,
      title: 'Operations Manager',
      department: 'operations',
      location: 'delhi',
      type: 'Full-time',
      experience: '6-8 years',
      salary: '₹10-15 LPA',
      description: 'Oversee manufacturing operations and ensure efficient production processes.',
      requirements: [
        'Bachelor\'s degree in Engineering or Business',
        'Experience in pharmaceutical manufacturing',
        'Strong leadership and project management skills',
        'Knowledge of lean manufacturing principles'
      ]
    }
  ];

  const cultureValues = [
    {
      icon: Heart,
      title: 'Patient-Centric',
      description: 'Every decision we make is guided by what\'s best for our patients.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and breakthrough solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and diverse perspectives.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do.'
    },
    {
      icon: Globe,
              title: 'Pan-India Impact',
        description: 'We work to improve healthcare across India.'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'We celebrate achievements and reward outstanding performance.'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Attractive compensation packages with performance-based bonuses'
    },
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family'
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: 'Continuous training and professional development opportunities'
    },
    {
      icon: Clock,
      title: 'Flexible Work Hours',
      description: 'Work-life balance with flexible scheduling options'
    },
    {
      icon: Building,
      title: 'Modern Workplace',
      description: 'State-of-the-art facilities and collaborative workspaces'
    },
    {
      icon: Star,
      title: 'Career Growth',
      description: 'Clear career progression paths and advancement opportunities'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesDepartment && matchesLocation;
  });

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleSubmitResume = () => {
    setShowResumeModal(true);
  };

  const handleContactHR = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="careers-container">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="careers-hero"
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
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be part of a team that's transforming healthcare through innovation and excellence
          </motion.p>
        </div>
      </motion.section>

      {/* Culture Section */}
      <motion.section
        ref={cultureRef}
        className="culture-section"
        initial={{ opacity: 0 }}
        animate={cultureInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Our Culture</h2>
            <p>The values that drive our success and make Inolife Healthcare a great place to work</p>
          </div>

          <div className="culture-grid">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                className="culture-card"
                initial={{ opacity: 0, y: 30 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="culture-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        ref={benefitsRef}
        className="benefits-section"
        initial={{ opacity: 0 }}
        animate={benefitsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Benefits & Perks</h2>
            <p>We take care of our team with comprehensive benefits and a supportive work environment</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="benefit-icon">
                  <benefit.icon size={32} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Jobs Section */}
      <motion.section
        ref={jobsRef}
        className="jobs-section"
        initial={{ opacity: 0 }}
        animate={jobsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="section-header">
            <h2>Open Positions</h2>
            <p>Explore exciting career opportunities at Inolife Healthcare</p>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Department:</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Location:</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="jobs-grid">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="job-card"
                initial={{ opacity: 0, y: 30 }}
                animate={jobsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <div className="job-badges">
                    <span className="job-type">{job.type}</span>
                    <span className="job-experience">{job.experience}</span>
                  </div>
                </div>

                <div className="job-details">
                  <div className="detail-item">
                    <Briefcase size={16} />
                    <span>{departments.find(d => d.id === job.department)?.name}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{locations.find(l => l.id === job.location)?.name}</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>
                        <CheckCircle size={14} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  className="apply-btn"
                  onClick={() => handleApplyNow(job)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              className="no-jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase size={48} />
              <h3>No positions found</h3>
              <p>Try adjusting your filters or check back later for new opportunities</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="careers-cta-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-container">
          <div className="cta-content">
            <h2>Don't See the Right Fit?</h2>
            <p>We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.</p>
            <div className="cta-buttons">
              <motion.button
                className="btn-primary"
                onClick={handleSubmitResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Resume
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={handleContactHR}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact HR Team
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      <JobApplicationModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        jobTitle={selectedJob?.title}
        jobId={selectedJob?.id}
      />
      
      <ResumeSubmissionModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
};

export default Careers;
