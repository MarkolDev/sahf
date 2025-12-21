// ======================
// ОСНОВНОЙ ФАЙЛ JS ДЛЯ САЙТА
// ======================

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // 1. МОБИЛЬНОЕ МЕНЮ
    // ======================
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.innerHTML = navList.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ======================
    // 2. ПЛАВНАЯ ПРОКРУТКА
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ======================
    // 3. АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ ПРОКРУТКЕ
    // ======================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', highlightNavLink);
    }
    
    // ======================
    // 4. АНИМАЦИЯ ПРИ СКРОЛЛЕ
    // ======================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.action-card, .feature, .character-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.action-card, .feature, .character-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем при загрузке
    
    // ======================
    // 5. КНОПКА "НАВЕРХ"
    // ======================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Стили для кнопки
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #FF9800;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // ======================
    // 6. ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ
    // ======================
    // Подсветка текущей страницы в меню
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ======================
    // 7. АНИМАЦИЯ КНОПОК
    // ======================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ======================
    // 8. ЗАГРУЗКА ИЗОБРАЖЕНИЙ С ОШИБКАМИ
    // ======================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const altText = this.alt || 'Изображение';
            const colors = ['#FF9800', '#4CAF50', '#2196F3', '#9C27B0'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const textColor = randomColor === '#FF9800' ? '000000' : 'ffffff';
            
            this.src = `https://via.placeholder.com/400x300/${randomColor.replace('#', '')}/${textColor}?text=${encodeURIComponent(altText)}`;
            this.style.border = `3px solid ${randomColor}`;
        });
    });
    
    // ======================
    // 9. АДАПТИВНЫЙ ЗАГОЛОВОК
    // ======================
    function adjustHeroTitle() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && window.innerWidth < 768) {
            heroTitle.style.fontSize = '2.2rem';
        } else if (heroTitle) {
            heroTitle.style.fontSize = '';
        }
    }
    
    window.addEventListener('resize', adjustHeroTitle);
    adjustHeroTitle();
    
    // ======================
    // 10. УВЕДОМЛЕНИЕ О ЗАГРУЗКЕ
    // ======================
    console.log('🚀 Сайт "Самолётик и его друзья" загружен!');
    console.log('📚 Страницы: Главная, Аудио, Чтение, Персонажи, Получить книгу');
    console.log('🎨 Стиль: Весёлые цвета (оранжевый, зелёный, жёлтый)');
    console.log('📱 Адаптивный дизайн: Mobile-first');
    
});

// ======================
// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ======================

// Форматирование времени (для аудиоплеера)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Создание снежинок (новогодний эффект)
function createSnowflakes() {
    if (!document.querySelector('.snowflakes') && document.body) {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snowflakes';
        snowContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(snowContainer);
        
        // Создаем снежинки только на главной и новогодних страницах
        const currentPage = window.location.pathname;
        if (currentPage.includes('index') || currentPage.includes('audio') || currentPage.includes('read')) {
            for (let i = 0; i < 30; i++) {
                const snowflake = document.createElement('div');
                snowflake.innerHTML = '❄';
                snowflake.style.cssText = `
                    position: absolute;
                    color: white;
                    font-size: ${Math.random() * 20 + 10}px;
                    opacity: ${Math.random() * 0.5 + 0.3};
                    top: -50px;
                    left: ${Math.random() * 100}%;
                    animation: fall ${Math.random() * 5 + 5}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                snowContainer.appendChild(snowflake);
            }
            
            // Добавляем CSS анимацию
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Запускаем снежинки через 2 секунды после загрузки
setTimeout(createSnowflakes, 2000);

// Определение типа устройства
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);

if (isMobile) {
    document.documentElement.classList.add('mobile-device');
} else if (isTablet) {
    document.documentElement.classList.add('tablet-device');
} else {
    document.documentElement.classList.add('desktop-device');
}