document.addEventListener('DOMContentLoaded', () => {
    
    // --- TWINNING/FLIPPING HEXAGONS ---
    const hexSpace = document.getElementById('hexagon-space');
    const hexCount = 24; 

    for (let i = 0; i < hexCount; i++) {
        let hex = document.createElement('div');
        hex.classList.add('hexagon');
        
        let size = anime.random(30, 200); 
        hex.style.width = size + 'px';
        hex.style.height = size + 'px';
        
        hex.style.left = anime.random(0, 90) + 'vw';
        hex.style.top = anime.random(-20, 100) + 'vh'; 
        
        hexSpace.appendChild(hex);

        anime({
            targets: hex,
            translateY: [
                { value: '-=120vh', duration: anime.random(3000, 7500) }
            ],
            rotateX: [ { value: anime.random(180, 360), duration: anime.random(5000, 15000) } ],
            rotateY: [ { value: anime.random(180, 360), duration: anime.random(5000, 15000) } ],
            rotateZ: [ { value: anime.random(-45, 45), duration: anime.random(5000, 15000) } ],
            easing: 'linear',
            loop: true
        });
    }

    // --- RANDOM CIRCLE/BUBBLE SPAWN BURSTS (AIDA Virus merge) ---
    const bubbleSpace = document.getElementById('bubble-space');

    function triggerBubbleBurst() {
        const burstCount = anime.random(30, 80);
        
        const originX = anime.random(20, 80);
        const originY = anime.random(20, 80);
        
        for (let i = 0; i < burstCount; i++) {
            let bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            let size = anime.random(30, 80);
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = originX + 'vw';
            bubble.style.top = originY + 'vh';
            
            bubbleSpace.appendChild(bubble);

            let tl = anime.timeline({
                complete: function() {
                    bubble.remove(); 
                }
            });

            // Spawn-In (Scale up and fade in)
            tl.add({
                targets: bubble,
                scale: [0, 1],
                opacity: [0, 1],
                translateX: anime.random(-150, 50),
                translateY: anime.random(-150, 50),
                duration: anime.random(500, 750),
                easing: 'easeOutExpo'
            });

            // Peak Hold (Solid Glitching)
            let peakDuration = anime.random(3000, 5000); 
            let flickerSegments = 15; 
            let flickerTime = peakDuration / flickerSegments;

            for (let f = 0; f < flickerSegments; f++) {
                tl.add({
                    targets: bubble,
                    // Opacity stays locked at 100%
                    scale: () => anime.random(50, 120) / 100, 
                    duration: flickerTime,
                    easing: 'easeInOutQuad'
                });
            }

            // Spawn-Out
            tl.add({
                targets: bubble,
                scale: 0,
                opacity: 0,
                duration: anime.random(500, 750),
                easing: 'easeInExpo'
            });
        }
        
        setTimeout(triggerBubbleBurst, anime.random(6000, 7500));
    }

    triggerBubbleBurst();
});