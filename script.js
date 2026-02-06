document.addEventListener('DOMContentLoaded', () => {
    
    // --- Логика Слайдера (Hero) ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        
        // Автоматическое переключение каждые 5 секунд
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // --- Плавный скролл до якорей ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Креативная галерея: автоматическая прокрутка (опционально) ---
    const carousel = document.querySelector('.creative-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Добавляем возможность драгать мышкой
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => { isDown = false; });
        carousel.addEventListener('mouseup', () => { isDown = false; });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Скорость прокрутки
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});