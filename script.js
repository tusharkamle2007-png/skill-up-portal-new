/* =========================================================
   SKILL UP
   INDEX PAGE JAVASCRIPT
   CURSOR + PARTICLE REPULSION EFFECT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".index-page");

    if (!page) return;


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursor = document.querySelector(".custom-cursor");
    const ring = document.querySelector(".custom-cursor-ring");
    const spotlight = document.querySelector(".cursor-spotlight");


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let spotlightX = mouseX;
    let spotlightY = mouseY;


    if (cursor && ring && spotlight) {

        /* ================= MOUSE MOVE ================= */

        document.addEventListener("mousemove", function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

        });


        /* ================= SMOOTH CURSOR ================= */

        function animateCursor() {

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            spotlightX += (mouseX - spotlightX) * 0.08;
            spotlightY += (mouseY - spotlightY) * 0.08;


            ring.style.left = ringX + "px";
            ring.style.top = ringY + "px";

            spotlight.style.left = spotlightX + "px";
            spotlight.style.top = spotlightY + "px";


            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        /* ================= HOVER EFFECT ================= */

        const hoverElements = document.querySelectorAll(
            "a, button, input, select, textarea, .step-box"
        );


        hoverElements.forEach(function (element) {

            element.addEventListener("mouseenter", function () {

                page.classList.add("cursor-hover");

            });


            element.addEventListener("mouseleave", function () {

                page.classList.remove("cursor-hover");

            });

        });


        /* ================= CLICK EFFECT ================= */

        document.addEventListener("mousedown", function () {

            ring.style.transform =
                "translate(-50%, -50%) scale(0.75)";

        });


        document.addEventListener("mouseup", function () {

            ring.style.transform =
                "translate(-50%, -50%) scale(1)";

        });

    }


    /* =====================================================
       PARTICLE CANVAS
       ===================================================== */

    const canvas = document.getElementById("particleCanvas");

    if (!canvas) return;


    const ctx = canvas.getContext("2d");

    const hero = document.querySelector(".index-hero");

    if (!hero) return;


    let particles = [];

    let animationFrame;


    /* =====================================================
       CURSOR REPULSION SETTINGS
       ===================================================== */

    const REPULSION_RADIUS = 180;

    /*
       Increase this value if you want particles
       to move away more strongly.
    */

    const REPULSION_FORCE = 1.8;

    /*
       Controls how quickly the pushed particles
       return to their normal movement.
    */

    const DAMPING = 0.94;


    /* =====================================================
       RESIZE CANVAS
       ===================================================== */

    function resizeCanvas() {

        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;

        createParticles();

    }


    /* =====================================================
       CREATE PARTICLES
       ===================================================== */

    function createParticles() {

        particles = [];


        const amount =
            window.innerWidth < 700
                ? 25
                : 55;


        for (let i = 0; i < amount; i++) {

            particles.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,


                /* NORMAL SPEED */

                speedX:
                    (Math.random() - 0.5) * 0.30,

                speedY:
                    (Math.random() - 0.5) * 0.30,


                /* EXTRA CURSOR PUSH VELOCITY */

                pushX: 0,

                pushY: 0,


                /* PARTICLE SIZE */

                size:
                    Math.random() * 1.8 + 0.7,


                /* PARTICLE OPACITY */

                opacity:
                    Math.random() * 0.45 + 0.15

            });

        }

    }


    /* =====================================================
       GET CURSOR POSITION INSIDE HERO
       ===================================================== */

    function getCursorPosition() {

        const rect = hero.getBoundingClientRect();

        return {

            x: mouseX - rect.left,

            y: mouseY - rect.top

        };

    }


    /* =====================================================
       APPLY CURSOR REPULSION
       ===================================================== */

    function applyRepulsion(particle, cursorPosition) {

        const dx =
            particle.x - cursorPosition.x;

        const dy =
            particle.y - cursorPosition.y;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* Cursor is outside influence area */

        if (
            distance <= 0 ||
            distance >= REPULSION_RADIUS
        ) {

            return;

        }


        /* Direction AWAY from cursor */

        const nx = dx / distance;
        const ny = dy / distance;


        /*
           Stronger force when particle
           is closer to cursor.
        */

        const strength =
            (1 - distance / REPULSION_RADIUS) *
            REPULSION_FORCE;


        particle.pushX +=
            nx * strength;

        particle.pushY +=
            ny * strength;

    }


    /* =====================================================
       DRAW PARTICLES
       ===================================================== */

    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const cursorPosition =
            getCursorPosition();


        /* =================================================
           PARTICLE MOVEMENT
           ================================================= */

        particles.forEach(function (particle) {


            /* CURSOR REPULSION */

            applyRepulsion(
                particle,
                cursorPosition
            );


            /* NORMAL MOVEMENT + PUSH */

            particle.x +=
                particle.speedX +
                particle.pushX;

            particle.y +=
                particle.speedY +
                particle.pushY;


            /* SLOW DOWN PUSH */

            particle.pushX *= DAMPING;
            particle.pushY *= DAMPING;


            /* =================================================
               WRAP AROUND
               ================================================= */

            if (particle.x < 0) {

                particle.x =
                    canvas.width;

            }


            if (particle.x > canvas.width) {

                particle.x = 0;

            }


            if (particle.y < 0) {

                particle.y =
                    canvas.height;

            }


            if (particle.y > canvas.height) {

                particle.y = 0;

            }


            /* =================================================
               DRAW PARTICLE
               ================================================= */

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(255,107,0," +
                particle.opacity +
                ")";


            ctx.fill();

        });


        /* =====================================================
           CONNECTION LINES
           ===================================================== */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p1 = particles[i];
                const p2 = particles[j];


                const dx =
                    p1.x - p2.x;

                const dy =
                    p1.y - p2.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 120) {

                    const opacity =
                        (1 - distance / 120) *
                        0.13;


                    ctx.beginPath();

                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );

                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );


                    ctx.strokeStyle =
                        "rgba(20,33,61," +
                        opacity +
                        ")";


                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }


        /* =====================================================
           NEXT FRAME
           ===================================================== */

        animationFrame =
            requestAnimationFrame(
                drawParticles
            );

    }


    /* =====================================================
       START
       ===================================================== */

    resizeCanvas();

    drawParticles();


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            resizeCanvas();

        }
    );


    /* =====================================================
       CLEANUP
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            cancelAnimationFrame(
                animationFrame
            );

        }
    );

});