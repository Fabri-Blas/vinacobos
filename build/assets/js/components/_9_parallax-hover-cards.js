const felinoMomentos = document.getElementById('felino-momentos-first');

if (felinoMomentos) {
    const felinoCards = document.querySelectorAll('.momentos-card');
    felinoMomentos.addEventListener('mousemove', (e) => {
        felinoCards.forEach(card => {
            const speed = card.getAttribute('data-speed');

            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            card.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}