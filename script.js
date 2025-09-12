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
  
})();