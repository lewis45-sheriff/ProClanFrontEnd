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
        const response = await fetch('https://one.proclanmotors.co.ke/api/cars/v1/my-cars');
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
async function fetchCarsByMake(make) {
    try {
        // const url = `http://localhost:8080/api/v1/cars/get-by-car/${make}?make=${encodeURIComponent(make)}`;
        const url = `https://one.proclanmotors.co.ke/api/cars/v1/search-by-make/${make}?make=${encodeURIComponent(make)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch cars by make: ${make}`);
        }

        const data = await response.json();
        return data.entity || [];
    } catch (error) {
        console.error(`Error fetching cars by make "${make}":`, error);
        return getFallbackCars();
    }
}

async function fetchSearchCars(make, model, price) {
    try {
        // const response = await fetch(`http://localhost:8080/api/v1/cars/search-by-make-model/${make}/${model}/${price}`);
        const response = await fetch(`https://one.proclanmotors.co.ke/api/cars/v1/search-by-make-model/${make}/${model}/${price}`);

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
        const response = await fetch(`https://one.proclanmotors.co.ke/api/cars/v1/${carId}`);
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
// function getFallbackCars() {
//     return [
//         {
//             "id": 1,
//             "make": "Toyota",
//             "model": "Land Cruiser V8",
//             "year": "2024",
//             "price": "12500000",
//             "mileage": "8000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Symbol of luxury and ruggedness with powerful V8 engine, spacious interior perfect for urban and off-road adventures. Highly regarded for durability and reliability.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 2,
//             "make": "Toyota",
//             "model": "Harrier",
//             "year": "2023",
//             "price": "4200000",
//             "mileage": "15000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Stylish and practical SUV offering smooth, comfortable ride with spacious interior, advanced safety features, and fuel-efficient engine. Perfect for families.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 3,
//             "make": "Toyota",
//             "model": "Prado",
//             "year": "2024",
//             "price": "8500000",
//             "mileage": "12000",
//             "fuelType": "Diesel",
//             "transmission": "Automatic",
//             "description": "Rugged and versatile SUV with excellent off-road capabilities, powerful engine, advanced suspension system, and spacious interior for outdoor adventures.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 4,
//             "make": "Toyota",
//             "model": "RAV4",
//             "year": "2023",
//             "price": "3800000",
//             "mileage": "18000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact SUV offering perfect blend of style, performance, and practicality with spacious interior, advanced safety features, and fuel-efficient engine.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 5,
//             "make": "Toyota",
//             "model": "Corolla Fielder",
//             "year": "2022",
//             "price": "2200000",
//             "mileage": "25000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Five-door station wagon version of the Corolla, renowned for fuel efficiency and durability. Popular choice among Kenyan drivers for reliability.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 6,
//             "make": "Toyota",
//             "model": "Hiace",
//             "year": "2023",
//             "price": "3500000",
//             "mileage": "20000",
//             "fuelType": "Diesel",
//             "transmission": "Manual",
//             "description": "Reliable and versatile van widely used for public transportation and commercial purposes. Features spacious interior, durable construction, and fuel efficiency.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop" }
//             ]
//         },

//         {
//             "id": 7,
//             "make": "Toyota",
//             "model": "Vitz",
//             "year": "2021",
//             "price": "1800000",
//             "mileage": "30000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "One of the most popular cars among Kenyans for affordability, low fuel consumption, and reliability. Ideal for city driving and first-time car owners.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 8,
//             "make": "Toyota",
//             "model": "Aqua",
//             "year": "2022",
//             "price": "2000000",
//             "mileage": "22000",
//             "fuelType": "Hybrid",
//             "transmission": "Automatic",
//             "description": "Hybrid vehicle with exceptional fuel economy and environmental friendliness. Expected to see increased uptake in the Kenyan market for its efficiency.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 9,
//             "make": "Toyota",
//             "model": "Yaris Cross",
//             "year": "2023",
//             "price": "2800000",
//             "mileage": "16000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact crossover SUV combining the practicality of an SUV with fuel efficiency. Expected to see increased popularity in Kenya.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 10,
//             "make": "Toyota",
//             "model": "Corolla",
//             "year": "2022",
//             "price": "2500000",
//             "mileage": "20000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Consistently ranks among best-selling sedans in Kenya. Reputation for reliability, fuel efficiency, and affordability makes it popular choice.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 11,
//             "make": "Honda",
//             "model": "Fit",
//             "year": "2021",
//             "price": "1600000",
//             "mileage": "35000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact hatchback offering excellent fuel efficiency, practicality, and affordability. Features spacious interior and versatile seating arrangements.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 12,
//             "make": "Honda",
//             "model": "Vezel",
//             "year": "2023",
//             "price": "3200000",
//             "mileage": "14000",
//             "fuelType": "Hybrid",
//             "transmission": "Automatic",
//             "description": "Compact hybrid SUV with stylish design and excellent fuel economy. Expected to see increased uptake in the Kenyan market.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 13,
//             "make": "Honda",
//             "model": "Shuttle",
//             "year": "2022",
//             "price": "2300000",
//             "mileage": "26000",
//             "fuelType": "Hybrid",
//             "transmission": "Automatic",
//             "description": "Hybrid station wagon offering excellent fuel efficiency and practicality. Popular among families for its spacious interior and reliability.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 14,
//             "make": "Nissan",
//             "model": "X-Trail",
//             "year": "2023",
//             "price": "3600000",
//             "mileage": "17000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Stylish and practical SUV offering comfortable and refined driving experience. Features spacious interior, advanced safety features, and fuel efficiency.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 15,
//             "make": "Nissan",
//             "model": "Note",
//             "year": "2021",
//             "price": "1900000",
//             "mileage": "28000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact hatchback known for reliability and fuel efficiency. Popular choice for urban driving with spacious interior despite compact size.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 16,
//             "make": "Nissan",
//             "model": "Juke",
//             "year": "2022",
//             "price": "2700000",
//             "mileage": "21000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Distinctive compact crossover with bold styling and sporty performance. Appeals to younger buyers looking for unique design and functionality.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 17,
//             "make": "Subaru",
//             "model": "Forester",
//             "year": "2023",
//             "price": "4000000",
//             "mileage": "15000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Known for ruggedness and off-road capabilities with Symmetrical All-Wheel Drive system. Provides excellent traction and stability on all terrain types.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 18,
//             "make": "Subaru",
//             "model": "Outback",
//             "year": "2022",
//             "price": "4500000",
//             "mileage": "18000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Rugged wagon with SUV capabilities, perfect for adventure seekers. Features high ground clearance and all-wheel drive for various terrains.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 19,
//             "make": "Subaru",
//             "model": "Impreza",
//             "year": "2021",
//             "price": "2600000",
//             "mileage": "24000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact sedan with standard all-wheel drive and excellent safety ratings. Popular among young professionals for its performance and reliability.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 20,
//             "make": "Mazda",
//             "model": "CX-5",
//             "year": "2023",
//             "price": "3900000",
//             "mileage": "13000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact SUV combining style, performance, and affordability with KODO design language. Offers comfortable and refined driving experience.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 21,
//             "make": "Mazda",
//             "model": "Demio",
//             "year": "2021",
//             "price": "1700000",
//             "mileage": "32000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Compact hatchback with sporty design and excellent fuel economy. Popular among city dwellers for its maneuverability and efficiency.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 22,
//             "make": "Mazda",
//             "model": "Axela",
//             "year": "2022",
//             "price": "2400000",
//             "mileage": "19000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Stylish sedan with premium interior and smooth performance. Appeals to buyers seeking luxury feel at affordable price point.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1494976688153-c2c3d4d1462f?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" }
//             ]
//         },
//         {
//             "id": 23,
//             "make": "Mercedes-Benz",
//             "model": "C-Class",
//             "year": "2023",
//             "price": "7500000",
//             "mileage": "10000",
//             "fuelType": "Petrol",
//             "transmission": "Automatic",
//             "description": "Luxury sedan offering perfect blend of style, performance, and comfort. Features luxurious interior, advanced technology, and powerful engine.",
//             "images": [
//                 { "imageData": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=400&h=300&fit=crop" },
//                 { "imageData": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop" }
//             ]
//         },

//     ];
// }

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
function renderCarCard(car) {
    // Format price with commas (KES currency)
    const formattedPrice = formatCurrency(car.price);

    // Get car image or use placeholder
    const carImage = car.images && car.images.length > 0 && car.images[0].imageData
        ? car.images[0].imageData
        : 'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=No+Image';

    // Create main column element
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

    // Create main card container with elegant styling
    const carDiv = document.createElement('div');
    carDiv.className = 'single-featured-cars card h-100 border-0';
    carDiv.style.cssText = `
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
    `;

    // Create image container with modern styling
    const imgBoxDiv = document.createElement('div');
    imgBoxDiv.className = 'featured-img-box position-relative';
    imgBoxDiv.style.cssText = `
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    `;

    // Create image wrapper with fixed aspect ratio
    const carsImgDiv = document.createElement('div');
    carsImgDiv.className = 'featured-cars-img overflow-hidden';
    carsImgDiv.style.cssText = `
        height: 220px;
        background: #f8f9fa;
    `;

    // Create image element with smooth loading
    const imgElement = document.createElement('img');
    imgElement.src = car.images[0].image_data; // Use the Base64 data URL directly
    imgElement.alt = `${car.make} ${car.model}`;
    imgElement.className = 'w-100 h-100';
    imgElement.style.cssText = `
    object-fit: cover;
    transition: transform 0.3s ease;
    filter: contrast(1.05) saturate(0.9);
`;
    carsImgDiv.appendChild(imgElement);


    // Create minimalist specs overlay
    const specsOverlay = document.createElement('div');
    specsOverlay.className = 'position-absolute bottom-0 start-0 end-0 p-3';
    specsOverlay.style.cssText = `
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        backdrop-filter: blur(2px);
    `;

    const specsContainer = document.createElement('div');
    specsContainer.className = 'd-flex flex-wrap gap-1';

    // Create subtle badges for key specs only
    const keySpecs = [
        { value: car.year, icon: '📅' },
        { value: `${car.mileage}km`, icon: '🛣️' },
        { value: car.fuelType, icon: '⛽' }
    ];

    keySpecs.forEach(spec => {
        if (spec.value) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.style.cssText = `
                background: rgba(255,255,255,0.9);
                color: #495057;
                font-size: 0.9rem;
                font-weight: 500;
                padding: 8px 12px;
                border-radius: 8px;
                backdrop-filter: blur(4px);
            `;
            badge.textContent = `${spec.icon} ${spec.value}`;
            specsContainer.appendChild(badge);
        }
    });

    specsOverlay.appendChild(specsContainer);
    imgBoxDiv.appendChild(carsImgDiv);
    imgBoxDiv.appendChild(specsOverlay);

    // Create content area with refined spacing
    const txtDiv = document.createElement('div');
    txtDiv.className = 'featured-cars-txt';
    txtDiv.style.cssText = `
        padding: 20px;
        background: #ffffff;
    `;

    // Create elegant title
    const titleContainer = document.createElement('div');
    titleContainer.className = 'mb-3';

    const makeSpan = document.createElement('span');
    makeSpan.className = 'd-block';
    makeSpan.style.cssText = `
        font-size: 0.85rem;
        color: #6c757d;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 4px;
    `;
    makeSpan.textContent = car.make;

    const modelLink = document.createElement('a');
    modelLink.href = `/car-detail.html?carId=${car.id}`;
    modelLink.className = 'text-decoration-none';
    modelLink.style.cssText = `
        color: #212529;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.3;
        display: block;
        transition: color 0.2s ease;
    `;
    modelLink.textContent = car.model;

    titleContainer.appendChild(makeSpan);
    titleContainer.appendChild(modelLink);

    // Create sophisticated price display
    const priceContainer = document.createElement('div');
    priceContainer.className = 'mb-4';

    const priceLabel = document.createElement('span');
    priceLabel.style.cssText = `
        font-size: 0.8rem;
        color: #6c757d;
        font-weight: 500;
        display: block;
        margin-bottom: 2px;
    `;
    priceLabel.textContent = 'Price';

    const priceValue = document.createElement('div');
    priceValue.style.cssText = `
        font-size: 1.5rem;
        font-weight: 700;
        color: #212529;
        letter-spacing: -0.5px;
    `;
    priceValue.textContent = formattedPrice;

    priceContainer.appendChild(priceLabel);
    priceContainer.appendChild(priceValue);

    // Create minimal action button
    const detailsBtn = document.createElement('a');
    detailsBtn.href = `/car-detail.html?carId=${car.id}`;
    detailsBtn.className = 'btn w-100';
    detailsBtn.style.cssText = `
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        color: #495057;
        font-weight: 600;
        padding: 12px;
        border-radius: 8px;
        transition: all 0.2s ease;
        font-size: 0.9rem;
    `;
    detailsBtn.textContent = 'View Details';

    // Add elements to content area
    txtDiv.appendChild(titleContainer);
    txtDiv.appendChild(priceContainer);
    txtDiv.appendChild(detailsBtn);

    // Create subtle favorite button
    const favBtn = document.createElement('button');
    favBtn.className = 'btn btn-outline-primary position-absolute';
    favBtn.style.cssText = `
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.95);
    border: 1px solid rgba(0,0,0,0.1);
    color: #6c757d;
    backdrop-filter: blur(4px);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
`;

    favBtn.innerHTML = `<i class="bi bi-heart" style="font-size: 18px; color: #6c757d;"></i>`;

    favBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const icon = this.querySelector('i');

        if (icon.classList.contains('bi-heart')) {
            icon.classList.replace('bi-heart', 'bi-heart-fill');
            this.classList.replace('btn-outline-primary', 'btn-danger');
            this.style.color = '#dc3545';         // button color (if icon inherits)
            icon.style.color = '#dc3545';         // explicitly set icon color to red
            showNotification('Car saved to favorites!');
        } else {
            icon.classList.replace('bi-heart-fill', 'bi-heart');
            this.classList.replace('btn-danger', 'btn-outline-primary');
            this.style.color = '#6c757d';         // button color gray
            icon.style.color = '#6c757d';         // explicitly set icon color gray
            showNotification('Car removed from favorites');
        }
    });

    imgBoxDiv.appendChild(favBtn);


    // Add featured badge if needed
    if (car.featured) {
        const featuredBadge = document.createElement('div');
        featuredBadge.className = 'position-absolute';
        featuredBadge.style.cssText = `
            top: 12px;
            left: 12px;
            z-index: 2;
        `;

        const badge = document.createElement('span');
        badge.style.cssText = `
            background: #212529;
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 4px;
            letter-spacing: 0.5px;
        `;
        badge.textContent = 'FEATURED';

        featuredBadge.appendChild(badge);
        imgBoxDiv.appendChild(featuredBadge);
    }

    // Assemble the card
    carDiv.appendChild(imgBoxDiv);
    carDiv.appendChild(txtDiv);
    colDiv.appendChild(carDiv);

    // Add sophisticated hover effects
    carDiv.addEventListener('mouseenter', () => {
        carDiv.style.transform = 'translateY(-4px)';
        carDiv.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        imgElement.style.transform = 'scale(1.02)';
        detailsBtn.style.background = '#e9ecef';
        detailsBtn.style.borderColor = '#dee2e6';
        modelLink.style.color = '#495057';
    });

    carDiv.addEventListener('mouseleave', () => {
        carDiv.style.transform = 'translateY(0)';
        carDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        imgElement.style.transform = 'scale(1)';
        detailsBtn.style.background = '#f8f9fa';
        detailsBtn.style.borderColor = '#e9ecef';
        modelLink.style.color = '#212529';
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
let allCars = []; // Store all fetched cars
let currentDisplayCount = 8; // Start with 8 cars (2 rows of 4)
const carsPerLoad = 4; // Load 4 more cars each time (1 row)

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
    allCars = await fetchCars();

    // Clear containers
    if (firstRowContainer) {
        firstRowContainer.innerHTML = '';
    }
    if (secondRowContainer) {
        secondRowContainer.innerHTML = '';
    }

    if (allCars.length === 0) {
        if (firstRowContainer) {
            firstRowContainer.innerHTML = '<div class="col-12 text-center"><p>No featured cars available</p></div>';
        }
        return;
    }

    // Initial render
    renderFeaturedCars();

    // Create show more button if there are more than 8 cars
    if (allCars.length > 8) {
        createShowMoreButton();
    }
}

function renderFeaturedCars() {
    const firstRowContainer = document.getElementById('featured-cars-container');
    const secondRowContainer = document.getElementById('featured-cars-container-second');

    // Get cars to display
    const displayedCars = allCars.slice(0, currentDisplayCount);

    // Clear existing content
    if (firstRowContainer) firstRowContainer.innerHTML = '';
    if (secondRowContainer) secondRowContainer.innerHTML = '';

    // Split cars into rows (4 per row)
    const firstRowCars = displayedCars.slice(0, 4);
    const secondRowCars = displayedCars.slice(4, 8);
    const additionalCars = displayedCars.slice(8);

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

    // Handle additional cars (beyond 8)
    if (additionalCars.length > 0) {
        renderAdditionalCars(additionalCars);
    }

    // Update show more button
    updateShowMoreButton();
}

function renderAdditionalCars(additionalCars) {
    const secondRowContainer = document.getElementById('featured-cars-container-second');
    if (!secondRowContainer) return;

    // Create additional rows as needed
    for (let i = 0; i < additionalCars.length; i += 4) {
        const rowCars = additionalCars.slice(i, i + 4);

        // Create a new row container
        const additionalRowContainer = document.createElement('div');
        additionalRowContainer.className = secondRowContainer.className; // Use same classes as second row
        additionalRowContainer.id = `additional-cars-row-${Math.floor(i / 4) + 1}`;

        // Add cars to the row
        rowCars.forEach(car => {
            additionalRowContainer.appendChild(renderCarCard(car));
        });

        // Insert the new row after the second row container
        secondRowContainer.parentNode.insertBefore(additionalRowContainer, secondRowContainer.nextSibling);
    }
}

function createShowMoreButton() {
    // Check if button already exists
    let showMoreBtn = document.getElementById('show-more-cars-btn');

    if (!showMoreBtn) {
        showMoreBtn = document.createElement('div');
        showMoreBtn.id = 'show-more-cars-btn';
        showMoreBtn.className = 'col-12 text-center mt-4';

        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.innerHTML = 'Show More Cars';

        button.addEventListener('click', function () {
            currentDisplayCount += carsPerLoad;
            renderFeaturedCars();
        });

        showMoreBtn.appendChild(button);

        // Insert after the second row container
        const secondRowContainer = document.getElementById('featured-cars-container-second');
        if (secondRowContainer && secondRowContainer.parentNode) {
            secondRowContainer.parentNode.insertBefore(showMoreBtn, secondRowContainer.nextSibling);
        }
    }

    updateShowMoreButton();
}

function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('show-more-cars-btn');
    const button = showMoreBtn?.querySelector('button');

    if (!showMoreBtn || !button) return;

    // Hide button if all cars are displayed
    if (currentDisplayCount >= allCars.length) {
        showMoreBtn.style.display = 'none';
    } else {
        showMoreBtn.style.display = 'block';
        // Update button text to show remaining cars
        const remainingCars = allCars.length - currentDisplayCount;
        button.innerHTML = `Show More Cars (${remainingCars} remaining)`;
    }
}

