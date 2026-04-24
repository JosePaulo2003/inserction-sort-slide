document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ffeaa7', '#fdcb6e', '#55efc4', '#74b9ff', '#a29bfe', '#fd79a8', '#fab1a0'];

    function createParticle() {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 25 + 10;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDuration = (Math.random() * 5 + 5) + 's';
        p.style.animationDelay = Math.random() * 4 + 's';
        particlesContainer.appendChild(p);
        setTimeout(() => {
            if (p.parentNode) p.parentNode.removeChild(p);
        }, 12000);
    }

    for (let i = 0; i < 12; i++) createParticle();
    setInterval(createParticle, 2500);

    const arrayContainer = document.getElementById('arrayContainer');
    const playBtn = document.getElementById('playBtn');
    const resetBtn = document.getElementById('resetBtn');
    const progressFill = document.getElementById('progressFill');
    const stepsList = document.getElementById('stepsList');
    const stepItems = document.querySelectorAll('.step-item');

    const originalValues = [5, 2, 4, 1, 3];
    let isAnimating = false;

    function createBlocks(values) {
        arrayContainer.innerHTML = '';
        values.forEach((val, idx) => {
            const block = document.createElement('div');
            block.classList.add('array-block');
            block.dataset.value = val;
            block.dataset.index = idx;
            const img = document.createElement('img');
            img.src = '../assets/images/imagem_1.png';
            img.alt = 'girafa ' + val;
            block.appendChild(img);
            arrayContainer.appendChild(block);
        });
    }

    function getBlocks() {
        return Array.from(arrayContainer.querySelectorAll('.array-block'));
    }

    function reset() {
        isAnimating = false;
        playBtn.disabled = false;
        playBtn.querySelector('.btn-icon').textContent = '▶';
        playBtn.childNodes[2].textContent = ' Play';
        createBlocks([...originalValues]);
        progressFill.style.width = '0%';
        stepItems.forEach(item => {
            item.classList.remove('active', 'completed');
        });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function highlightStep(stepIndex, completed) {
        stepItems.forEach((item, idx) => {
            item.classList.remove('active');
            if (completed && idx < stepIndex) {
                item.classList.add('completed');
            } else if (!completed && idx === stepIndex) {
                item.classList.add('active');
            }
        });
        const progress = ((stepIndex + 1) / stepItems.length) * 100;
        progressFill.style.width = progress + '%';
    }

    async function animateInsertionSort() {
        if (isAnimating) return;
        isAnimating = true;
        playBtn.disabled = true;

        const blocks = getBlocks();
        const values = blocks.map(b => parseInt(b.dataset.value));

        highlightStep(0, false);
        blocks[1].classList.add('active');
        await delay(800);

        for (let i = 1; i < values.length; i++) {
            const keyVal = values[i];
            let j = i - 1;

            blocks[i].classList.remove('active');
            blocks[i].classList.add('compare');
            highlightStep(1, false);
            await delay(700);

            while (j >= 0 && values[j] > keyVal) {
                highlightStep(2, false);
                blocks[j].classList.add('shifted');
                await delay(500);

                values[j + 1] = values[j];
                blocks[j + 1].dataset.value = values[j];
                blocks[j + 1].classList.add('insert');
                setTimeout(() => blocks[j + 1].classList.remove('insert'), 500);

                blocks[j].classList.remove('shifted');
                j--;
                await delay(500);
            }

            values[j + 1] = keyVal;
            blocks[j + 1].dataset.value = keyVal;
            blocks[j + 1].classList.add('insert');
            setTimeout(() => blocks[j + 1].classList.remove('insert'), 500);

            blocks.forEach(b => b.classList.remove('compare', 'shifted'));
            for (let k = 0; k <= i; k++) {
                blocks[k].classList.add('sorted');
            }

            highlightStep(3, false);
            await delay(600);

            if (i < values.length - 1) {
                highlightStep(4, false);
                blocks[i + 1].classList.add('active');
                await delay(700);
                blocks[i + 1].classList.remove('active');
            }
        }

        stepItems.forEach(item => item.classList.add('completed'));
        progressFill.style.width = '100%';
        isAnimating = false;
        playBtn.disabled = false;
        playBtn.querySelector('.btn-icon').textContent = '▶';
        playBtn.childNodes[2].textContent = ' Play';
    }

    playBtn.addEventListener('click', animateInsertionSort);
    resetBtn.addEventListener('click', reset);

    stepItems.forEach((item, idx) => {
        item.addEventListener('click', function() {
            if (isAnimating) return;
            stepItems.forEach((si, i) => {
                si.classList.remove('active');
                if (i <= idx) si.classList.add('completed');
                else si.classList.remove('completed');
            });
            this.classList.add('active');
            progressFill.style.width = ((idx + 1) / stepItems.length * 100) + '%';
        });
    });

    createBlocks([...originalValues]);
});
