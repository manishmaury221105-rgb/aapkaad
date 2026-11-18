/**
 * AapkaAd Web Application - Full Replica
 * Same-to-same implementation of aapkaad.com
 */

(function () {
  'use strict';

  // State Management
  let currentRoute = '/';
  let currentServiceId = null;
  let carouselIndex = 0;
  let carouselInterval = null;

  // Regional Offices data from aapkaad.com
  const regionalOffices = [
    {
      state: "UTTAR PRADESH",
      address: "Bharathara (Lahartara - Kotwa Airport Road) Post: Lohta Varanasi Pin – 221107",
      image: "assets/up-CcdXf9K8.jpeg",
      phone: "+91 9450626743"
    },
    {
      state: "BIHAR",
      address: "Bathna – Post: Jhapaha Near CRPF Camp Sitamadhi Road Muzaffarpur Bihar Pin– 842004",
      image: "assets/bihar-CIly30xF.jpeg",
      phone: "+91 8052650079"
    },
    {
      state: "MADHYA PRADESH",
      address: "PLOT-25 Sardar Bhagat Singh Colony, Bhopal, Madhya Pradesh Pin–462010",
      image: "assets/mp-B4q6uGfk.jpeg",
      phone: "+91 9369634520"
    },
    {
      state: "CHHATTISGARH",
      address: "HOUSE NO-10, Jagriti Nagar, Paras Nagar, Raipur, Chhattisgarh Pin–492009",
      image: "assets/chhatish-DAZpv640.jpeg",
      phone: "+91 9450626743"
    },
    {
      state: "JHARKHAND",
      address: "Naya Toli, Samlong, Simaliya, Ranchi, Jharkhand Pin- 834010",
      image: "assets/jarkand-CeQXqIjd.jpeg",
      phone: "+91 9369634520"
    }
  ];

  // Group services by category
  function getGroupedServices() {
    const data = window.servicesData || [];
    return {
      fixedMedia: data.filter(s => s.id >= 1 && s.id <= 12),
      manufacturing: data.filter(s => s.id >= 14 && s.id <= 17),
      movingMedia: data.filter(s => s.id >= 18 && s.id <= 25),
      surveyBtl: data.filter(s => s.id >= 26 && s.id <= 33)
    };
  }

  // Routing Handler
  function handleRoute() {
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.slice(1).split('?');
    currentRoute = path || '/';

    const params = new URLSearchParams(queryString || '');
    currentServiceId = params.get('id') ? parseInt(params.get('id'), 10) : null;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentRoute}` || (currentRoute === '/' && href === '#/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const menuLinks = document.getElementById('menu-links');
    if (menuLinks) menuLinks.classList.remove('active');

    // Render Page
    const appContainer = document.getElementById('main-content');
    if (!appContainer) return;

    if (currentRoute === '/about-us') {
      renderAboutPage(appContainer);
    } else if (currentRoute === '/contact-us') {
      renderContactPage(appContainer);
    } else if (currentRoute === '/design-details' && currentServiceId) {
      renderDetailsPage(appContainer, currentServiceId);
    } else {
      renderHomePage(appContainer);
    }
  }

  // Render Home Page
  function renderHomePage(container) {
    const groups = getGroupedServices();

    container.innerHTML = `
      <!-- Hero Banner -->
      <section class="hero-section d-flex align-items-center mb-4">
        <div class="container text-center">
          <div class="hero-content">
            <h1 class="hero-title">Elevate Your Brand with <span class="highlight">AapkaAd</span></h1>
            <p class="hero-text">India's Leading Outdoor Advertising & Transit Media Network</p>
            <div class="d-flex justify-content-center gap-3 mt-3 flex-wrap">
              <a href="#/contact-us" class="btn btn-warning btn-lg fw-bold px-4 py-2 text-dark shadow-sm">Get Free Quote</a>
              <button onclick="window.openEnquiryModal('General Inquiry')" class="btn btn-outline-light btn-lg fw-bold px-4 py-2 shadow-sm">Instant Enquiry</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Gallery Section -->
      <div class="my-5 Container1">
        <h2 class="text-center mb-4 gallery-heading">EXPLORE THE AAPKA AD</h2>

        <!-- Category 1: FIXED MEDIA -->
        <div class="category-block mb-5">
          <div class="d-flex align-items-center mb-3">
            <span class="badge bg-danger me-2 px-3 py-2 fs-6">CATALOG</span>
            <h4 class="mb-0 fw-bold text-dark">FIXED MEDIA</h4>
          </div>
          <div class="row g-4">
            ${renderServiceCards(groups.fixedMedia)}
          </div>
        </div>

        <!-- Category 2: MANUFACTURING -->
        <div class="category-block mb-5">
          <div class="d-flex align-items-center mb-3">
            <span class="badge bg-primary me-2 px-3 py-2 fs-6">FABRICATION</span>
            <h4 class="mb-0 fw-bold text-dark">MANUFACTURING</h4>
          </div>
          <div class="row g-4">
            ${renderServiceCards(groups.manufacturing)}
          </div>
        </div>

        <!-- Category 3: MOVING MEDIA -->
        <div class="category-block mb-5">
          <div class="d-flex align-items-center mb-3">
            <span class="badge bg-success me-2 px-3 py-2 fs-6">TRANSIT</span>
            <h4 class="mb-0 fw-bold text-dark">MOVING MEDIA</h4>
          </div>
          <div class="row g-4">
            ${renderServiceCards(groups.movingMedia)}
          </div>
        </div>

        <!-- Category 4: SURVEY & BTL ACTIVATION -->
        <div class="category-block mb-5">
          <div class="d-flex align-items-center mb-3">
            <span class="badge bg-warning text-dark me-2 px-3 py-2 fs-6">ACTIVATION</span>
            <h4 class="mb-0 fw-bold text-dark">SURVEY & BRAND PROMOTION</h4>
          </div>
          <div class="row g-4">
            ${renderServiceCards(groups.surveyBtl)}
          </div>
        </div>
      </div>

      <!-- Adventure Highlights Carousel Slider -->
      <div class="Container text-center my-5 py-4 bg-white rounded shadow-sm">
        <h2 class="carousel-heading mb-2 fw-bold">Adventure Highlights</h2>
        <p class="text-muted mb-4">Discover high-impact campaign showcases delivered across India</p>

        <div class="carousel-wrapper position-relative px-4">
          <button class="carousel-nav-btn prev-btn" id="carouselPrevBtn" aria-label="Previous Slide">‹</button>
          
          <div class="carousel-track-container overflow-hidden">
            <div class="carousel-track d-flex" id="carouselTrack">
              ${renderCarouselSlides()}
            </div>
          </div>

          <button class="carousel-nav-btn next-btn" id="carouselNextBtn" aria-label="Next Slide">›</button>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-dots d-flex justify-content-center gap-2 mt-4" id="carouselDots">
          ${renderCarouselDots()}
        </div>
      </div>

      <!-- Regional Presence Showcase -->
      <div class="Container my-5 py-4">
        <h2 class="text-center fw-bold mb-2">Our Presence Across India</h2>
        <p class="text-center text-muted mb-4">Strategically located regional operational hubs for seamless execution</p>
        <div class="row g-4">
          ${regionalOffices.map((office, idx) => `
            <div class="col-lg-2 col-md-4 col-sm-6 col-12 ${idx === 0 ? 'offset-lg-1' : ''}">
              <div class="card h-100 border-0 shadow-sm state-card text-center p-3">
                <img src="${office.image}" alt="${office.state}" class="state-card-img rounded mb-2" onerror="this.src='assets/DealBoard1-BJfcIQYS.jpg'">
                <h6 class="fw-bold mb-1">${office.state}</h6>
                <small class="text-muted d-block mb-2" style="font-size: 11px; line-height: 1.4;">${office.address.substring(0, 50)}...</small>
                <a href="tel:${office.phone.replace(/\\s+/g, '')}" class="btn btn-outline-success btn-sm mt-auto py-1" style="font-size: 11px;">
                  <i class="fas fa-phone-alt me-1"></i> Call Hub
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    initCarousel();
  }

  // Render Service Cards helper
  function renderServiceCards(items) {
    return items.map(item => `
      <div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <a href="#/design-details?id=${item.id}" class="card-link text-decoration-none">
          <div class="card image-card shadow-sm h-100 border-0">
            <div class="card-img-wrap position-relative overflow-hidden">
              <img 
                loading="lazy" 
                src="${item.image1}" 
                alt="${item.title}" 
                class="card-image w-100"
                onerror="this.src='assets/DealBoard1-BJfcIQYS.jpg'"
              />
              <span class="view-overlay"><i class="fas fa-eye me-1"></i> View Details</span>
            </div>
            <div class="card-body p-3 text-center">
              <h6 class="card-title fw-bold text-dark text-uppercase mb-1" style="font-size: 14px; letter-spacing: 0.5px;">
                ${item.title || ''}
              </h6>
              <span class="badge bg-light text-secondary border" style="font-size: 10px;">
                ${item.title1 || 'AAPKA AD'}
              </span>
            </div>
          </div>
        </a>
      </div>
    `).join('');
  }

  // Render Carousel Slides
  function renderCarouselSlides() {
    const data = window.servicesData || [];
    return data.map(item => `
      <div class="carousel-slide-item p-2">
        <a href="#/design-details?id=${item.id}" class="card-link text-decoration-none">
          <div class="carousel-card bg-light rounded p-2 shadow-sm h-100">
            <img 
              loading="lazy" 
              src="${item.image1}" 
              alt="${item.title}" 
              class="carousel-image rounded"
              onerror="this.src='assets/DealBoard1-BJfcIQYS.jpg'"
            />
            <h5 class="carousel-title mt-2 mb-1 fw-bold text-dark" style="font-size: 14px;">
              ${(item.title || '').toUpperCase()}
            </h5>
            <small class="text-muted d-block text-truncate" style="font-size: 12px;">${item.DetailHeading ? item.DetailHeading.substring(0, 60) + '...' : ''}</small>
          </div>
        </a>
      </div>
    `).join('');
  }

  // Render Carousel Dots
  function renderCarouselDots() {
    const data = window.servicesData || [];
    const count = Math.min(8, data.length);
    let dots = '';
    for (let i = 0; i < count; i++) {
      dots += `<button class="dot-btn ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`;
    }
    return dots;
  }

  // Initialize Carousel Slider
  function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const dots = document.querySelectorAll('.dot-btn');

    if (!track) return;

    if (carouselInterval) clearInterval(carouselInterval);

    const slides = track.querySelectorAll('.carousel-slide-item');
    const total = slides.length;
    if (total === 0) return;

    function getItemsPerScreen() {
      if (window.innerWidth >= 1200) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 480) return 2;
      return 1;
    }

    function updateCarousel() {
      const itemsPerScreen = getItemsPerScreen();
      const maxIndex = Math.max(0, total - itemsPerScreen);
      if (carouselIndex > maxIndex) carouselIndex = 0;
      if (carouselIndex < 0) carouselIndex = maxIndex;

      const itemWidthPercent = 100 / itemsPerScreen;
      track.style.transform = `translateX(-${carouselIndex * itemWidthPercent}%)`;
      track.style.transition = 'transform 0.6s ease-in-out';

      dots.forEach((dot, idx) => {
        const activeIdx = Math.floor(carouselIndex % dots.length);
        if (idx === activeIdx) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        carouselIndex--;
        updateCarousel();
        resetTimer();
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        carouselIndex++;
        updateCarousel();
        resetTimer();
      };
    }

    dots.forEach(dot => {
      dot.onclick = () => {
        carouselIndex = parseInt(dot.getAttribute('data-index'), 10) * 2;
        updateCarousel();
        resetTimer();
      };
    });

    function resetTimer() {
      if (carouselInterval) clearInterval(carouselInterval);
      carouselInterval = setInterval(() => {
        carouselIndex++;
        updateCarousel();
      }, 3000);
    }

    resetTimer();
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // Render Service Details Page
  function renderDetailsPage(container, id) {
    const data = window.servicesData || [];
    const item = data.find(s => s.id === id);

    if (!item) {
      container.innerHTML = `
        <div class="container text-center py-5">
          <h3 class="text-danger fw-bold">Card not found!</h3>
          <p class="text-muted">The requested service could not be located in the catalog.</p>
          <a href="#/" class="btn btn-primary mt-3">← Back to Services</a>
        </div>
      `;
      return;
    }

    // Pre-cache images
    const img1 = new Image(); img1.src = item.image1;
    const img2 = new Image(); img2.src = item.image2;

    container.innerHTML = `
      <div class="Container2 py-4">
        <!-- Back Button & Breadcrumbs -->
        <div class="d-flex align-items-center justify-content-between mb-4">
          <a href="#/" class="btn btn-secondary shadow-sm">
            <i class="fas fa-arrow-left me-1"></i> Back to Services
          </a>
          <div class="badge bg-primary px-3 py-2 fs-6">
            ${item.title1 || 'MEDIA SERVICE'}
          </div>
        </div>

        <!-- 2 Side-by-Side Images -->
        <div class="row align-items-center mb-4 g-4">
          <div class="col-md-6">
            <div class="detail-image-box shadow-sm rounded overflow-hidden">
              <img 
                src="${item.image1}" 
                alt="${item.title}" 
                class="carousel-imagedetails w-100" 
                style="height: 380px; object-fit: cover;"
                onerror="this.src='assets/DealBoard1-BJfcIQYS.jpg'"
              />
              <div class="p-2 text-center bg-white border-top">
                <small class="text-muted"><i class="fas fa-camera me-1"></i> Display View 1</small>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="detail-image-box shadow-sm rounded overflow-hidden">
              <img 
                src="${item.image2}" 
                alt="${item.title}" 
                class="carousel-imagedetails w-100" 
                style="height: 380px; object-fit: cover;"
                onerror="this.src='assets/DealBoard2-BFi8O7wz.jpg'"
              />
              <div class="p-2 text-center bg-white border-top">
                <small class="text-muted"><i class="fas fa-camera me-1"></i> Display View 2</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Information -->
        <div class="bg-white p-4 p-md-5 rounded shadow-sm border mb-4">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 border-bottom pb-3">
            <div>
              <h2 class="fw-bold mb-1 text-dark" style="letter-spacing: 0.5px;">${(item.title || '').toUpperCase()}</h2>
              ${item.Type && item.Type.trim() ? `<h5 class="text-primary mt-1 mb-0">${item.Type}</h5>` : ''}
            </div>
            <button onclick="window.openEnquiryModal('Booking Inquiry: ${item.title}')" class="btn btn-danger btn-lg px-4 shadow">
              <i class="fas fa-envelope-open-text me-2"></i> Book / Enquire Now
            </button>
          </div>

          <!-- Lead Detail Heading -->
          ${item.DetailHeading ? `<p class="lead text-dark mb-4" style="line-height: 1.8; font-size: 1.15rem;">${item.DetailHeading}</p>` : ''}

          <!-- Additional Description -->
          ${item.Discription && item.Discription.trim() ? `<div class="alert alert-light border mb-4"><h6 class="mb-0 text-secondary">${item.Discription}</h6></div>` : ''}

          <!-- Heading Details / Specifications / Sub-points -->
          ${item.HeadingDetails && item.HeadingDetails.length > 0 ? `
            <div class="features-breakdown my-4 p-4 rounded bg-light border">
              <h5 class="fw-bold text-dark mb-3"><i class="fas fa-list-check me-2 text-primary"></i>Key Features & Specifications</h5>
              ${item.HeadingDetails.map(h => `
                <div class="mb-3">
                  ${h.Heading ? `<h6 class="fw-bold text-dark mb-2">${h.Heading}</h6>` : ''}
                  ${h.ArrayHeading1 && h.ArrayHeading1.length > 0 ? `
                    <ul class="list-unstyled ms-2 mb-2">
                      ${h.ArrayHeading1.map((p, pIdx) => `
                        <li class="mb-2 d-flex align-items-start">
                          <i class="fas fa-check-circle text-success me-2 mt-1"></i>
                          <div>
                            <strong class="text-dark">${p}:</strong>
                            <span class="text-secondary">${h.ArrayHeading && h.ArrayHeading[pIdx] ? h.ArrayHeading[pIdx] : ''}</span>
                          </div>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
                  ${h.HeadingDiscription ? `<p class="ms-4 text-muted small">${h.HeadingDiscription}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Concluding Description Below -->
          ${item.Discriptionbelow && item.Discriptionbelow.trim() ? `
            <div class="alert alert-secondary mt-3">
              <h6 class="mb-0">${item.Discriptionbelow}</h6>
            </div>
          ` : ''}

          <!-- Quick Action Bar -->
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 pt-3 border-top">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold text-muted">Need Quick Assistance?</span>
              <a href="tel:9450626743" class="btn btn-outline-success btn-sm"><i class="fas fa-phone-alt me-1"></i> 9450626743</a>
              <a href="https://wa.me/9369634520?text=Hi%20AapkaAd,%20I%20am%20interested%20in%20${encodeURIComponent(item.title)}" target="_blank" class="btn btn-success btn-sm"><i class="fab fa-whatsapp me-1"></i> Chat on WhatsApp</a>
            </div>
            <button onclick="window.openEnquiryModal('${item.title}')" class="btn btn-primary">
              <i class="fas fa-paper-plane me-1"></i> Send Instant Proposal Request
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Render About Us Page
  function renderAboutPage(container) {
    container.innerHTML = `
      <div class="aboutus-section">
        <!-- Hero Section with Background Overlay -->
        <div class="aboutus-hero" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('assets/Hero-Dqkn-HXZ.jpeg') center/cover no-repeat; min-height: 400px; padding: 80px 20px;">
          <div class="overlay">
            <h1 class="hero-title fw-bold text-white mb-2">About AAPKA AD</h1>
            <p class="hero-subtitle text-light fs-5">Crafting outdoor advertising campaigns that deliver real impact.</p>
          </div>
        </div>

        <!-- About Us Core Content from aapkaad.com -->
        <div class="container aboutus-content mt-5 mb-5" style="max-width: 950px;">
          <div class="card border-0 shadow-sm p-4 p-md-5 rounded">
            <p class="lead mb-4" style="line-height: 1.9; color: #333;">
              <strong>AAPKA AD</strong> is to create a successful outdoor advertising plan for the clients. These plans are very economic and are focused to tap the target audience. To suit the requirements of clients, plans are designed by expert teams. Every campaign designed by our team goes under proper scrutiny so as to ensure the best possible way to benefit your brand/organization.
            </p>

            <p class="mb-4 text-secondary" style="line-height: 1.8; font-size: 1.05rem;">
              We explore best locations so that your brand reaches your target audience. We work with the surety that every plan of ours is economic as well as cost effective. We are there to help you in promoting your brand in any part of India. Your campaign will get great exposure because of our media planning research, quick execution and value added monitoring system. Within a set time frame we can deliver desirable and measurable advertising campaigns so that the campaign kick starts quickly. Amongst your target audiences we would love to help make your esteemed brand more popular.
            </p>

            <p class="mb-4 text-secondary" style="line-height: 1.8; font-size: 1.05rem;">
              We have a very plain and simple approach. It takes no extra effort to notice an outdoor advertisement once a person is out in the sun. Outdoor advertisement is out there in the open for everyone to view as it’s not the usual print advertisement that you have to turn the pages and see neither it’s the visual commercial that you can mute. We at AAPKA AD walk an extra mile through choosing only the revered sites for to ensure that it becomes hard to ignore. So when you opt to advertise using an outdoor media, our prime principle is your efforts don’t go in vain, neither is you forced to make any compromise. Over our single medium of AAPKA AD, we resolve all the complexities and present before our clients the solutions that are best.
            </p>

            <!-- Stats Showcase -->
            <div class="row g-4 text-center my-4 pt-4 border-top">
              <div class="col-md-3 col-6">
                <div class="p-3 bg-light rounded">
                  <h3 class="fw-bold text-danger mb-1">500+</h3>
                  <small class="text-muted fw-bold">CAMPAIGNS</small>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="p-3 bg-light rounded">
                  <h3 class="fw-bold text-primary mb-1">5+</h3>
                  <small class="text-muted fw-bold">STATE HUBS</small>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="p-3 bg-light rounded">
                  <h3 class="fw-bold text-success mb-1">100+</h3>
                  <small class="text-muted fw-bold">CITIES COVERED</small>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="p-3 bg-light rounded">
                  <h3 class="fw-bold text-warning mb-1">100%</h3>
                  <small class="text-muted fw-bold">CLIENT ROI</small>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center mt-3">
              <button onclick="window.openEnquiryModal('Partner with AapkaAd')" class="btn btn-danger btn-lg px-5 shadow">
                Start Your Campaign with Us
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Contact Us Page
  function renderContactPage(container) {
    container.innerHTML = `
      <section class="contact-section py-5">
        <div class="container">
          <h2 class="text-center mb-2 fw-bold">Contact Us</h2>
          <p class="text-center text-muted mb-5">Have a question or looking for high-visibility ad placements? Get in touch with our expert media planning team.</p>

          <div class="row align-items-start g-4">
            <!-- Left Column: Send us a Message Form -->
            <div class="col-lg-6 col-md-12">
              <div class="contact-form-container p-4 p-md-5 shadow-sm rounded bg-white border">
                <h4 class="mb-3 fw-bold text-dark"><i class="fas fa-paper-plane text-danger me-2"></i>Send us a Message</h4>
                <p class="text-muted small mb-4">Fill out your details below and our campaign director will reach out within 2 hours.</p>

                <form id="contactForm" onsubmit="window.handleContactSubmit(event)">
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-secondary">Your Name *</label>
                    <input type="text" class="form-control" name="name" placeholder="Your Name" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-secondary">Mobile Number *</label>
                    <input type="tel" class="form-control" name="phone_no" placeholder="Mobile Number" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fw-bold small text-secondary">Your Email *</label>
                    <input type="email" class="form-control" name="email" placeholder="Your Email" required>
                  </div>
                  <div class="mb-4">
                    <label class="form-label fw-bold small text-secondary">Your Message *</label>
                    <textarea class="form-control" name="message" rows="4" placeholder="Tell us about your brand, preferred cities, and target media..." required></textarea>
                  </div>
                  <button type="submit" class="btn btn-success w-100 py-2 fw-bold fs-6 shadow-sm">
                    <i class="fas fa-paper-plane me-2"></i> Send Message
                  </button>
                </form>
              </div>
            </div>

            <!-- Right Column: Contact Info & 5 State Addresses -->
            <div class="col-lg-6 col-md-12">
              <div class="contact-info p-4 p-md-5 shadow-sm rounded bg-white border">
                <h4 class="mb-4 fw-bold text-dark"><i class="fas fa-map-marked-alt text-primary me-2"></i>Corporate & Regional Offices</h4>

                <!-- Office 1: UP -->
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
                  <i class="fas fa-map-marker-alt text-danger fs-4 mt-1 me-3"></i>
                  <div>
                    <strong class="d-block text-dark">Address 1 (UTTAR PRADESH - HQ):</strong>
                    <span class="text-secondary small">Bharathara (Lahartara - Kotwa Airport Road) Post: Lohta Varanasi Pin – 221107</span>
                  </div>
                </div>

                <!-- Office 2: BIHAR -->
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
                  <i class="fas fa-map-marker-alt text-danger fs-4 mt-1 me-3"></i>
                  <div>
                    <strong class="d-block text-dark">Address 2 (BIHAR):</strong>
                    <span class="text-secondary small">Bathna – Post: Jhapaha Near CRPF Camp Sitamadhi Road Muzaffarpur Bihar Pin– 842004</span>
                  </div>
                </div>

                <!-- Office 3: MP -->
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
                  <i class="fas fa-map-marker-alt text-danger fs-4 mt-1 me-3"></i>
                  <div>
                    <strong class="d-block text-dark">Address 3 (MADHYA PRADESH):</strong>
                    <span class="text-secondary small">PLOT-25 Sardar Bhagat Singh Colony, Bhopal, Madhya Pradesh Pin–462010</span>
                  </div>
                </div>

                <!-- Office 4: CHHATTISGARH -->
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
                  <i class="fas fa-map-marker-alt text-danger fs-4 mt-1 me-3"></i>
                  <div>
                    <strong class="d-block text-dark">Address 4 (CHHATTISGARH):</strong>
                    <span class="text-secondary small">HOUSE NO-10, Jagriti Nagar, Paras Nagar, Raipur, Chhattisgarh Pin–492009</span>
                  </div>
                </div>

                <!-- Office 5: JHARKHAND -->
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
                  <i class="fas fa-map-marker-alt text-danger fs-4 mt-1 me-3"></i>
                  <div>
                    <strong class="d-block text-dark">Address 5 (JHARKHAND):</strong>
                    <span class="text-secondary small">Naya Toli, Samlong, Simaliya, Ranchi, Jharkhand Pin- 834010</span>
                  </div>
                </div>

                <!-- Phone -->
                <div class="d-flex align-items-center mb-3">
                  <i class="fas fa-phone-alt text-success fs-5 me-3"></i>
                  <div>
                    <strong class="me-2 text-dark">Phone:</strong>
                    <span>
                      <a href="tel:9450626743" class="text-decoration-none text-dark fw-bold">9450626743</a>, 
                      <a href="tel:8052650079" class="text-decoration-none text-dark fw-bold">8052650079</a>, 
                      <a href="tel:9369634520" class="text-decoration-none text-dark fw-bold">9369634520</a>
                    </span>
                  </div>
                </div>

                <!-- Email -->
                <div class="d-flex align-items-center mb-4">
                  <i class="fas fa-envelope text-primary fs-5 me-3"></i>
                  <div>
                    <strong class="me-2 text-dark">Email:</strong>
                    <a href="mailto:aapkaadindia@gmail.com" class="text-decoration-none text-dark fw-bold">aapkaadindia@gmail.com</a>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="d-flex align-items-center gap-3 pt-3 border-top">
                  <strong class="text-dark">Social:</strong>
                  <a href="https://www.instagram.com/aapka.ad?igsh=MXgyN3dsb3R1eW1jYQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" class="text-danger fs-4" title="Instagram">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="https://wa.me/9369634520" target="_blank" rel="noreferrer" class="text-success fs-4" title="WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/aapka-ad-011632323/" target="_blank" rel="noreferrer" class="text-primary fs-4" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a href="https://youtube.com/@aapkaad-h9s?si=dbRga85zNSc80OCl" target="_blank" rel="noreferrer" class="text-danger fs-4" title="YouTube">
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a href="https://www.facebook.com/share/1CxavbR5dA/?mibextid=wwXIfr" target="_blank" rel="noreferrer" class="text-primary fs-4" title="Facebook">
                    <i class="fab fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Global Enquiry Modal Controls
  window.openEnquiryModal = function (defaultSubject) {
    const modal = document.getElementById('enquiryModal');
    const msgInput = document.getElementById('enquiryMessage');
    if (modal) {
      if (msgInput && defaultSubject) {
        msgInput.value = `Inquiry regarding: ${defaultSubject}\n`;
      }
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  };

  window.closeEnquiryModal = function () {
    const modal = document.getElementById('enquiryModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  };

  // Form Submission Handlers
  window.handleEnquirySubmit = function (event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const phone = form.phone_no.value;

    alert(`Thank you, ${name}!\nYour enquiry has been received successfully ✅.\nOur team will contact you at ${phone} shortly.`);
    form.reset();
    window.closeEnquiryModal();
  };

  window.handleContactSubmit = function (event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    alert(`Message sent successfully ✅\nThank you ${name}! We have sent a confirmation to ${email}.`);
    form.reset();
  };

  // Mobile Menu Toggle
  window.toggleMobileMenu = function () {
    const menuLinks = document.getElementById('menu-links');
    if (menuLinks) {
      menuLinks.classList.toggle('active');
    }
  };

  // Setup Routing Listeners
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('DOMContentLoaded', () => {
    handleRoute();

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      const modal = document.getElementById('enquiryModal');
      if (e.target === modal) {
        window.closeEnquiryModal();
      }
    });
  });

})();
