document.querySelector("DOMContentLoaded", () => {
    const $btnHam = $(".btn-hambugi");
    const $btnHamI = $(".btn-hambugi i");
    const $submenu = $(".menu");
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    $btnHam.on("click", () => {
        $btnHam.toggleClass("active");
    });
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

    // 스크롤이 active 클래스가 부여됐을 때 스크롤 시 클래스 지움
    let isScrolling = false;
    ScrollTrigger.addEventListener("scrollStart", () => {
        isScrolling = true;
        if (isScrolling) $btnHam.removeClass("active");
    });

    ScrollTrigger.addEventListener("scrollEnd", () => {
        isScrolling = false;
    });
});
