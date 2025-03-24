document.addEventListener("DOMContentLoaded", () => {
    // 레니쮸
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
        console.log(e);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    //스크롤 트리거거
    gsap.registerPlugin(ScrollTrigger);

    const TL = gsap.timeline();

    TL.set(".intro-bgb", {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
    });

    // TL.set(".portfoilo", { scale: 0, left: "50%", top: "50%" });

    // intro-bgb 애니메이션
    TL.to(".intro-bgb", {
        scale: 100,
        duration: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".main-visual",
            start: "top 0%",
            end: "+=120%",
            markers: true,
            pin: true,
            scrub: 3,
            toggleActions: "play none none reverse",
        },
    });

    TL.from(".portfoilo", {
        // duration: 0.5,
        scale: 0,
        opacity: 0,
        duration: 2.5,
        ease: "expo.inOut",
        y: -250,
        scrollTrigger: {
            trigger: "body",
            start: "top 0%",
            end: "+=80%",
            markers: true,
            scrub: 0.5,
            toggleActions: "play none none reverse",
        },
    });

    TL.from(
        ".marquee-bg:nth-of-type(1)",
        {
            opacity: 0,
            duration: 0.3,
            y: -1500,
            scrollTrigger: {
                trigger: "body",
                start: "top 0%",
                end: "+=80%",
                markers: true,
                scrub: 0.5,
                toggleActions: "play none none reverse",
            },
        },
        "+=0.3"
    );

    TL.from(
        ".marquee-bg:nth-of-type(2)",
        {
            opacity: 0,
            duration: 0.5,
            y: 1000,
            scrollTrigger: {
                trigger: "body",
                start: "top 0%",
                end: "+=80%",
                markers: true,
                scrub: 1,
                toggleActions: "play none none reverse",
            },
        },
        "+=10"
    );

    TL.from(".round", {
        opacity: 0,
        duration: 0.5,

        scrollTrigger: {
            trigger: "body",
            start: "top 0%",
            end: "+=80%",
            markers: true,
            scrub: 1,
            toggleActions: "play none none reverse",
        },
    });

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        let windowHeight = window.innerHeight;

        // 🌟 item2: 특정 중심점을 기준으로 원형 회전 (반시계 방향)
        let centerX = window.innerWidth / 2.5; // 중심점 X (화면 중앙)
        let centerY = 100; // 중심점 Y (상단에서 300px 아래)
        let radius = 400; // 회전 반경
        let angle = scrollPosition * 0.001; // 회전 속도 조절

        let x = centerX + Math.cos(angle) * radius; // 원형 궤도의 X 좌표
        let y = centerY + Math.sin(angle) * radius; // 원형 궤도의 Y 좌표

        // 배경 속도 조정 (느리게)

        // 개별 요소 속도 조정 (더 빠르게)
        document.querySelector(".rd-1").style.transform = `translate(-${
            scrollPosition * 0.1
        }px,${scrollPosition * 0.8}px)`;
        let item2 = document.querySelector(".rd-1");
        item2.style.left = `${x}px`;
        item2.style.top = `${y}px`;
        item2.style.transform = `translate(-${scrollPosition * 0.1}px,${
            scrollPosition * 0.8
        }px)`;

        document.querySelector(".rd-2").style.transform = `translate(${
            scrollPosition * 0.5
        }px,${scrollPosition * 1.2}px)`;

        document.querySelector(".rd-3").style.transform = `translate(-${
            scrollPosition * 0.2
        }px,${scrollPosition * 1.2}px)`;
    });
});
