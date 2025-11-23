import React, { useState } from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-brand-navy">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-brand-baby">
            Get In Touch
          </h2>
          <p className="text-lg text-brand-baby/70 max-w-2xl mx-auto">
            Have questions or want to partner with us? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/50 text-brand-green border border-brand-grotto/30 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-green/20 group-hover:text-brand-baby">
                 <MapPinIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-baby">Our Office</h3>
                <p className="text-brand-baby/70">123 Innovation Drive, Tech City, 10101</p>
              </div>
            </div>
             <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/50 text-brand-green border border-brand-grotto/30 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-green/20 group-hover:text-brand-baby">
                 <EnvelopeIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-baby">Email Us</h3>
                <p className="text-brand-baby/70 hover:text-brand-green transition-colors"><a href="mailto:contact@linkara.com">contact@linkara.com</a></p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/50 text-brand-green border border-brand-grotto/30 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-brand-green/20 group-hover:text-brand-baby">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-baby">Call Us</h3>
                <p className="text-brand-baby/70 hover:text-brand-green transition-colors"><a href="tel:+15551234567">(555) 123-4567</a></p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-brand-navy/50 p-6 md:p-8 rounded-xl border border-brand-grotto/30 shadow-lg hover:border-brand-green/50 hover:shadow-brand-green/20 min-h-[450px] flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-baby mb-2">Message Sent!</h3>
                  <p className="text-brand-baby/70 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-brand-grotto hover:text-brand-green font-semibold underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-baby mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full bg-brand-navy border border-brand-grotto/50 rounded-lg px-4 py-2 text-brand-baby focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-baby mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full bg-brand-navy border border-brand-grotto/50 rounded-lg px-4 py-2 text-brand-baby focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                   <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-baby mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-brand-navy border border-brand-grotto/50 rounded-lg px-4 py-2 text-brand-baby focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-colors"
                      placeholder="Sponsorship Inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-baby mb-2">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="w-full bg-brand-navy border border-brand-grotto/50 rounded-lg px-4 py-2 text-brand-baby focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-colors"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div>
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-brand-grotto hover:bg-brand-green text-brand-navy font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-brand-green/50 transition-colors duration-300 flex justify-center items-center ${formStatus === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      {formStatus === 'submitting' ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : null}
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;