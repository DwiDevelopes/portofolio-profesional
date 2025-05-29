        // Portfolio images data
        const portfolioItems = [
            {
                title: "E-commerce Website",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "A fully responsive e-commerce platform with shopping cart functionality."
            },
            {
                title: "Mobile App UI",
                image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "Clean and intuitive mobile application user interface design."
            },
            {
                title: "Dashboard Design",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "Analytics dashboard with interactive charts and data visualization."
            },
            {
                title: "Brand Identity",
                image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "Complete brand identity package including logo and style guide."
            },
            {
                title: "Web Application",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "Custom web application built with React and Node.js."
            },
            {
                title: "Landing Page",
                image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                description: "High-conversion landing page for a SaaS product."
            }
        ];

        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contact-form');
            const changeBgBtn = document.getElementById('change-bg');
            const backgrounds = [
                document.getElementById('bg1'),
                document.getElementById('bg2'),
                document.getElementById('bg3')
            ];
            let currentBg = 0;
            
            // Initialize gallery
            const gallery = document.getElementById('portfolio-gallery');
            portfolioItems.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
                gallery.appendChild(galleryItem);
                
                // Add click event for modal
                galleryItem.addEventListener('click', function() {
                    openModal(item.image, item.title, item.description);
                });
            });
            
            // Initialize modal functionality
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const captionText = document.getElementById('caption');
            const closeBtn = document.getElementsByClassName('close')[0];
            
            function openModal(imageSrc, title, description) {
                modal.style.display = "block";
                modalImg.src = imageSrc;
                captionText.innerHTML = `<strong>${title}</strong><br>${description}`;
            }
            
            closeBtn.onclick = function() {
                modal.style.display = "none";
            }
            
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            
            // Change background image
            changeBgBtn.addEventListener('click', function(e) {
                e.preventDefault();
                changeBackground();
            });
            
            function changeBackground() {
                backgrounds[currentBg].classList.remove('active');
                currentBg = (currentBg + 1) % backgrounds.length;
                backgrounds[currentBg].classList.add('active');
            }
            
            // Contact form submission
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                clearErrors();
                
                const name = document.getElementById('contact-name').value;
                const email = document.getElementById('contact-email').value;
                const message = document.getElementById('contact-message').value;
                const btn = this.querySelector('.btn');
                
                if (!name) {
                    showError('contact-name-error', 'Name is required');
                    return;
                }
                
                if (!email) {
                    showError('contact-email-error', 'Email is required');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showError('contact-email-error', 'Please enter a valid email');
                    return;
                }
                
                if (!message) {
                    showError('contact-message-error', 'Message is required');
                    return;
                }
                
                // Show loading state
                btn.classList.add('loading');
                
                // Simulate form submission
                setTimeout(() => {
                    showSuccess('contact-success', 'Message sent successfully! I will get back to you soon.');
                    contactForm.reset();
                    btn.classList.remove('loading');
                }, 1500);
            });
            
            function showError(elementId, message) {
                const element = document.getElementById(elementId);
                element.textContent = message;
                element.style.display = 'block';
                
                const inputId = elementId.replace('-error', '');
                const input = document.getElementById(inputId);
                if (input) {
                    input.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error-color');
                }
            }
            
            function showSuccess(elementId, message) {
                const element = document.getElementById(elementId);
                element.textContent = message;
                element.style.display = 'block';
            }
            
            function clearErrors() {
                document.querySelectorAll('.error-message, .success-message').forEach(el => {
                    el.style.display = 'none';
                });
                
                document.querySelectorAll('.form-control').forEach(input => {
                    input.style.borderColor = '#ddd';
                });
            }
            
            function isValidEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            // Set fallback background images
            backgrounds[1].style.backgroundImage = 'url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
            backgrounds[2].style.backgroundImage = 'url("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
        });
