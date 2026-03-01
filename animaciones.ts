// ===== CUENTA REGRESIVA AL 1 DE MARZO =====
function updateCountdown(){
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthday = new Date(currentYear, 2, 1);

    if(now > birthday){
        birthday = new Date(currentYear + 1, 2, 1);
    }

    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML =
        `Faltan ${days}d ${hours}h ${minutes}m ${seconds}s 🎉`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ===== VELA =====
const candle = document.getElementById("candle");
const surprise = document.getElementById("surprise");

candle.addEventListener("click", () => {
    candle.textContent = "🕯️✨";
    surprise.style.display = "block";
    launchFireworks();
});


// ===== REGALO =====
const gift = document.getElementById("gift");
const giftMessage = document.getElementById("giftMessage");

gift.addEventListener("click", () => {
    gift.style.display = "none";
    giftMessage.style.display = "block";
    launchFireworks();
});


// ===== FUEGOS ARTIFICIALES =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function launchFireworks(){
    for(let i = 0; i < 180; i++){
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 7 + 2,
            radius: Math.random() * 3 + 1,
            life: 100,
            color: `hsl(${Math.random()*360},100%,60%)`
        });
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if(p.life <= 0){
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();