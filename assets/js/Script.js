const apiUrl = 'http://localhost:8081/api/v1/year';

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('year-select');
    if (!select) return;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const years = data.entity; // this is an array of objects

            years.forEach(item => {
                const option = document.createElement('option');
                option.value = item.year;
                option.textContent = item.year;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching years:', error);
        });
});
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
        
        // Return the entity array which contains the car objects
        return data.entity || [];
    } catch (error) {
        console.error('Error fetching cars:', error);
        return getFallbackCars();
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
 * Renders a single car card using DOM methods instead of HTML strings
 * @param {Object} car - Car object containing details
 * @returns {HTMLElement} DOM element for the car card
 */
function renderCarCard(car) {
    // Format price with commas (KES currency)
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0
    }).format(car.price);
    
    // Get car image or use placeholder
    const carImage = car.images && car.images.length > 0 && car.images[0].imageData
        ? car.images[0].imageData
        : 'https://via.placeholder.com/300x200';
    
    // Create main column element
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-md-4 col-sm-6';
    
    // Create featured car container
    const carDiv = document.createElement('div');
    carDiv.className = 'single-featured-cars';
    
    // Create image box
    const imgBoxDiv = document.createElement('div');
    imgBoxDiv.className = 'featured-img-box';
    
    // Create cars image container
    const carsImgDiv = document.createElement('div');
    carsImgDiv.className = 'featured-cars-img';
    
    // Create image element
    const imgElement = document.createElement('img');
    imgElement.src = carImage;
    imgElement.alt = `${car.make} ${car.model}`;
    carsImgDiv.appendChild(imgElement);
    
    // Create model info
    const modelInfoDiv = document.createElement('div');
    modelInfoDiv.className = 'featured-model-info';
    
    const infoP = document.createElement('p');
    
    // Add make span
    const makeSpan = document.createElement('span');
    makeSpan.className = 'featured-make-span';
    makeSpan.textContent = car.make;
    infoP.appendChild(makeSpan);
    
    // Add year span
    const yearSpan = document.createElement('span');
    yearSpan.className = 'featured-year-span';
    yearSpan.textContent = car.year;
    infoP.appendChild(yearSpan);
    
    // Add mileage span
    const mileageSpan = document.createElement('span');
    mileageSpan.className = 'featured-mi-span';
    mileageSpan.textContent = `${car.mileage} km`;
    infoP.appendChild(mileageSpan);
    
    // Add fuel type span
    const fuelSpan = document.createElement('span');
    fuelSpan.className = 'featured-fuel-span';
    fuelSpan.textContent = car.fuelType;
    infoP.appendChild(fuelSpan);
    
    // Add transmission span
    const transSpan = document.createElement('span');
    transSpan.className = 'featured-trans-span';
    transSpan.textContent = car.transmission;
    infoP.appendChild(transSpan);
    
    modelInfoDiv.appendChild(infoP);
    
    // Add all elements to image box
    imgBoxDiv.appendChild(carsImgDiv);
    imgBoxDiv.appendChild(modelInfoDiv);
    
    // Create text content area
    const txtDiv = document.createElement('div');
    txtDiv.className = 'featured-cars-txt';
    
    // Create title with link
    const titleH2 = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = `/car-details/${car.id}`;
    titleLink.textContent = `${car.make} ${car.model}`;
    titleH2.appendChild(titleLink);
    
    // Create price element
    const priceH3 = document.createElement('h3');
    priceH3.textContent = formattedPrice;
    
    // Add elements to text div
    txtDiv.appendChild(titleH2);
    txtDiv.appendChild(priceH3);
    
    // Assemble the complete card
    carDiv.appendChild(imgBoxDiv);
    carDiv.appendChild(txtDiv);
    colDiv.appendChild(carDiv);
    
    return colDiv;
}

/**
 * Initialize and render all car listings
//  */
// document.addEventListener('DOMContentLoaded', function() {
//     const navbar = document.getElementById('mainNav');
    
