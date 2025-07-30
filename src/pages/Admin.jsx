import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Trash2, 
  FileText, 
  Users, 
  Mail, 
  Briefcase, 
  Package,
  Bell,
  Eye,
  FileDown
} from 'lucide-react';
import ApiService from '../services/apiService';
import '../styles/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [data, setData] = useState({
    applications: [],
    resumes: [],
    contacts: [],
    inquiries: [],
    subscribers: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData({
      applications: ApiService.getJobApplications(),
      resumes: ApiService.getResumeSubmissions(),
      contacts: ApiService.getContactSubmissions(),
      inquiries: ApiService.getProductInquiries(),
      subscribers: ApiService.getNewsletterSubscribers()
    });
  };

  const exportData = (type) => {
    const csvContent = convertToCSV(data[type]);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearData = (type) => {
    if (window.confirm(`Are you sure you want to clear all ${type}?`)) {
      localStorage.removeItem(`${type}Submissions`);
      if (type === 'newsletter') {
        localStorage.removeItem('newsletterSubscribers');
      }
      loadData();
    }
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).filter(key => key !== 'resumeFile'); // Exclude base64 data
    const csvHeaders = headers.join(',');
    const csvRows = data.map(item => 
      headers.map(header => {
        const value = item[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value || '';
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  // Download actual file from base64 data
  const downloadFile = (fileData, fileName, fileType = 'application/pdf') => {
    try {
      if (!fileData) {
        alert('No file data available for download.');
        return;
      }

      // Convert base64 to blob
      const base64Response = fetch(fileData);
      base64Response.then(res => res.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  // Download resume file
  const downloadResume = (resumeData) => {
    if (resumeData.resumeFile) {
      const fileName = resumeData.resumeName || `${resumeData.name}_Resume.pdf`;
      downloadFile(resumeData.resumeFile, fileName);
    } else {
      // Fallback to text file if no actual file data
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
    }
  };

  // Download application file
  const downloadApplication = (applicationData) => {
    if (applicationData.resumeFile) {
      const fileName = applicationData.resumeName || `${applicationData.name}_Application.pdf`;
      downloadFile(applicationData.resumeFile, fileName);
    } else {
      // Fallback to text file if no actual file data
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
    }
  };

  const renderTable = (type) => {
    const items = data[type];
    if (items.length === 0) {
      return (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No {type} found</h3>
          <p>There are no {type} submissions yet.</p>
        </div>
      );
    }

    const headers = Object.keys(items[0]).filter(key => key !== 'resumeFile'); // Exclude base64 data

    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map(header => (
                <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
              ))}
              {(type === 'resumes' || type === 'applications') && (
                <th>Actions</th>
              )}
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
                      <FileDown size={16} />
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

  const tabs = [
    { id: 'applications', label: 'Job Applications', icon: Briefcase, count: data.applications.length },
    { id: 'resumes', label: 'Resume Submissions', icon: FileText, count: data.resumes.length },
    { id: 'contacts', label: 'Contact Forms', icon: Mail, count: data.contacts.length },
    { id: 'inquiries', label: 'Product Inquiries', icon: Package, count: data.inquiries.length },
    { id: 'subscribers', label: 'Newsletter Subscribers', icon: Bell, count: data.subscribers.length }
  ];

  const stats = [
    { title: 'Total Applications', value: data.applications.length, icon: Briefcase },
    { title: 'Resume Submissions', value: data.resumes.length, icon: FileText },
    { title: 'Contact Forms', value: data.contacts.length, icon: Mail },
    { title: 'Product Inquiries', value: data.inquiries.length, icon: Package }
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage and monitor all form submissions and user interactions</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon size={20} />
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="actions-bar">
        <motion.button
          onClick={() => exportData(activeTab)}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export CSV
        </motion.button>
        <motion.button
          onClick={() => clearData(activeTab)}
          className="btn-danger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={16} />
          Clear All
        </motion.button>
      </div>

      {/* Content */}
      <div className="content-area">
        {renderTable(activeTab)}
      </div>
    </div>
  );
};

export default Admin; 