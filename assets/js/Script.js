/**
 * Car Dealership Website JavaScript
 * Main script file with consolidated functionality
 */

// =========================================
// API and Data Handling
// =========================================

/**
 * Fetches car data from the API
 * @returns {Promise<Array>} Array of car objects
 */
async function fetchCars() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/cars/get-cars');
        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        return data.entity || [];
    } catch (error) {
        console.error('Error fetching cars:', error);
        return getFallbackCars();
    }
}

/**
 * Fetches specific car details by ID
 * @param {string} carId - The ID of the car to fetch
 * @returns {Promise<Object>} Car details object
 */
async function fetchCarById(carId) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/cars/get-car/${carId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch car details');
        }
        const data1 = await response.json();
        return data1.entity || null;
        
    } catch (error) {
        console.error(`Error fetching car ${carId}:`, error);
        return null;
    }
    
}


/**
 * Returns fallback car data in case API fails
 * @returns {Array} Array of fallback car objects
 */
function getFallbackCars() {
    return [
        {
            id: 1,
            make: "Toyota",
            model: "Prado",
            year: "2024",
            price: "234567",
            mileage: "13000",
            fuelType: "Petrol",
            transmission: "Automatic",
            description: "This is the best car there is in the market",
            images: [{ imageData: "https://via.placeholder.com/300x200" }]
        }
    ];
}

/**
 * Fetches year data for dropdown
 */
async function fetchYearData() {
    try {
        const response = await fetch('http://localhost:8081/api/v1/year');
        if (!response.ok) {
            throw new Error('Failed to fetch years');
        }
        const data = await response.json();
        return data.entity || [];
    } catch (error) {
        console.error('Error fetching years:', error);
        return [];
    }
}

// =========================================
// Car Card Rendering
// =========================================

/**
 * Renders a single car card using DOM methods
 * @param {Object} car - Car object containing details
 * @returns {HTMLElement} DOM element for the car card
 */
