// Car rental data
const WHATSAPP_NUMBER = "60178355503";

const cars = [
    { name: "Proton Saga 1.3", daily: 130, package3: 370, units: 3, category: "economy", seats: 5 },
    { name: "Proton Persona 1.6", daily: 140, package3: 400, units: 1, category: "economy", seats: 5 },
    { name: "Perodua Bezza 1.3", daily: 140, package3: 400, units: 3, category: "economy", seats: 5 },
    { name: "Honda City 1.5", daily: 200, package3: 540, units: 2, category: "sedan", seats: 5 },
    { name: "Toyota Vios 1.5", daily: 200, package3: 540, units: 2, category: "sedan", seats: 5 },
    { name: "Perodua Alza", daily: 200, package3: 570, units: 3, category: "mpv", seats: 7 },
    { name: "Mitsubishi Xpander", daily: 220, package3: 600, units: 3, category: "mpv", seats: 7 },
    { name: "Proton X90", daily: 380, package3: 1100, units: 1, category: "suv", seats: 7 },
    { name: "Toyota Fortuner", daily: 480, package3: 1350, units: 1, category: "suv", seats: 7 },
    { name: "Hyundai Staria", daily: 550, package3: 1570, units: 3, category: "premium", seats: 11 },
    { name: "Hyundai Starex", daily: 550, package3: 1570, units: 2, category: "premium", seats: 11 },
    { name: "Toyota Vellfire", daily: 750, package3: 2200, units: 1, category: "premium", seats: 7 },
    { name: "Toyota Alphard", daily: 800, package3: 2300, units: 1, category: "premium", seats: 7 },
];

// Utility functions
const formatRM = (amount) => `RM ${amount.toLocaleString()}`;

const buildWhatsAppUrl = (message) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const calculatePrice = (car, days) => {
    if (!car || days <= 0) return null;
    if (days >= 3) {
        return car.package3 + Math.max(0, days - 3) * car.daily;
    }
    return days * car.daily;
};

// DOM elements
let selectedCar = cars[0];
let selectedDays = 3;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFleet();
    initializeBookingForm();
    initializeEventListeners();
    updateCurrentYear();
});

// Initialize fleet section
function initializeFleet() {
    const carsGrid = document.getElementById('carsGrid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    // Render all cars initially
    renderCars(cars);
    
    // Add filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cars
            const filter = tab.dataset.filter;
            const filteredCars = filter === 'all' ? cars : cars.filter(car => car.category === filter);
            renderCars(filteredCars);
        });
    });
}

