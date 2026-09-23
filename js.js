/**
 * Student Xerox & Stationary - Junagadh
 * Apple iOS & VisionOS Spatial Design Engine
 * Fully Responsive, 3D Tilt, Live Estimator, Spring Physics
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (OLED Dark & Liquid Light)
       ========================================================================== */
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    const htmlBody = document.body;

    const savedTheme = localStorage.getItem('ios-print-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        htmlBody.setAttribute('data-theme', theme);
        localStorage.setItem('ios-print-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = htmlBody.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    /* ==========================================================================
       2. Dynamic Island Header & Scroll Behavior
       ========================================================================== */
    const islandHeader = document.getElementById('islandHeader');
    const backToTopBtn = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Dynamic Island Compact Morphing
        if (islandHeader) {
            if (scrollY > 30) {
                islandHeader.classList.add('scrolled');
            } else {
                islandHeader.classList.remove('scrolled');
            }
        }

        // Back to Top Button visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Navigation Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       3. Live Operational Status Indicator (Junagadh Time)
       ========================================================================== */
    function updateShopStatus() {
        const statusPill = document.getElementById('shopStatusPill');
        const statusText = document.getElementById('statusText');
        if (!statusText || !statusPill) return;

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday...
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours + minutes / 60;

        let isOpen = false;
        let note = '';

        if (day >= 1 && day <= 6) { // Mon - Sat: 8:30 AM to 8:30 PM
            if (currentTime >= 8.5 && currentTime < 20.5) {
                isOpen = true;
                note = 'Open Now • Closes 8:30 PM';
            } else if (currentTime < 8.5) {
                note = 'Opens at 8:30 AM Today';
            } else {
                note = 'Closed for today • Opens 8:30 AM';
            }
        } else { // Sunday: 9:30 AM to 1:30 PM
            if (currentTime >= 9.5 && currentTime < 13.5) {
                isOpen = true;
                note = 'Sunday Hours • Closes 1:30 PM';
            } else {
                note = 'Sunday • Opens Mon 8:30 AM';
            }
        }

        statusText.textContent = note;
        const dot = statusPill.querySelector('.status-dot');
        if (dot) {
            dot.style.background = isOpen ? '#34c759' : '#ff9500';
            dot.style.boxShadow = isOpen ? '0 0 8px #34c759' : '0 0 8px #ff9500';
        }
    }

    updateShopStatus();
    setInterval(updateShopStatus, 60000);

    /* ==========================================================================
       4. Mobile Drawer Navigation
       ========================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const closeDrawer = document.getElementById('closeDrawer');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function toggleDrawer(open) {
        if (!mobileDrawer || !drawerBackdrop) return;
        if (open) {
            mobileDrawer.classList.add('active');
            drawerBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileDrawer.classList.remove('active');
            drawerBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    /* ==========================================================================
       5. 3D Card Tilt & Specular Lighting Engine (Apple TV Style)
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (isFinePointer) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Max rotation angles
                const rotateX = ((y - centerY) / centerY) * -9;
                const rotateY = ((x - centerX) / centerX) * 9;

                // Update specular glare origin
                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'none';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        // Interactive Cursor Spotlight (Ambient glow tracking)
        const spotlight = document.getElementById('cursorSpotlight');
        if (spotlight) {
            document.body.classList.add('cursor-active');
            window.addEventListener('mousemove', (e) => {
                spotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }, { passive: true });
        }
    }

    /* ==========================================================================
       6. Apple iOS Sliding Segmented Controls
       ========================================================================== */
    const segmentedControls = document.querySelectorAll('.segmented-control');

    function updateGlider(control, activeBtn) {
        const glider = control.querySelector('.segment-glider');
        if (!glider || !activeBtn) return;

        const controlRect = control.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        const offsetLeft = btnRect.left - controlRect.left;
        const width = btnRect.width;

        glider.style.left = `${offsetLeft}px`;
        glider.style.width = `${width}px`;
    }

    segmentedControls.forEach(control => {
        const buttons = control.querySelectorAll('.segmented-btn');
        const initialActive = control.querySelector('.segmented-btn.active') || buttons[0];
        
        if (initialActive) {
            initialActive.classList.add('active');
            setTimeout(() => updateGlider(control, initialActive), 50);
        }

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateGlider(control, btn);
            });
        });
    });

    window.addEventListener('resize', () => {
        segmentedControls.forEach(control => {
            const active = control.querySelector('.segmented-btn.active');
            if (active) updateGlider(control, active);
        });
    });

    /* ==========================================================================
       7. Interactive Live Price Calculator Engine
       ========================================================================== */
    const calcState = {
        printMode: 'bw',     // 'bw' or 'color'
        baseRate: 1.5,       // base price per page
        sideMode: 'single',  // 'single' or 'double'
        sideMultiplier: 1.0, // duplex discount
        paperMode: 'standard', // 'standard' or 'bond'
        paperAddon: 0.0,
        bindingMode: 'none',   // 'none', 'spiral', 'thesis'
        bindingCost: 0,
        pageCount: 25
    };

    // UI elements
    const modeControl = document.querySelector('[data-group="print-mode"]');
    const sidesControl = document.querySelector('[data-group="sides-mode"]');
    const paperControl = document.querySelector('[data-group="paper-mode"]');
    const bindingControl = document.querySelector('[data-group="binding-mode"]');

    const pageRange = document.getElementById('pageRange');
    const stepValue = document.getElementById('stepValue');
    const stepDecr = document.getElementById('stepDecr');
    const stepIncr = document.getElementById('stepIncr');
    const pagesBadge = document.getElementById('pagesBadge');

    const modeRateBadge = document.getElementById('modeRateBadge');
    const sideDiscountBadge = document.getElementById('sideDiscountBadge');
    const paperGradeBadge = document.getElementById('paperGradeBadge');
    const bindingBadge = document.getElementById('bindingBadge');

    // Summary lines
    const summaryPrintType = document.getElementById('summaryPrintType');
    const summaryPrintCost = document.getElementById('summaryPrintCost');
    const summaryPaperType = document.getElementById('summaryPaperType');
    const summaryBindingType = document.getElementById('summaryBindingType');
    const summaryReadyTime = document.getElementById('summaryReadyTime');
    const totalDisplayPrice = document.getElementById('totalDisplayPrice');
    const btnSendQuoteWhatsapp = document.getElementById('btnSendQuoteWhatsapp');

    let currentAnimatedTotal = 38;

    function animateTotalDisplay(targetTotal) {
        if (!totalDisplayPrice) return;
        const start = currentAnimatedTotal;
        const diff = targetTotal - start;
        const duration = 280;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + diff * easeProgress);
            totalDisplayPrice.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                currentAnimatedTotal = targetTotal;
                totalDisplayPrice.textContent = targetTotal;
            }
        }

        requestAnimationFrame(step);
    }

    function calculateTotal() {
        const pages = calcState.pageCount;
        const perPageCost = (calcState.baseRate * calcState.sideMultiplier) + calcState.paperAddon;
        const printSubtotal = pages * perPageCost;
        const grandTotal = Math.round(printSubtotal + calcState.bindingCost);

        // Update receipt details
        if (summaryPrintType) {
            const modeName = calcState.printMode === 'bw' ? 'B&W Xerox' : 'Color Laser';
            const sideName = calcState.sideMode === 'single' ? 'Single Side' : 'Both Sides (Duplex)';
            summaryPrintType.textContent = `${modeName} (${sideName})`;
        }

        if (summaryPrintCost) {
            summaryPrintCost.textContent = `₹${printSubtotal.toFixed(2)}`;
        }

        if (summaryPaperType) {
            summaryPaperType.textContent = calcState.paperMode === 'standard' ? '75 GSM Regular' : '100 GSM Bond Paper';
        }

        if (summaryBindingType) {
            let bindText = 'No Binding';
            if (calcState.bindingMode === 'spiral') bindText = 'Spiral Binding (+₹30)';
            if (calcState.bindingMode === 'thesis') bindText = 'Hardcover Thesis (+₹140)';
            summaryBindingType.textContent = bindText;
        }

        if (summaryReadyTime) {
            if (pages <= 30 && calcState.bindingMode !== 'thesis') {
                summaryReadyTime.textContent = '~ 5 - 10 minutes';
            } else if (calcState.bindingMode === 'thesis') {
                summaryReadyTime.textContent = '~ 45 - 60 minutes';
            } else {
                summaryReadyTime.textContent = '~ 15 - 20 minutes';
            }
        }

        animateTotalDisplay(grandTotal);
    }

    // Attach listeners for Print Mode
    if (modeControl) {
        modeControl.querySelectorAll('.segmented-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                calcState.printMode = btn.getAttribute('data-value');
                calcState.baseRate = parseFloat(btn.getAttribute('data-rate'));
                if (modeRateBadge) {
                    modeRateBadge.textContent = `₹${calcState.baseRate.toFixed(2)} / page`;
                }
                calculateTotal();
            });
        });
    }

    // Attach listeners for Sides Mode
    if (sidesControl) {
        sidesControl.querySelectorAll('.segmented-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                calcState.sideMode = btn.getAttribute('data-value');
                calcState.sideMultiplier = parseFloat(btn.getAttribute('data-mult'));
                if (sideDiscountBadge) {
                    sideDiscountBadge.textContent = calcState.sideMode === 'single' ? 'Standard' : '15% Duplex Saved';
                }
                calculateTotal();
            });
        });
    }

    // Attach listeners for Paper Stock
    if (paperControl) {
        paperControl.querySelectorAll('.segmented-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                calcState.paperMode = btn.getAttribute('data-value');
                calcState.paperAddon = parseFloat(btn.getAttribute('data-addon'));
                if (paperGradeBadge) {
                    paperGradeBadge.textContent = calcState.paperMode === 'standard' ? 'Standard' : '+₹1.5 / pg Bond';
                }
                calculateTotal();
            });
        });
    }

    // Attach listeners for Binding
    if (bindingControl) {
        bindingControl.querySelectorAll('.segmented-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                calcState.bindingMode = btn.getAttribute('data-value');
                calcState.bindingCost = parseFloat(btn.getAttribute('data-cost'));
                if (bindingBadge) {
                    let bText = 'None';
                    if (calcState.bindingMode === 'spiral') bText = 'Spiral (+₹30)';
                    if (calcState.bindingMode === 'thesis') bText = 'Thesis (+₹140)';
                    bindingBadge.textContent = bText;
                }
                calculateTotal();
            });
        });
    }

    // Page Stepper & Slider Sync
    function updatePages(newVal) {
        let val = parseInt(newVal, 10);
        if (isNaN(val)) val = 1;
        if (val < 1) val = 1;
        if (val > 500) val = 500;

        calcState.pageCount = val;
        if (pageRange) pageRange.value = val;
        if (stepValue) stepValue.textContent = val;
        if (pagesBadge) pagesBadge.textContent = `${val} ${val === 1 ? 'Page' : 'Pages'}`;

        calculateTotal();
    }

    if (pageRange) {
        pageRange.addEventListener('input', (e) => updatePages(e.target.value));
    }
    if (stepDecr) {
        stepDecr.addEventListener('click', () => updatePages(calcState.pageCount - 5));
    }
    if (stepIncr) {
        stepIncr.addEventListener('click', () => updatePages(calcState.pageCount + 5));
    }

    calculateTotal();

    // Export Calculated Order to WhatsApp
    if (btnSendQuoteWhatsapp) {
        btnSendQuoteWhatsapp.addEventListener('click', () => {
            const printTypeName = calcState.printMode === 'bw' ? 'B&W Xerox' : 'Color Laser Print';
            const sideName = calcState.sideMode === 'single' ? 'Single Side' : 'Both Sides (Duplex)';
            const paperName = calcState.paperMode === 'standard' ? '75 GSM Regular' : '100 GSM Bond';
            let bindName = 'No Binding';
            if (calcState.bindingMode === 'spiral') bindName = 'Spiral Binding';
            if (calcState.bindingMode === 'thesis') bindName = 'Hardcover Thesis Binding';

            const estimatedCost = currentAnimatedTotal;

            const message = 
`Hello Student Xerox Junagadh! 🖨️
I want to place an order calculated from your website:

📄 *Pages / Copies:* ${calcState.pageCount}
🎨 *Print Type:* ${printTypeName}
🔄 *Sides:* ${sideName}
📑 *Paper Stock:* ${paperName}
📚 *Binding:* ${bindName}
💰 *Estimated Total:* ₹${estimatedCost}

Can I send my PDF file right now? Thanks!`;

            const waUrl = `https://wa.me/919974431231?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    }

    /* ==========================================================================
       8. Document Upload & Dropzone Simulation
       ========================================================================== */
    const pdfDropzone = document.getElementById('pdfDropzone');
    const docFileInput = document.getElementById('docFileInput');
    const filePreviewCard = document.getElementById('filePreviewCard');
    const previewFileName = document.getElementById('previewFileName');
    const previewFileSpecs = document.getElementById('previewFileSpecs');
    const btnDropzoneWhatsapp = document.getElementById('btnDropzoneWhatsapp');

    let uploadedDocName = '';
    let estimatedDocPages = 20;

    function handleFileSelected(file) {
        if (!file) return;
        uploadedDocName = file.name;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        
        // Simulate page estimation for demo comfort
        estimatedDocPages = Math.max(5, Math.min(180, Math.round(file.size / 75000)));

        if (previewFileName) previewFileName.textContent = file.name;
        if (previewFileSpecs) {
            previewFileSpecs.textContent = `${sizeMb} MB • Est. ~${estimatedDocPages} Pages`;
        }

        if (filePreviewCard) {
            filePreviewCard.classList.add('show');
        }

        // Pre-fill calculator
        updatePages(estimatedDocPages);
    }

    if (pdfDropzone) {
        ['dragenter', 'dragover'].forEach(eventName => {
            pdfDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                pdfDropzone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            pdfDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                pdfDropzone.classList.remove('dragover');
            });
        });

        pdfDropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileSelected(e.dataTransfer.files[0]);
            }
        });
    }

    if (docFileInput) {
        docFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleFileSelected(e.target.files[0]);
            }
        });
    }

    if (btnDropzoneWhatsapp) {
        btnDropzoneWhatsapp.addEventListener('click', () => {
            const fileName = uploadedDocName || 'My_Project_Document.pdf';
            const msg = 
`Hello Student Xerox Junagadh! 📁
I have a document ready for printing:

📄 *Document Name:* ${fileName}
📑 *Estimated Pages:* ~${estimatedDocPages}
📦 *Pickup Station:* College Road, Junagadh

Sending the file now for printing. Please confirm receipt!`;

            const url = `https://wa.me/919974431231?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }

    /* ==========================================================================
       9. Stationery Gallery Filter with Spring Glider
       ========================================================================== */
    const galleryControl = document.querySelector('[data-group="gallery-filter"]');
    const productCards = document.querySelectorAll('.product-card');

    if (galleryControl) {
        galleryControl.querySelectorAll('.segmented-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCat = card.getAttribute('data-cat');
                    if (filter === 'all' || cardCat === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.classList.add('active');
                        }, 50);
                    } else {
                        card.classList.remove('active');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ==========================================================================
       10. iOS Spring FAQ Accordion
       ========================================================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const body = item.querySelector('.accordion-body');

        // Set initial open height
        if (item.classList.contains('open') && body) {
            body.style.maxHeight = body.scrollHeight + 'px';
        }

        if (trigger) {
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                        const otherBody = otherItem.querySelector('.accordion-body');
                        if (otherBody) otherBody.style.maxHeight = '0px';
                    }
                });

                if (isOpen) {
                    item.classList.remove('open');
                    if (body) body.style.maxHeight = '0px';
                } else {
                    item.classList.add('open');
                    if (body) body.style.maxHeight = body.scrollHeight + 'px';
                }
            });
        }
    });

    /* ==========================================================================
       11. Scroll Intersection Observer (Staggered Reveals)
       ========================================================================== */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       12. Footer Current Year
       ========================================================================== */
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

});