function renderCarCard(car,car1) {
    // Format price with commas (KES currency)
    const formattedPrice = formatCurrency(car.price);
    
    // Get car image or use placeholder
    const carImage = car.images && car.images.length > 0 && car.images[0].imageData
        ? car.images[0].imageData
        : 'https://via.placeholder.com/300x200';
    
    // Create main column element with improved styling
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    // Create featured car container with shadow and rounded corners
    const carDiv = document.createElement('div');
    carDiv.className = 'single-featured-cars card h-100 shadow-sm rounded overflow-hidden transition-all hover-effect';
    carDiv.style.transition = 'all 0.3s ease';
    
    // Create image box with proper aspect ratio
    const imgBoxDiv = document.createElement('div');
    imgBoxDiv.className = 'featured-img-box position-relative';
    
    // Create cars image container with fixed height
    const carsImgDiv = document.createElement('div');
    carsImgDiv.className = 'featured-cars-img overflow-hidden';
    carsImgDiv.style.height = '200px';
    
    // Create image element with cover fit
    const imgElement = document.createElement('img');
    imgElement.src = carImage;
    imgElement.alt = `${car.make} ${car.model}`;
    imgElement.className = 'w-100 h-100 object-fit-cover';
    imgElement.style.objectFit = 'cover';
    carsImgDiv.appendChild(imgElement);
    
    // Create model info with improved styling
    const modelInfoDiv = document.createElement('div');
    modelInfoDiv.className = 'featured-model-info d-flex flex-wrap gap-2 p-2 bg-light';
    
    // Create badges for car specifications
    const specs = [
        { value: car.make, class: 'bg-primary' },
        { value: car.year, class: 'bg-secondary' },
        { value: `${car.mileage} km`, class: 'bg-info' },
        { value: car.fuelType, class: 'bg-warning' },
        { value: car.transmission, class: 'bg-success' }
    ];
    
    specs.forEach(spec => {
        if (spec.value) {
            const badge = document.createElement('span');
            badge.className = `badge ${spec.class} text-white rounded-pill fw-normal`;
            badge.textContent = spec.value;
            modelInfoDiv.appendChild(badge);
        }
    });
    
    // Add all elements to image box
    imgBoxDiv.appendChild(carsImgDiv);
    imgBoxDiv.appendChild(modelInfoDiv);
    
    // Create text content area with improved padding
    const txtDiv = document.createElement('div');
    txtDiv.className = 'featured-cars-txt p-3';
    
    // Create title with link and improved typography
    const titleH2 = document.createElement('h2');
    titleH2.className = 'fs-5 mb-2 text-truncate';
    const titleLink = document.createElement('a');
    titleLink.href = `/cars-detail.html?carId=$/${car1.id}`;
    titleLink.className = 'text-decoration-none text-dark';
    titleLink.textContent = `${car.make} ${car.model}`;
    titleH2.appendChild(titleLink);
    
    // Create price element with accent color
    const priceH3 = document.createElement('h3');
    priceH3.className = 'fs-4 fw-bold text-primary mb-0';
    priceH3.textContent = formattedPrice;
    
    // Create a button for details
    const detailsBtn = document.createElement('a');
    detailsBtn.href = `/cars-detail.html?carId=$${car1.id}`;
    detailsBtn.className = 'btn btn-sm btn-outline-primary mt-3 w-100';
    detailsBtn.textContent = 'View Details';
    
    // Add elements to text div
    txtDiv.appendChild(titleH2);
    txtDiv.appendChild(priceH3);
    txtDiv.appendChild(detailsBtn);
    
    // Add a favorite button in the corner
    const favBtn = document.createElement('button');
    favBtn.className = 'btn btn-sm btn-light rounded-circle position-absolute end-0 top-0 m-2 shadow-sm';
    favBtn.innerHTML = '<i class="bi bi-heart"></i>';
    favBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        favBtn.innerHTML = favBtn.innerHTML.includes('bi-heart-fill') 
            ? '<i class="bi bi-heart"></i>' 
            : '<i class="bi bi-heart-fill text-danger"></i>';
        
        // Show notification
        showNotification(favBtn.innerHTML.includes('bi-heart-fill') 
            ? 'Car saved to favorites!' 
            : 'Car removed from favorites');
    };
    imgBoxDiv.appendChild(favBtn);
    
    // Add a badge for special features if available
    if (car.featured) {
        const featuredBadge = document.createElement('div');
        featuredBadge.className = 'position-absolute start-0 top-0 m-2';
        featuredBadge.innerHTML = '<span class="badge bg-danger">Featured</span>';
        imgBoxDiv.appendChild(featuredBadge);
    }
    
    // Assemble the complete card
    carDiv.appendChild(imgBoxDiv);
    carDiv.appendChild(txtDiv);
    colDiv.appendChild(carDiv);
    
    // Add hover effect
    carDiv.addEventListener('mouseenter', () => {
        carDiv.classList.add('shadow');
        carDiv.style.transform = 'translateY(-5px)';
    });
    
    carDiv.addEventListener('mouseleave', () => {
        carDiv.classList.remove('shadow');
        carDiv.style.transform = 'translateY(0)';
    });
    
    return colDiv;
}

// =========================================
// UI Component Functions
// =========================================

/**
 * Initialize year dropdown
 */
async function initYearDropdown() {
    const select = document.getElementById('year-select');
    if (!select) return;
    
    const years = await fetchYearData();
    
    if (years && years.length > 0) {
        years.forEach(item => {
            const option = document.createElement('option');
            option.value = item.year;
            option.textContent = item.year;
            select.appendChild(option);
        });
    }
}

/**
 * Format currency for display
 * @param {number|string} amount - The amount to format
 * @param {string} currency - Currency code, defaults to KES
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'KES') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Display cars list in a container
 * @param {Array} cars - Array of car objects
 * @param {string} containerId - ID of container element
 */
function renderCarsList(cars, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<div class="col-12 text-center p-5"><h3>No cars found</h3></div>';
        return;
    }
    
    cars.forEach(car => {
        container.appendChild(renderCarCard(car));
    });
}

/**
 * Show notification message
 * @param {string} message - Message to display
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'position-fixed bottom-0 end-0 p-3';
    notification.style.zIndex = '1080';
    
    notification.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Display error message on the page
 * @param {string} message - The error message to display
 */
function showError(message) {
    const container = document.querySelector('.container.py-5');
    if (container) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger';
        errorAlert.textContent = message;
        container.prepend(errorAlert);
    } else {
        console.error(message);
    }
}

// =========================================
// Initialization Functions for Different Pages
// =========================================

/**
 * Initialize featured cars section with two rows
 */
