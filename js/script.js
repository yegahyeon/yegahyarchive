$(document).ready(function () {
    const $body = $("body");
    const $progress = $(".progress");
    const $progressText = $(".progress-text");

    const $mainTitle = $(".main-title");
    const $b = $(".about-wrap .main-title .hide ");
    const $designer = $(".main-title strong");
    const $designerH = $(".main-title strong span");
    const $question = $(".main-title strong b");
    const $aboutContent = $(".about-con");
    const $portfolio = $(".portfoilo");
    const $experience = $(".experience");
    const $designList = $(".design-list");

    const $picMe = $(".pic-me");

    const $face = $(".faces");

    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
        // console.log(e);
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.onload = function () {
        setTimeout(function () {
            scrollTo(0, 0);
        }, 100);
    };

    // 로딩
    const imgLoad = imagesLoaded($body);
    const imgTotal = imgLoad.images.length;
    let imgLoaded = 0;

    // // 부드러운 갱신을 위한 변수 (전역설정의 필요)
    // let current = 0;

    // imgLoad.on("progress", (instance, image) => {
    //     imgLoaded++;
    //     const progress = Math.floor((imgLoaded / imgTotal) * 100);

    //     current += (progress - current) * 0.001;

    //     $progressText.text(progress + "%");

    //     if (progress === 100) {
    //         $progress.fadeOut(1000);
    //     }
    // });

    // 스크롤이 active 클래스가 부여됐을 때 스크롤 시 클래스 지움
    let isScrolling = false;
    ScrollTrigger.addEventListener("scrollStart", () => {
        isScrolling = true;
        if (isScrolling) $(".btn-hambugi").removeClass("active");
    });

    ScrollTrigger.addEventListener("scrollEnd", () => {
        isScrolling = false;
    });

    // GSAP ScrollTrigger 플러그인 등록
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    const firstTL = gsap.timeline();

    firstTL.from($mainTitle, {
        scale: 0,
        x: 1000,
        y: 1000,
        duration: 1.5,
        ease: CustomEase.create(
            "custom",
            "M0,0 C0.135,0 0.251,0.377 0.284,0.5 0.33,0.667 0.405,0.963 0.414,1 0.423,0.985 0.444,0.939 0.578,0.905 0.939,0.862 1,1 1,1 "
        ),
    });

    // 초기에 스크롤 막기
    // $("body").css("overflow", "hidden");

    // designer 클릭 이벤트
    $designer.on("click", function () {
        $(this).toggleClass("active");

        const tl = gsap.timeline({
            defaults: { duration: 0.5, ease: "power4.out" },
        });

        if ($(this).hasClass("active")) {
            // active 상태일 때
            // 스크롤 허용
            // $('body').css('overflow', 'auto');

            // 기존 애니메이션

            tl.to(".main-title .hide", {
                opacity: 0,
                y: -50,
                duration: 0.3,
            });

            tl.to($mainTitle, {
                scale: 0.6,
                transformOrigin: "0px 100px",
            });
            tl.to($designer, {
                scale: 4.0,
                transformOrigin: "left bottom",
                transition: "0.1s",
            });
            tl.to($picMe, {
                opacity: 1,
                x: 0,
                duration: 1,
                display: "block",
            });
            // aboutContent 나타나는 애니메이션
            tl.to($aboutContent, {
                display: "block",
                opacity: 1,
                x: 0,
                duration: 0.5,
            });
        } else {
            // active 해제될 때
            // 스크롤 막기
            // $('body').css('overflow', 'hidden');

            // 페이지 최상단으로 부드럽게 스크롤
            gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: "power2.inOut",
                onComplete: function () {
                    // 기존 애니메이션

                    tl.to($picMe, {
                        opacity: 0,
                        x: 100,
                        duration: 0.5,
                        onComplete: function () {
                            gsap.set($aboutContent, {
                                display: "none",
                            });
                        },
                    });
                    tl.to($aboutContent, {
                        opacity: 0,
                        x: 100,
                        duration: 0.5,
                        onComplete: function () {
                            gsap.set($aboutContent, {
                                display: "none",
                            });
                        },
                    });
                    tl.to($mainTitle, {
                        scale: 1,
                        transformOrigin: "0 100px",
                    });
                    tl.to(
                        $designer,
                        {
                            scale: 1,
                            transformOrigin: "left bottom",
                            ease: "bounce.out",
                            transition: "0.1s",
                        },
                        "<"
                    );
                    tl.to(".main-title .hide", {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
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
                start: "top 70%", // 화면 중앙보다 약간 아래에서 시작
                toggleActions: "play none none reverse",
                // markers: true, // 개발 시 스크롤 위치 확인용 (나중에 제거)
            },
            opacity: 0,
            y: 100,
            duration: 2,
            // delay: index * 0.3, // 각 요소별로 약간의 딜레이
        });
    });

    // 초기 상태 설정
    gsap.set([$aboutContent, $picMe], {
        display: "none",
        opacity: 0,
        x: 100,
    });

    // 초기 상태 설정에 hide 클래스 요소 추가
    gsap.set(".main-title .hide", {
        opacity: 1,
        y: 0,
    });

    // 기존스와이퍼 인덱스값 담기
});
