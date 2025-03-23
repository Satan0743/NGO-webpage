document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const programLinks = document.querySelectorAll('.program-link');
    
    function setActiveTab(tabId) {
      // Hide all tabs
      tabContents.forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Remove active class from all buttons
      tabButtons.forEach(button => {
        button.classList.remove('active');
      });
      
      // Show the selected tab
      document.getElementById(`${tabId}-tab`).classList.add('active');
      
      // Add active class to the clicked button
      document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
    }
    
    // Add click event to tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        setActiveTab(tabId);
      });
    });
    
    // Add click event to program links in footer
    programLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        setActiveTab(tabId);
        
        // Scroll to the tabs section
        const tabsSection = document.querySelector('.service-tabs');
        window.scrollTo({
          top: tabsSection.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
    
    // Project Showcase Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter showcase items
        showcaseItems.forEach(item => {
          item.classList.add('hidden');
          item.classList.remove('visible');
          
          setTimeout(() => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.classList.remove('hidden');
              item.classList.add('visible');
            }
          }, 300);
        });
      });
    });
    
    // Interactive World Map
    const worldMap = document.getElementById('worldMap');
    const mapInfoBox = document.getElementById('mapInfoBox');
    const mapCountryName = document.getElementById('mapCountryName');
    const mapProjectList = document.getElementById('mapProjectList');
    const mapInfoClose = document.querySelector('.map-info-close');
    
    // Sample data for map pins
    const mapData = [
      { country: 'Kenya', lat: 0.2, lng: 38, projects: [
        { name: 'Clean Water Initiative', type: 'water' },
        { name: 'Primary School Construction', type: 'education' }
      ]},
      { country: 'India', lat: 20.6, lng: 79, projects: [
        { name: 'Mobile Health Clinics', type: 'healthcare' },
        { name: 'Women\'s Entrepreneurship', type: 'economic' }
      ]},
      { country: 'Brazil', lat: -14.2, lng: -51.9, projects: [
        { name: 'Rainforest Conservation', type: 'water' },
        { name: 'Youth Education Program', type: 'education' }
      ]},
      { country: 'Nepal', lat: 28.4, lng: 84.1, projects: [
        { name: 'Earthquake Recovery', type: 'disaster' },
        { name: 'Mountain School Initiative', type: 'education' }
      ]},
      { country: 'Ghana', lat: 7.9, lng: -1.0, projects: [
        { name: 'Rural Healthcare Access', type: 'healthcare' },
        { name: 'Agricultural Development', type: 'economic' }
      ]},
      { country: 'Philippines', lat: 12.9, lng: 122.8, projects: [
        { name: 'Typhoon Recovery', type: 'disaster' },
        { name: 'Island Education Program', type: 'education' }
      ]},
      { country: 'Guatemala', lat: 15.8, lng: -90.2, projects: [
        { name: 'Women\'s Craft Cooperative', type: 'economic' },
        { name: 'Clean Water Systems', type: 'water' }
      ]}
    ];
    
    // Create color mapping for project types
    const projectColors = {
      'education': '#4a90e2',
      'healthcare': '#50c878',
      'water': '#3a7bc8',
      'economic': '#c85a50',
      'disaster': '#c850b9'
    };
    
    // Generate pins on the map
    if (worldMap) {
      // Map dimensions
      const mapWidth = 900; // Approximate width of the map image
      const mapHeight = 450; // Approximate height of the map image
      
      mapData.forEach(location => {
        // Convert lat/lng to x/y coordinates
        // This is a very simplified conversion for demo purposes
        const x = ((location.lng + 180) / 360) * mapWidth;
        const y = ((90 - location.lat) / 180) * mapHeight;
        
        // Create the pin element
        const pin = document.createElement('div');
        pin.classList.add('map-pin');
        
        // Determine pin color based on first project type
        const primaryProjectType = location.projects[0].type;
        pin.style.backgroundColor = projectColors[primaryProjectType];
        
        // Position the pin
        pin.style.left = `${(x / mapWidth) * 100}%`;
        pin.style.top = `${(y / mapHeight) * 100}%`;
        
        // Add pulse animation
        pin.style.animation = 'pulse 2s infinite';
        
        // Add click event
        pin.addEventListener('click', function() {
          // Show info box
          mapInfoBox.style.display = 'block';
          
          // Set country name
          mapCountryName.textContent = location.country;
          
          // Clear previous projects
          mapProjectList.innerHTML = '';
          
          // Add projects
          location.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('map-project-item');
            
            projectItem.innerHTML = `
              <div class="map-project-type" style="background-color: ${projectColors[project.type]}"></div>
              <div class="map-project-name">${project.name}</div>
            `;
            
            mapProjectList.appendChild(projectItem);
          });
        });
        
        // Add the pin to the map
        worldMap.appendChild(pin);
      });
      
      // Add click event to close info box
      mapInfoClose.addEventListener('click', function() {
        mapInfoBox.style.display = 'none';
      });
      
      // Add click event to close info box when clicking outside
      worldMap.addEventListener('click', function(e) {
        if (e.target === worldMap) {
          mapInfoBox.style.display = 'none';
        }
      });
    }
    
    // Add keyframe animation for pins
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.7);
        }
        70% {
          transform: scale(1.2);
          box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(74, 144, 226, 0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.section-title, .tab-image, .volunteer-image, .showcase-item');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-element');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      element.style.transform = 'translateY(20px)';
      
      fadeObserver.observe(element);
    });
    
    // Add CSS class for animated elements
    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
      .fade-in-element {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(animationStyle);
    
    // Animate impact numbers
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    impactNumbers.forEach(number => {
      const targetValue = number.textContent;
      number.textContent = '0';
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateNumber(number, targetValue);
          observer.unobserve(number);
        }
      }, { threshold: 0.5 });
      
      observer.observe(number);
    });
    
    function animateNumber(element, target) {
      let currentValue = 0;
      const targetNum = parseInt(target.replace(/,/g, '').replace(/\+/g, ''));
      const duration = 2000; // ms
      const step = Math.max(1, Math.floor(targetNum / (duration / 30)));
      const isPlus = target.includes('+');
      
      const interval = setInterval(() => {
        currentValue += step;
        if (currentValue >= targetNum) {
          currentValue = targetNum;
          clearInterval(interval);
        }
        
        // Format the number with commas
        let formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (isPlus) formattedValue += '+';
        
        element.textContent = formattedValue;
      }, 30);
    }
  });