document.addEventListener('DOMContentLoaded', function() {
    const decorationsContainer = document.getElementById('decorations');
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8', '#a29bfe', '#fab1a0'];

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 40 + 15;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random() * colors.length)]}88, ${colors[Math.floor(Math.random() * colors.length)]}33)`;
        bubble.style.animationDuration = (Math.random() * 6 + 4) + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        decorationsContainer.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
        }, 12000);
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '★';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.fontSize = (Math.random() * 20 + 15) + 'px';
        star.style.color = colors[Math.floor(Math.random() * colors.length)];
        star.style.animationDuration = (Math.random() * 5 + 5) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        decorationsContainer.appendChild(star);

        setTimeout(() => {
            if (star.parentNode) star.parentNode.removeChild(star);
        }, 12000);
    }

    for (let i = 0; i < 8; i++) {
        createBubble();
    }
    for (let i = 0; i < 6; i++) {
        createStar();
    }

    setInterval(createBubble, 2000);
    setInterval(createStar, 2500);
});
