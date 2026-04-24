document.addEventListener('DOMContentLoaded', function() {
    const shapesContainer = document.getElementById('shapes');
    const colors = ['#81ecec', '#ffeaa7', '#fab1a0', '#a29bfe', '#55efc4', '#fd79a8'];
    const shapeTypes = ['circle', 'square', 'triangle'];

    function createShape() {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const size = Math.random() * 30 + 15;
        const color = colors[Math.floor(Math.random() * colors.length)];

        shape.style.left = Math.random() * 100 + 'vw';
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.animationDuration = (Math.random() * 5 + 6) + 's';
        shape.style.animationDelay = Math.random() * 3 + 's';

        if (type === 'circle') {
            shape.style.borderRadius = '50%';
            shape.style.background = color;
        } else if (type === 'square') {
            shape.style.borderRadius = '6px';
            shape.style.background = color;
        } else {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = (size/2) + 'px solid transparent';
            shape.style.borderRight = (size/2) + 'px solid transparent';
            shape.style.borderBottom = size + 'px solid ' + color;
            shape.style.background = 'transparent';
        }

        shapesContainer.appendChild(shape);
        setTimeout(() => {
            if (shape.parentNode) shape.parentNode.removeChild(shape);
        }, 15000);
    }

    for (let i = 0; i < 10; i++) {
        createShape();
    }
    setInterval(createShape, 3000);

    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});