// Render cars in the grid
function renderCars(carsToRender) {
    const carsGrid = document.getElementById('carsGrid');
    
    carsGrid.innerHTML = carsToRender.map(car => `
        <div class="car-card" data-category="${car.category}">
            <div class="car-header">
                <div>
                    <span class="car-category ${car.category}">${car.category}</span>
                    <h3 class="car-name">${car.name}</h3>
                    <p class="car-details">${car.seats} seats • ${car.units} unit${car.units > 1 ? 's' : ''}</p>
                </div>
            </div>
            
            <div class="car-pricing">
                <div class="price-box">
                    <div class="price-label">Daily</div>
                    <div class="price-value">${formatRM(car.daily)}</div>
                </div>
                <div class="price-box">
                    <div class="price-label">3+ Days</div>
                    <div class="price-value">${formatRM(car.package3)}</div>
                </div>
            </div>
            
            <div class="car-actions">
                <button class="btn btn-ghost select-car-btn" data-car="${car.name}">Select</button>
                <a href="${buildWhatsAppUrl(`Hi! I want to book ${car.name}.\\nDates: -\\nPickup: -\\nThank you!`)}" 
                   target="_blank" class="btn btn-primary">WhatsApp</a>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to select buttons
    document.querySelectorAll('.select-car-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carName = e.target.dataset.car;
            selectedCar = cars.find(car => car.name === carName);
            selectedDays = 3;
            
            // Update form
            document.getElementById('carSelect').value = carName;
            document.getElementById('daysInput').value = 3;
            updatePriceEstimate();
            
            // Scroll to booking form
            document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize booking form
function initializeBookingForm() {
    const carSelect = document.getElementById('carSelect');
    const daysInput = document.getElementById('daysInput');
    
    // Populate car select
    carSelect.innerHTML = cars.map(car => 
        `<option value="${car.name}">${car.name} - ${formatRM(car.daily)}/day</option>`
    ).join('');
    
    // Set initial values
    carSelect.value = selectedCar.name;
    daysInput.value = selectedDays;
    
    // Add event listeners for price updates
    const formInputs = ['carSelect', 'daysInput', 'startDate', 'endDate', 'pickupInput', 'dropoffInput', 'notesInput'];
    formInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePriceEstimate);
            element.addEventListener('change', updatePriceEstimate);
        }
    });
    
    // Initial price update
    updatePriceEstimate();
}

// Update price estimate
function updatePriceEstimate() {
    const carName = document.getElementById('carSelect').value;
    const days = parseInt(document.getElementById('daysInput').value) || 0;
    
    selectedCar = cars.find(car => car.name === carName);
    selectedDays = days;
    
    const price = calculatePrice(selectedCar, days);
    const priceEstimate = document.getElementById('priceEstimate');
    const priceValue = document.getElementById('priceValue');
    const daysNote = document.getElementById('daysNote');
    
    if (price && days > 0) {
        priceEstimate.style.display = 'block';
        priceValue.textContent = formatRM(price);
        daysNote.textContent = `${days} day${days > 1 ? 's' : ''}`;
    } else {
        priceEstimate.style.display = 'none';
    }
}

// Build booking message
function buildBookingMessage() {
    const carName = document.getElementById('carSelect').value;
    const days = document.getElementById('daysInput').value;
    const startDate = document.getElementById('startDate').value || '-';
    const endDate = document.getElementById('endDate').value || '-';
    const pickup = document.getElementById('pickupInput').value || '-';
    const dropoff = document.getElementById('dropoffInput').value || '-';
    const notes = document.getElementById('notesInput').value;
    
    const car = cars.find(c => c.name === carName);
    const price = calculatePrice(car, parseInt(days));
    
    let message = [
        "Hi! I'd like to book a car rental in Kota Kinabalu.",
        `Car: ${carName}`,
        `Days: ${days}`,
        `Start: ${startDate}`,
        `End: ${endDate}`,
        `Pickup: ${pickup}`,
        `Drop-off: ${dropoff}`
    ];
    
    if (notes.trim()) {
        message.push(`Notes: ${notes}`);
    }
    
    if (price) {
        message.push(`Estimated: ${formatRM(price)} (subject to confirmation)`);
    }
    
    message.push("Thank you!");
    
    return message.join('\n');
}

// Initialize event listeners
function initializeEventListeners() {
    // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const message = buildBookingMessage();
        window.open(buildWhatsAppUrl(message), '_blank');
    });
    
    // Copy message button
    document.getElementById('copyBtn').addEventListener('click', async () => {
        const message = buildBookingMessage();
        try {
            await navigator.clipboard.writeText(message);
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy message:', err);
        }
    });
    
    // Direct WhatsApp links
    const directWhatsApp = document.getElementById('directWhatsApp');
    const ctaWhatsApp = document.getElementById('ctaWhatsApp');
    
    const directMessage = "Hi! I want to rent a car in Kota Kinabalu. Please share availability.";
    
    if (directWhatsApp) {
        directWhatsApp.href = buildWhatsAppUrl(directMessage);
    }
    
    if (ctaWhatsApp) {
        ctaWhatsApp.href = buildWhatsAppUrl(directMessage);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Add some interactive animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.car-card, .step, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after page load
window.addEventListener('load', addScrollAnimations);