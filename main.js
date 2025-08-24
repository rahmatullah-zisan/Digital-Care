// Set initial theme

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize smooth scrolling and animations
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');
    const desktopMenu = nav ? nav.querySelector('.md\\:flex') : null;
    const mobileMenu = document.getElementById('mobile-menu');

    function updateToggleIcon(btn) {
        if (!btn) return;
        btn.innerHTML = document.documentElement.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateToggleIcon(desktopToggle);
        updateToggleIcon(mobileToggle);
    }

    let desktopToggle;
    if (desktopMenu) {
        desktopToggle = document.createElement('button');
        desktopToggle.id = 'theme-toggle';
        desktopToggle.className = 'ml-4 text-gray-600 hover:text-teal-600';
        desktopMenu.appendChild(desktopToggle);
        desktopToggle.addEventListener('click', toggleTheme);
    }

    let mobileToggle;
    if (mobileMenu) {
        mobileToggle = document.createElement('button');
        mobileToggle.className = 'block text-gray-600 hover:text-teal-600';
        mobileMenu.appendChild(mobileToggle);
        mobileToggle.addEventListener('click', toggleTheme);
    }

    updateToggleIcon(desktopToggle);
    updateToggleIcon(mobileToggle);

    // Lenis smooth scrolling
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP hero text animation
    if (typeof gsap !== 'undefined') {
        gsap.from('#hero-title', { opacity: 0, y: 50, duration: 1 });
    }

    // Lottie animation setup
    if (typeof lottie !== 'undefined' && document.getElementById('hero-animation')) {
        const heroAnimation = document.getElementById('hero-animation');
        const animation = lottie.loadAnimation({
            container: heroAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets7.lottiefiles.com/packages/lf20_jcikwtux.json'
        });

        animation.addEventListener('DOMLoaded', () => {
            heroAnimation.classList.remove('hidden');
        });
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', (!expanded).toString());
    mobileMenu.classList.toggle('hidden');
});

// FAQ Accordion
const faqButtons = document.querySelectorAll('#faq button');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');

        content.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Contact Form Submission Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwYe6g5vR8bkpk-I9TZ2_ny18LK943kKjBTd0RiSuL-roumoF4U-pj2_x2fGazBxxhB/exec'; // এখানে আপনার ডেপ্লয় করা Web App URL টি পেস্ট করুন

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'পাঠানো হচ্ছে...';
        formMessage.textContent = '';

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formMessage.textContent = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    throw new Error('Something went wrong. Server response: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.textContent = 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
                formMessage.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'বার্তা পাঠান';
            });
    });
}

// Order Modal Logic
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const orderButtons = document.querySelectorAll('.order-btn');
const packageNameInput = document.getElementById('package-name');
const orderForm = document.getElementById('order-form');
const orderFormMessage = document.getElementById('order-form-message');

// Open modal when any order button is clicked
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageName = button.getAttribute('data-package');
        if (packageNameInput) {
            packageNameInput.value = packageName; // Set package name in the hidden input
        }
        if (orderModal) {
            orderModal.classList.remove('hidden');
        }
    });
});

// Close modal
if (closeModalBtn && orderModal) {
    closeModalBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    // Close modal if clicked outside the form
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.add('hidden');
        }
    });
}

// Order Form Submission Handler
if (orderForm) {
    orderForm.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = orderForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'পাঠানো হচ্ছে...';
        orderFormMessage.textContent = '';

        // The same scriptURL can be used
        fetch(scriptURL, { method: 'POST', body: new FormData(orderForm) })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    orderFormMessage.textContent = 'আপনার অর্ডার সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।';
                    orderFormMessage.style.color = 'green';
                    orderForm.reset();
                    setTimeout(() => {
                        orderModal.classList.add('hidden');
                    }, 3000); // Close modal after 3 seconds
                } else {
                    throw new Error('Server response error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                orderFormMessage.textContent = 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
                orderFormMessage.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'অর্ডার কনফার্ম করুন';
            });
    });
}

// Change site name color when header overlaps teal sections or the footer
const siteName = document.getElementById('site-name');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const tealSections = document.querySelectorAll('section[class*="bg-teal"], footer[class*="bg-teal"]');

if (siteName && header) {
    const defaultClass = 'text-teal-600';
    const overlapClass = 'text-white';

    function updateSiteNameColor() {
        const headerHeight = header.offsetHeight;
        let isOverlapping = false;

        tealSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < headerHeight && rect.bottom > 0) {
                isOverlapping = true;
            }
        });

        if (!isOverlapping && footer) {
            const footerRect = footer.getBoundingClientRect();
            if (footerRect.top < headerHeight && footerRect.bottom > 0) {
                isOverlapping = true;
            }
        }

        if (isOverlapping) {
            siteName.classList.remove(defaultClass);
            siteName.classList.add(overlapClass);
        } else {
            siteName.classList.remove(overlapClass);
            siteName.classList.add(defaultClass);
        }
    }

    window.addEventListener('scroll', updateSiteNameColor);
    // Run on load in case user refreshes while on a teal section or footer
    updateSiteNameColor();
}

// Dynamic industry text flip on homepage
const industryText = document.getElementById('industry-text');
if (industryText) {
    const words = ['ব্যবসার', 'রিসোর্টের', 'হাসপাতালের', 'ই-কমার্সের'];
    let index = 0;
    setInterval(() => {
        industryText.classList.add('flip');
        setTimeout(() => {
            index = (index + 1) % words.length;
            industryText.textContent = words[index];
            industryText.classList.remove('flip');
        }, 600);
    }, 2000);
}

// Scroll Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("is-visible");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("is-visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
            // Optional: To hide the element again when it goes out of view
            // else {
            //     hideScrollElement(el);
            // }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Trigger on load
    handleScrollAnimation();
});
