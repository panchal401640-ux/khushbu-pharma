document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contactForm');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans.forEach(span => span.style.cssText = '');
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showSuccess('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      showSuccess('Unable to send message. Please email us directly at info@companyname.com', true);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showSuccess(message, isError = false) {
    let successDiv = document.querySelector('.form-success');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      contactForm.prepend(successDiv);
    }
    successDiv.textContent = message;
    successDiv.style.background = isError ? '#fef2f2' : '#dcfce7';
    successDiv.style.color = isError ? '#991b1b' : '#166534';
    successDiv.classList.add('show');
    
    setTimeout(() => successDiv.classList.remove('show'), 5000);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});