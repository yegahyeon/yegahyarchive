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

    // 페럴렉스 스크롤

    // 로드 됐을 때 애니메이션
    const introBgw = document.querySelector(".intro-bgw");
    const introBgb = document.querySelector(".intro-bgb");
    const roundList = document.querySelector(".round-list");
    const textPic = document.querySelector(".main-visual");

    const marqueeW = document.querySelector(".marquee:nth-of-type(1)");
    const marqueeB = document.querySelector(".marquee:nth-of-type(2)");

    gsap.registerPlugin(ScrollTrigger);

    const TL = gsap.timeline();

    TL.set(".intro-bgb", {
        scale: 0, // 시작할 때 아주 작은 크기
        xPercent: -50, // 가로 중앙 정렬
        yPercent: -50, // 세로 중앙 정렬
        left: "50%", // 뷰포트 중앙
        top: "50%", // 뷰포트 중앙
    });
    TL.set(".portfoilo", { autoAlpha: 0, y: -1000 });

    TL.to(".intro-bgb", {
        scale: 100, // 최종 크기
        duration: 10, // 애니메이션 지속 시간
        ease: "none", // 이징 함수
        scrollTrigger: {
            trigger: ".main-visual",
            start: "top 0%", // 스크롤 시작 위치
            end: "+=70%",
            // scrub: 1,
            markers: true,
            pin: true,
            scrub: 3,
            toggleActions: "play none none reverse",
        },
    });

    TL.to(
        ".portfoilo",
        {
            autoAlpha: 1,
            y: 0,
            duration: 1,
        },
        "+=1"
        //역스크롤 할 때 다시 제자리
    );

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
