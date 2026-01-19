// ===== TAB NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize - hide all tabs except the active one
    tabContents.forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        }
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            
            if (targetContent) {
                targetContent.style.display = 'block';
                void targetContent.offsetWidth;
                targetContent.classList.add('active');
            }

            // Scroll to top of content area
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                contentArea.scrollTop = 0;
            }
        });
    });

    // ===== HORIZONTAL SCROLL SETUP =====
    const clientsScroll = document.querySelector('.clients-scroll');
    if (clientsScroll) {
        setupHorizontalScroll(clientsScroll);
    }

    // ===== PORTFOLIO PROJECT MODAL =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projectModal = document.getElementById('projectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectModalOverlay = document.querySelector('.project-modal-overlay');

    // Portfolio project data
    const projectData = {
        webapp: {
            title: 'Web Application Development',
            description: 'Developed a comprehensive web application using modern technologies and best practices. The project involved creating a responsive, user-friendly interface with robust backend functionality to handle complex business logic and data management.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
            github: '#',
            live: '#',
            images: [
                'portfolio/web1.png',
                'portfolio/web2.png',
                'portfolio/web3.png',
                'portfolio/web4.png'
            ]
        },
        graphics: {
            title: 'Interactive Computer Graphics',
            description: 'Created an interactive 3D graphics application showcasing advanced rendering techniques, real-time animations, and user interactions. Implemented using WebGL and Three.js to deliver stunning visual experiences directly in the browser.',
            technologies: ['WebGL', 'C++', 'Blender', 'GLSL'],
            github: '#',
            live: '#',
            images: [
                'portfolio/cgi1.png',
                'portfolio/cgi2.png',
                'portfolio/cgi3.png',
                'portfolio/cgi4.png'
            ]
        },
        gameplay: {
            title: 'Game Development Project',
            description: 'Designed and developed an engaging gameplay experience using Unity game engine. Focused on player mechanics, level design, and creating an immersive gaming environment with smooth controls and challenging objectives.',
            technologies: ['Unity', 'C#', 'Blender', 'Photoshop', 'Game Design'],
            github: '#',
            live: '#',
            images: [
                'portfolio/gp1.png',
                'portfolio/gp2.png',
                'portfolio/gp3.png',
                'portfolio/gp4.png',
                'portfolio/gp5.png'
            ]
        },
        database: {
            title: 'Database Management System',
            description: 'Built a comprehensive database management system for efficient data storage, retrieval, and analysis. Implemented complex SQL queries, optimized database performance, and created intuitive interfaces for data manipulation.',
            technologies: ['MySQL', 'SQL', 'PHP', 'Data Modeling'],
            github: '#',
            live: '#',
            images: [
                'portfolio/db1.png',
                'portfolio/db2.png',
                'portfolio/db3.png',
                'portfolio/db4.png'
            ]
        }
    };

    // Open portfolio project modal
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectType = item.getAttribute('data-project');
            const data = projectData[projectType];

            if (data && projectModal) {
                // Update modal content
                document.getElementById('projectTitle').textContent = data.title;
                document.getElementById('projectDate').textContent = data.date;
                document.getElementById('projectDescription').textContent = data.description;

                // Add technologies
                const techContainer = document.getElementById('projectTech');
                if (techContainer) {
                    techContainer.innerHTML = data.technologies.map(tech => 
                        `<span class="tech-badge">${tech}</span>`
                    ).join('');
                }

                // Add links
                const linksContainer = document.getElementById('projectLinks');
                if (linksContainer) {
                    linksContainer.innerHTML = `
                        <a href="${data.github}" class="project-link-btn" target="_blank">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                        <a href="${data.live}" class="project-link-btn secondary" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    `;
                }

                // Add images to gallery
                const gallery = document.getElementById('projectGallery');
                if (gallery) {
                    gallery.innerHTML = data.images.map((imgSrc, index) => `
                        <div class="project-gallery-item" data-index="${index}">
                            <img src="${imgSrc}" alt="Project Image ${index + 1}" 
                                 onerror="this.src='https://via.placeholder.com/800x600/10B981/0a0a0a?text=Project+Image+${index + 1}'">
                        </div>
                    `).join('');

                    // Add click handlers to gallery items
                    gallery.querySelectorAll('.project-gallery-item').forEach((item, idx) => {
                        item.addEventListener('click', () => openLightbox(data.images, idx));
                    });
                }

                // Show modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close portfolio project modal
    if (projectModalClose) {
        projectModalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (projectModalOverlay) {
        projectModalOverlay.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===== WORKSHOP MODAL WITH VIDEO SUPPORT =====
    const workshopCards = document.querySelectorAll('.workshop-card');
    const workshopModal = document.getElementById('workshopModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const workshopModalOverlay = document.querySelector('.workshop-modal-overlay');

    // Workshop data with images and videos
    const workshopData = {
        storyboard: {
            title: 'Storyboard & Script Development',
            date: 'Pre-Production',
            description: 'Created detailed storyboards and written scripts to plan scene flow, camera angles, transitions, and narrative structure for video and multimedia projects.',
            images: [
                'workshop/storyboard.png',
                'workshop/script.png'
            ],
        },
        merchandise: {
            title: 'Merchandise & Poster Design',
            date: 'Design Phase',
            description: 'Designed creative merchandise including stickers, tote bags, button badges, and promotional posters using Adobe Illustrator and Photoshop.',
            images: [
                'workshop/poster.png',
                'workshop/logo.jpg',
                'workshop/tote bag.png',
                'workshop/Button badge.png',
                'workshop/sticker.jpg',
                'workshop/baju.png'
            ],
        },
        youtube: {
            title: 'Thumbnail Design & YouTube Integration',
            date: 'Publishing',
            description: 'Created engaging YouTube thumbnails and embedded video links to improve visual appeal and audience engagement for published content.',
            images: [
                'workshop/thumbnail.jpg',
                'workshop/teaser.mp4'
            ],
        },
        showcase: {
            title: 'Showcase & Behind The Scenes',
            date: 'Documentation',
            description: 'Captured and organized behind-the-scenes photos and project showcase images to document the creative process and final production results.',
            images: [
                'workshop/bts1.jpg',
                'workshop/bts2.jpg',
                'workshop/bts3.jpg',
                'workshop/bts4.jpg',
                'workshop/sc1.jpg',
                'workshop/sc2.jpg',
                'workshop/sc3.jpg',
                'workshop/sc4.jpg'
            ],
        },
        editing: {
            title: 'Editing & Visual Effects (VFX)',
            date: 'Post-Production',
            description: 'Edited video footage and applied visual effects, color grading, transitions, and motion graphics using Adobe Premiere Pro and After Effects.',
            images: [
                'workshop/vfx1.png',
                'workshop/vfx2.png',
                'workshop/vfx3.png',
                'workshop/vfx4.png'
            ],
        },

    document: {
        title: 'PDF & LOGBOOK',
        date: 'Documentation',
        description: 'Project documentation, reports, and logbooks in PDF format for reference and archival purposes.',
        pdfs: [
            {
                name: 'LOGBOOK',
                url: 'workshop/B032310573%20Workshop%202%20Logbook.pdf',
                size: '2.5 MB',
                description: 'A detailed, chronological record of project activities, feedback supervisor, and progress.'
            },
        ],
        images: [] // Keep this for compatibility
    }
};

    // Open workshop modal
workshopCards.forEach(card => {
    const viewGalleryBtn = card.querySelector('.view-gallery-btn');
    
    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const workshopType = card.getAttribute('data-workshop');
            const data = workshopData[workshopType];
            
            if (data && workshopModal) {
                // Update modal content
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalDate').textContent = data.date;
                document.getElementById('modalDescription').textContent = data.description;
                
                const gallery = document.getElementById('workshopGallery');
                
                if (gallery) {
                    // Check if this workshop has PDFs
                    if (data.pdfs && data.pdfs.length > 0) {
                        // Render PDF documents
                        gallery.innerHTML = data.pdfs.map((pdf, index) => `
                            <div class="pdf-document-card" data-index="${index}">
                                <div class="pdf-icon-container">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="pdf-info">
                                    <h4 class="pdf-name">${pdf.name}</h4>
                                    <p class="pdf-description">${pdf.description}</p>
                                    <div class="pdf-meta">
                                        <span class="pdf-size"><i class="fas fa-hdd"></i> ${pdf.size}</span>
                                    </div>
                                </div>
                                <div class="pdf-actions">
                                    <button class="pdf-btn pdf-view-btn" onclick="viewPDF('${pdf.url}')">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    <a href="${pdf.url}" download class="pdf-btn pdf-download-btn">
                                        <i class="fas fa-download"></i> Download
                                    </a>
                                </div>
                            </div>
                        `).join('');
                    } else {
                        // Render images/videos (existing functionality)
                        const mediaList = data.media || (data.images || []).map(src => ({
                            type: src.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
                            src
                        }));

                        gallery.innerHTML = mediaList.map((item, index) => {
                            if (item.type === "video") {
                                return `
                                    <div class="gallery-item video-item" data-index="${index}">
                                        <video src="${item.src}" controls preload="metadata" style="width: 100%; height: 100%; border-radius: 12px;"></video>
                                    </div>
                                `;
                            } else {
                                return `
                                    <div class="gallery-item" data-index="${index}">
                                        <img src="${item.src}" alt="Media ${index + 1}"
                                             onerror="this.src='https://via.placeholder.com/800x600/10B981/0a0a0a?text=Media+${index + 1}'">
                                        <div class="gallery-item-overlay">
                                            <i class="fas fa-search-plus"></i>
                                        </div>
                                    </div>
                                `;
                            }
                        }).join('');

                        // Click handlers for images only
                        gallery.querySelectorAll('.gallery-item:not(.video-item)').forEach((item) => {
                            const imageItems = mediaList.filter(m => m.type === "image");
                            const actualIndex = Array.from(gallery.querySelectorAll('.gallery-item:not(.video-item)')).indexOf(item);
                            
                            item.addEventListener('click', () => {
                                openLightbox(imageItems.map(m => m.src), actualIndex);
                            });
                        });
                    }
                }

                // Show modal
                workshopModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            
     

                    // Reset to images tab
                    const tabs = workshopModal.querySelectorAll('.workshop-tab');
                    const contents = workshopModal.querySelectorAll('.workshop-content');
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));
                    if (tabs[0]) tabs[0].classList.add('active');
                    if (contents[0]) contents[0].classList.add('active');
                }
            });
        }
    });

    // ===== PDF VIEWER FUNCTION =====
