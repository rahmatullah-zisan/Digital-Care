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

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'পাঠানো হচ্ছে...';
    formMessage.textContent = '';

    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
        .then(response => response.json())
        .then(data => {
            if(data.result === 'success') {
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

