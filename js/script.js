$(document).ready(function () {
    const $designer = $(".main-title strong");
    const $aboutContent = $(".about-con");
    const $portfolio = $(".portfoilo");
    const $experience = $(".experience");
    const $designList = $(".design-list");

    // GSAP ScrollTrigger 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // designer 클릭 이벤트 - aboutContent만 처리
    $designer.on("click", function () {
        $(this).toggleClass("active");

        const tl = gsap.timeline({
            defaults: { duration: 1, ease: "power4.out" },
        });

        if ($(this).hasClass("active")) {
            // aboutContent만 나타나는 애니메이션
            tl.to($aboutContent, {
                display: "block",
                opacity: 1,
                x: 0,
                duration: 1,
            });
        } else {
            // aboutContent 사라지는 애니메이션
            tl.to($aboutContent, {
                opacity: 0,
                x: 100,
                duration: 1,
                onComplete: function () {
                    gsap.set($aboutContent, {
                        display: "none",
                    });
                },
            });
        }
    });

    // 나머지 요소들에 대한 스크롤 트리거 설정
    const scrollElements = [$portfolio, $experience, $designList];

    scrollElements.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top center+=100", // 화면 중앙보다 약간 아래에서 시작
                toggleActions: "play none none reverse",
                // markers: true, // 개발 시 스크롤 위치 확인용 (나중에 제거)
            },
            opacity: 0,
            y: 100,
            duration: 1,
            delay: index * 0.3, // 각 요소별로 약간의 딜레이
        });
    });

    // 초기 상태 설정
    gsap.set($aboutContent, {
        display: "none",
        opacity: 0,
        x: 100,
    });
});
