// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

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

// Change site name color only when header overlaps the contact section
const siteName = document.getElementById('site-name');
const contactSection = document.getElementById('contact');
const header = document.querySelector('header');

if (siteName && contactSection && header) {
    const defaultClass = 'text-teal-600';
    const overlapClass = 'text-white';

    function updateSiteNameColor() {
        const contactRect = contactSection.getBoundingClientRect();
        const headerHeight = header.offsetHeight;

        if (contactRect.top <= headerHeight && contactRect.bottom >= headerHeight) {
            siteName.classList.remove(defaultClass);
            siteName.classList.add(overlapClass);
        } else {
            siteName.classList.remove(overlapClass);
            siteName.classList.add(defaultClass);
        }
    }

    window.addEventListener('scroll', updateSiteNameColor);
    // Run on load in case user refreshes while on contact section
    updateSiteNameColor();
}