async function initFeaturedCars() {
    // Get container elements
    const firstRowContainer = document.getElementById('featured-cars-container');
    const secondRowContainer = document.getElementById('featured-cars-container-second');
    
    if (!firstRowContainer) return;
    
    // Show loading state
    if (firstRowContainer) {
        firstRowContainer.innerHTML = '<div class="col-12 text-center"><p>Loading featured cars...</p></div>';
    }
    if (secondRowContainer) {
        secondRowContainer.innerHTML = '';
    }
    
    // Fetch cars data
    const cars = await fetchCars();
    
    // Clear containers
    if (firstRowContainer) {
        firstRowContainer.innerHTML = '';
    }
    
    if (cars.length === 0) {
        if (firstRowContainer) {
            firstRowContainer.innerHTML = '<div class="col-12 text-center"><p>No featured cars available</p></div>';
        }
        return;
    }
    
    // Split cars into two rows (4 per row if available)
    const firstRowCars = cars.slice(0, 4);
    const secondRowCars = cars.slice(4, 8);
    
    // Render first row
    if (firstRowContainer) {
        firstRowCars.forEach(car => {
            firstRowContainer.appendChild(renderCarCard(car));
        });
    }
    
    // Render second row if there are enough cars
    if (secondRowContainer && secondRowCars.length > 0) {
        secondRowCars.forEach(car => {
            secondRowContainer.appendChild(renderCarCard(car));
        });
    }
}

/**
 * Initialize all car listings
 */
async function initCarListings() {
    // Get container elements
    const carsContainer = document.getElementById('cars-container');
    
    if (!carsContainer) return;
    
    // Show loading state
    carsContainer.innerHTML = '<div class="col-12 text-center"><p>Loading cars...</p></div>';
    
    // Fetch cars data
    const cars = await fetchCars();
    
    // Render all cars
    renderCarsList(cars, 'cars-container');
}

/**
 * Initialize car details page
 */
async function initCarDetailsPage() {
    // Get car ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    if (!carId) {
        showError('Car ID not found in URL');
        return;
    }
    
    try {
        // Fetch car details
        const car = await fetchCarById(carId);
        
        if (!car) {
            showError('Car not found');
            return;
        }
        
        // Display car details
        displayCarDetails(car);
        
        // Initialize image gallery
        initializeGallery();
        
        // Load similar cars
        loadSimilarCars();
        
        // Initialize save button
        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('bi-heart')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                    this.classList.remove('btn-outline-primary');
                    this.classList.add('btn-danger');
                    this.querySelector('i + span').textContent = ' Saved';
                    showNotification('Car saved to favorites!');
                } else {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                    this.classList.remove('btn-danger');
                    this.classList.add('btn-outline-primary');
                    this.querySelector('i + span').textContent = ' Save This Car';
                    showNotification('Car removed from favorites');
                }
            });
        }
    } catch (error) {
        showError('Error loading car details: ' + error.message);
    }
}

/**
 * Display car details in the HTML
 * @param {Object} car - The car object with details
 */
function displayCarDetails(car) {
    // Update page title
    document.title = `${car.make} ${car.model} - Proclan Motors`;
    
    // Update breadcrumb
    const breadcrumbItem = document.querySelector('.breadcrumb-item.active');
    if (breadcrumbItem) {
        breadcrumbItem.textContent = `${car.make} ${car.model}`;
    }
    
    // Update main car title
    const carTitle = document.querySelector('.car-title');
    if (carTitle) {
        carTitle.textContent = `${car.make} ${car.model} ${car.year}`;
    }
    
    // Update car price with formatting
    const formattedPrice = formatCurrency(car.price);
    
    const carPrice = document.querySelector('.car-price');
    if (carPrice) {
        carPrice.textContent = formattedPrice;
    }
    
    // Update vehicle specifications
    updateSpecValue('Year', car.year);
    updateSpecValue('Mileage', `${car.mileage} km`);
    updateSpecValue('Fuel Type', car.fuelType);
    updateSpecValue('Transmission', car.transmission);
    updateSpecValue('Color', car.color || 'Not specified');
    updateSpecValue('Seats', car.seats || 'Not specified');
    updateSpecValue('Engine Size', car.engineSize || 'Not specified');
    
    // Update car description
    const carDescription = document.querySelector('.car-description');
    if (carDescription && car.description) {
        carDescription.innerHTML = `<p>${car.description}</p>`;
    }
    
    // Update car images
    updateCarImages(car);
}

/**
 * Update spec value in the specifications list
 * @param {string} label - The specification label
 * @param {string} value - The specification value
 */
