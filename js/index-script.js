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
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const contact = document.querySelector("#contact");
    const project = document.querySelector("#project");
    //scroll to 400 pixels down from the top
    contact.addEventListener("click", () => {
        gsap.to(window, { duration: 2, scrollTo: ".contact" });
    });
    project.addEventListener("click", () => {
        gsap.to(window, { duration: 2, scrollTo: ".design-list" });
    });

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
            start: "top 100",
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
            duration: 1,
            y: -1500,
            scrollTrigger: {
                trigger: "body",
                start: "top 200",
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
            duration: 1,
            y: 1000,
            scrollTrigger: {
                trigger: "body",
                start: "top 300",
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
        let centerY = 300; // 중심점 Y (상단에서 300px 아래)
        let radius = 400; // 회전 반경
        let angle = scrollPosition * 0.001; // 회전 속도 조절

        let x = centerX + Math.cos(angle) * radius; // 원형 궤도의 X 좌표
        let y = centerY + Math.sin(angle) * radius; // 원형 궤도의 Y 좌표

        // 배경 속도 조정 (느리게)

        // 개별 요소 속도 조정 (더 빠르게)
        document.querySelector(".rd-1").style.transform = `translate(-${
            scrollPosition * 0.2
        }px,${scrollPosition * 0.8}px)`;
        let item2 = document.querySelector(".rd-1");
        item2.style.left = `${x}px`;
        item2.style.top = `${y}px`;
        item2.style.transform = `translate(-${scrollPosition * 0.2}px,${
            scrollPosition * 1
        }px)`;

        document.querySelector(".rd-2").style.transform = `translate(${
            scrollPosition * 0.4
        }px,${scrollPosition * 0.9}px)`;

        document.querySelector(".rd-3").style.transform = `translate(-${
            scrollPosition * 0.2
        }px,${scrollPosition * 1}px)`;
    });

    // Matter.js 모듈 가져오기
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
        Matter;

    // 엔진과 렌더러 생성
    const engine = Engine.create();
    engine.world.gravity.y = 1; // 중력 설정 (기본값은 1)

    const render = Render.create({
        element: document.getElementById("container"),
        engine: engine,
        options: {
            width: window.innerWidth * 0.5, // #container의 너비와 일치시킵니다
            height: window.innerHeight * 0.48, // #container의 높이와 일치시킵니다
            wireframes: false, // 경계선 제거
            background: "transparent",
        },
    });

    // 벽 생성 (모두 #container 안에 위치)
    const containerWidth = window.innerWidth * 0.5;
    const containerHeight = window.innerHeight * 0.48;

    const walls = [
        Bodies.rectangle(
            containerWidth / 2,
            containerHeight,
            containerWidth,
            20,
            {
                isStatic: true,
                restitution: 0.8,
                render: {
                    visible: false, // 벽의 경계선 제거
                },
            }
        ), // 하단 벽
        Bodies.rectangle(0, containerHeight / 2, 20, containerHeight, {
            isStatic: true,
            restitution: 0.8,
            render: {
                visible: false, // 벽의 경계선 제거
            },
        }), // 왼쪽 벽
        Bodies.rectangle(
            containerWidth,
            containerHeight / 2,
            20,
            containerHeight,
            {
                isStatic: true,
                restitution: 0.8,
                render: {
                    visible: false, // 벽의 경계선 제거
                },
            }
        ), // 오른쪽 벽
    ];

    // 월드에 벽 추가
    World.add(engine.world, walls);

    // 공 생성 함수
    function createBall(x, y, radius, color) {
        return Bodies.circle(x, y, radius, {
            restitution: 0.5, // 바운스 효과 추가
            render: {
                fillStyle: color,
            },
        });
    }

    // 공 추가 함수
    function addBalls() {
        const balls = [];
        for (let i = 0; i < 100; i++) {
            const x = containerWidth - 50; // 오른쪽에서 시작
            const y = -50; // 화면 위쪽 보이지 않는 곳에서 시작
            const color = i === 0 ? "#FF3B00" : "#D3AF1C"; // 첫 번째 공은 빨간색
            const ball = createBall(x, y, 20, color);
            balls.push(ball);
        }
        World.add(engine.world, balls);
    }

    // 마우스 제어 추가
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false,
            },
        },
    });

    // 월드에 마우스 제어 추가
    World.add(engine.world, mouseConstraint);

    // 엔진과 렌더러 실행
    Engine.run(engine);
    Render.run(render);

    // GSAP ScrollTrigger 설정
    ScrollTrigger.create({
        trigger: "#container", // 스크롤 트리거 요소
        start: "top center", // 스크롤 시작 지점
        onEnter: () => addBalls(), // 스크롤 트리거가 시작되면 공 추가
        once: true, // 처음 한 번만 실행
    });
});
