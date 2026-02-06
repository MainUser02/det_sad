document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (burger && nav) {
        // Открытие/закрытие по клику на бургер
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Если меню открыто, блокируем прокрутку сайта
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при клике на любую ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 1. Слайдер (Hero) ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // --- 2. Плавный скролл ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Игнорируем заглушки #
            if (targetId === '#' || !targetId) {
                e.preventDefault(); 
                return; 
            }

            e.preventDefault();
            try {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.log("Пропуск скролла для:", targetId);
            }
        });
    });

    // --- 3. Модальное окно НОВОСТЕЙ ---
    const newsModal = document.getElementById('news-modal');
    if (newsModal) {
        const newsImg = newsModal.querySelector('#modal-img');
        const newsTitle = newsModal.querySelector('#modal-title');
        const newsText = newsModal.querySelector('#modal-text');
        const closeNews = newsModal.querySelector('.close-modal');
        
        document.querySelectorAll('.news-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if(newsTitle) newsTitle.textContent = link.getAttribute('data-title');
                if(newsText) newsText.textContent = link.getAttribute('data-text');
                if(newsImg) newsImg.src = link.getAttribute('data-img');
                newsModal.classList.add('open');
            });
        });

        if (closeNews) closeNews.addEventListener('click', () => newsModal.classList.remove('open'));
        window.addEventListener('click', (e) => {
            if (e.target === newsModal) newsModal.classList.remove('open');
        });
    }

    // --- 4. ЛАЙТБОКС (Фото + Скачивание) ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const downloadBtn = document.getElementById('lightbox-download');
        const closeLightbox = document.querySelector('.close-lightbox');
        const allPhotos = document.querySelectorAll('.gallery-item img, .mini-gallery-grid img, .card img');

        allPhotos.forEach(photo => {
            photo.addEventListener('click', () => {
                lightboxImg.src = photo.src;
                downloadBtn.removeAttribute('href'); 
                lightbox.classList.add('active');
            });
        });

        // Скачивание
        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const imageUrl = lightboxImg.src;
            downloadBtn.textContent = "⏳ Загрузка...";
            
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'photo-' + Date.now() + '.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
                downloadBtn.textContent = "⬇ Скачать фото";
            } catch (error) {
                window.open(imageUrl, '_blank');
                downloadBtn.textContent = "Не удалось скачать";
            }
        });

        if (closeLightbox) closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    // --- 5. Скролл галереи мышкой ---
    const carousel = document.querySelector('.creative-carousel');
    if (carousel) {
        let isDown = false;
        let startX, scrollLeft;
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => isDown = false);
        carousel.addEventListener('mouseup', () => isDown = false);
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});