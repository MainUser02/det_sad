document.addEventListener('DOMContentLoaded', () => {
    
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

    // --- 2. Плавный скролл (ИСПРАВЛЕНО) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // ВАЖНО: Если ссылка это просто "#", ничего не делаем (это кнопка новостей)
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
                // Игнорируем ошибки селекторов
                console.log("Скролл пропущен для:", targetId);
            }
        });
    });

    // --- 3. Модальное окно новостей (ИСПРАВЛЕНО) ---
    const modal = document.getElementById('news-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close-modal');
    const newsLinks = document.querySelectorAll('.news-link');

    // Проверяем, есть ли вообще окно в HTML, прежде чем работать
    if (modal) {
        newsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const title = link.getAttribute('data-title');
                const text = link.getAttribute('data-text');
                const img = link.getAttribute('data-img');

                // Проверяем каждый элемент перед вставкой (защита от null)
                if (modalTitle) modalTitle.textContent = title;
                if (modalText) modalText.textContent = text;
                if (modalImg) modalImg.src = img;

                modal.classList.add('open');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => modal.classList.remove('open'));
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('open');
        });
    } else {
        console.error("ОШИБКА: Не найден блок <div id='news-modal'> в index.html. Проверьте HTML код.");
    }

    // --- 4. Галерея (Скролл) ---
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

document.addEventListener('DOMContentLoaded', () => {
    
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
            } catch (error) { console.log("Скролл пропущен"); }
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

    // --- 4. ЛАЙТБОКС (Просмотр фото + Скачивание) ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const downloadBtn = document.getElementById('lightbox-download');
        const closeLightbox = document.querySelector('.close-lightbox');

        // Собираем все картинки, которые можно увеличивать
        // .gallery-item img -> Страница галереи
        // .mini-gallery-grid img -> Блок на главной слева
        // .card img -> Креативный слайдер
        const allPhotos = document.querySelectorAll('.gallery-item img, .mini-gallery-grid img, .card img');

        allPhotos.forEach(photo => {
            photo.addEventListener('click', () => {
                const src = photo.src;
                lightboxImg.src = src; // Ставим фото в просмотрщик
                downloadBtn.href = src; // Ставим ссылку для скачивания
                lightbox.classList.add('active'); // Показываем
            });
        });

        // Закрытие лайтбокса
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
        }
        
        // Закрытие по клику на фон
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