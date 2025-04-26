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
// Define a function to fetch car data from the backend
async function fetchFeaturedCars() {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/featured-cars');
        if (!response.ok) {
            throw new Error('Failed to fetch featured cars');
        }
        const carsData = await response.json();
        return carsData;
    } catch (error) {
        console.error('Error fetching featured cars:', error);
        // Return some fallback data in case of error
        return getFallbackCars();
    }
}

// Fallback data in case the API fails
function getFallbackCars() {
    return [
        {
            id: 1,
            model: "BMW 6-series gran coupe",
            price: 89395,
            year: 2017,
            mileage: 3100,
            horsepower: 240,
            transmission: "automatic",
            image: "assets/images/featured-cars/fc1.png",
            description: " Experience top-quality vehicles and unmatched service. We are committed to delivering the best in car sales, repairs, and insurance support to keep you on the road with confidence."
        },
        {
            id: 2,
            model: "chevrolet camaro wmv20",
            price: 66575,
            year: 2017,
            mileage: 3100,
            horsepower: 240,
            transmission: "automatic",
            image: "assets/images/featured-cars/fc2.png",
            description: " Experience top-quality vehicles and unmatched service. We are committed to delivering the best in car sales, repairs, and insurance support to keep you on the road with confidence."
        },
        // More cars would be here in the fallback data
    ];
}

// Function to render a single car card
function renderCarCard(car) {
    // Extract any special formatting in the car model (like spans)
    let modelDisplay = car.model;
    
    // Check if model has a specific part to be emphasized with span
    if (car.modelEmphasis) {
        modelDisplay = car.model.replace(car.modelEmphasis, `<span>${car.modelEmphasis}</span>`);
    }
    
    // Format price with commas
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0
    }).format(car.price);
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="single-featured-cars">
                <div class="featured-img-box">
                    <div class="featured-cars-img">
                        <img src="${car.image}" alt="${car.model}">
                    </div>
                    <div class="featured-model-info">
                        <p>
                            model: ${car.year}
                            <span class="featured-mi-span"> ${car.mileage} mi</span> 
                            <span class="featured-hp-span"> ${car.horsepower}HP</span>
                            ${car.transmission}
                        </p>
                    </div>
                </div>
                <div class="featured-cars-txt">
                    <h2><a href="/car-details/${car.id}">${modelDisplay}</a></h2>
                    <h3>${formattedPrice}</h3>
                    <p>${car.description}</p>
                </div>
            </div>
        </div>
    `;
}

// Main function to initialize the featured cars section
async function initFeaturedCars() {
    // Get container elements
    const firstRowContainer = document.getElementById('featured-cars-container');
    const secondRowContainer = document.getElementById('featured-cars-container-second');
    
    if (!firstRowContainer || !secondRowContainer) {
        console.error('Featured cars containers not found');
        return;
    }
    
    // Fetch cars data
    const carsData = await fetchFeaturedCars();
    
    // Split cars into two rows (4 per row)
    const firstRowCars = carsData.slice(0, 4);
    const secondRowCars = carsData.slice(4, 8);
    
    // Render first row
    firstRowContainer.innerHTML = firstRowCars.map(car => renderCarCard(car)).join('');
    
    // Render second row
    secondRowContainer.innerHTML = secondRowCars.map(car => renderCarCard(car)).join('');
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initFeaturedCars);

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

// Function to render a single carousel item
function renderCarouselItem(car) {
    // Format model name with emphasis if needed
    let modelDisplay = car.model;
    if (car.modelEmphasis) {
        const emphasizedPart = car.modelEmphasis;
        modelDisplay = car.model.replace(emphasizedPart, `<span> ${emphasizedPart}</span>`);
    }
    
    return `
        <div class="new-cars-item" data-category="${car.category}">
            <div class="single-new-cars-item">
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <div class="new-cars-img">
                            <img src="${car.image}" alt="${car.model}"/>
                        </div><!--/.new-cars-img-->
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <div class="new-cars-txt">
                            <h2><a href="/car-details/${car.id}">${modelDisplay}</a></h2>
                            <p>${car.description}</p>
                            <p class="new-cars-para2">${car.additionalInfo}</p>
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
