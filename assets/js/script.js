document.addEventListener('DOMContentLoaded', () => {
    console.log('RedReaperRun Website Loaded');

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Padding/Background effect
        if (scrollTop > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }

        // Hide/Show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past header
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-content, .member-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styles dynamically or in CSS
    // For simplicity, we'll handle the transition in JS callback by modifying styles directly 
    // or better, toggle a class. Let's toggle a class and add it to CSS in next step if needed.
    // Actually, let's just add the class logic here for now.

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Mobile Navigation
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Member Modal Functionality
    const modal = document.getElementById('memberModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const memberCards = document.querySelectorAll('.member-card');

    // Helper function to update stat visibility
    const updateStat = (elementId, value) => {
        const element = document.getElementById(elementId);
        const parent = element.parentElement; // .stat-item

        if (value && value !== '-' && value.trim() !== '') {
            element.textContent = value;
            parent.style.display = 'flex';
        } else {
            parent.style.display = 'none';
        }
    };

    // Open modal when clicking member card
    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.dataset.name;
            const username = card.dataset.username;
            const image = card.dataset.image;

            // Populate modal
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalUsername').textContent = username;
            document.getElementById('modalImage').src = image;

            // Update stats conditionally
            updateStat('stat800m', card.dataset['800m']);
            updateStat('stat1500m', card.dataset['1500m']);
            updateStat('stat3k', card.dataset['3k']);
            updateStat('stat5k', card.dataset['5k']);
            updateStat('stat10k', card.dataset['10k']);
            updateStat('statHalf', card.dataset.half);
            updateStat('statFull', card.dataset.full);

            // Show modal
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Gallery Carousel Functionality


    // Gallery Carousel Functionality 
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;
        let autoScrollInterval = null;   // ← กำหนดค่าเริ่มต้นให้ชัด

        const slideCount = carouselSlides.length;
        // Create indicator dots 
        // Create only 3 indicators: prev, current, next
        indicatorsContainer.innerHTML = `
    <div class="indicator indicator-prev"></div>
    <div class="indicator indicator-active active"></div>
    <div class="indicator indicator-next"></div>
`;



        // Update 3-dot indicator UI




        // Update carousel position 
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;


            // Update indicators 
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Go to specific slide 
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Next slide 
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }

        // Previous slide 
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        }

        // Auto scroll 
        function startAutoScroll() {
            stopAutoScroll(); // ← เคลียร์ interval เก่าก่อนทุกครั้ง
            autoScrollInterval = setInterval(nextSlide, 3000); // 3 วิ
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        // Event listeners 
        nextBtn.addEventListener('click', () => {
            nextSlide();
            //stopAutoScroll();
            //startAutoScroll();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            //stopAutoScroll();
            //startAutoScroll();
        });

        // Pause on hover 
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);

        // Touch/Swipe support for mobile 
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left 
                nextSlide();
                stopAutoScroll();
                startAutoScroll();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right 
                prevSlide();
                stopAutoScroll();
                startAutoScroll();
            }
        }

        // Start auto-scroll on page load 
        startAutoScroll();
    }

    // Event Modal Functionality
    const eventModal = document.getElementById('eventModal');
    const eventModalOverlay = eventModal.querySelector('.modal-overlay');
    const eventModalClose = eventModal.querySelector('.modal-close');
    const eventBtns = document.querySelectorAll('.event-btn');
    const eventModalTitle = document.getElementById('eventModalTitle');
    const athleteList = document.getElementById('athleteList');

    // Dummy Data for Events
    const eventData = {
        'bangsaen21': {
            title: 'Bangsaen 21',
            athletes: [
                { name: 'Copter', distance: '21.1 KM' },
                { name: 'Oil', distance: '21.1 KM' },
                { name: 'Mark', distance: '21.1 KM' },
                { name: 'Tes', distance: '21.1 KM' }
            ]
        },
        'buriram2025': {
            title: 'Buriram Marathon 2025',
            athletes: [
                { name: 'Arm', distance: '42.195 KM' },
                { name: 'Mart', distance: '21.1 KM' },
                { name: 'Khao', distance: '10 KM' }
            ]
        },
        'amazingthailand': {
            title: 'Amazing Thailand Marathon',
            athletes: [
                { name: 'Khet', distance: '42.195 KM' },
                { name: 'Am', distance: '10 KM' },
                { name: 'Potter', distance: '10 KM' },
                { name: 'Segram', distance: '21.1 KM' },
                { name: 'Four', distance: '42.195 KM' },
                { name: 'Frank', distance: '21.1 KM' },
                { name: 'Ball', distance: '10 KM' }
            ]
        }
    };

    function openEventModal(eventId) {
        const data = eventData[eventId];
        if (!data) return;

        eventModalTitle.textContent = data.title;
        athleteList.innerHTML = ''; // Clear previous list

        data.athletes.forEach(athlete => {
            const li = document.createElement('li');
            li.className = 'athlete-item';
            li.innerHTML = `
                <span class="athlete-name">${athlete.name}</span>
                <span class="athlete-distance">${athlete.distance}</span>
            `;
            athleteList.appendChild(li);
        });

        eventModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeEventModal() {
        eventModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    eventBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const eventId = btn.dataset.eventId;
            openEventModal(eventId);
        });
    });

    eventModalClose.addEventListener('click', closeEventModal);
    eventModalOverlay.addEventListener('click', closeEventModal);

    // Close on ESC (shared with member modal)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (eventModal.classList.contains('active')) closeEventModal();
        }
    });

});