function updateSpecValue(label, value) {
    const specItems = document.querySelectorAll('.spec-item');
    for (const item of specItems) {
        const labelElement = item.querySelector('.spec-label');
        if (labelElement && labelElement.textContent === label) {
            const valueElement = item.querySelector('.spec-value');
            if (valueElement) {
                valueElement.textContent = value;
            }
            break;
        }
    }
}

/**
 * Update car images in the gallery
 * @param {Object} car - The car object with image data
 */
function updateCarImages(car) {
    if (car.images && car.images.length > 0) {
        // Update main image
        const mainImage = document.getElementById('mainImage');
        if (mainImage && car.images[0].imageData) {
            mainImage.src = car.images[0].imageData;
            mainImage.alt = `${car.make} ${car.model}`;
        }
        
        // Update gallery images
        const galleryImages = document.querySelectorAll('.gallery-img');
        for (let i = 0; i < galleryImages.length && i < car.images.length; i++) {
            if (car.images[i].imageData) {
                galleryImages[i].src = car.images[i].imageData;
                galleryImages[i].alt = `${car.make} ${car.model} View ${i+1}`;
            }
        }
    }
}

/**
 * Initialize image gallery functionality
 */
function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const mainImage = document.getElementById('mainImage');
    
    if (!mainImage) return;
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });
}

/**
 * Change the main image when a gallery image is clicked
 * @param {string} src - The source URL of the new main image
 */
function changeMainImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
}

/**
 * Load similar cars to display in the similar vehicles section
 */
async function loadSimilarCars() {
    try {
        const cars = await fetchCars();
        const similarCarsContainer = document.getElementById('similarCars');
        
        if (!similarCarsContainer) return;
        
        // Display up to 4 similar cars
        const similarCars = cars.slice(0, 4);
        similarCars.forEach(car => {
            similarCarsContainer.appendChild(renderCarCard(car));
        });
        
    } catch (error) {
        console.error('Error loading similar cars:', error);
    }
}

// =========================================
// Layout and Navigation Functions
// =========================================

/**
 * Initialize navbar and top bar behavior
 */
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const topBar = document.querySelector('.top-bar');
    
    if (!navbar || !topBar) return;
    
    let lastScrollTop = 0;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const topBarHeight = topBar.classList.contains('hidden') ? 0 : topBar.offsetHeight;
        
        // Handle top bar visibility
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scrolling DOWN - hide top bar
            topBar.classList.add('hidden');
            navbar.style.top = '0';
        } else if (scrollTop < lastScrollTop || scrollTop <= 10) {
            // Scrolling UP or at top - show top bar
            topBar.classList.remove('hidden');
            navbar.style.top = topBarHeight + 'px';
        }
        
        // Add scroll effect to navbar
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Initial position setup
    function adjustInitialPositions() {
        const topBarHeight = topBar.offsetHeight;
        navbar.style.top = topBarHeight + 'px';
    }
    
    // Run on load
    adjustInitialPositions();
    
    // Add event listeners with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 10);
    });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', adjustInitialPositions);
}

/**
 * Initialize carousel with animations
 */
function initCarousel() {
    const carousel = document.getElementById('header-carousel');
    if (!carousel) return;
    
    // Function to reset animations when a slide changes
    function resetAnimations() {
        const elements = document.querySelectorAll('.animated');
        elements.forEach(element => {
            element.style.animationName = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animationName = '';
        });
    }
    
    // Add event listener for slide event
    carousel.addEventListener('slide.bs.carousel', function() {
        setTimeout(resetAnimations, 50);
    });
    
    // Initialize carousel with Bootstrap
    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 6000,
            ride: 'carousel',
            wrap: true,
            touch: true
        });
    }
}

// =========================================
// Add Global Styles
// =========================================

/**
 * Add CSS styles to document head
 */
function addGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hover-effect:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .object-fit-cover {
            object-fit: cover;
        }
        .transition-all {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// =========================================
// Main Initialization
// =========================================

/**
 * Main initialization function
 * Detects page type and runs appropriate initializations
 */
function initApp() {
    // Add global styles
    addGlobalStyles();
    
    // Initialize layout components
    initNavbar();
    initCarousel();
    
    // Initialize year dropdown if exists
    initYearDropdown();
    
    // Detect page type and initialize accordingly
    if (document.getElementById('car-details-page')) {
        // Car details page
        initCarDetailsPage();
    } else if (document.getElementById('featured-cars-container')) {
        // Home page with featured cars
        initFeaturedCars();
    } else if (document.getElementById('cars-container')) {
        // Cars listing page
        initCarListings();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);