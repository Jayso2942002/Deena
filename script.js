 const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Firework {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = color;
        for (let i = 0; i < 100; i++) {
          this.particles.push({
            x: this.x,
            y: this.y,
            vx: random(-5, 5),
            vy: random(-5, 5),
            alpha: 1
          });
        }
      }

      draw() {
        this.particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color},${p.alpha})`;
          ctx.fill();
        });
      }

      update() {
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.01;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
      }
    }

    const fireworks = [];

    function animate() {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) {
        fireworks.push(new Firework(random(100, canvas.width-100), random(100, canvas.height-200),
          `${Math.floor(random(0,255))},${Math.floor(random(0,255))},${Math.floor(random(0,255))}`));
      }

      fireworks.forEach(fw => {
        fw.update();
        fw.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });