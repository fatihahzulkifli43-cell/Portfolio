document.addEventListener('DOMContentLoaded', function() {

    // ===== TAB NAVIGATION =====
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize tabs
    tabContents.forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        }
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            const target = document.getElementById(tabId);
            if (target) {
                target.style.display = 'block';
                void target.offsetWidth; // Force reflow
                target.classList.add('active');
            }

            // Scroll to top of content area
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                contentArea.scrollTop = 0;
            }
        });
    });

    // ===== HORIZONTAL SCROLL (Desktop & Touch) =====
    const clientsScroll = document.querySelector('.clients-scroll');
    if (clientsScroll) {
        setupHorizontalScroll(clientsScroll);
    }

    // ===== PORTFOLIO MODAL =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const projectModal = document.getElementById('projectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectModalOverlay = document.querySelector('.project-modal-overlay');

    const projectData = {
        webapp: {
            title: 'Web Application Development',
            description: 'Developed a full-stack web application with modern technologies and responsive design.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
            github: '#',
            live: '#',
            images: ['portfolio/web1.png', 'portfolio/web2.png', 'portfolio/web3.png', 'portfolio/web4.png']
        },
        graphics: {
            title: 'Interactive Computer Graphics',
            description: 'Created interactive 3D graphics using WebGL and modern rendering techniques.',
            technologies: ['WebGL', 'C++', 'Blender', 'GLSL'],
            github: '#',
            live: '#',
            images: ['portfolio/cgi1.png', 'portfolio/cgi2.png', 'portfolio/cgi3.png', 'portfolio/cgi4.png']
        },
        gameplay: {
            title: 'Game Development Project',
            description: 'Designed and developed an engaging game with custom mechanics and polished gameplay.',
            technologies: ['Unity', 'C#', 'Blender', 'Photoshop', 'Game Design'],
            github: '#',
            live: '#',
            images: ['portfolio/gp1.png', 'portfolio/gp2.png', 'portfolio/gp3.png', 'portfolio/gp4.png', 'portfolio/gp5.png']
        },
        database: {
            title: 'Database Management System',
            description: 'Built a comprehensive database system with efficient data modeling and querying.',
            technologies: ['MySQL', 'SQL', 'PHP', 'Data Modeling'],
            github: '#',
            live: '#',
            images: ['portfolio/db1.png', 'portfolio/db2.png', 'portfolio/db3.png', 'portfolio/db4.png']
        }
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-project');
            const data = projectData[type];
            
            if (!data || !projectModal) return;

            // Populate modal content
            document.getElementById('projectTitle').textContent = data.title;
            document.getElementById('projectDescription').textContent = data.description;

            // Add technology badges
            const techContainer = document.getElementById('projectTech');
            if (techContainer) {
                techContainer.innerHTML = data.technologies
                    .map(t => `<span class="tech-badge">${t}</span>`)
                    .join('');
            }

            // Add project links
            const linksContainer = document.getElementById('projectLinks');
            if (linksContainer) {
                linksContainer.innerHTML = `
                    <a href="${data.github}" target="_blank" class="project-link-btn">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${data.live}" target="_blank" class="project-link-btn secondary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                `;
            }

            // Add gallery images
            const gallery = document.getElementById('projectGallery');
            if (gallery) {
                gallery.innerHTML = data.images.map((src, i) => `
                    <div class="project-gallery-item" data-index="${i}">
                        <img src="${src}" alt="Project Image ${i + 1}" 
                             onerror="this.src='https://via.placeholder.com/800x600/10B981/0a0a0a?text=Project+Image+${i + 1}'">
                    </div>
                `).join('');

                // Add click handlers for lightbox
                gallery.querySelectorAll('.project-gallery-item').forEach((el, idx) => {
                    el.addEventListener('click', () => openLightbox(data.images, idx));
                });
            }

            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close project modal
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

    // ===== WORKSHOP MODAL =====
    const workshopCards = document.querySelectorAll('.workshop-card');
    const workshopModal = document.getElementById('workshopModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const workshopModalOverlay = document.querySelector('.workshop-modal-overlay');

    const workshopData = {
        storyboard: {
            title: 'Storyboard & Script',
            date: 'Pre-Production',
            description: 'Created detailed storyboards and scripts for the production.',
            images: ['workshop/storyboard.png', 'workshop/script.png']
        },
        merchandise: {
            title: 'Merchandise & Poster',
            date: 'Design Phase',
            description: 'Designed creative merchandise and promotional materials.',
            images: [
                'workshop/Poster.png',
                'workshop/logo.jpg',
                'workshop/tote bag.png',
                'workshop/Button badge.png',
                'workshop/sticker.jpg',
                'workshop/Baju.png'
            ]
        },
        youtube: {
            title: 'Thumbnail Design & YouTube',
            date: 'Publishing',
            description: 'Created engaging thumbnails and managed YouTube content.',
            images: ['workshop/thumbnail.jpg', 'workshop/teaser.mp4']
        },
        showcase: {
            title: 'Showcase & BTS',
            date: 'Documentation',
            description: 'Captured behind-the-scenes photos and showcase moments.',
            images: [
                'workshop/bts1.JPG',
                'workshop/bts2.JPG',
                'workshop/bts3.JPG',
                'workshop/bts4.JPG',
                'workshop/sc1.jpg',
                'workshop/sc2.jpg',
                'workshop/sc3.jpg',
                'workshop/sc4.jpg'
            ]
        },
        editing: {
            title: 'Editing & VFX',
            date: 'Post-Production',
            description: 'Edited video footage and applied visual effects.',
            images: [
                'workshop/vfx1.png',
                'workshop/vfx2.png',
                'workshop/vfx3.png',
                'workshop/vfx4.png'
            ]
        },
        document: {
            title: 'PDF & LOGBOOK',
            date: 'Documentation',
            description: 'Project documentation in PDF format.',
            pdfs: [{
                name: 'LOGBOOK',
                url: 'workshop/B032310573_Workshop_2_Logbook.pdf',
                size: '2.5 MB',
                description: 'Detailed project logbook.'
            }],
            images: []
        }
    };

    workshopCards.forEach(card => {
        const btn = card.querySelector('.view-gallery-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            const type = card.getAttribute('data-workshop');
            const data = workshopData[type];

            // Allow PDF download without modal for document type
            if (type === 'document') {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (!data || !workshopModal) return;

            // Populate modal content
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDate').textContent = data.date;
            document.getElementById('modalDescription').textContent = data.description;

            const gallery = document.getElementById('workshopGallery');
            if (gallery) {
                if (data.pdfs && data.pdfs.length > 0) {
                    // Render PDF documents
                    gallery.innerHTML = data.pdfs.map((pdf, i) => `
                        <div class="pdf-document-card" data-index="${i}">
                            <div class="pdf-icon-container">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <div class="pdf-info">
                                <h4 class="pdf-name">${pdf.name}</h4>
                                <p class="pdf-description">${pdf.description}</p>
                                <div class="pdf-meta">
                                    <span class="pdf-size">
                                        <i class="fas fa-hdd"></i> ${pdf.size}
                                    </span>
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
                    // Render images/videos
                    const mediaList = (data.images || []).map(src => ({
                        type: src.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
                        src
                    }));

                    gallery.innerHTML = mediaList.map((item, i) => {
                        if (item.type === 'video') {
                            return `
                                <div class="gallery-item video-item" data-index="${i}">
                                    <video src="${item.src}" controls preload="metadata" 
                                           style="width:100%;height:100%;border-radius:12px;">
                                    </video>
                                </div>
                            `;
                        } else {
                            return `
                                <div class="gallery-item" data-index="${i}">
                                    <img src="${item.src}" alt="Media ${i + 1}" 
                                         onerror="this.src='https://via.placeholder.com/800x600/10B981/0a0a0a?text=Media+${i + 1}'">
                                    <div class="gallery-item-overlay">
                                        <i class="fas fa-search-plus"></i>
                                    </div>
                                </div>
                            `;
                        }
                    }).join('');

                    // Add click handlers for image items (not videos)
                    const imageItems = mediaList
                        .map((m, idx) => ({ ...m, originalIndex: idx }))
                        .filter(m => m.type === 'image');
                    
                    gallery.querySelectorAll('.gallery-item:not(.video-item)').forEach((item, idx) => {
                        item.addEventListener('click', () => {
                            const imageSources = imageItems.map(m => m.src);
                            openLightbox(imageSources, idx);
                        });
                    });
                }
            }

            // Show modal
            workshopModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // View PDF function
    window.viewPDF = function(url) {
        window.open(url, '_blank');
    };

    // Close workshop modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            pauseWorkshopVideos();
            workshopModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (workshopModalOverlay) {
        workshopModalOverlay.addEventListener('click', () => {
            pauseWorkshopVideos();
            workshopModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    function pauseWorkshopVideos() {
        const videos = workshopModal ? workshopModal.querySelectorAll('video') : [];
        videos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
    }

    // ===== LIGHTBOX =====
    let currentImages = [];
    let currentImageIndex = 0;
    const imageLightbox = document.getElementById('imageLightbox');

    function openLightbox(images, index) {
        currentImages = images;
        currentImageIndex = index;
        showLightboxImage();
        if (imageLightbox) {
            imageLightbox.classList.add('active');
        }
    }

    function showLightboxImage() {
        if (currentImages.length === 0) return;
        
        const content = document.querySelector('.lightbox-content');
        if (content) {
            content.innerHTML = `
                <img src="${currentImages[currentImageIndex]}" 
                     alt="Gallery Image" 
                     onerror="this.src='https://via.placeholder.com/1200x800/10B981/0a0a0a?text=Image+Not+Found'">
                <div class="lightbox-counter">${currentImageIndex + 1}/${currentImages.length}</div>
            `;
        }
    }

    // Lightbox controls
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');

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

    // ===== KEYBOARD CONTROLS =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close lightbox
            if (imageLightbox && imageLightbox.classList.contains('active')) {
                imageLightbox.classList.remove('active');
            }
            
            // Close workshop modal
            if (workshopModal && workshopModal.classList.contains('active')) {
                pauseWorkshopVideos();
                workshopModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close project modal
            if (projectModal && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close any active popup
            document.querySelectorAll('.popup.active').forEach(popup => {
                closePopup(popup.id);
            });
            
            // Close custom lightbox
            const customLightbox = document.querySelector('.custom-lightbox');
            if (customLightbox && document.body.contains(customLightbox)) {
                document.body.removeChild(customLightbox);
                document.body.style.overflow = '';
            }
        }
        
        // Lightbox navigation with arrow keys
        if (imageLightbox && imageLightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
                showLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % currentImages.length;
                showLightboxImage();
            }
        }
    });

    // ===== ENHANCED POPUP SYSTEM =====
    window.openPopup = function(id) {
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
    };

    window.closePopup = function(id) {
        const popup = document.getElementById(id);
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Simple image viewer that uses actual image sources
    window.openImageViewer = function(imageSrc) {
        console.log('Opening image viewer with:', imageSrc);
        
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
            padding: 20px;
            box-sizing: border-box;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Full size image';
        img.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 10px;
            border: 3px solid #10B981;
            box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
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
            transition: all 0.3s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(16, 185, 129, 0.4)';
            closeBtn.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(16, 185, 129, 0.2)';
            closeBtn.style.transform = 'scale(1)';
        });
        
        const closeLightbox = () => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        };
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close when clicking background
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Touch support for mobile
        let touchStartY = 0;
        lightbox.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        lightbox.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            // Swipe down to close
            if (diff < -50) {
                closeLightbox();
            }
        });
    };

    // Initialize popup functionality
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

});

// ===== HELPER FUNCTIONS =====
function setupHorizontalScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let startY;
    let isScrolling = false;

    // Mouse events for desktop
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

    // Mouse wheel for desktop
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY;
    }, { passive: false });

    // Touch events for mobile/tablet
    container.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        startY = e.touches[0].pageY;
        scrollLeft = container.scrollLeft;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        
        const x = e.touches[0].pageX - container.offsetLeft;
        const y = e.touches[0].pageY;
        const walkX = (x - startX) * 2;
        const walkY = Math.abs(y - startY);
        
        // Only prevent default if horizontal scroll is dominant
        if (Math.abs(walkX) > walkY) {
            e.preventDefault();
            container.scrollLeft = scrollLeft - walkX;
        }
    }, { passive: false });

    container.addEventListener('touchend', () => {
        isScrolling = false;
    }, { passive: true });
}

// Console message
console.log('%c🎨 Portfolio Website ', 'background: #10B981; color: #0a0a0a; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cDesigned with passion and built with modern web technologies', 'color: #10B981; font-size: 14px;');

