// ========================================
// IA ACADEMY LANDING PAGE - JAVASCRIPT
// Funcionalidades e Interatividade
// ========================================

// === CONFIGURAÇÃO DO LINK DE PAGAMENTO ===
// Altere esta URL para o link real de pagamento
const PAYMENT_URL = 'https://pay.kiwify.com.br/6QxYkMF';

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initCTAButtons();
    initHeaderScroll();
    initSmoothScroll();
});

// === ANIMAÇÕES DE SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos com animação
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
}

// === CONFIGURAÇÃO DOS BOTÕES CTA ===
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animação de clique
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // Redirecionar para página de pagamento
            setTimeout(() => {
                window.location.href = PAYMENT_URL;
            }, 200);

            // Tracking (adicione seu código de analytics aqui)
            trackCTAClick(button);
        });

        // Efeito de hover mais intenso
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// === HEADER STICKY COM EFEITO DE SCROLL ===
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Adicionar classe quando rolar
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// === SMOOTH SCROLL PARA ÂNCORAS ===
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar se for só # (usado nos botões CTA)
            if (href === '#' || href === '#checkout') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === TRACKING DE ANALYTICS ===
function trackCTAClick(button) {
    const buttonText = button.textContent.trim();
    const buttonLocation = button.classList.contains('cta-header') ? 'header' : 
                          button.classList.contains('cta-large') ? 'final' : 'hero';
    
    // Google Analytics (descomentar quando configurado)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'cta_click', {
    //         'event_category': 'CTA',
    //         'event_label': buttonLocation,
    //         'value': buttonText
    //     });
    // }

    // Meta Pixel (descomentar quando configurado)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'Lead', {
    //         content_name: buttonText,
    //         content_category: buttonLocation
    //     });
    // }

    console.log('CTA Click tracked:', { buttonText, buttonLocation });
}

// === ANIMAÇÕES ADICIONAIS DE MICROINTERAÇÕES ===

// Efeito parallax suave no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contador animado (pode ser usado para estatísticas)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// === DETECÇÃO DE MOBILE ===
function isMobile() {
    return window.innerWidth <= 768;
}

// === PREVENÇÃO DE BOUNCE ===
// Adicionar intent de saída (exit intent) para recuperar visitantes
let exitIntentShown = false;

document.addEventListener('mouseleave', function(e) {
    // Só mostrar no desktop e se o mouse sair pela parte superior
    if (!exitIntentShown && !isMobile() && e.clientY <= 0) {
        exitIntentShown = true;
        // Aqui você pode adicionar um modal de exit intent
        console.log('Exit intent detected - adicionar modal aqui');
    }
});

// === LOG DE INICIALIZAÇÃO ===
console.log('IA Academy Landing Page carregada com sucesso!');

console.log('Para alterar o link de pagamento, edite a variável PAYMENT_URL no início deste arquivo.');