function viewPDF(url) {
    // Open PDF in new tab
    window.open(url, '_blank');
}


    // Workshop tab switching
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('workshop-tab')) {
            const contentType = e.target.getAttribute('data-content');
            const tabs = document.querySelectorAll('.workshop-tab');
            const contents = document.querySelectorAll('.workshop-content');

            tabs.forEach(tab => tab.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            e.target.classList.add('active');
            const targetContent = document.getElementById(`${contentType}-content`);
            if (targetContent) targetContent.classList.add('active');
        }
    });

    // Close workshop modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            // Pause all videos when closing
            const videos = workshopModal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
            
            workshopModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (workshopModalOverlay) {
        workshopModalOverlay.addEventListener('click', () => {
            // Pause all videos when closing
            const videos = workshopModal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
            
            workshopModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===== GALLERY MASONRY FILTERING =====
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 300);
                }
            });
        });
    });

    // Initialize gallery cards
    galleryCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    // ===== GALLERY LIGHTBOX =====
    const galleryLightbox = document.getElementById('galleryLightbox');
    const galleryLightboxClose = document.getElementById('galleryLightboxClose');
    const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
    const galleryLightboxNext = document.getElementById('galleryLightboxNext');
    const galleryLightboxOverlay = document.querySelector('.gallery-lightbox-overlay');

    let currentGalleryImages = [];
    let currentGalleryIndex = 0;

    // Gallery data structure
    const galleryData = [];
    galleryCards.forEach((card, index) => {
        const img = card.querySelector('img');
        const category = card.querySelector('.gallery-category').textContent;
        const title = card.querySelector('.gallery-card-title').textContent;
        const date = card.querySelector('.gallery-date').textContent.trim();
        const excerpt = card.querySelector('.gallery-card-excerpt').textContent;
        
        galleryData.push({
            src: img.src,
            category: category,
            title: title,
            date: date,
            description: excerpt,
            index: index
        });
    });

    // Open gallery lightbox when clicking on a card
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            openGalleryLightbox(index);
        });
    });

    function openGalleryLightbox(index) {
        // Filter to show only visible images based on current filter
        const activeFilter = document.querySelector('.gallery-filters .gallery-filter-btn.active')?.getAttribute('data-filter') || 'all';
        
        if (activeFilter === 'all') {
            currentGalleryImages = galleryData;
        } else {
            currentGalleryImages = galleryData.filter(item => {
                const card = galleryCards[item.index];
                return card.getAttribute('data-category') === activeFilter;
            });
        }
        
        // Find the index in filtered array
        const filteredIndex = currentGalleryImages.findIndex(item => item.index === index);
        currentGalleryIndex = filteredIndex !== -1 ? filteredIndex : 0;
        
        showGalleryLightboxImage();
        if (galleryLightbox) {
            galleryLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function showGalleryLightboxImage() {
        if (currentGalleryImages.length === 0) return;
        
        const currentImage = currentGalleryImages[currentGalleryIndex];
        
        const galleryLightboxImage = document.getElementById('galleryLightboxImage');
        const galleryLightboxCategory = document.getElementById('galleryLightboxCategory');
        const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
        const galleryLightboxDate = document.getElementById('galleryLightboxDate');
        const galleryLightboxDescription = document.getElementById('galleryLightboxDescription');
        
        if (galleryLightboxImage) galleryLightboxImage.src = currentImage.src;
        if (galleryLightboxCategory) galleryLightboxCategory.textContent = currentImage.category;
        if (galleryLightboxTitle) galleryLightboxTitle.textContent = currentImage.title;
        if (galleryLightboxDate) galleryLightboxDate.innerHTML = '<i class="fas fa-calendar"></i> ' + currentImage.date;
        if (galleryLightboxDescription) galleryLightboxDescription.textContent = currentImage.description;
    }

    if (galleryLightboxClose) {
        galleryLightboxClose.addEventListener('click', () => {
            galleryLightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (galleryLightboxOverlay) {
        galleryLightboxOverlay.addEventListener('click', () => {
            galleryLightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (galleryLightboxPrev) {
        galleryLightboxPrev.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
            showGalleryLightboxImage();
        });
    }

    if (galleryLightboxNext) {
        galleryLightboxNext.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
            showGalleryLightboxImage();
        });
    }

    // ===== IMAGE LIGHTBOX (for workshop modal) =====
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    let currentImages = [];
    let currentImageIndex = 0;

    function openLightbox(images, index) {
        currentImages = images;
        currentImageIndex = index;
        showLightboxImage();
        if (imageLightbox) {
            imageLightbox.classList.add('active');
        }
    }

    function showLightboxImage() {
        const lightboxContent = document.querySelector('.lightbox-content');
        if (lightboxContent) {
            lightboxContent.innerHTML = `
                <img src="${currentImages[currentImageIndex]}" alt="Gallery Image" 
                     onerror="this.src='https://via.placeholder.com/1200x800/10B981/0a0a0a?text=Image+Not+Found'">
                <div class="lightbox-counter">${currentImageIndex + 1} / ${currentImages.length}</div>
            `;
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            imageLightbox.classList.remove('active');
        });
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', () => {
            imageLightbox.classList.remove('active');
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            showLightboxImage();
        });
    }

    // Keyboard navigation for lightbox and gallery lightbox
    document.addEventListener('keydown', (e) => {
        // Image lightbox (workshop modal)
        if (imageLightbox && imageLightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                imageLightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                showLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                showLightboxImage();
            }
        }

        // Gallery lightbox
        if (galleryLightbox && galleryLightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                galleryLightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
                showGalleryLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
                showGalleryLightboxImage();
            }
        }

        // Close modals on Escape
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (workshopModal && workshopModal.classList.contains('active')) {
                // Pause all videos when closing with Escape
                const videos = workshopModal.querySelectorAll('video');
                videos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
                
                workshopModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===== CONTACT FORM =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                submitBtn.style.background = '#10B981';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // ===== ANIMATIONS =====
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

    const animateElements = document.querySelectorAll('.service-card, .timeline-item, .skill-item, .portfolio-item, .workshop-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Skill bar animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(skill => {
        skillObserver.observe(skill);
    });
});

