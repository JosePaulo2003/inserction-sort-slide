document.addEventListener('DOMContentLoaded', function() {
    const branchTipos = document.getElementById('branchTipos');
    const branchCasos = document.getElementById('branchCasos');
    const connLines = document.querySelectorAll('.conn-line');
    const confettiContainer = document.getElementById('confettiContainer');

    setTimeout(() => {
        connLines.forEach(line => line.classList.add('animate'));
    }, 800);

    branchTipos.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });

    branchCasos.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });


    function createConfetti() {
        const colors = ['#ff7675', '#fdcb6e', '#74b9ff', '#55efc4', '#a29bfe', '#fab1a0', '#ff9ff3'];
        for (let i = 0; i < 30; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random() * 100 + '%';
            conf.style.background = colors[Math.floor(Math.random() * colors.length)];
            conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            conf.style.width = (6 + Math.random() * 8) + 'px';
            conf.style.height = (6 + Math.random() * 8) + 'px';
            conf.style.animationDuration = (2 + Math.random() * 3) + 's';
            confettiContainer.appendChild(conf);
            setTimeout(() => conf.remove(), 5000);
        }
    }

    setTimeout(createConfetti, 1200);
});
