const cinemagraphs = document.querySelectorAll('.cinemagraph-speed');
if(cinemagraphs.length > 0){
    cinemagraphs.forEach(graph => {
        graph.playbackRate = 0.75;
        console.log(`Cinemagraph speed: ${graph.playbackRate * 100}%`);
    });
}