// ===== HELPER FUNCTIONS =====
function setupHorizontalScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        e.preventDefault();
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY;
    }, { passive: false });
}

// Open PDF in new tab
function openPDF(url, name) {
    window.open(url.replace('/preview', '/view'), '_blank');
}

// Console message
console.log('%c🎨 Portfolio Website ', 'background: #10B981; color: #0a0a0a; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cDesigned with passion and built with modern web technologies', 'color: #10B981; font-size: 14px;');

// ===== ENHANCED POPUP SYSTEM =====
// ===== ENHANCED POPUP SYSTEM =====
function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners for this specific popup
        const closeBtn = popup.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = () => closePopup(id);
        }
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Simple image viewer that uses actual image sources
function openImageViewer(imageSrc) {
    console.log('Opening image viewer with:', imageSrc); // Debug log
    
    // Don't open if it's a placeholder URL
    if (imageSrc.includes('via.placeholder.com') || imageSrc.includes('unsplash.com')) {
        console.log('Skipping placeholder image');
        return;
    }
    
    const lightbox = document.createElement('div');
    lightbox.className = 'custom-lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Full size image';
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        border: 3px solid #10B981;
        box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
        cursor: default;
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(16, 185, 129, 0.2);
        border: 2px solid #10B981;
        border-radius: 50%;
        color: #10B981;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100001;
    `;
    
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
    });
    
    // Close with Escape
    const closeLightbox = (e) => {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
            document.removeEventListener('keydown', closeLightbox);
        }
    };
    
    document.addEventListener('keydown', closeLightbox);
}

// Initialize popup functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for school gallery cards
    const schoolCards = document.querySelectorAll('.school-gallery-card');
    schoolCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const popupId = card.getAttribute('data-popup');
            if (popupId) {
                openPopup(popupId);
            }
        });
        
        // Add keyboard support
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const popupId = card.getAttribute('data-popup');
                if (popupId) {
                    openPopup(popupId);
                }
            }
        });
    });
    
    // Add click handlers for gallery cards inside popups
    document.addEventListener('click', (e) => {
        // Handle popup gallery cards
        if (e.target.closest('.popup .gallery-card')) {
            e.preventDefault();
            e.stopPropagation();
            const card = e.target.closest('.gallery-card');
            const img = card.querySelector('img');
            if (img && img.src) {
                openImageViewer(img.src);
            }
        }
        
        // Handle workshop modal images (excluding videos)
        if (e.target.closest('.workshop-modal .gallery-item:not(.video-item)')) {
            e.preventDefault();
            e.stopPropagation();
            const galleryItem = e.target.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            if (img && img.src) {
                openImageViewer(img.src);
            }
        }
        
        // Handle project modal gallery items
        if (e.target.closest('.project-modal .project-gallery-item')) {
            e.preventDefault();
            e.stopPropagation();
            const galleryItem = e.target.closest('.project-gallery-item');
            const img = galleryItem.querySelector('img');
            if (img && img.src) {
                openImageViewer(img.src);
            }
        }
    });
    
    // Close popup when clicking outside the content
    document.addEventListener('click', (event) => {
        const popups = document.querySelectorAll('.popup.active');
        popups.forEach(popup => {
            if (event.target === popup) {
                closePopup(popup.id);
            }
        });
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.popup.active').forEach(popup => {
                closePopup(popup.id);
            });
            
            // Also close custom lightbox if open
            const customLightbox = document.querySelector('.custom-lightbox');
            if (customLightbox) {
                document.body.removeChild(customLightbox);
                document.body.style.overflow = '';
            }
        }
    });
});

// Update the HTML gallery card onclick handlers
function updateGalleryCardHandlers() {
    // Remove any existing onclick handlers from gallery cards in popups
    document.querySelectorAll('.popup .gallery-card').forEach(card => {
        card.removeAttribute('onclick');
    });
}

// Call this after DOM is loaded

setTimeout(updateGalleryCardHandlers, 100);


