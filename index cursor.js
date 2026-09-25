/* =========================================================
   SKILL UP
   PARTICLES + SPRING / INERTIA CURSOR
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const page =
        document.querySelector(".index-page");

    const hero =
        document.querySelector(".index-hero");

    if (!page || !hero) return;


    /* =====================================================
       PARTICLE CANVAS
       ===================================================== */

    const canvas =
        document.getElementById("particleCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let particles = [];

        let particleMouseX = -1000;
        let particleMouseY = -1000;

        let particleCount =
            window.innerWidth <= 768 ? 35 : 75;


        function resizeCanvas() {

            canvas.width =
                hero.offsetWidth;

            canvas.height =
                hero.offsetHeight;
        }


        class Particle {

            constructor() {

                this.x =
                    Math.random() *
                    canvas.width;

                this.y =
                    Math.random() *
                    canvas.height;

                this.size =
                    Math.random() * 2.5 + .8;

                this.speedX =
                    (Math.random() - .5) * .35;

                this.speedY =
                    (Math.random() - .5) * .35;

                this.alpha =
                    Math.random() * .45 + .15;

                this.orange =
                    Math.random() > .55;
            }


            update() {

                this.x += this.speedX;
                this.y += this.speedY;


                if (
                    this.x < 0 ||
                    this.x > canvas.width
                ) {
                    this.speedX *= -1;
                }


                if (
                    this.y < 0 ||
                    this.y > canvas.height
                ) {
                    this.speedY *= -1;
                }


                /* Mouse repel */

                const dx =
                    this.x - particleMouseX;

                const dy =
                    this.y - particleMouseY;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                const radius = 130;


                if (
                    distance < radius &&
                    distance > 0
                ) {

                    const force =
                        (radius - distance) /
                        radius;

                    this.x +=
                        (dx / distance) *
                        force *
                        2.2;

                    this.y +=
                        (dy / distance) *
                        force *
                        2.2;
                }
            }


            draw() {

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    this.orange

                    ? `rgba(255,140,0,${this.alpha})`

                    : `rgba(20,33,61,${this.alpha * .7})`;


                ctx.fill();
            }
        }


        function createParticles() {

            particles = [];

            particleCount =
                window.innerWidth <= 768
                    ? 35
                    : 75;


            for (
                let i = 0;
                i < particleCount;
                i++
            ) {

                particles.push(
                    new Particle()
                );
            }
        }


        function connectParticles() {

            const maxDistance = 105;


            for (
                let a = 0;
                a < particles.length;
                a++
            ) {

                for (
                    let b = a + 1;
                    b < particles.length;
                    b++
                ) {

                    const dx =
                        particles[a].x -
                        particles[b].x;

                    const dy =
                        particles[a].y -
                        particles[b].y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance < maxDistance
                    ) {

                        const opacity =
                            (1 -
                            distance / maxDistance)
                            * .12;


                        ctx.beginPath();

                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );

                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );


                        ctx.strokeStyle =
                            `rgba(20,33,61,${opacity})`;

                        ctx.lineWidth = .7;

                        ctx.stroke();
                    }
                }
            }
        }


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(
                particle => {

                    particle.update();

                    particle.draw();
                }
            );


            connectParticles();


            requestAnimationFrame(
                animateParticles
            );
        }


        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                particleMouseX =
                    event.clientX -
                    rect.left;

                particleMouseY =
                    event.clientY -
                    rect.top;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                particleMouseX = -1000;
                particleMouseY = -1000;
            }
        );


        resizeCanvas();

        createParticles();

        animateParticles();


        window.addEventListener(
            "resize",
            () => {

                resizeCanvas();

                createParticles();
            }
        );
    }


    /* =====================================================
       CURSOR
       ===================================================== */

    const dot =
        document.querySelector(
            ".custom-cursor"
        );

    const ring =
        document.querySelector(
            ".custom-cursor-ring"
        );

    const spotlight =
        document.querySelector(
            ".cursor-spotlight"
        );


    if (
        !dot ||
        !ring ||
        !spotlight
    ) {
        return;
    }


    /* =====================================================
       MOUSE POSITION
       ===================================================== */

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;


    /* Ring position */

    let ringX = mouseX;
    let ringY = mouseY;


    /* Spotlight position */

    let glowX = mouseX;
    let glowY = mouseY;


    /* Spring velocity */

    let velocityX = 0;
    let velocityY = 0;


    /* Physics */

    const stiffness = .12;
    const damping = .78;


    /* =====================================================
       MOUSE MOVE
       ===================================================== */

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            /* Dot follows immediately */

            dot.style.left =
                mouseX + "px";

            dot.style.top =
                mouseY + "px";
        }
    );


    /* =====================================================
       SPRING RING
       ===================================================== */

    function animateCursor() {

        const dx =
            mouseX - ringX;

        const dy =
            mouseY - ringY;


        velocityX +=
            dx * stiffness;

        velocityY +=
            dy * stiffness;


        velocityX *= damping;
        velocityY *= damping;


        ringX += velocityX;
        ringY += velocityY;


        ring.style.left =
            ringX + "px";

        ring.style.top =
            ringY + "px";


        /* Spotlight smoother than ring */

        glowX +=
            (mouseX - glowX) * .08;

        glowY +=
            (mouseY - glowY) * .08;


        spotlight.style.left =
            glowX + "px";

        spotlight.style.top =
            glowY + "px";


        requestAnimationFrame(
            animateCursor
        );
    }


    animateCursor();


    /* =====================================================
       HOVER EFFECT
       ===================================================== */

    const hoverElements =
        page.querySelectorAll(
            "a, button, .floating-card, .step-box, .hero-badge"
        );


    hoverElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    page.classList.add(
                        "cursor-hover"
                    );
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    page.classList.remove(
                        "cursor-hover"
                    );
                }
            );
        }
    );


    /* =====================================================
       PAGE ENTER / LEAVE
       ===================================================== */

    page.addEventListener(
        "mouseenter",
        () => {

            dot.style.opacity = "1";

            ring.style.opacity = "1";

            spotlight.style.opacity = "1";
        }
    );


    page.addEventListener(
        "mouseleave",
        () => {

            dot.style.opacity = "0";

            ring.style.opacity = "0";

            spotlight.style.opacity = "0";

            page.classList.remove(
                "cursor-hover"
            );
        }
    );


    /* =====================================================
       MOBILE
       ===================================================== */

    function checkDevice() {

        const mobile =
            window.innerWidth <= 768 ||
            window.matchMedia(
                "(pointer: coarse)"
            ).matches;


        if (mobile) {

            page.style.cursor = "auto";

            dot.style.display = "none";

            ring.style.display = "none";

            spotlight.style.display = "none";

        } else {

            page.style.cursor = "none";

            dot.style.display = "block";

            ring.style.display = "block";

            spotlight.style.display = "block";
        }
    }


    checkDevice();


    window.addEventListener(
        "resize",
        checkDevice
    );

});