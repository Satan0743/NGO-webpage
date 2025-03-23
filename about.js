document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .reveal-item, .reveal-timeline');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust the trigger point (negative values trigger later)
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
    
    // Parallax effect for the Join Us CTA section
    const parallaxSection = document.getElementById('parallaxSection');
    
    if (parallaxSection) {
      window.addEventListener('scroll', function() {
        // Only apply parallax effect for desktop
        if (window.innerWidth > 768) {
          let scrollPosition = window.pageYOffset;
          let sectionOffset = parallaxSection.offsetTop;
          let scrollRelative = scrollPosition - sectionOffset;
          
          // Apply parallax effect to background
          if (scrollPosition > sectionOffset - window.innerHeight && 
              scrollPosition < sectionOffset + parallaxSection.offsetHeight) {
            parallaxSection.style.backgroundPositionY = `calc(50% + ${scrollRelative * 0.4}px)`;
          }
        }
      });
    }
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 100, // Offset for fixed navbar
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Timeline year hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      const year = item.getAttribute('data-year');
      
      item.addEventListener('mouseenter', function() {
        const yearDisplay = document.createElement('div');
        yearDisplay.classList.add('year-highlight');
        yearDisplay.textContent = year;
        yearDisplay.style.position = 'absolute';
        yearDisplay.style.top = '50%';
        yearDisplay.style.left = '50%';
        yearDisplay.style.transform = 'translate(-50%, -50%)';
        yearDisplay.style.fontSize = '8rem';
        yearDisplay.style.color = 'rgba(74, 144, 226, 0.1)';
        yearDisplay.style.zIndex = '-1';
        yearDisplay.style.pointerEvents = 'none';
        yearDisplay.style.transition = 'all 0.3s ease';
        
        // Insert into DOM
        this.style.position = 'relative';
        this.appendChild(yearDisplay);
        
        // Animate in
        setTimeout(() => {
          yearDisplay.style.fontSize = '15rem';
          yearDisplay.style.opacity = '0.2';
        }, 10);
      });
      
      item.addEventListener('mouseleave', function() {
        const yearDisplay = this.querySelector('.year-highlight');
        if (yearDisplay) {
          // Animate out
          yearDisplay.style.opacity = '0';
          yearDisplay.style.fontSize = '8rem';
          
          // Remove from DOM after animation
          setTimeout(() => {
            yearDisplay.remove();
          }, 300);
        }
      });
    });
    
    // Connect "Join Our Mission" donate button to donation modal
    const ctaDonateBtn = document.getElementById('ctaDonateBtn');
    const donationModal = document.getElementById('donationModal');
    
    if (ctaDonateBtn && donationModal) {
      ctaDonateBtn.addEventListener('click', function() {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      });
    }
    
    // Animated counter for years of impact
    function createYearsCounter() {
      const currentYear = new Date().getFullYear();
      const foundingYear = 2005;
      const yearsOfImpact = currentYear - foundingYear;
      
      const storySection = document.querySelector('.story');
      if (storySection) {
        const yearsCounter = document.createElement('div');
        yearsCounter.classList.add('years-counter');
        yearsCounter.innerHTML = `
          <div class="years-number" data-target="${yearsOfImpact}">0</div>
          <div class="years-label">Years of Impact</div>
        `;
        
        // Style the counter
        yearsCounter.style.position = 'absolute';
        yearsCounter.style.top = '0';
        yearsCounter.style.right = '0';
        yearsCounter.style.background = 'var(--primary-color)';
        yearsCounter.style.color = 'white';
        yearsCounter.style.padding = '1.5rem';
        yearsCounter.style.borderRadius = '0 0 0 8px';
        yearsCounter.style.textAlign = 'center';
        yearsCounter.style.zIndex = '10';
        yearsCounter.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        
        // Add styles to the number
        const yearsNumber = yearsCounter.querySelector('.years-number');
        yearsNumber.style.fontSize = '3rem';
        yearsNumber.style.fontWeight = 'bold';
        yearsNumber.style.lineHeight = '1';
        
        // Add styles to the label
        const yearsLabel = yearsCounter.querySelector('.years-label');
        yearsLabel.style.fontSize = '1rem';
        
        // Add the counter to the page
        storySection.style.position = 'relative';
        storySection.appendChild(yearsCounter);
        
        // Animate the counter
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            const currentNumber = yearsNumber;
            let startValue = 0;
            let endValue = parseInt(currentNumber.getAttribute('data-target'));
            let duration = 2000; // milliseconds
            let counter = setInterval(function() {
              startValue += 1;
              currentNumber.textContent = startValue;
              if (startValue == endValue) {
                clearInterval(counter);
              }
            }, duration / endValue);
            
            observer.unobserve(yearsCounter);
          }
        }, { threshold: 0.5 });
        
        observer.observe(yearsCounter);
      }
    }
    
    createYearsCounter();
    
    // Tilt effect for team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
      member.addEventListener('mousemove', function(e) {
        const cardRect = this.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // Calculate cursor position relative to card center
        const cursorX = e.clientX - cardCenterX;
        const cursorY = e.clientY - cardCenterY;
        
        // Calculate tilt angle (max 15 degrees)
        const tiltX = (cursorY / (cardRect.height / 2)) * 10;
        const tiltY = -(cursorX / (cardRect.width / 2)) * 10;
        
        // Apply transform
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
      });
      
      member.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
    
    // Animated typing effect for section titles
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = ''; // Clear existing text
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }
    
    // Observe section titles and animate them when in view
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
      const originalText = title.textContent;
      title.textContent = '';
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          typeWriter(title, originalText, 50);
          observer.unobserve(title);
        }
      }, { threshold: 0.5 });
      
      observer.observe(title);
    });
  });