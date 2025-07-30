// API Service for handling form submissions and interactions
class ApiService {
  // Simulate API calls with localStorage for demo purposes
  // In production, this would connect to a real backend

  // Helper function to convert file to base64
  static async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // Contact form submission
  static async submitContactForm(formData) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage for demo
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'submitted'
      };
      submissions.push(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      return { success: true, message: 'Thank you for your message! We\'ll get back to you soon.' };
    } catch (error) {
      throw new Error('Failed to submit form. Please try again.');
    }
  }

  // Job application submission
  static async submitJobApplication(jobData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Convert resume file to base64 if present
      let resumeFileData = null;
      if (jobData.resume) {
        resumeFileData = await this.fileToBase64(jobData.resume);
      }
      
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      const newApplication = {
        id: Date.now(),
        ...jobData,
        resumeFile: resumeFileData, // Store the actual file data
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      applications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(applications));
      
      return { success: true, message: 'Your application has been submitted successfully!' };
    } catch (error) {
      throw new Error('Failed to submit application. Please try again.');
    }
  }

  // Resume submission
  static async submitResume(resumeData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Convert resume file to base64 if present
      let resumeFileData = null;
      if (resumeData.resume) {
        resumeFileData = await this.fileToBase64(resumeData.resume);
      }
      
      const resumes = JSON.parse(localStorage.getItem('resumeSubmissions') || '[]');
      const newResume = {
        id: Date.now(),
        ...resumeData,
        resumeFile: resumeFileData, // Store the actual file data
        timestamp: new Date().toISOString(),
        status: 'received'
      };
      resumes.push(newResume);
      localStorage.setItem('resumeSubmissions', JSON.stringify(resumes));
      
      return { success: true, message: 'Your resume has been received! We\'ll review it and contact you if there\'s a match.' };
    } catch (error) {
      throw new Error('Failed to submit resume. Please try again.');
    }
  }

  // Product inquiry submission
  static async submitProductInquiry(inquiryData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const inquiries = JSON.parse(localStorage.getItem('productInquiries') || '[]');
      const newInquiry = {
        id: Date.now(),
        ...inquiryData,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      inquiries.push(newInquiry);
      localStorage.setItem('productInquiries', JSON.stringify(inquiries));
      
      return { success: true, message: 'Your inquiry has been submitted! Our team will contact you shortly.' };
    } catch (error) {
      throw new Error('Failed to submit inquiry. Please try again.');
    }
  }

  // Newsletter subscription
  static async subscribeNewsletter(email) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      if (subscribers.includes(email)) {
        return { success: false, message: 'You are already subscribed to our newsletter!' };
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      
      return { success: true, message: 'Successfully subscribed to our newsletter!' };
    } catch (error) {
      throw new Error('Failed to subscribe. Please try again.');
    }
  }

  // Get stored data (for admin purposes)
  static getContactSubmissions() {
    return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  }

  static getJobApplications() {
    return JSON.parse(localStorage.getItem('jobApplications') || '[]');
  }

  static getResumeSubmissions() {
    return JSON.parse(localStorage.getItem('resumeSubmissions') || '[]');
  }

  static getProductInquiries() {
    return JSON.parse(localStorage.getItem('productInquiries') || '[]');
  }

  static getNewsletterSubscribers() {
    return JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
  }
}

export default ApiService; 