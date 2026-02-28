document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Handler
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
            revealElements();
        }, 800);
    });

    // 2. Scroll Reveal Logic
    const revealElements = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100); // Staggered reveal
        });
    };

    // 3. Ripple Click Effect
    const links = document.querySelectorAll('.link-card');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 4. Parallax Effect on Header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const coverImg = document.querySelector('.cover-photo img');
        if (coverImg) {
            coverImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }

        // Back to Top Visibility
        const btt = document.getElementById('backToTop');
        if (scrolled > 300) {
            btt.style.display = 'block';
        } else {
            btt.style.display = 'none';
        }
    });

    // 5. Back to Top Smooth Scroll
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Intersection Observer for scroll-based reveal (if content added later)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Modal Logic
const modal = document.getElementById('reviewModal');
const openBtn = document.getElementById('openReviews');
const closeBtn = document.querySelector('.close-modal');

openBtn.addEventListener('click', () => modal.classList.add('open'));
closeBtn.addEventListener('click', () => modal.classList.remove('open'));

// Close modal if clicking outside the card
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});

// Modal Carousel Navigation
const mTestimonials = document.querySelectorAll('.modal-testimonial');
const mDots = document.querySelectorAll('.m-dot');
let mIndex = 1;

function updateModal(index) {
    mTestimonials.forEach(t => t.classList.remove('active'));
    mDots.forEach(d => d.classList.remove('active'));
    
    mTestimonials[index].classList.add('active');
    mDots[index].classList.add('active');
}

document.getElementById('nextRev').addEventListener('click', () => {
    mIndex = (mIndex + 1) % mTestimonials.length;
    updateModal(mIndex);
});

document.getElementById('prevRev').addEventListener('click', () => {
    mIndex = (mIndex - 1 + mTestimonials.length) % mTestimonials.length;
    updateModal(mIndex);
});
