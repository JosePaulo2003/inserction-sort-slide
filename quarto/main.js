document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.info-card');
    const bars = document.querySelectorAll('.chart-bar');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');

            cards.forEach(c => c.classList.remove('expanded'));

            if (!isExpanded) {
                this.classList.add('expanded');
                createSparkles(this);
            }
        });
    });

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 80) + 'px';
            sparkle.style.fontSize = '1.2rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '200';
            sparkle.style.opacity = '1';
            sparkle.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(sparkle);

            requestAnimationFrame(() => {
                sparkle.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -40px) scale(0)`;
                sparkle.style.opacity = '0';
            });

            setTimeout(() => sparkle.remove(), 800);
        }
    }

    function animateBars() {
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const height = bar.getAttribute('data-height');
                bar.style.height = height + '%';
            }, 1400 + index * 300);
        });
    }

    animateBars();

    document.querySelectorAll('.floating-decoration').forEach((dec, i) => {
        dec.style.left = (5 + i * 18) + '%';
    });
});
