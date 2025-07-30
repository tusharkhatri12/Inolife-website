import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  FileText, 
  Briefcase, 
  Download,
  Eye,
  Trash2,
  Database,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import ApiService from '../services/apiService';
import '../styles/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [data, setData] = useState({
    applications: [],
    resumes: [],
    contacts: [],
    inquiries: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData({
      applications: ApiService.getJobApplications(),
      resumes: ApiService.getResumeSubmissions(),
      contacts: ApiService.getContactSubmissions(),
      inquiries: ApiService.getProductInquiries()
    });
  };

  const exportData = (type) => {
    const dataToExport = data[type];
    const csvContent = convertToCSV(dataToExport);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  const clearData = (type) => {
    if (window.confirm(`Are you sure you want to clear all ${type} data?`)) {
      localStorage.removeItem(`${type}Submissions`);
      loadData();
    }
  };

  const downloadResume = (resumeData) => {
    try {
      // Create a simple text file with resume information
      const resumeInfo = `
Resume Information: ${resumeData.name}

Personal Details:
- Name: ${resumeData.name}
- Email: ${resumeData.email}
- Phone: ${resumeData.phone}
- Experience: ${resumeData.experience}
- Education: ${resumeData.education}

Professional Details:
- Skills: ${resumeData.skills || 'Not specified'}
- Preferred Position: ${resumeData.preferredPosition || 'Not specified'}
- Resume File: ${resumeData.resumeName || 'No file uploaded'}

Submitted on: ${new Date(resumeData.timestamp).toLocaleString()}
      `;
      
      const blob = new Blob([resumeInfo], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.name}_Resume_${new Date(resumeData.timestamp).toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const downloadApplication = (applicationData) => {
    try {
      // Create a simple text file with job application information
      const applicationInfo = `
Job Application: ${applicationData.jobTitle || 'Unknown Position'}

Personal Details:
- Name: ${applicationData.name}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- Experience: ${applicationData.experience}
- Education: ${applicationData.education}

Application Details:
- Job Title: ${applicationData.jobTitle || 'Not specified'}
- Job ID: ${applicationData.jobId || 'Not specified'}
- Cover Letter: ${applicationData.coverLetter || 'Not provided'}
- Resume File: ${applicationData.resumeName || 'No file uploaded'}

Submitted on: ${new Date(applicationData.timestamp).toLocaleString()}
      `;
      
      const blob = new Blob([applicationInfo], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${applicationData.name}_Application_${new Date(applicationData.timestamp).toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading application:', error);
      alert('Failed to download application. Please try again.');
    }
  };

  const renderTable = (items, type) => {
    if (items.length === 0) {
      return (
        <div className="admin-empty">
          <Database size={48} />
          <h3>No data available</h3>
          <p>No {type} submissions found</p>
        </div>
      );
    }

    const headers = Object.keys(items[0]).filter(key => key !== 'id');

    return (
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>
                  {header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </th>
              ))}
              {(type === 'resumes' || type === 'applications') && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {headers.map(header => (
                  <td key={header}>
                    {header === 'timestamp' 
                      ? new Date(item[header]).toLocaleString()
                      : typeof item[header] === 'string' && item[header].length > 50
                      ? `${item[header].substring(0, 50)}...`
                      : typeof item[header] === 'object'
                      ? JSON.stringify(item[header])
                      : String(item[header] || '')
                    }
                  </td>
                ))}
                {(type === 'resumes' || type === 'applications') && (
                  <td>
                    <motion.button
                      onClick={() => type === 'resumes' ? downloadResume(item) : downloadApplication(item)}
                      className="admin-download-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={type === 'resumes' ? "Download Resume" : "Download Application"}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getStats = () => {
    return {
      totalApplications: data.applications.length,
      totalResumes: data.resumes.length,
      totalContacts: data.contacts.length,
      totalInquiries: data.inquiries.length,
      totalSubmissions: data.applications.length + data.resumes.length + data.contacts.length + data.inquiries.length
    };
  };

  const stats = getStats();

  const tabs = [
    { id: 'applications', name: 'Job Applications', icon: Briefcase, count: data.applications.length },
    { id: 'resumes', name: 'Resume Submissions', icon: FileText, count: data.resumes.length },
    { id: 'contacts', name: 'Contact Forms', icon: Mail, count: data.contacts.length },
    { id: 'inquiries', name: 'Product Inquiries', icon: Users, count: data.inquiries.length }
  ];

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage submitted data and inquiries</p>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="admin-stats">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stat-icon">
              <Briefcase size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalApplications}</h3>
              <p>Job Applications</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalResumes}</h3>
              <p>Resume Submissions</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat-icon">
              <Mail size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalContacts}</h3>
              <p>Contact Forms</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalInquiries}</h3>
              <p>Product Inquiries</p>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="admin-main">
          <div className="admin-card">
            {/* Tabs */}
            <div className="admin-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon size={16} />
                  {tab.name}
                  <span className="admin-tab-count">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="admin-content-area">
              <div className="admin-content-header">
                <h2>{tabs.find(tab => tab.id === activeTab)?.name}</h2>
                <div className="admin-actions">
                  <motion.button
                    onClick={() => exportData(activeTab)}
                    className="admin-btn admin-btn-export"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={16} />
                    Export CSV
                  </motion.button>
                  <motion.button
                    onClick={() => clearData(activeTab)}
                    className="admin-btn admin-btn-clear"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                    Clear All
                  </motion.button>
                </div>
              </div>

              <div className="admin-data-area">
                {renderTable(data[activeTab], activeTab)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 