//     window.addEventListener('scroll', function() {
//       if (window.scrollY > 50) {
//         navbar.classList.add('navbar-scrolled');
//       } else {
//         navbar.classList.remove('navbar-scrolled');
//       }
//     });
//   });
  document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const topBar = document.querySelector('.top-bar');
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
    
    // Run on scroll with some throttling for performance
    let isScrolling;
    window.addEventListener('scroll', function() {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        handleScroll();
      }, 10);
    });
    
    // Handle immediate scroll actions
    window.addEventListener('scroll', handleScroll);
    
    // Run on window resize as well
    window.addEventListener('resize', adjustInitialPositions);
  });
  
async function initCarListings() {
    // Get container elements
    const carsContainer = document.getElementById('cars-container');
    
    if (!carsContainer) {
        console.error('Cars container not found');
        return;
    }
    
    // Show loading state
    carsContainer.innerHTML = '';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'col-12 text-center';
    const loadingP = document.createElement('p');
    loadingP.textContent = 'Loading cars...';
    loadingDiv.appendChild(loadingP);
    carsContainer.appendChild(loadingDiv);
    
    // Fetch cars data
    const cars = await fetchCars();
    
    // Clear container
    carsContainer.innerHTML = '';
    
    if (cars.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'col-12 text-center';
        const emptyP = document.createElement('p');
        emptyP.textContent = 'No cars available';
        emptyDiv.appendChild(emptyP);
        carsContainer.appendChild(emptyDiv);
        return;
    }
    
    // Render all cars using DOM methods
    cars.forEach(car => {
        carsContainer.appendChild(renderCarCard(car));
    });
}

/**
 * For featured cars section with two rows
 */
async function initFeaturedCars() {
    // Get container elements
    const firstRowContainer = document.getElementById('featured-cars-container');
    const secondRowContainer = document.getElementById('featured-cars-container-second');
    
    if (!firstRowContainer || !secondRowContainer) {
        console.error('Featured cars containers not found');
        return;
    }
    
    // Show loading state
    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'col-12 text-center';
    const loadingP = document.createElement('p');
    loadingP.textContent = 'Loading featured cars...';
    loadingDiv.appendChild(loadingP);
    firstRowContainer.appendChild(loadingDiv);
    
    // Fetch cars data
    const cars = await fetchCars();
    
    // Clear containers
    firstRowContainer.innerHTML = '';
    
    if (cars.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'col-12 text-center';
        const emptyP = document.createElement('p');
        emptyP.textContent = 'No featured cars available';
        emptyDiv.appendChild(emptyP);
        firstRowContainer.appendChild(emptyDiv);
        return;
    }
    
    // Split cars into two rows (4 per row if available)
    const firstRowCars = cars.slice(0, 4);
    const secondRowCars = cars.slice(4, 8);
    
    // Clear containers first
    firstRowContainer.innerHTML = '';
    secondRowContainer.innerHTML = '';
    
    // Render first row
    firstRowCars.forEach(car => {
        firstRowContainer.appendChild(renderCarCard(car));
    });
    
    // Render second row if there are enough cars
    if (secondRowCars.length > 0) {
        secondRowCars.forEach(car => {
            secondRowContainer.appendChild(renderCarCard(car));
        });
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Use either initCarListings() or initFeaturedCars() based on your page layout
    initFeaturedCars();
    // Uncomment the line below if you want to display all cars in a single container
    // initCarListings();
});
// Define a function to fetch new car data from the backend
async function fetchNewCars() {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/new-cars');
        if (!response.ok) {
            throw new Error('Failed to fetch new cars');
        }
        const carsData = await response.json();
        return carsData;
    } catch (error) {
        console.error('Error fetching new cars:', error);
        // Return some fallback data in case of error
        return getFallbackNewCars();
    }
}

