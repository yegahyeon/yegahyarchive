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

    // gsap.registerPluein(ScrollTrigger);

    const TL = gsap.timeline();

    // 로드 됐을 때 애니메이션
    const introBg = document.querySelector(".intro-bg");
    const roundList = document.querySelector(".round-list");
    const textPic = document.querySelector(".main-visual");

    const marqueeW = document.querySelector(".marquee:nth-of-type(1)");
    const marqueeB = document.querySelector(".marquee:nth-of-type(2)");

    // 페럴렉스 스크롤
    window.addEventListener("load", function () {
        updateParallax(); // 초기에 실행하여 위치 설정
    });

    window.addEventListener("scroll", function () {
        updateParallax(); // 스크롤 시 계속 업데이트
    });

    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        let windowHeight = window.innerHeight;

        // 🌟 item2: 특정 중심점을 기준으로 원형 회전 (반시계 방향)
        let centerX = window.innerWidth / 2.5; // 중심점 X (화면 중앙)
        let centerY = 100; // 중심점 Y (상단에서 300px 아래)
        let radius = 400; // 회전 반경
        let angle = scrollPosition * 0.0005; // 회전 속도 조절

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
