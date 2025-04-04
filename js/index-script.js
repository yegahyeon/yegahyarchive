document.addEventListener("DOMContentLoaded", () => {
    // 햄부기 버튼
    const $btnHam = $(".btn-hambugi");
    const $btnHamI = $(".btn-hambugi i");
    const $submenu = $(".menu");

    const $contact = $("#contact");
    const $project = $("#project");
    const $btnUp = $(".btn-home");
    const $btnCt = $(".menu li:nth-of-type(4)");
    const $btnPj = $(".menu li:nth-of-type(2)");

    const $designList = $(".design-list");

    // 레니쮸
    const lenis = new Lenis({
        WheelEventsTarget: document.body,
    });

    lenis.on("scroll", (e) => {
        // console.log(e);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let ballsAdded = false; // addBalls 함수가 실행되었는지 추적하는 변수

    $(window).on("scroll", function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > $(document).height() * 0.7) {
            $(".contact").show();
            if (!ballsAdded) {
                addBalls();
                ballsAdded = true;
            }
        } else {
            $(".contact").hide();
        }
    });

    $btnHam.on("click", () => {
        $btnHam.toggleClass("active");

        // if ($btnHam.hasClass("active")) {
        //     // 스크롤 이벤트 바인딩
        //     window.on("scroll", () => {
        //         $btnHam.removeClass("active");
        //     });
        // }
    });

    //스크롤 트리거거
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // contact 클릭 이벤트
    $contact.on("click", function () {
        gsap.to(window, {
            duration: 2,
            scrollTo: ".spacer",
        });
    });

    // project 클릭 이벤트
    $project.on("click", function () {
        gsap.to(window, {
            duration: 2,
            scrollTo: ".design-list",
        });
    });

    // 위로 가기 버튼 클릭 이벤트
    $btnUp.on("click", function () {
        gsap.to(window, {
            duration: 1,
            scrollTo: "body",
        });
    });
    $btnCt.on("click", function () {
        gsap.to(window, { duration: 1, scrollTo: ".spacer" });
    });
    $btnPj.on("click", function () {
        gsap.to(window, { duration: 1, scrollTo: ".design-list" });
    });

    $(".pop-up-web .btn-top").on("click", function () {
        gsap.to(".pop-up-web-img ", {
            duration: 1,
            scrollTo: 0,
        });
    });
    const TL = gsap.timeline();

    // TL.set('.intro-bgb', {
    //     scale: 1,
    //     xPercent: -50,
    //     yPercent: -50,
    //     left: '50%',
    //     top: '50%',
    // });

    // scroll down 애니메이션
    TL.from(".scroll-down b", {
        y: -20,
        duration: 1,
        ease: "power1.inOut",
        yoyo: 1,
        repeat: -1,
    });
    // intro-bgb 애니메이션
    TL.to(".intro-bgb", {
        scale: 50,
        duration: 10,
        ease: "none",
        scrollTrigger: {
            trigger: ".main-visual",
            start: "top 0%",
            end: "+=100%",
            // markers: true,
            pin: true,
            scrub: 2,
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
            // markers: true,
            scrub: 0.5,
            toggleActions: "play none none reverse",
        },
    });

    TL.from(".marquee-bg:nth-of-type(1)", {
        opacity: 0,
        duration: 1,
        y: -1500,
        scrollTrigger: {
            trigger: "body",
            start: "top 200",
            end: "+=80%",
            // markers: true,
            scrub: 0.5,
            toggleActions: "play none none reverse",
        },
    });

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
                // markers: true,
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
            start: "top -10%",
            end: "+=80%",
            // markers: true,
            scrub: 1,
            toggleActions: "play none none reverse",
        },
    });

    gsap.utils.toArray(".design-box").forEach((webBox, i) => {
        gsap.from(webBox, {
            opacity: 0,
            y: -50,
            duration: 0.5,

            ease: "power2.out",
            scrollTrigger: {
                trigger: webBox,
                start: "top 40%",
                // markers: true,
                // end: "bottom 50%",
                toggleActions: "play none none reverse",
            },
        });
    });

    gsap.utils.toArray(".gnb li").forEach((gnb, i) => {
        gsap.from(gnb, {
            y: "100%",
            opacity: 0,
            // duration: 0.3,
            ease: "circ.out",
            // stagger: 0.1,
            scrollTrigger: {
                trigger: gnb,
                start: "bottom 80%",
                // markers: true,
                // end: "bottom 50%",
                toggleActions: "play none none reverse",
            },
        });
    });

    const meTxt = document.querySelector(".me h2");
    const dTxt = document.querySelector(".me strong");
    const text = new SplitType(meTxt, { types: "words" });
    console.log(text.words);

    gsap.from(text.words, {
        opacity: 0,
        x: 50,
        filter: "blur(10px)",
        duration: 1.5,
        stagger: 0.5,
        scrollTrigger: {
            trigger: ".main",
            start: "top 0%",
            // markers: true,
            toggleActions: "play none none reverse",
        },
    });
    gsap.from(dTxt, {
        opacity: 0,
        y: -150,
        filter: "blur(5px)",
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".main",
            start: "top 0%",
            toggleActions: "play none none reverse",
        },
    });

    gsap.from(dTxt, { x: -50, filter: "blur(10px)", duration: 2 }, "<");

    // 스크롤이 active 클래스가 부여됐을 때 스크롤 시 클래스 지움
    let isScrolling = false;
    ScrollTrigger.addEventListener("scrollStart", () => {
        isScrolling = true;
        if (isScrolling) $btnHam.removeClass("active");
    });

    ScrollTrigger.addEventListener("scrollEnd", () => {
        isScrolling = false;
    });

    // 애니메이션 재실행 안되게

    // 초기 상태 설정
    // btn-wrap 애니메이션 수정
    gsap.set(".btn-wrap", {
        opacity: 0,
        x: 100,
    });

    ScrollTrigger.create({
        trigger: ".design-list",
        start: "top 0%",
        end: "top 0%",
        // markers: true, // 디버깅용

        onEnter: () => {
            gsap.to(".btn-wrap", {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
            });
        },

        onLeaveBack: () => {
            gsap.to(".btn-wrap", {
                opacity: 0,
                x: 100,
                duration: 1,
                ease: "power2.in",
            });
        },
    });

    // 정의

    const $webD = $(".design-title h3");
    const $graphicD = $(".design-title h4");

    const $webDC = $(".web-design");
    const $graphicDC = $(".graphic-design");

    // 기본화면
    $webD.addClass("active");
    $graphicDC.hide();

    // 공통의 움직임을 위한 정의

    gsap.from($webD, {
        opacity: 0,
        x: -50,
        ease: "none",
        filter: "blur(5px)",
        scrollTrigger: {
            trigger: ".main",
            start: "bottom 10%",
            // markers: true,
            toggleActions: "play none none reverse",
        },
    });

    gsap.from($graphicD, {
        opacity: 0,
        x: 50,
        ease: "none",
        filter: "blur(5px)",
        delay: 0.5,
        scrollTrigger: {
            trigger: ".main",
            start: "bottom 10%",
            // markers: true,
            toggleActions: "play none none reverse",
        },
    });

    // h4을 눌렀을 때 graphic 박스 보이게
    $graphicD.on("click", function () {
        $(this).addClass("active");
        $webD.removeClass("active");

        if ($(this).hasClass("active")) {
            $webDC.hide();
            $(".design-bg").hide();
            $graphicDC.show();
            gsap.from($graphicDC, {
                duration: 0.5,
                opacity: 0,
                y: 100,
                display: "block",
                ease: "power2.out",
            });
        }
    });
    $webD.on("click", function () {
        $(this).addClass("active");
        $graphicD.removeClass("active");

        if ($(this).hasClass("active")) {
            $webDC.show();
            $graphicDC.hide();
        }

        gsap.from($webDC, {
            duration: 0.5,
            opacity: 0,
            y: 100,
            display: "block",
            ease: "power2.out",
        });
    });

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        let windowHeight = window.innerHeight;

        // 🌟 item2: 특정 중심점을 기준으로 원형 회전 (반시계 방향)
        let centerX = window.innerWidth / 2.5; // 중심점 X (화면 중앙)
        let centerY = 300; // 중심점 Y (상단에서 300px 아래)
        let radius = 300; // 회전 반경
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
            scrollPosition * 0.85
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
            const x = containerWidth - 60; // 오른쪽에서 시작
            const y = -50; // 화면 위쪽 보이지 않는 곳에서 시작
            const color = i === 50 ? "#FF3B00" : "#D3AF1C"; // 첫 번째 공은 빨간색
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

    // 복사 기능 구현
    const copyElements = document.querySelectorAll(".contact dd");

    copyElements.forEach((element) => {
        element.style.cursor = "pointer"; // 마우스 커서를 포인터로 변경

        element.addEventListener("click", async () => {
            const text = element.innerText;

            try {
                await navigator.clipboard.writeText(text);

                // 복사 성공 시 시각적 피드백
                const originalText = element.innerText;
                element.innerText = "Copied!";

                // 1초 후 원래 텍스트로 복귀
                setTimeout(() => {
                    element.innerText = originalText;
                }, 1000);
            } catch (err) {
                console.error("Failed to copy text: ", err);
            }
        });
    });

    // graphic design 에 첫번재 li 는 로딩 됐을 때 항시 active~
    const $graphicLi = $(".graphic-design li");
    const $imgBox = $(".graphic-design .img-box");
    const $verMore = $(".graphic-design span:nth-of-type(1)");
    const $viewMore = $(".graphic-design span:nth-of-type(2)");

    const $popUp = $(".pop-up");
    const $popUpBtn = $(".pop-up-con button");
    const $popUpImg = $(".pop-up-con figure");
    const $blur = $(".blur");

    $(".graphic-design li:nth-of-type(1)").addClass("active");

    /// 그래픽임!!!!!!!!!!
    let imgIndex = 0;
    $graphicLi.on("click", function () {
        $(".graphic-design ul li").removeClass("active"); // 모든 li에서 active 제거
        $(this).addClass("active");
        imgIndex = $(this).index();
        // console.log(imgIndex);
        $imgBox.html(`<img src="./img/sh${imgIndex + 1}.jpg" alt="" />`);

        gsap.from($imgBox, { opacity: 0, duration: 0.5 });
    });

    // 팝업창 띄우기

    $imgBox.on("click", function () {
        $popUp.show();
        $blur.show();

        $popUpImg.html(`<img src="./img/graphic${imgIndex + 1}.png" alt="" />`);

        gsap.from($(".pop-up-con"), {
            opacity: 0,
            duration: 0.5,
        });
        gsap.from($blur, {
            opacity: 0,
            duration: 0.6,
        });
    });

    [$popUpBtn, $blur].forEach(($el) => {
        $el.on("click", function () {
            $popUp.hide();
            $blur.hide();
        });
    });

    // 사진 나오게 하기

    const $webDBox = $(".design-box");
    const $webDImg = $(".pop-up-web figure");

    const $popUpW = $(".pop-up-web");
    const $popUpBtnW = $(".btn-web .btn-close");
    const $blurW = $(".blur-web");

    const $btnLink1 = $(".links .link1");
    const $btnLink2 = $(".links .link2");

    $btnLink1.on("click", (e) => {
        e.preventDefault();
        window.open(link1);
    });
    $btnLink2.on("click", (e) => {
        e.preventDefault();
        window.open(link2);
    });

    let link1;
    let link2;

    $webDBox.on("click", function () {
        // 선택한 박스의 index 구하기
        const wImgIndex = $(this).index();
        // console.log(wImgIndex);

        link1 = $(this).data("link1");
        link2 = $(this).data("link2");
        console.log(link1, link2);

        //인덱스에 해당하는 이미지 보여주기
        $webDImg.html(`<img src="./img/web${wImgIndex + 1}.jpg" alt="" />`);
        // $webDImg.html(`<img src="./img/web${wImgIndex + 1}.jpg" alt="" />`);

        $popUpW.show();
        $blurW.show();

        gsap.from($(".pop-up-web"), {
            opacity: 0,
            duration: 0.5,
        });
        gsap.from($blurW, {
            opacity: 0,
            duration: 0.6,
        });
    });

    [$popUpBtnW, $blurW].forEach(($eW) => {
        $eW.on("click", function () {
            $popUpW.hide();
            $blurW.hide();
        });
    });

    // graphicD webD img에서 커서 움직이기
    let cursorx = 0,
        cursory = 0,
        cursormx = 0,
        cursormy = 0;

    const cursorSpeed = 0.1;

    const $cursor = $(".cursor");
    const $webDThumb = $(".design-con .thumb");

    gsap.set($cursor, { autoAlpha: 0, scale: 0 });

    [$imgBox, $webDThumb].forEach(($ei) => {
        $ei.on("mousemove", function (e) {
            // console.log(e);
            cursorx = e.pageX;
            cursory = e.pageY;

            gsap.to($cursor, { left: cursorx, top: cursory });
        });
        $ei.on("mouseenter", function () {
            gsap.to($cursor, { autoAlpha: 1, scale: 1 });
        });
        $ei.on("mouseleave", function () {
            gsap.to($cursor, { autoAlpha: 0, scale: 0 });
        });
    });

    // 애니메이션 재생방지
});