// Fallback data in case the API fails
function getFallbackNewCars() {
    return [
        {
            id: 1,
            model: "chevrolet camaro za100",
            modelEmphasis: "za100",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            additionalInfo: "Sed ut pers unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            image: "assets/images/new-cars-model/ncm1.png",
            category: "all" // not ex-japan
        },
        {
            id: 2,
            model: "BMW series-3 wagon",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            additionalInfo: "Sed ut pers unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            image: "assets/images/new-cars-model/ncm2.png",
            category: "ex-japan" // ex-japan
        },
        {
            id: 3,
            model: "ferrari 488 superfast",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            additionalInfo: "Sed ut pers unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            image: "assets/images/new-cars-model/ncm3.png",
            category: "all" // not ex-japan
        }
    ];
}
// Parse the JSON response
const response = JSON.parse(jsonData);
// Get the array of cars
const cars = response.entity;
// Map each car to its HTML representation
const carsHtml = cars.map(car => renderCarouselItem(car)).join('');
// Insert the HTML into your carousel container
document.getElementById('cars-carousel').innerHTML = carsHtml;
// Function to render a single carousel item
function renderCarouselItem(car) {
    // Get the first image from the car's images array (if it exists)
    const imageUrl = car.images && car.images.length > 0 ? car.images[0].imageData : 'placeholder-image.jpg';
    
    // Create a more descriptive model display that includes the make, model and year
    const modelDisplay = `${car.make} ${car.model} ${car.year}`;
    
    return `
        <div class="new-cars-item" data-category="${car.bodyType}">
            <div class="single-new-cars-item">
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <div class="new-cars-img">
                            <img src="${imageUrl}" alt="${modelDisplay}"/>
                        </div><!--/.new-cars-img-->
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <div class="new-cars-txt">
                            <h2><a href="/car-details/${car.id}">${modelDisplay}</a></h2>
                            <p>${car.description}</p>
                            <p class="new-cars-para2">
                              Price: $${car.price} | Mileage: ${car.mileage} | 
                              Fuel: ${car.fuelType} | Transmission: ${car.transmission} | 
                              Color: ${car.color} | Status: ${car.status}
                            </p>
                            <button class="welcome-btn new-cars-btn" onclick="window.location.href='/car-details/${car.id}'">
                                view details
                            </button>
                        </div><!--/.new-cars-txt-->	
                    </div><!--/.col-->
                </div><!--/.row-->
            </div><!--/.single-new-cars-item-->
        </div><!--/.new-cars-item-->
    `;
}
// Function to initialize the carousel
function initializeCarousel() {
    $('#new-cars-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });
}

// Function to destroy and reinitialize the carousel
function refreshCarousel() {
    const carousel = $('#new-cars-carousel');
    if (carousel.data('owl.carousel')) {
        carousel.trigger('destroy.owl.carousel');
    }
    initializeCarousel();
}

// Function to filter cars by category
function filterCarsByCategory(category) {
    if (category === 'all') {
        $('.new-cars-item').show();
    } else {
        $('.new-cars-item').hide();
        $(`.new-cars-item[data-category="${category}"]`).show();
        $('.new-cars-item[data-category="all"]').show(); // Always show 'all' category cars
    }
    
    // Refresh the carousel to adjust to the new visible items
    refreshCarousel();
}

// Main function to initialize the new cars section
async function initNewCars() {
    const carouselContainer = document.getElementById('new-cars-carousel');
    
    if (!carouselContainer) {
        console.error('New cars carousel container not found');
        return;
    }
    
    // Fetch cars data
    const carsData = await fetchNewCars();
    
    // Render all carousel items
    carouselContainer.innerHTML = carsData.map(car => renderCarouselItem(car)).join('');
    
    // Initialize Owl Carousel
    initializeCarousel();
    
    // Set up category filter buttons
    const categoryButtons = document.querySelectorAll('.car-category-selector button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cars by selected category
            const selectedCategory = this.getAttribute('data-category');
            filterCarsByCategory(selectedCategory);
        });
    });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initNewCars);

document.addEventListener('DOMContentLoaded', function() {
    // Function to reset animations when a slide changes
    function resetAnimations() {
        const elements = document.querySelectorAll('.animated');
        elements.forEach(element => {
            element.style.animationName = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animationName = '';
        });
    }

    // Get the carousel element
    const carousel = document.getElementById('header-carousel');
    
    // Add event listener for slide event
    carousel.addEventListener('slide.bs.carousel', function() {
        setTimeout(resetAnimations, 50);
    });
    
    // Initialize the carousel with options
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 6000, // Time between automatic cycling (6 seconds)
        ride: 'carousel', // Auto-start sliding
        wrap: true, // Cycle continuously
        touch: true // Allow touch swiping on touch devices
    });
});