// Function to reset the display (useful for refresh)
function resetFeaturedCarsDisplay() {
    currentDisplayCount = 8;

    // Remove additional rows
    const additionalRows = document.querySelectorAll('[id^="additional-cars-row-"]');
    additionalRows.forEach(row => row.remove());

    // Remove show more button
    const showMoreBtn = document.getElementById('show-more-cars-btn');
    if (showMoreBtn) showMoreBtn.remove();

    // Re-render
    if (allCars.length > 0) {
        renderFeaturedCars();
        if (allCars.length > 8) {
            createShowMoreButton();
        }
    }
}

// search cars by make and model
// async function carSearch(make, model, price) {
//     const firstRowContainer = document.getElementById('searched-cars-container');
//     const secondRowContainer = document.getElementById('searched-cars-container-second');

//     if (!firstRowContainer || !secondRowContainer) return;

//     // Show loading message
//     firstRowContainer.innerHTML = `
//         <div class="col-12 text-center">
//             <p>Loading search results...</p>
//         </div>
//     `;
//     secondRowContainer.innerHTML = '';

//     const cars = await fetchSearchCars(make, model, price);

//     if (!cars || cars.length === 0) {
//         firstRowContainer.innerHTML = `
//             <div class="col-12 text-center">
//                 <p>No cars found</p>
//             </div>
//         `;
//         return;
//     }

