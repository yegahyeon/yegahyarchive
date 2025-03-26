const swiper = new Swiper(".swiper", {
    // 기본 셋팅
    direction: "horizontal", // 수평 슬라이드
    loop: true, // 반복 여부
    slidesPerView: 3,
    spaceBetween: 100,

    // 자동 재생
    // autoplay: {
    //     delay: 3000, // 3초마다 슬라이드 넘김
    //     disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
    // },

    // 페이지네이션 (하단 점)
    pagination: {
        el: ".swiper-pagination",
        clickable: true, // 페이지네이션 클릭 가능여부
    },

    // 네비게이션 화살표
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
