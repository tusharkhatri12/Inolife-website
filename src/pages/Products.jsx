import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Pill, 
  Heart, 
  Brain, 
  Shield, 
  Eye, 
  Bone, 
  Search, 
  Filter,
  Star,
  CheckCircle,
  Info,
  ArrowRight,
  Download,
  Eye as EyeIcon
} from 'lucide-react';
import ApiService from '../services/apiService';
import Notification from '../components/Notification';
import '../styles/Products.css';
import polycrunch from '../assets/polycrunch.jpg';  

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [productsRef, productsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const categories = [
    { id: 'all', name: 'All Products', icon: Pill },
    { id: 'vitamins', name: 'Vitamins', icon: Heart },
    { id: 'protein powders', name: 'Protein Powders', icon: Brain },
    { id: 'immunology', name: 'Immunology', icon: Shield },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye },
    { id: 'orthopedics', name: 'Orthopedics', icon: Bone },
  ];

  const products = [
    {
      id: 1,
      name: 'Polyrich Crunch Protein Powder',
      category: 'protein powders',
      description: 'Premium protein powder for muscle building and recovery with essential amino acids.',
      longDescription: 'Polyrich Crunch is a high-quality protein powder designed to support muscle growth, recovery, and overall fitness. This premium formula contains essential amino acids and is perfect for athletes and fitness enthusiasts.',
      features: ['High Protein Content', 'Essential Amino Acids', 'Muscle Recovery', 'Easy to Mix'],
      dosage: '1 scoop daily with water or milk',
      sideEffects: ['Rare digestive discomfort'],
      image: polycrunch,
      rating: 4.8,
      reviews: 1247,
      price: '$45.99',
      prescription: false
    },
    {
      id: 2,
      name: 'WheyMax Pro',
      category: 'protein powders',
      description: 'Advanced whey protein isolate for maximum muscle growth and recovery.',
      longDescription: 'WheyMax Pro is a premium whey protein isolate designed for serious athletes and bodybuilders. This high-quality protein powder provides fast absorption and optimal muscle recovery.',
      features: ['Whey Protein Isolate', 'Fast Absorption', 'Muscle Growth', 'Low Fat Content'],
      dosage: '1-2 scoops daily with water or milk',
      sideEffects: ['Rare lactose sensitivity'],
      image: '🥛',
      rating: 4.9,
      reviews: 892,
      price: '$52.99',
      prescription: false
    },
    {
      id: 3,
      name: 'ImmunoShield',
      category: 'vitamins',
      description: 'Next-generation immunotherapy for enhanced immune system support and protection.',
      longDescription: 'ImmunoShield represents a quality immunotherapy treatment, designed to strengthen the body\'s natural defense mechanisms. This effective treatment helps protect against various pathogens while maintaining optimal immune function.',
      features: ['Breakthrough Technology', 'Enhanced Efficacy', 'Long-lasting Protection', 'Minimal Side Effects'],
      dosage: '5mg twice daily',
      sideEffects: ['Fatigue', 'Mild fever'],
      image: '🛡️',
      rating: 4.9,
      reviews: 892,
      price: '$67.50',
      prescription: true
    },
    {
      id: 4,
      name: 'NeuroVital',
      category: 'neurological',
      description: 'Innovative neurological support formula for cognitive health and brain function.',
      longDescription: 'NeuroVital is a cutting-edge neurological medication that supports cognitive function and brain health. This advanced formula targets key neural pathways to enhance memory, focus, and overall cognitive performance.',
      features: ['Quality Assured', 'Patient Preferred', 'Cognitive Enhancement', 'Memory Support'],
      dosage: '15mg once daily',
      sideEffects: ['Headache', 'Insomnia'],
      image: '🧠',
      rating: 4.7,
      reviews: 1563,
      price: '$89.99',
      prescription: true
    },
    {
      id: 5,
      name: 'OpticClear',
      category: 'ophthalmology',
      description: 'Advanced eye care solution for vision health and ocular protection.',
      longDescription: 'OpticClear is a comprehensive eye care medication designed to support vision health and protect against various ocular conditions. This innovative treatment promotes optimal eye function and visual clarity.',
      features: ['Vision Enhancement', 'Ocular Protection', 'Clinically Proven', 'Safe for Long-term Use'],
      dosage: '2 drops twice daily',
      sideEffects: ['Temporary blurring', 'Eye irritation'],
      image: '👁️',
      rating: 4.6,
      reviews: 734,
      price: '$34.99',
      prescription: false
    },
    {
      id: 6,
      name: 'BoneFlex',
      category: 'orthopedics',
      description: 'Comprehensive bone health support for strength and mobility.',
      longDescription: 'BoneFlex is a specialized orthopedic medication that supports bone health and joint function. This advanced formula helps maintain bone density and promotes overall musculoskeletal health.',
      features: ['Bone Strength', 'Joint Support', 'Calcium Absorption', 'Mobility Enhancement'],
      dosage: '20mg once daily',
      sideEffects: ['Stomach upset', 'Constipation'],
      image: '🦴',
      rating: 4.5,
      reviews: 1021,
      price: '$52.75',
      prescription: true
    },
    {
      id: 7,
      name: 'VitaGuard',
      category: 'immunology',
      description: 'Essential vitamin and mineral supplement for overall health and immunity.',
      longDescription: 'VitaGuard is a comprehensive vitamin and mineral supplement designed to support overall health and strengthen the immune system. This balanced formula provides essential nutrients for optimal bodily function.',
      features: ['Complete Nutrition', 'Immune Support', 'Energy Boost', 'Antioxidant Rich'],
      dosage: '1 tablet daily',
      sideEffects: ['Rare allergic reactions'],
      image: '💊',
      rating: 4.4,
      reviews: 2156,
      price: '$28.99',
      prescription: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleDownloadInfo = async () => {
    if (!selectedProduct) return;
    
    setIsSubmitting(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a simple text file with product info
      const productInfo = `
Product Information: ${selectedProduct.name}

Description: ${selectedProduct.longDescription}

Features:
${selectedProduct.features.map(feature => `- ${feature}`).join('\n')}

Dosage: ${selectedProduct.dosage}

Side Effects:
${selectedProduct.sideEffects.map(effect => `- ${effect}`).join('\n')}

Price: ${selectedProduct.price}
      `;
      
      const blob = new Blob([productInfo], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedProduct.name}_Information.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setNotification({ show: true, message: 'Product information downloaded successfully!', type: 'success' });
    } catch (error) {
      setNotification({ show: true, message: 'Failed to download information. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLearnMore = async () => {
    if (!selectedProduct) return;
    
    setIsSubmitting(true);
    try {
      const inquiryData = {
        name: 'Product Inquiry',
        email: 'user@example.com',
        product: selectedProduct.name,
        message: `I'm interested in learning more about ${selectedProduct.name}`
      };
      
      const result = await ApiService.submitProductInquiry(inquiryData);
      setNotification({ show: true, message: result.message, type: 'success' });
    } catch (error) {
      setNotification({ show: true, message: 'Failed to submit inquiry. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#ffd700' : 'none'}
        color={i < Math.floor(rating) ? '#ffd700' : '#ddd'}
      />
    ));
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="products-hero"
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
            Our Product Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our comprehensive range of pharmaceutical solutions designed to improve lives across India
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section
        className="search-filter-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="search-filter-container">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon size={20} />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        ref={productsRef}
        className="products-grid-section"
        initial={{ opacity: 0 }}
        animate={productsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="products-grid">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                layout
              >
                                 <div className="product-image">
                   {typeof product.image === 'string' ? (
                     <span className="product-icon">{product.image}</span>
                   ) : (
                     <img src={polycrunch.image} alt={product.name} className="product-image-file" />
                   )}
                   {product.prescription && (
                     <div className="prescription-badge">
                       <span>Rx</span>
                     </div>
                   )}
                 </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="product-features">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        <CheckCircle size={14} />
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="product-price">
                    <span className="price">{product.price}</span>
                  </div>
                </div>
                
                <div className="product-actions">
                  <motion.button
                    className="btn-primary"
                    onClick={() => openProductModal(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <EyeIcon size={16} />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProducts.length === 0 && (
            <motion.div
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Search size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your search criteria or browse all categories</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Product Modal */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              
              <div className="modal-content">
                                 <div className="modal-header">
                   <div className="product-icon-large">
                     {typeof selectedProduct.image === 'string' ? (
                       <span>{selectedProduct.image}</span>
                     ) : (
                       <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image-file-large" />
                     )}
                   </div>
                  <div className="product-title">
                    <h2>{selectedProduct.name}</h2>
                    <div className="product-rating-modal">
                      {renderStars(selectedProduct.rating)}
                      <span>{selectedProduct.rating} ({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="modal-body">
                  <div className="product-description">
                    <h3>Description</h3>
                    <p>{selectedProduct.longDescription}</p>
                  </div>
                  
                  <div className="product-details">
                    <div className="detail-section">
                      <h3>Features</h3>
                      <ul>
                        {selectedProduct.features.map((feature, idx) => (
                          <li key={idx}>
                            <CheckCircle size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="detail-section">
                      <h3>Dosage</h3>
                      <p>{selectedProduct.dosage}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h3>Side Effects</h3>
                      <ul>
                        {selectedProduct.sideEffects.map((effect, idx) => (
                          <li key={idx}>{effect}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <div className="product-price-modal">
                    <span className="price-large">{selectedProduct.price}</span>
                    {selectedProduct.prescription && (
                      <span className="prescription-notice">Prescription Required</span>
                    )}
                  </div>
                  
                                     <div className="modal-actions">
                     <motion.button
                       className="btn-secondary"
                       onClick={handleDownloadInfo}
                       disabled={isSubmitting}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <Download size={16} />
                       {isSubmitting ? 'Downloading...' : 'Download Info'}
                     </motion.button>
                     <motion.button
                       className="btn-primary"
                       onClick={handleLearnMore}
                       disabled={isSubmitting}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       <ArrowRight size={16} />
                       {isSubmitting ? 'Submitting...' : 'Learn More'}
                     </motion.button>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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

export default Products;
