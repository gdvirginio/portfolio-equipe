// JavaScript for IA Mostra

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const quoteBoxQuote = document.querySelector('#quote-box blockquote p');
const quoteBoxFooter = document.querySelector('#quote-box blockquote footer');
const contactForm = document.getElementById('contactForm');

// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    updateThemeButton(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Update button icon/text based on current theme
function updateThemeButton(theme) {
    if (theme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i> Modo Claro';
        themeToggleBtn.className = 'btn btn-outline-light me-2';
    } else {
        themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i> Modo Escuro';
        themeToggleBtn.className = 'btn btn-outline-dark me-2';
    }
}

// Initialize theme based on saved preference or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', theme);
    updateThemeButton(theme);
}

// Active Link Indicator for Scroll (Home Page)
function updateActiveLinkOnScroll() {
    // Only run on home page
    if (!document.getElementById('introducao')) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';

    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 10; // Account for navbar and small offset
        const sectionHeight = section.offsetHeight;
        const pageYOffset = window.pageYOffset;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Active Link Indicator for Page Load (Member Pages)
function setActiveLinkOnLoad() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage.includes('membro') && href.includes(currentPage))) {
            link.classList.add('active');
        }
    });
}

// Form Validation and Submission
function initForm() {
    if (!contactForm) return;

    // Bootstrap validation on submit with fetch
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent actual submit
        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }

        // If valid, send via fetch
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            if (response.ok) {
                // Show success message
                showAlert('Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                // Remove validation styling from inputs
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            showAlert('Falha ao enviar a mensagem. Tente novamente mais tarde.', 'danger');
        }
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
}

// Function to show temporary alert above the form
function showAlert(message, type) {
    // Remove any existing alert
    const existingAlert = contactForm.parentElement.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    // Insert alert before the form
    contactForm.parentElement.insertBefore(alertDiv, contactForm);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Fetch Quote from local array (to avoid API issues)
function fetchQuote() {
    const quotes = [
        { content: "A inteligência artificial é a nova eletricidade.", author: "Andrew Ng" },
        { content: "O ponto não é construir inteligência artificial, mas sim construir uma inteligência que trabalhe para nós.", author: "Fei-Fei Li" },
        { content: "A IA não vai substituir os humanos, mas os humanos que usam IA irão substituir aqueles que não usam.", author: "Thomas Davenport" },
        { content: "O maior perigo da inteligência artificial é que as pessoas concluam cedo demais que entendem.", author: "Eliezer Yudkowsky" },
        { content: "Aprendizado de máquina é a ideia de que existem regras genéricas que podem aprender a resolver problemas a partir de dados.", author: "Pedro Domingos" },
        { content: "A inteligência artificial está chegando, e está chegando mais rápido do que a maioria espera.", author: "Steve Jurvetson" },
        { content: "Não tememos a inteligência artificial, tememos o que os humanos farão com ela.", author: "Grady Booch" },
        { content: "A inteligência artificial é a ciência de fazer máquinas fazerem coisas que exigiriam inteligência se feitas por homens.", author: "Marvin Minsky" },
        { content: "O objetivo da inteligência artificial é criar máquinas que possam aprender, resolver problemas e tomar decisões.", author: "Nils Nilsson" },
        { content: "A IA é o novo eletrodoméstico: vai estar em todo lugar.", author: "Ginni Rometty" }
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteBoxQuote.textContent = `"${quote.content}"`;
    quoteBoxFooter.textContent = `— ${quote.author}`;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setActiveLinkOnLoad();
    initForm(); // Changed from initFormValidation

    // Fetch quote once on home page load (changes on every refresh due to cache buster)
    if (document.getElementById('introducao')) {
        fetchQuote();
        // Scroll listener for active link
        window.addEventListener('scroll', updateActiveLinkOnScroll);
        // Trigger once in case page loads mid-section
        updateActiveLinkOnScroll();
    }

    // Theme toggle listener
    themeToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
    });
});

// Handle visibility changes to pause quote when tab is hidden (not needed now since no interval)
// document.addEventListener('visibilitychange', function() {
//     if (document.hidden) {
//         stopQuoteRotation();
//     } else if (document.getElementById('introducao')) {
//         startQuoteRotation();
//     }
// });