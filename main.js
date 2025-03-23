// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // =========================================
    // Navigation Menu Toggle (Mobile)
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      });
    });
    
    // =========================================
    // Donation Modal
    // =========================================
    const donationModal = document.getElementById('donationModal');
    const donateButtons = document.querySelectorAll('#donateBtn, #heroDonateBtn, #footerDonateBtn, .donate-project-btn, .donate-service-btn');
    const closeModal = document.querySelector('.close-modal');
    const cancelDonation = document.getElementById('cancelDonation');
    const projectSelect = document.getElementById('project');
    
    // Open donation modal
    if (donateButtons.length > 0 && donationModal) {
      donateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          donationModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
          
          // If button has a data-project attribute, set the project select value
          if (this.dataset.project) {
            projectSelect.value = this.dataset.project;
          }
        });
      });
    }
    
    // Close donation modal
    if ((closeModal || cancelDonation) && donationModal) {
      if (closeModal) {
        closeModal.addEventListener('click', closedonationModal);
      }
      
      if (cancelDonation) {
        cancelDonation.addEventListener('click', closedonationModal);
      }
      
      // Close modal when clicking outside of it
      window.addEventListener('click', function(e) {
        if (e.target === donationModal) {
          closedonationModal();
        }
      });
    }
    
    function closedonationModal() {
      if (donationModal) {
        donationModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
    
    // Custom amount toggle in donation form
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const customAmountInput = document.getElementById('customAmount');
    
    if (amountRadios.length > 0 && customAmountInput) {
      amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          if (this.value === 'custom') {
            customAmountInput.disabled = false;
            customAmountInput.focus();
          } else {
            customAmountInput.disabled = true;
          }
        });
      });
    }
    
    // Donation form submission
    const donationForm = document.getElementById('donationForm');
    
    if (donationForm) {
      donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.querySelector('input[name="amount"]:checked').value;
        const finalAmount = amount === 'custom' ? document.getElementById('customAmount').value : amount;
        const frequency = document.getElementById('frequency').value;
        const project = document.getElementById('project').value;
        
        // In a real application, this would be sent to a server
        alert(`Thank you for your donation of $${finalAmount} to our ${project} fund. Your donation will be processed as a ${frequency} contribution.`);
        
        closedonationModal();
      });
    }
    
    // =========================================
    // Newsletter Form Submission
    // =========================================
    const newsletterForm = document.getElementById('newsletterForm');
    const footerNewsletterForm = document.getElementById('footerNewsletterForm');
    
    function handleNewsletterSubmit(e) {
      e.preventDefault();
      
      // In a real application, this would be sent to a server
      alert('Thank you for subscribing to our newsletter!');
      
      this.reset();
    }
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    if (footerNewsletterForm) {
      footerNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // =========================================
    // Contact Form Submission
    // =========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, this would be sent to a server
        alert('Thank you for your message! We will get back to you as soon as possible.');
        
        this.reset();
      });
    }
    
    // =========================================
    // Testimonial Slider
    // =========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (testimonialSlides.length > 0) {
      let currentSlide = 0;
      
      // Show initial slide
      showSlide(currentSlide);
      
      // Previous slide button
      if (testimonialPrev) {
        testimonialPrev.addEventListener('click', function() {
          currentSlide--;
          if (currentSlide < 0) {
            currentSlide = testimonialSlides.length - 1;
          }
          showSlide(currentSlide);
        });
      }
      
      // Next slide button
      if (testimonialNext) {
        testimonialNext.addEventListener('click', function() {
          currentSlide++;
          if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
          }
          showSlide(currentSlide);
        });
      }
      
      // Dot navigation
      if (testimonialDots.length > 0) {
        testimonialDots.forEach(dot => {
          dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.dataset.index);
            showSlide(slideIndex);
            currentSlide = slideIndex;
          });
        });
      }
      
      // Auto slide change
      setInterval(function() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
          currentSlide = 0;
        }
        showSlide(currentSlide);
      }, 7000); // Change slide every 7 seconds
      
      function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
          slide.classList.remove('active');
        });
        
        // Remove active state from all dots
        if (testimonialDots.length > 0) {
          testimonialDots.forEach(dot => {
            dot.classList.remove('active');
          });
        }
        
        // Show the current slide
        testimonialSlides[index].classList.add('active');
        
        // Add active state to current dot
        if (testimonialDots.length > 0 && testimonialDots[index]) {
          testimonialDots[index].classList.add('active');
        }
      }
    }
    
    // =========================================
    // Accordion (FAQ)
    // =========================================
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
          // Toggle active class on the clicked item
          item.classList.toggle('active');
          
          // Close other items
          accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
        });
      });
    }
    
    // =========================================
    // Stats Counter Animation
    // =========================================
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            // Start at 0
            counter.textContent = '0';
            
            const updateCounter = () => {
              const count = parseInt(counter.textContent);
              
              // Calculate the increment - higher for larger numbers for faster animation
              const increment = Math.ceil(target / 100);
              
              // Update counter if not yet reached target
              if (count < target) {
                counter.textContent = Math.min(count + increment, target).toString();
                setTimeout(updateCounter, 20);
              }
            };
            
            updateCounter();
            observer.unobserve(counter);
          }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
      });
    }
    
    // =========================================
    // Current Year in Footer
    // =========================================
    const currentYearElements = document.querySelectorAll('#currentYear');
    
    if (currentYearElements.length > 0) {
      const currentYear = new Date().getFullYear();
      
      currentYearElements.forEach(element => {
        element.textContent = currentYear.toString();
      });
    }
  });