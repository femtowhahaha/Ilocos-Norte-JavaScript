/* ================================================================
   ILOCOS NORTE TOURISM — script.js
   Features:
   01. Loading Screen
   02. Floating Particles
   03. Scroll Progress Bar
   04. Sticky Header + Hide on Scroll Down
   05. Hero Slideshow with Crossfade
   06. Typewriter Effect
   07. Hero Stats Bar
   08. Scroll Triggered Animations (IntersectionObserver)
   09. Animated Counters
   10. 3D Card Tilt on Mousemove
   11. Parallax Scrolling
   12. Lightbox Image Viewer
   13. Featured Destinations Carousel
   14. Live Search / Filter
   15. Dark Mode Toggle
   16. Cookie Banner
   17. Toast Notifications
   18. Back to Top Button
   19. Countdown Timer (Pamulinawen Festival)
   20. Form Validation + Password Strength
   21. Multi-step Signup Form
   22. Smooth Page Transitions
   23. Custom Tabs
   24. Newsletter Form
   25. Testimonials Slider
   26. Gallery Masonry Hover
================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     01. LOADING SCREEN
  ============================================================ */
  (function () {
    var screen = document.getElementById('loading-screen');
    if (!screen) return;

    var delay = document.querySelector('.hero-section') ? 2000 : 800;

    window.addEventListener('load', function () {
      setTimeout(function () {
        screen.classList.add('loaded');
      }, delay);
    });

    // Fallback
    setTimeout(function () {
      if (screen) screen.classList.add('loaded');
    }, 3500);
  })();


  /* ============================================================
     02. FLOATING PARTICLES CANVAS
  ============================================================ */
  (function () {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4 - 0.2;
      this.radius = Math.random() * 2.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '58,173,218' : '240,124,44';
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) { this.y = H + 10; this.x = Math.random() * W; }
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')';
      ctx.fill();
    };

    // Create particles
    for (var i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(58,173,218,' + (0.06 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }

      requestAnimationFrame(animate);
    }

    animate();
  })();


  /* ============================================================
     03. SCROLL PROGRESS BAR
  ============================================================ */
  (function () {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  })();


  /* ============================================================
     04. STICKY HEADER — Shrink + Hide on scroll down
  ============================================================ */
  (function () {
    var header = document.querySelector('.site-header');
    var topBar = document.querySelector('.header-top-bar');
    if (!header) return;

    var last = 0;

    window.addEventListener('scroll', function () {
      var cur = window.pageYOffset;

      if (cur > 60) {
        header.classList.add('scrolled');
        if (topBar) topBar.classList.add('hidden-bar');
      } else {
        header.classList.remove('scrolled');
        if (topBar) topBar.classList.remove('hidden-bar');
      }

      if (cur > last && cur > 120) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }

      last = cur <= 0 ? 0 : cur;
    }, { passive: true });
  })();


  /* ============================================================
     05. HERO SLIDESHOW (crossfade)
  ============================================================ */
  (function () {
    var slides = document.querySelectorAll('.hero-bg-slide');
    var dots   = document.querySelectorAll('.hero-dot');
    if (slides.length < 2) return;

    var current = 0;
    var interval = 5000;

    function goTo(n) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    // Initialize
    slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');

    var timer = setInterval(function () { goTo(current + 1); }, interval);

    // Dot click
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(timer);
        goTo(i);
        timer = setInterval(function () { goTo(current + 1); }, interval);
      });
    });
  })();


  /* ============================================================
     06. TYPEWRITER EFFECT
  ============================================================ */
  (function () {
    var el = document.querySelector('.hero-typewriter');
    if (!el) return;

    var phrases = [
      'Discover the Pride of the North...',
      'Where Heritage Meets the Sea...',
      'Ilocos Norte Awaits You...',
      'Explore, Experience, Embrace...'
    ];

    var phraseIndex = 0;
    var charIndex   = 0;
    var isDeleting  = false;
    var speed       = 80;

    el.style.visibility = 'visible';

    function type() {
      var current = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 45;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        speed = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 800);
  })();


  /* ============================================================
     08. SCROLL TRIGGERED ANIMATIONS
  ============================================================ */
  (function () {
    var animEls = document.querySelectorAll('.fade-in, .fade-left, .fade-right, .fade-scale');

    if (!('IntersectionObserver' in window)) {
      animEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    animEls.forEach(function (el) { observer.observe(el); });
  })();


  /* ============================================================
     09. ANIMATED COUNTERS
  ============================================================ */
  (function () {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var dur    = 2000;
        var start  = 0;
        var step   = target / (dur / 16);

        var timer = setInterval(function () {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(start).toLocaleString();
        }, 16);

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  })();


  /* ============================================================
     10. 3D CARD TILT ON MOUSEMOVE
  ============================================================ */
  (function () {
    var tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect   = card.getBoundingClientRect();
        var cx     = rect.left + rect.width / 2;
        var cy     = rect.top  + rect.height / 2;
        var dx     = e.clientX - cx;
        var dy     = e.clientY - cy;
        var maxT   = 14;
        var rotX   = -dy / (rect.height / 2) * maxT;
        var rotY   =  dx / (rect.width  / 2) * maxT;

        card.style.transform =
          'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale3d(1.03,1.03,1.03)';

        var shine = card.querySelector('.tilt-card-shine');
        if (shine) {
          var pctX = ((e.clientX - rect.left) / rect.width) * 100;
          var pctY = ((e.clientY - rect.top)  / rect.height) * 100;
          shine.style.background =
            'radial-gradient(circle at ' + pctX + '% ' + pctY + '%, rgba(255,255,255,0.18) 0%, transparent 60%)';
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'none';
      });
    });
  })();


  /* ============================================================
     11. PARALLAX SCROLLING
  ============================================================ */
  (function () {
    var parallaxEls = document.querySelectorAll('.parallax-bg');
    if (!parallaxEls.length) return;

    window.addEventListener('scroll', function () {
      parallaxEls.forEach(function (el) {
        var section = el.closest('.parallax-section');
        if (!section) return;
        var rect   = section.getBoundingClientRect();
        var pct    = -rect.top / window.innerHeight;
        var offset = pct * 40;
        el.style.transform = 'translateY(' + offset + 'px)';
      });
    }, { passive: true });
  })();


  /* ============================================================
     12. LIGHTBOX
  ============================================================ */
  (function () {
    var overlay  = document.getElementById('lightbox-overlay');
    var img      = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    var prevBtn  = document.getElementById('lightbox-prev');
    var nextBtn  = document.getElementById('lightbox-next');
    if (!overlay) return;

    var allImages = [];
    var currentIdx = 0;

    function open(src, idx) {
      img.src = src;
      currentIdx = idx;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      img.src = '';
    }

    // Collect lightbox images
    document.querySelectorAll('.lightbox-trigger').forEach(function (el, i) {
      allImages.push(el.getAttribute('data-src') || el.src || el.getAttribute('data-bg') || '');
      el.addEventListener('click', function () { open(allImages[i], i); });
    });

    closeBtn && closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    prevBtn && prevBtn.addEventListener('click', function () {
      currentIdx = (currentIdx - 1 + allImages.length) % allImages.length;
      img.style.opacity = '0';
      setTimeout(function () { img.src = allImages[currentIdx]; img.style.opacity = '1'; }, 150);
    });

    nextBtn && nextBtn.addEventListener('click', function () {
      currentIdx = (currentIdx + 1) % allImages.length;
      img.style.opacity = '0';
      setTimeout(function () { img.src = allImages[currentIdx]; img.style.opacity = '1'; }, 150);
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    });
  })();


  /* ============================================================
     13. CAROUSEL (Destination Cards)
  ============================================================ */
  (function () {
    var carousels = document.querySelectorAll('.carousel-wrap');

    carousels.forEach(function (wrap) {
      var track = wrap.querySelector('.carousel-track');
      var prevBtn = wrap.querySelector('.carousel-nav.prev');
      var nextBtn = wrap.querySelector('.carousel-nav.next');
      if (!track) return;

      var offset = 0;
      var items  = track.querySelectorAll('.carousel-item');
      if (!items.length) return;

      function getVisible() {
        var w = wrap.offsetWidth;
        if (w >= 992) return 3;
        if (w >= 576) return 2;
        return 1;
      }

      function maxOffset() {
        var visible  = getVisible();
        var itemW    = track.offsetWidth / visible;
        var max      = (items.length - visible) * itemW;
        return Math.max(0, max);
      }

      function update() {
        track.style.transform = 'translateX(' + (-offset) + 'px)';
      }

      nextBtn && nextBtn.addEventListener('click', function () {
        var visible = getVisible();
        var itemW   = track.offsetWidth / visible;
        offset      = Math.min(offset + itemW, maxOffset());
        update();
      });

      prevBtn && prevBtn.addEventListener('click', function () {
        var visible = getVisible();
        var itemW   = track.offsetWidth / visible;
        offset      = Math.max(0, offset - itemW);
        update();
      });

      window.addEventListener('resize', function () {
        offset = 0;
        update();
      });
    });
  })();


  /* ============================================================
     14. LIVE SEARCH / FILTER
  ============================================================ */
  (function () {
    var searchInput = document.getElementById('dest-search');
    if (!searchInput) return;

    var cards     = document.querySelectorAll('.filterable-card');
    var noResults = document.getElementById('no-results');

    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      var shown = 0;

      cards.forEach(function (card) {
        var text = (card.textContent || '').toLowerCase();
        var match = !query || text.includes(query);
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });

      if (noResults) noResults.style.display = shown === 0 ? 'block' : 'none';
    });
  })();


  /* ============================================================
     15. DARK MODE TOGGLE
  ============================================================ */
  (function () {
    var toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    // Restore saved preference
    if (localStorage.getItem('iln-dark') === '1') {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    }

    toggle.addEventListener('change', function () {
      document.body.classList.toggle('dark-mode', this.checked);
      localStorage.setItem('iln-dark', this.checked ? '1' : '0');
    });
  })();


  /* ============================================================
     16. COOKIE BANNER
  ============================================================ */
  (function () {
    var banner  = document.getElementById('cookie-banner');
    var accept  = document.getElementById('cookie-accept');
    var decline = document.getElementById('cookie-decline');
    if (!banner) return;

    if (!localStorage.getItem('iln-cookie')) {
      setTimeout(function () { banner.classList.add('visible'); }, 2500);
    }

    function dismiss() { banner.classList.remove('visible'); }

    accept  && accept.addEventListener('click',  function () { localStorage.setItem('iln-cookie','1'); dismiss(); showToast('Welcome! Enjoy exploring Ilocos Norte 🌊', 'success'); });
    decline && decline.addEventListener('click',  function () { localStorage.setItem('iln-cookie','0'); dismiss(); });
  })();


  /* ============================================================
     17. TOAST NOTIFICATIONS
  ============================================================ */
  window.showToast = function (msg, type, duration) {
    var existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-msg' + (type ? ' ' + type : '');
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });

    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, duration || 3500);
  };


  /* ============================================================
     18. BACK TO TOP
  ============================================================ */
  (function () {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();


  /* ============================================================
     19. COUNTDOWN TIMER (Pamulinawen Festival — Feb 10 next year)
  ============================================================ */
  (function () {
    var wrap = document.getElementById('countdown-timer');
    if (!wrap) return;

    function getTargetDate() {
      var now  = new Date();
      var year = now.getFullYear();
      var target = new Date(year, 1, 10, 0, 0, 0); // Feb 10
      if (now >= target) target = new Date(year + 1, 1, 10, 0, 0, 0);
      return target;
    }

    function pad(n) { return n < 10 ? '0' + n : n; }

    function tick() {
      var now  = new Date();
      var diff = getTargetDate() - now;
      if (diff <= 0) diff = 0;

      var days  = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins  = Math.floor((diff % 3600000) / 60000);
      var secs  = Math.floor((diff % 60000) / 1000);

      var d = document.getElementById('cd-days');
      var h = document.getElementById('cd-hours');
      var m = document.getElementById('cd-mins');
      var s = document.getElementById('cd-secs');

      if (d) d.textContent = days;
      if (h) h.textContent = pad(hours);
      if (m) m.textContent = pad(mins);
      if (s) s.textContent = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  })();


  /* ============================================================
     20. FORM VALIDATION + PASSWORD STRENGTH
  ============================================================ */
  (function () {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(function (input) {
      input.addEventListener('input', function () {
        var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        this.classList.toggle('valid',   valid && this.value.length > 0);
        this.classList.toggle('invalid', !valid && this.value.length > 0);
        var msg = this.closest('.form-group') && this.closest('.form-group').querySelector('.field-msg');
        if (msg) {
          msg.textContent = this.value.length === 0 ? '' : (valid ? '✓ Valid email' : '✗ Enter a valid email');
          msg.style.color = valid ? '#2ecc71' : '#e74c3c';
        }
      });
    });

    // Password strength
    var pwInput = document.getElementById('password-input');
    var pwBar   = document.getElementById('pw-bar');
    var pwLabel = document.getElementById('pw-label');

    if (pwInput) {
      pwInput.addEventListener('input', function () {
        var val = this.value;
        var score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        var levels = [
          { label: 'Very Weak', color: '#e74c3c', w: '20%' },
          { label: 'Weak',      color: '#e67e22', w: '40%' },
          { label: 'Fair',      color: '#f1c40f', w: '60%' },
          { label: 'Strong',    color: '#2ecc71', w: '80%' },
          { label: 'Very Strong', color: '#1abc9c', w: '100%' }
        ];

        var level = levels[Math.min(score, 4)];
        if (pwBar) { pwBar.style.width = val.length ? level.w : '0%'; pwBar.style.background = level.color; }
        if (pwLabel) { pwLabel.textContent = val.length ? level.label : ''; pwLabel.style.color = level.color; }
      });
    }

    // General required field highlighting
    document.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (this.type === 'email') return; // handled above
        var empty = this.value.trim().length === 0;
        this.classList.toggle('invalid', empty);
        this.classList.toggle('valid', !empty);
      });
    });
  })();


  /* ============================================================
     21. MULTI-STEP SIGNUP FORM
  ============================================================ */
  (function () {
    var steps   = document.querySelectorAll('.form-step');
    var dots    = document.querySelectorAll('.step-dot');
    var nextBtns = document.querySelectorAll('.step-next');
    var prevBtns = document.querySelectorAll('.step-prev');
    if (!steps.length) return;

    var current = 0;

    function showStep(n) {
      steps.forEach(function (s, i) { s.classList.toggle('active', i === n); });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === n);
        d.classList.toggle('done', i < n);
      });
      current = n;
    }

    showStep(0);

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (current < steps.length - 1) showStep(current + 1);
      });
    });

    prevBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (current > 0) showStep(current - 1);
      });
    });
  })();


  /* ============================================================
     22. SMOOTH PAGE TRANSITIONS
  ============================================================ */
  (function () {
    var overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    overlay.classList.add('entering');

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.remove('entering');
        overlay.classList.add('leaving');

        setTimeout(function () {
          window.location.href = href;
        }, 380);
      });
    });
  })();


  /* ============================================================
     23. CUSTOM TABS
  ============================================================ */
  (function () {
    document.querySelectorAll('.custom-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.getAttribute('data-tab');
        var group  = this.closest('[data-tab-group]') || this.parentElement.parentElement;

        group.querySelectorAll('.custom-tab').forEach(function (t) { t.classList.remove('active'); });
        group.querySelectorAll('.tab-content-panel').forEach(function (p) { p.classList.remove('active'); });

        this.classList.add('active');
        var panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('active');
      });
    });
  })();


  /* ============================================================
     24. NEWSLETTER FORM
  ============================================================ */
  (function () {
    var form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!input || !input.value.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      input.value = '';
      showToast('Thank you for subscribing! Welcome to Ilocos Norte. 🌊', 'success');
    });
  })();


  /* ============================================================
     25. TESTIMONIALS SLIDER
  ============================================================ */
  (function () {
    var slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length < 2) return;

    var current = 0;

    function goTo(n) {
      slides[current].style.display = 'none';
      current = (n + slides.length) % slides.length;
      slides[current].style.display = 'block';
    }

    slides.forEach(function (s, i) { s.style.display = i === 0 ? 'block' : 'none'; });

    var next = document.getElementById('testimonial-next');
    var prev = document.getElementById('testimonial-prev');

    next && next.addEventListener('click', function () { goTo(current + 1); });
    prev && prev.addEventListener('click', function () { goTo(current - 1); });

    setInterval(function () { goTo(current + 1); }, 6000);
  })();


  /* ============================================================
     26. CONTACT FORM
  ============================================================ */
  (function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
        form.reset();
        showToast('Message sent! We\'ll get back to you soon. 📬', 'success');
      }, 1500);
    });
  })();


  /* ============================================================
     ACTIVE NAV LINK
  ============================================================ */
  (function () {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-navbar .nav-link, .main-navbar .dropdown-item').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop();
      if (href === page) {
        link.classList.add('active');
        var dropdownItem = link.closest('.dropdown-menu');
        if (dropdownItem) {
          var toggle = dropdownItem.previousElementSibling;
          if (toggle) toggle.classList.add('active');
        }
      }
    });
  })();

}); // DOMContentLoaded
