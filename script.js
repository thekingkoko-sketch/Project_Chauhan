(function() {
  // Navbar active link highlighting on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".fixed-nav ul li a");

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}

    navLinks.forEach(link => link.classList.remove("active"));
    if(navLinks[index]) navLinks[index].classList.add("active");
  }

  // Only run if on the index page with sections
  if (sections.length > 0) {
    changeActiveLink();
    window.addEventListener("scroll", changeActiveLink);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          const messageDiv = document.getElementById('contactMessage');
          messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
          contactForm.reset();
      });
  }


  // --- Booking Form Logic ---
  const bookingForm = document.getElementById('bookingForm');
  const checkinInput = document.querySelector('input[name="checkin"]');
  const checkoutInput = document.querySelector('input[name="checkout"]');
  const roomSelect = document.querySelector('select[name="room"]');
  const totalPriceDiv = document.getElementById('totalPrice');

  // Room prices per night
  const roomPrices = {
    deluxe: 150,
    suite: 250,
    family: 200
  };

  function updateTotalPrice() {
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    const roomType = roomSelect.value;

    if (checkinDate && checkoutDate && roomType) {
      const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
      const nightDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (nightDifference > 0) {
        const pricePerNight = roomPrices[roomType];
        const totalPrice = pricePerNight * nightDifference;
        totalPriceDiv.textContent = `Total: $${totalPrice}`;
      } else {
        totalPriceDiv.textContent = 'Total: $0';
      }
    } else {
      totalPriceDiv.textContent = 'Total: $0';
    }
  }

  // Event listeners for form fields to update price dynamically
  if (checkinInput) checkinInput.addEventListener('change', updateTotalPrice);
  if (checkoutInput) checkoutInput.addEventListener('change', updateTotalPrice);
  if (roomSelect) roomSelect.addEventListener('change', updateTotalPrice);
  
  // --- Dynamic Room Detail Logic ---
  const roomsContainer = document.querySelector('#rooms');
  const roomDetailsContainer = document.querySelector('#room-details-container');

  const roomDetails = {
    deluxe: {
        title: "Deluxe Room",
        price: "$150 / night",
        image: "images/room1.jpg",
        description1: "A beautifully designed room featuring rich traditional decor, ornate archways, and elegant wood furnishings. Enjoy a spacious king-size bed with classic Indian motifs, warm ambient lighting, and a touch of royal charm — ideal for guests seeking comfort and heritage ambiance.",
        description2: "This room is a perfect blend of luxury and tradition, offering a peaceful and opulent retreat. It comes equipped with all modern amenities to ensure a comfortable stay.",
        amenities: ["King-size bed", "Air conditioning", "High-speed Wi-Fi", "24-hour room service", "Mini-bar", "Luxury toiletries", "Tea & coffee maker"]
    },
    suite: {
        title: "Executive Suite",
        price: "$250 / night",
        image: "images/room2.jpg",
        description1: "Experience lavishness in this majestic suite, adorned with intricate gold accents, grand chandeliers, and plush lounge seating. The room combines artistry with luxury — a regal four-poster bed sits at the center, flanked by mirrored alcoves and sophisticated décor, providing an authentic palace feel for an extraordinary stay.",
        description2: "This spacious and elegant suite is designed for guests who desire ultimate luxury. It offers a separate sitting area and breathtaking views, making it ideal for a memorable and opulent retreat.",
        amenities: ["Four-poster king-size bed", "Separate living area", "Air conditioning", "High-speed Wi-Fi", "24-hour room service", "Fully stocked mini-bar", "Luxury toiletries and bathrobes", "Tea & coffee maker"]
    },
    family: {
        title: "Family Room",
        price: "$200 / night",
        image: "images/room3.jpg",
        description1: "Step into a vibrant and opulent space set within a high-ceilinged hall, decorated with colorful tapestries, carved pillars, and sumptuous velvet seating. This spacious family suite offers classic royal furnishings, ample natural light from large windows, and a richly patterned carpet — a perfect blend of splendor and comfort for families.",
        description2: "This large, inviting room provides a comfortable and luxurious space for families traveling together. It includes multiple sleeping arrangements and a cozy seating area, ensuring everyone has enough space to relax.",
        amenities: ["Two queen-size beds", "Air conditioning", "High-speed Wi-Fi", "24-hour room service", "Child-friendly mini-bar", "Tea & coffee maker", "Spacious seating area"]
    }
  };

  roomsContainer.addEventListener('click', function(e) {
    const card = e.target.closest('.room-card');
    if (card) {
      const roomType = card.dataset.room;
      const roomData = roomDetails[roomType];
      if (roomData) {
        const amenitiesList = roomData.amenities.map(item => `<li>${item}</li>`).join('');
        const htmlContent = `
            <section class="room-detail">
                <div class="room-detail-header">
                    <img src="${roomData.image}" alt="${roomData.title}" class="room-detail-img" />
                    <h1>${roomData.title}</h1>
                    <p class="price-detail">${roomData.price}</p>
                </div>
                <div class="room-detail-content">
                    <div class="room-description">
                        <p>${roomData.description1}</p>
                        <p>${roomData.description2}</p>
                    </div>
                    <div class="room-amenities">
                        <h3>Amenities</h3>
                        <ul>
                            ${amenitiesList}
                        </ul>
                    </div>
                </div>
                <a href="#booking" class="book-now-btn cta-button">Book This Room</a>
            </section>
        `;
        roomDetailsContainer.innerHTML = htmlContent;
        roomDetailsContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
})();