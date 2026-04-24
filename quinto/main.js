document.addEventListener('DOMContentLoaded', function() {
    const barsRow = document.getElementById('barsRow');
    const addDataBtn = document.getElementById('addDataBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timeValue = document.getElementById('timeValue');
    const spaceValue = document.getElementById('spaceValue');
    const elementsValue = document.getElementById('elementsValue');

    let dataPoints = [];
    const maxPoints = 6;

    const timeData = [12, 28, 62, 118, 210, 380];
    const spaceData = [8, 14, 22, 32, 44, 58];
    const nValues = [5, 10, 20, 35, 50, 75];

    function animateNumber(element, target, duration = 800) {
        const start = parseInt(element.textContent) || 0;
        const range = target - start;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.round(start + range * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    function createParticles(x, y) {
        const colors = ['🎉', '✨', '⭐', '🌟', '💫', '🎊'];
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 150 + 'px');
            particle.style.setProperty('--ty', (Math.random() - 0.5) * 150 - 50 + 'px');
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    function addDataPoint() {
        if (dataPoints.length >= maxPoints) {
            addDataBtn.textContent = 'Máximo Atingido!';
            setTimeout(() => {
                addDataBtn.innerHTML = '<span class="btn-icon">📊</span>Adicionar Dados';
            }, 1500);
            return;
        }

        const index = dataPoints.length;
        dataPoints.push(index);

        const group = document.createElement('div');
        group.className = 'bar-group';
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px)';
        group.style.transition = 'all 0.5s ease-out';

        const pair = document.createElement('div');
        pair.className = 'bar-pair';

        const timeBar = document.createElement('div');
        timeBar.className = 'chart-bar bar-time';

        const spaceBar = document.createElement('div');
        spaceBar.className = 'chart-bar bar-space';

        const label = document.createElement('span');
        label.className = 'bar-n-label';
        label.textContent = 'n=' + nValues[index];

        pair.appendChild(timeBar);
        pair.appendChild(spaceBar);
        group.appendChild(pair);
        group.appendChild(label);
        barsRow.appendChild(group);

        requestAnimationFrame(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            const timePct = Math.min((timeData[index] / 400) * 100, 100);
            const spacePct = Math.min((spaceData[index] / 400) * 100, 100);
            timeBar.style.height = timePct + '%';
            spaceBar.style.height = spacePct + '%';

            const rect = group.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, 100);

        const totalTime = timeData.slice(0, index + 1).reduce((a, b) => a + b, 0);
        const totalSpace = spaceData.slice(0, index + 1).reduce((a, b) => a + b, 0);
        const totalElements = nValues.slice(0, index + 1).reduce((a, b) => a + b, 0);

        animateNumber(timeValue, totalTime);
        animateNumber(spaceValue, totalSpace);
        animateNumber(elementsValue, totalElements);
    }

    function resetChart() {
        barsRow.innerHTML = '';
        dataPoints = [];
        timeValue.textContent = '0';
        spaceValue.textContent = '0';
        elementsValue.textContent = '0';
    }

    addDataBtn.addEventListener('click', addDataPoint);
    resetBtn.addEventListener('click', resetChart);

    for (let i = 0; i < 3; i++) {
        setTimeout(addDataPoint, 600 + i * 400);
    }
});
