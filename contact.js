document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
          message.style.display = 'none';
        });
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate fields
        let isValid = true;
        
        if (name.value.trim() === '') {
          displayError('name-error', 'Please enter your name');
          isValid = false;
        }
        
        if (email.value.trim() === '') {
          displayError('email-error', 'Please enter your email');
          isValid = false;
        } else if (!isValidEmail(email.value)) {
          displayError('email-error', 'Please enter a valid email address');
          isValid = false;
        }
        
        if (subject.value.trim() === '') {
          displayError('subject-error', 'Please enter a subject');
          isValid = false;
        }
        
        if (message.value.trim() === '') {
          displayError('message-error', 'Please enter your message');
          isValid = false;
        }
        
        // If valid, submit the form
        if (isValid) {
          // In a real application, you would send the form data to a server here
          // For this example, we'll just show a success message
          
          // Show success message
          formSuccess.style.display = 'block';
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 5000);
        }
      });
    }
    
    function displayError(id, message) {
      const errorElement = document.getElementById(id);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
      }
    }
    
    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    
    // FAQ Accordion
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
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.info-card, .office-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
    
    // Slide-in animations for contact form and map
    const slideElements = document.querySelectorAll('.contact-form-container, .map-container');
    
    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('contact-form-container')) {
            entry.target.classList.add('slide-in-left');
          } else if (entry.target.classList.contains('map-container')) {
            entry.target.classList.add('slide-in-right');
          }
        }
      });
    }, { threshold: 0.1 });
    
    slideElements.forEach(element => {
      slideObserver.observe(element);
    });
    
    // Regional office map modal
    const officeButtons = document.querySelectorAll('.office-btn');
    
    if (officeButtons.length > 0) {
      // Create modal container
      const mapModal = document.createElement('div');
      mapModal.classList.add('map-modal');
      mapModal.innerHTML = `
        <div class="map-modal-content">
          <span class="map-modal-close">&times;</span>
          <h3 class="map-modal-title">Location</h3>
          <div id="officeMap" class="modal-map"></div>
        </div>
      `;
      document.body.appendChild(mapModal);
      
      const mapModalTitle = mapModal.querySelector('.map-modal-title');
      const mapModalClose = mapModal.querySelector('.map-modal-close');
      
      // Add click event to office buttons
      officeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const location = this.getAttribute('data-location');
          mapModalTitle.textContent = location;
          mapModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
          
          // Initialize office map
          initOfficeMap(location);
        });
      });
      
      // Close modal
      mapModalClose.addEventListener('click', function() {
        mapModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
      
      // Close modal when clicking outside
      mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) {
          mapModal.classList.remove('active');
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    }
    
    // Get directions button
    const getDirectionsBtn = document.getElementById('getDirections');
    
    if (getDirectionsBtn) {
      getDirectionsBtn.addEventListener('click', function() {
        // Replace with your actual headquarters address
        const address = '123 Hope Street, New York, NY 10001';
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        
        window.open(mapsUrl, '_blank');
      });
    }
  });
  
  // Google Maps initialization for headquarters
  function initMap() {
    // Replace with your actual coordinates
    const hqLocation = { lat: 40.7128, lng: -74.0060 }; // New York coordinates
    
    // Create map for main location
    const mainMap = document.getElementById('googleMap');
    if (mainMap) {
      const map = new google.maps.Map(mainMap, {
        center: hqLocation,
        zoom: 15,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{ "saturation": "-100" }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "lightness": 65 },
              { "visibility": "on" }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "lightness": "50" },
              { "visibility": "simplified" }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": "-100" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{ "visibility": "simplified" }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{ "lightness": "30" }]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{ "lightness": "40" }]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "visibility": "simplified" }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "hue": "#ffff00" },
              { "lightness": -25 },
              { "saturation": -97 }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              { "lightness": -25 },
              { "saturation": -100 }
            ]
          }
        ]
      });
      
      // Add marker
      const marker = new google.maps.Marker({
        position: hqLocation,
        map: map,
        title: 'Hope Foundation Headquarters',
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4a90e2',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
      
      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin-top: 0; color: #4a90e2; font-family: sans-serif;">Hope Foundation</h3>
            <p style="margin-bottom: 5px; font-family: sans-serif;">123 Hope Street, New York, NY 10001</p>
            <p style="margin-bottom: 0; font-family: sans-serif;">+1 (555) 123-4567</p>
          </div>
        `
      });
      
      // Open info window when clicking on marker
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      
      // Add a slight bounce effect when hovering over the marker
      marker.addListener('mouseover', function() {
        if (marker.getAnimation() === null) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 750);
        }
      });
    }
  }
  
  // Function to initialize maps for regional offices
  function initOfficeMap(location) {
    // Map of location names to coordinates
    const officeCoordinates = {
      'Nairobi, Kenya': { lat: -1.2921, lng: 36.8219 },
      'New Delhi, India': { lat: 28.6139, lng: 77.2090 },
      'London, UK': { lat: 51.5074, lng: -0.1278 },
      'Bogotá, Colombia': { lat: 4.7110, lng: -74.0721 }
    };
    
    // Get coordinates for the selected location
    const coordinates = officeCoordinates[location] || { lat: 0, lng: 0 };
    
    // Create map
    const officeMap = document.getElementById('officeMap');
    if (officeMap) {
      const map = new google.maps.Map(officeMap, {
        center: coordinates,
        zoom: 15,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{ "saturation": "-100" }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "lightness": 65 },
              { "visibility": "on" }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "lightness": "50" },
              { "visibility": "simplified" }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{ "saturation": "-100" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{ "visibility": "simplified" }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{ "lightness": "30" }]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{ "lightness": "40" }]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              { "saturation": -100 },
              { "visibility": "simplified" }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              { "hue": "#ffff00" },
              { "lightness": -25 },
              { "saturation": -97 }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              { "lightness": -25 },
              { "saturation": -100 }
            ]
          }
        ]
      });
      
      // Add marker
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: 'Hope Foundation ' + location,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4a90e2',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
      
      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin-top: 0; color: #4a90e2; font-family: sans-serif;">Hope Foundation</h3>
            <p style="margin-bottom: 0; font-family: sans-serif;">${location} Regional Office</p>
          </div>
        `
      });
      
      // Open info window immediately
      infoWindow.open(map, marker);
    }
  }