//     // Clear old content
//     firstRowContainer.innerHTML = '';
//     secondRowContainer.innerHTML = '';

//     // Split cars into two rows
//     const firstRowCars = cars.slice(0, 4);
//     const secondRowCars = cars.slice(4, 8);

//     // Render first row
//     firstRowCars.forEach(car => {
//         firstRowContainer.appendChild(renderCarCard(car));
//     });

//     // Render second row if any
//     if (secondRowCars.length > 0) {
//         secondRowCars.forEach(car => {
//             secondRowContainer.appendChild(renderCarCard(car));
//         });
//     }
// }


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
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');

    if (!carId) {
        showError('Car ID not found in URL');
        return;
    }

    try {
        const car = await fetchCarById(carId);

        if (!car) {
            showError('Car not found');
            return;
        }

        displayCarDetails(car);
        initializeGallery();
        loadSimilarCars();

        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.addEventListener('click', function () {
                const icon = this.querySelector('i');
                const label = this.querySelector('i + span');

                if (icon.classList.contains('bi-heart')) {
                    icon.classList.replace('bi-heart', 'bi-heart-fill');
                    this.classList.replace('btn-outline-primary', 'btn-danger');
                    label.textContent = ' Saved';
                    showNotification('Car saved to favorites!');
                } else {
                    icon.classList.replace('bi-heart-fill', 'bi-heart');
                    this.classList.replace('btn-danger', 'btn-outline-primary');
                    label.textContent = ' Save This Car';
                    showNotification('Car removed from favorites');
                }
            });
        }

        const whatsappBtn = document.getElementById('whatsappButton');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                const message = formatCarForWhatsApp(car);
                const phone = '254791861308';
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            });
        }

        function formatCarForWhatsApp(car) {
            const features = car.features && car.features.length > 0
                ? car.features.map(f => `- ${f}`).join('\n') // Adjusted to match string array
                : 'No features listed.';

            const imageUrl = car.imageUrl || ''; // Make sure this is a full URL to the image

            return `Hi, I'm interested in this car. Can you tell me more about it?\n\n` + // Inquiry message
                `*${car.make} ${car.model}*\n` +
                `Year: ${car.year}\n` +
                `Transmission: ${car.transmission || 'N/A'}\n` +
                `Fuel Type: ${car.fuel_type || 'N/A'}\n` +
                `Mileage: ${car.mileage || 'N/A'} km\n` +
                `Color: ${car.color || 'N/A'}\n` +
                `Price: ${car.price || 'N/A'}\n\n` +
                `Features:\n${features}\n\n` +
                (imageUrl ? `Image: ${imageUrl}\n` : '') +
                `View more: ${window.location.href}`;
        }

    } catch (error) {
        console.error(error);
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
    updateSpecValue('Fuel Type', car.fuel_type || 'Not specified');
    updateSpecValue('Transmission', car.transmission);
    updateSpecValue('Color', car.color || 'Not specified');
    updateSpecValue('Seats', car.seats || 'Not specified');
    updateSpecValue('Engine Size', car.engine_size || 'Not specified');

    // Update car description
    const carDescription = document.querySelector('.car-description');
    if (carDescription && car.description) {
        carDescription.innerHTML = `<p>${car.description}</p>`;
    }

    // Update car images
    updateCarImages(car);
    renderFeatures(car);

}
function renderFeatures(car) {
    // Fix: Use the correct selector - either by ID or the specific class combination
    const featuresContainer = document.getElementById('features-container');
    // Alternative: const featuresContainer = document.querySelector('.d-flex.flex-wrap.animated.delay-1');

    // Clear any existing features
    featuresContainer.innerHTML = '';

    // Map some common feature names to icons
    const iconMap = {
        // Sunroof & Roof Features
        'Sunroof': 'bi-brightness-high',
        'Panoramic Sunroof': 'bi-sun',

        // Seating Features
        'Leather Seats': 'bi-person-arms-up',
        'Heated Seats': 'bi-thermometer-sun',
        'Cooled/Ventilated Seats': 'bi-snow2',
        'Power Adjustable Seats': 'bi-arrows-move',
        'Memory Seats': 'bi-memory',
        'Massage Seats': 'bi-heart-pulse',
        'Third Row Seating': 'bi-people',
        'Captain\'s Chairs': 'bi-person-chair',
        'Fold-Flat Rear Seats': 'bi-arrows-collapse',

        // Lighting & Ambiance
        'Ambient Lighting': 'bi-lightbulb',
        'LED Headlights': 'bi-lightbulb-fill',
        'Adaptive Headlights': 'bi-eye',
        'Daytime Running Lights': 'bi-circle',
        'Fog Lights': 'bi-cloud-fog',

        // Climate Control
        'Automatic Climate Control': 'bi-thermometer-half',
        'Dual Zone Climate Control': 'bi-thermometer',

        // Engine & Start Features
        'Remote Engine Start': 'bi-power',
        'Keyless Entry': 'bi-key',
        'Push Button Start': 'bi-circle-fill',

        // Windows & Mirrors
        'Power Windows': 'bi-window',
        'Power Adjustable Mirrors': 'bi-arrow-left-right',
        'Heated Side Mirrors': 'bi-thermometer-sun',
        'Auto-Dimming Mirrors': 'bi-moon',
        'Frameless Windows': 'bi-window-stack',

        // Tailgate Features
        'Power Tailgate': 'bi-box-arrow-up',
        'Hands-Free Power Tailgate': 'bi-hand-index',
        'Soft-Close Doors': 'bi-door-closed',

        // Connectivity & Entertainment
        'Bluetooth Connectivity': 'bi-bluetooth',
        'Android Auto': 'bi-android2',
        'Apple CarPlay': 'bi-apple',
        'Wireless Phone Charging': 'bi-phone-vibrate',
        'USB Ports': 'bi-usb-drive',
        'Wi-Fi Hotspot': 'bi-wifi',
        'Satellite Radio': 'bi-broadcast',
        '12V Power Outlets': 'bi-plug',
        'Power Inverter': 'bi-lightning-charge',

        // Navigation & Display
        'GPS Navigation System': 'bi-geo-alt',
        'Touchscreen Display': 'bi-tablet',
        'Digital Instrument Cluster': 'bi-speedometer2',
        'Head-Up Display': 'bi-display',
        'Augmented Reality Display': 'bi-eyeglasses',

        // Audio Systems
        'Premium Audio System': 'bi-music-note-beamed',
        'Bose Audio System': 'bi-speaker',
        'Harman Kardon Audio System': 'bi-boombox',
        'Multi-Zone Audio': 'bi-volume-up',
        'Rear Seat Entertainment System': 'bi-tv',

        // Voice & AI
        'Voice Control': 'bi-mic',
        'AI Voice Assistant': 'bi-robot',

        // Safety - Cameras & Monitoring
        'Backup Camera': 'bi-camera-video',
        '360-Degree Surround View Camera': 'bi-camera-reels',
        'Blind Spot Monitoring': 'bi-eye-slash',
        'Night Vision': 'bi-moon-stars',
        'Driver Drowsiness Detection': 'bi-alarm',
        'Traffic Sign Recognition': 'bi-sign-stop',
        'Rear Cross Traffic Alert': 'bi-arrow-left-right',

        // Safety - Collision & Lane
        'Lane Departure Warning': 'bi-exclamation-triangle',
        'Lane Keeping Assist': 'bi-arrow-up',
        'Forward Collision Warning': 'bi-shield-exclamation',
        'Automatic Emergency Braking': 'bi-shield-check',
        'Adaptive Cruise Control': 'bi-speedometer',

        // Safety - Parking & Assistance
        'Parking Sensors': 'bi-radar',
        'Automatic Parking Assist': 'bi-p-square',

        // Safety - Airbags & Systems
        'Multiple Airbags': 'bi-shield-fill-plus',
        'Anti-Lock Braking System (ABS)': 'bi-shield-check',
        'Electronic Stability Control': 'bi-arrow-clockwise',
        'Traction Control System': 'bi-grip-horizontal',
        'Tire Pressure Monitoring System': 'bi-speedometer2',

        // Security
        'Security Alarm System': 'bi-shield-lock',
        'Remote Vehicle Monitoring': 'bi-phone',
        'Biometric Access': 'bi-fingerprint',

        // Drive Systems
        'All-Wheel Drive': 'bi-truck',
        'Four-Wheel Drive': 'bi-4-square',
        'Sport Drive Mode': 'bi-lightning',
        'Eco Drive Mode': 'bi-tree',
        'Paddle Shifters': 'bi-gear-wide-connected',
        'Launch Control': 'bi-rocket-takeoff',

        // Suspension & Performance
        'Active Suspension': 'bi-arrow-up-down',
        'Air Suspension': 'bi-cloud-arrow-up',
        'Limited Slip Differential': 'bi-gear-wide',
        'Performance Exhaust System': 'bi-cloud-plus',

        // Engine Types
        'Turbocharged Engine': 'bi-tornado',
        'Hybrid Powertrain': 'bi-battery-half',
        'Electric Motor': 'bi-lightning-charge-fill',
        'Regenerative Braking': 'bi-arrow-repeat',

        // Exterior Features
        'Roof Rails': 'bi-calendar3-week',
        'Running Boards': 'bi-calendar2-week',
        'Tonneau Cover': 'bi-box',
        'Bed Liner': 'bi-bucket',
        'Towing Package': 'bi-link-45deg',
        'Alloy Wheels': 'bi-circle',
        'Chrome Trim': 'bi-gem',
        'Paint Protection Film': 'bi-shield-fill',
        'Window Tinting': 'bi-window-sidebar',

        // Storage & Organization
        'Cargo Organizer': 'bi-box-seam',
        'All-Weather Floor Mats': 'bi-grid-3x3-gap',
        'Cargo Net': 'bi-grid',
        'Cooled Storage Compartment': 'bi-snow3',
        'Emergency Tool Kit': 'bi-tools',
        'Full-Size Spare Tire': 'bi-circle-square',

        // Interior Trim & Luxury
        'Wood Interior Trim': 'bi-tree-fill',
        'Carbon Fiber Trim': 'bi-diamond',
        'Premium Interior Package': 'bi-star-fill',
        'Premium Leather Package': 'bi-award',
        'Alcantara Interior': 'bi-stars',

        // Steering & Controls
        'Heated Steering Wheel': 'bi-thermometer-sun',
        'Power Adjustable Steering Column': 'bi-arrow-up-down',
        'Gesture Control': 'bi-hand-index-thumb',

        // Weather & Convenience
        'Automatic Rain-Sensing Wipers': 'bi-cloud-rain',

        // Trailer & Cargo
        'Trailer Hitch': 'bi-link',
        'Roof Rack System': 'bi-layout-three-columns',

        // Autonomous & Advanced
        'Semi-Autonomous Driving': 'bi-robot',
        'Autopilot System': 'bi-airplane',
        'Over-the-Air Software Updates': 'bi-cloud-download',

        // Default fallback
        'default': 'bi-check-circle'
    };

    if (car.features && car.features.length > 0) {
        car.features.forEach(featureName => {
            const iconClass = iconMap[featureName] || 'bi-check-circle'; // Default icon

            const span = document.createElement('span');
            span.className = 'feature-badge';
            span.innerHTML = `<i class="bi ${iconClass}"></i> ${featureName}`;

            featuresContainer.appendChild(span);
        });
    } else {
        featuresContainer.innerHTML = '<span class="text-muted">No features listed.</span>';
    }

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
        if (mainImage && car.images[0].image_data) {
            mainImage.src = car.images[0].image_data;
            mainImage.alt = `${car.make} ${car.model}`;
        }

        // Update gallery images
        const galleryImages = document.querySelectorAll('.gallery-img');
        for (let i = 0; i < galleryImages.length && i < car.images.length; i++) {
            if (car.images[i].image_data) {
                galleryImages[i].src = car.images[i].image_data;
                galleryImages[i].alt = `${car.make} ${car.model} View ${i + 1}`;
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
        img.addEventListener('click', function () {
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
        const params = new URLSearchParams(window.location.search);
        const carId = params.get('carId');

        if (!carId) {
            console.warn('No car ID specified in the URL.');
            return;
        }

        // Step 1: Fetch car details using carId
        const carDetailsResponse = await fetch(`https://one.proclanmotors.co.ke/api/cars/v1/${carId}`);
        if (!carDetailsResponse.ok) {
            throw new Error(`Failed to fetch car details for ID: ${carId}`);
        }

        const carDetails = await carDetailsResponse.json();
        const make = carDetails.entity?.make;
        console.log('Fetched car details:', make);
        console.log('Fetched car details:', carId);

        if (!make) {
            console.warn('Car make not found in the fetched car details.');
            return;
        }

        // Step 2: Fetch similar cars by make
        const cars = await fetchCarsByMake(make);
        const similarCarsContainer = document.getElementById('similarCars');

        if (!similarCarsContainer) return;

        // Step 3: Filter out the current car and display up to 4 others
        const similarCars = cars
            .filter(car => car.id !== parseInt(carId))
            .slice(0, 4);

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
    window.addEventListener('scroll', function () {
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
    carousel.addEventListener('slide.bs.carousel', function () {
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


// //search cars by make and model
// $(document).ready(function () {
//     const modelsByMake = {
//             toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser', 'Hilux'],
//             honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V', 'Odyssey'],
//             ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Focus', 'Ranger', 'Edge'],
//             chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Cruze', 'Traverse', 'Camaro'],
//             nissan: ['Sentra', 'Altima', 'Rogue', 'Pathfinder', 'Frontier', 'Murano', 'Leaf'],
//             bmw: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'i3', 'i8'],
//             'mercedes-benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA'],
//             audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'e-tron'],
//             volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Beetle', 'ID.4'],
//             hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Ioniq'],
//             kia: ['Forte', 'Optima', 'Sorento', 'Sportage', 'Soul', 'Telluride', 'Stinger']
//     };

//     // Populate model dropdown
//     $('#make-select').change(function () {
//         const selectedMake = $(this).val();
//         const modelSelect = $('#model-select');

//         modelSelect.empty();
//         modelSelect.append('<option value="default">model</option>');

//         if (selectedMake !== 'default' && modelsByMake[selectedMake]) {
//             modelsByMake[selectedMake].forEach(model => {
//                 modelSelect.append(`<option value="${model.toLowerCase()}">${model}</option>`);
//             });
//         }
//     });

//     $('#search-button').click(function (e) {
//         e.preventDefault();

//         $('#loading-indicator').show();
//         $('#searched-cars').hide();

//         const make = $('#make-select').val();
//         const model = $('#model-select').val();
//         const price = $('#price-select').val();

//         if (make === 'default' || model === 'default' || price === 'default') {
//             alert('Please select make, model, and price range to search');
//             $('#loading-indicator').hide();
//             return;
//         }

//         const apiUrl = `http://localhost:8080/api/v1/cars/search-by-make-model?make=${make}&model=${model}&price=${price}`;

//         fetch(apiUrl)
//             .then(response => {
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 return response.json();
//             })
//             .then(data => {
//                 displaySearchResults(data);
//                 $('#loading-indicator').hide();
//             })
//             .catch(error => {
//                 console.error('Error searching cars:', error);
//                 alert('An error occurred while searching for cars. Please try again.');
//                 $('#loading-indicator').hide();
//             });
//     });

//     $('#clear-button').click(function () {
//         $('select').val('default');
//         $('#searched-cars').hide();
//     });

//     function displaySearchResults(response) {
//         const firstRow = $('#searched-cars-container');
//         const secondRow = $('#searched-cars-container-second');

//         firstRow.empty();
//         secondRow.empty();

//         $('#searched-cars').show();

//         if (response.entity && response.entity.length > 0) {
//             const firstRowCars = response.entity.slice(0, 4);
//             const secondRowCars = response.entity.slice(4, 8);

//             firstRowCars.forEach(car => {
//                 firstRow.append(renderCarCard(car));
//             });

//             secondRowCars.forEach(car => {
//                 secondRow.append(renderCarCard(car));
//             });
//         } else {
//             firstRow.html(`
//                 <div class="col-12 text-center">
//                     <p>No cars found matching your criteria</p>
//                 </div>
//             `);
//         }
//     }

//     // function renderCarCard(car) {
//     //     const priceFormatted = typeof car.price === 'number'
//     //         ? car.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
//     //         : car.price;

//     //     return `
//     //         <div class="col-md-3 mb-4">
//     //             <div class="card h-100">
//     //                 <div class="card-body">
//     //                     <h5 class="card-title">${car.year || ''} ${car.make} ${car.model}</h5>
//     //                     <p class="card-text">
//     //                         <strong>Price:</strong> ${priceFormatted}
//     //                     </p>
//     //                     <button class="btn btn-primary view-details" data-id="${car.id}">View Details</button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     `;
//     // }

//     $(document).on('click', '.view-details', function () {
//         const carId = $(this).data('id');
//         window.location.href = `/car-details/${carId}`;
//     });
// });
$(document).ready(function () {
    // ============================================
    // CAR MODELS DATA
    // ============================================
    const modelsByMake = {
        'toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Prius', 'Prado'],
        'honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V'],
        'ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Edge', 'Bronco'],
        'chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Traverse', 'Camaro', 'Suburban'],
        'nissan': ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Murano', 'Frontier', 'Maxima', 'Note'],
        'bmw': ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'i4', 'iX'],
        'mercedes-benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'G-Wagon'],
        'audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'e-tron', 'R8'],
        'volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'ID.4', 'Taos'],
        'hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Ioniq'],
        'kia': ['Forte', 'Optima', 'Sorento', 'Sportage', 'Telluride', 'Soul', 'K5']
    };

    // ============================================
    // MAKE SELECTION HANDLER
    // ============================================
    $('#make-select').change(function () {
        const selectedMake = $(this).val();
        const modelSelect = $('#model-select');
        const makeContainer = $(this).closest('.single-model-search');

        // Reset model dropdown
        modelSelect.empty().append('<option value="" disabled selected>Choose model...</option>');

        if (selectedMake && selectedMake !== 'default' && modelsByMake[selectedMake]) {
            // Enable model dropdown and show loading
            modelSelect.prop('disabled', false);
            modelSelect.closest('.single-model-search').addClass('loading');

            // Simulate loading delay for better UX
            setTimeout(() => {
                // Populate models
                modelsByMake[selectedMake].forEach(model => {
                    modelSelect.append(`<option value="${model.toLowerCase().replace(/\s+/g, '-')}">${model}</option>`);
                });

                // Remove loading and add success state
                modelSelect.closest('.single-model-search').removeClass('loading').addClass('success');

                // Remove success state after animation
                setTimeout(() => {
                    modelSelect.closest('.single-model-search').removeClass('success');
                }, 2000);
            }, 800);
        } else {
            modelSelect.prop('disabled', true);
        }

        // Add success state to make selection
        makeContainer.addClass('success');
        setTimeout(() => {
            makeContainer.removeClass('success');
        }, 2000);
    });

    // ============================================
    // MODEL SELECTION HANDLER
    // ============================================
    $('#model-select').change(function () {
        const container = $(this).closest('.single-model-search');
        container.addClass('success');
        setTimeout(() => {
            container.removeClass('success');
        }, 2000);
    });

    // ============================================
    // PRICE SELECTION HANDLER
    // ============================================
    $('#price-select').change(function () {
        const container = $(this).closest('.single-model-search');
        container.addClass('success');
        setTimeout(() => {
            container.removeClass('success');
        }, 2000);
    });

    // ============================================
    // SEARCH BUTTON HANDLER
    // ============================================
    $('#search-button').click(function (e) {
        e.preventDefault();

        const make = $('#make-select').val();
        const model = $('#model-select').val();
        const price = $('#price-select').val();
        const form = $('#car-search-form');

        // Add validation classes
        form.addClass('was-validated');

        // Validate required fields
        if (!make || make === 'default') {
            alert('Please select a car make to search');
            $('#make-select').focus();
            return;
        }

        if (!model || model === 'default') {
            alert('Please select a car model to search');
            $('#model-select').focus();
            return;
        }

        if (!price || price === 'default') {
            alert('Please select a price range to search');
            $('#price-select').focus();
            return;
        }

        // Show loading state
        const $button = $(this);
        const originalText = $button.html();
        $button.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Searching...');

        // Simulate search delay then redirect
        setTimeout(() => {
            const queryString = `make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&price=${encodeURIComponent(price)}`;
            window.location.href = `search.html?${queryString}`;
        }, 1500);
    });

    // ============================================
    // CLEAR BUTTON HANDLER (if exists)
    // ============================================
    $('#clear-button').click(function () {
        // Reset all selects to default state
        $('#make-select').val('').trigger('change');
        $('#model-select').val('').prop('disabled', true);
        $('#price-select').val('');

        // Remove validation classes
        $('#car-search-form').removeClass('was-validated');

        // Hide any search results
        $('#searched-cars').hide();
    });

    // ============================================
    // FOCUS/BLUR EFFECTS
    // ============================================
    $('.form-control').focus(function () {
        $(this).closest('.single-model-search').addClass('loading');
    }).blur(function () {
        $(this).closest('.single-model-search').removeClass('loading');
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    $(document).keydown(function (e) {
        if (e.key === 'Enter' && $(e.target).is('select')) {
            e.preventDefault();
            const $current = $(e.target);
            const $nextSelect = $current.closest('.col-md-4').next('.col-md-4').find('select');

            if ($nextSelect.length && !$nextSelect.prop('disabled')) {
                $nextSelect.focus();
            } else {
                $('#search-button').focus();
            }
        }
    });
});

// ============================================
// SEARCH RESULTS PAGE LOGIC
// ============================================
$(document).ready(function () {
    // Only run search logic if we're on the search results page
    if (window.location.pathname.includes('search.html')) {
        initSearchResults();
    }
});

function initSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const make = params.get('make');
    const model = params.get('model');
    const price = params.get('price');

    // Validate search parameters
    if (!make || !model || !price) {
        displaySearchError('Please provide make, model, and price in the search query.');
        return;
    }

    // Show loading state
    showSearchLoading();

    // Build API URL
    // const apiUrl = `http://localhost:8080/api/v1/cars/search-by-make-model?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&price=${encodeURIComponent(price)}`;
    const apiUrl = `https://one.proclanmotors.co.ke/api/cars/v1/search-by-make-model/${make}/${model}/${price}`;

    console.log("API URL: ", apiUrl);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            hideSearchLoading();
            handleSearchResults(data);
        })
        .catch(error => {
            hideSearchLoading();
            console.error('Search error:', error);
            displaySearchError('Error fetching search results. Please try again later or check your connection.');
        });
}

function handleSearchResults(data) {
    console.log("API Response:", data);

    const cars = data.entity || data;

    if (!cars) {
        console.error("No car data found in response");
        displaySearchError('No data received from server');
        return;
    }

    if (Array.isArray(cars) && cars.length > 0) {
        console.log(`Found ${cars.length} cars to display`);
        displaySearchResults(cars);
    } else if (Array.isArray(cars) && cars.length === 0) {
        console.log("Empty cars array received");
        displayNoResults();
    } else {
        console.error("Invalid data format:", typeof cars, cars);
        displaySearchError('Invalid data format received');
    }
}

function displaySearchResults(cars) {
    console.log("displaySearchResults called with:", cars);
    console.log("Number of cars to display:", cars.length);

    // First, restore the container structure if it was replaced
    restoreContainerStructure();

    const container1 = document.getElementById('searched-cars-container');
    const container2 = document.getElementById('searched-cars-container-second');

    if (!container1) {
        console.error("Container 'searched-cars-container' not found after restore!");
        return;
    }
    if (!container2) {
        console.error("Container 'searched-cars-container-second' not found after restore!");
        return;
    }

    // Clear existing content
    container1.innerHTML = '';
    container2.innerHTML = '';

    cars.forEach((car, index) => {
        console.log(`Processing car ${index + 1}:`, car.make, car.model);

        try {
            const carCard = renderCarCard(car);

            if (index < 4) {
                container1.appendChild(carCard);
                console.log(`Car ${index + 1} added to first container`);
            } else {
                container2.appendChild(carCard);
                console.log(`Car ${index + 1} added to second container`);
            }
        } catch (error) {
            console.error(`Error rendering car ${index + 1}:`, error);
            console.error("Problem car data:", car);
        }
    });

    console.log(`Display complete: ${cars.length} cars processed`);
}

// NEW: Function to restore container structure
function restoreContainerStructure() {
    const searchContent = $('.searched-cars-content');

    // Check if containers are missing
    if (!document.getElementById('searched-cars-container')) {
        console.log("Restoring container structure...");
        searchContent.html(`
            <!-- First row of search results (max 4 cars) -->
            <div id="searched-cars-container" class="row">
                <!-- JS will populate this -->
            </div>

            <!-- Second row of search results (next 4 cars if available) -->
            <div id="searched-cars-container-second" class="row">
                <!-- JS will populate this -->
            </div>
        `);
    }
}

// FIXED: Show loading without removing containers
function showSearchLoading() {
    // Clear containers but keep them in DOM
    const container1 = document.getElementById('searched-cars-container');
    const container2 = document.getElementById('searched-cars-container-second');

    if (container1) container1.innerHTML = '';
    if (container2) container2.innerHTML = '';

    // Add loading message to first container
    if (container1) {
        container1.innerHTML = `
            <div class="col-12">
                <div class="text-center p-5">
                    <i class="fas fa-spinner fa-spin fs-1 text-primary mb-3"></i>
                    <p class="h5">Searching for your perfect car...</p>
                </div>
            </div>
        `;
    }
}

// FIXED: Show no results without removing containers
function displayNoResults() {
    restoreContainerStructure();

    const container1 = document.getElementById('searched-cars-container');
    const container2 = document.getElementById('searched-cars-container-second');

    if (container1) container1.innerHTML = '';
    if (container2) container2.innerHTML = '';

    if (container1) {
        container1.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning d-flex align-items-center gap-2 shadow-sm p-3 rounded" role="alert">
                    <i class="fas fa-exclamation-triangle fs-4 text-warning"></i>
                    <div class="fs-6">
                        No cars found matching your criteria. Try adjusting your search filters.
                    </div>
                </div>
            </div>
        `;
    }
}

// FIXED: Show error without removing containers
function displaySearchError(message) {
    restoreContainerStructure();

    const container1 = document.getElementById('searched-cars-container');
    const container2 = document.getElementById('searched-cars-container-second');

    if (container1) container1.innerHTML = '';
    if (container2) container2.innerHTML = '';

    if (container1) {
        container1.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger d-flex align-items-center gap-2 shadow-sm p-3 rounded" role="alert">
                    <i class="fas fa-times-circle fs-4 text-danger"></i>
                    <div class="fs-6">
                        ${message}
                    </div>
                </div>
            </div>
        `;
    }
}

function hideSearchLoading() {
    // Loading content will be replaced by results
    console.log("Hiding search loading...");
}

// Add the missing formatCurrency function
// function formatCurrency(amount) {
//     const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

//     if (isNaN(numAmount)) {
//         console.warn("Invalid price amount:", amount);
//         return 'KES 0';
//     }

//     return 'KES ' + numAmount.toLocaleString('en-US', {
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0
//     });
// }

// ============================================
// CAR CARD RENDERER (placeholder - implement based on your design)
// ============================================
// function renderCarCard(car) {
//     const cardElement = document.createElement('div');
//     cardElement.className = 'col-md-6 col-lg-4 mb-4';
//     cardElement.innerHTML = `
//         <div class="card h-100 shadow-sm">
//             <img src="${car.image || '/assets/images/default-car.jpg'}" class="card-img-top" alt="${car.make} ${car.model}">
//             <div class="card-body">
//                 <h5 class="card-title">${car.make} ${car.model}</h5>
//                 <p class="card-text text-muted">${car.year || 'N/A'}</p>
//                 <p class="card-text"><strong>KES ${car.price?.toLocaleString() || 'Contact for price'}</strong></p>
//             </div>
//             <div class="card-footer">
//                 <button class="btn btn-primary btn-sm">View Details</button>
//             </div>
//         </div>
//     `;
//     return cardElement;
// }
$(document).ready(function () {
    // Remove any Bootstrap 5 event handlers from navbar toggler
    $('.navbar-toggler').off('click');

    // Add proper Bootstrap 4 toggle functionality
    $('.navbar-toggler').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#navbar-menu').toggleClass('show');
    });

    // Optional: Close menu when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#navbar-menu').length &&
            !$(e.target).closest('.navbar-toggler').length) {
            $('#navbar-menu.show').collapse('hide');
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Bootstrap 5 components explicitly
    var navbarToggler = document.querySelector('.navbar-toggle');
    var navbarMenu = document.getElementById('navbar-menu');

    // Fix any potential issues with toggle functionality
    if (navbarToggler && navbarMenu) {
        // Clear any previous event listeners
        navbarToggler.removeEventListener('click', toggleNav);

        // Add event listener with proper handling
        navbarToggler.addEventListener('click', toggleNav);

        function toggleNav(e) {
            e.preventDefault();
            e.stopPropagation();

            // Use Bootstrap 5's collapse methods if available
            try {
                var bsCollapse = new bootstrap.Collapse(navbarMenu, {
                    toggle: true
                });
            } catch (error) {
                // Fallback toggle if Bootstrap 5 JS is not initialized properly
                navbarMenu.classList.toggle('show');
            }
        }
    }
});


