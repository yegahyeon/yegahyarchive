document.addEventListener("DOMContentLoaded", () => {
    const bottomSlider = new Swiper(".bottom-slider", {
        // Optional parameters
        // loop: true,
        slidesPerView: 11,
        spaceBetween: 20,
    });

    const selectionSlider = new Swiper(".selection-slider", {
        // Optional parameters
        // loop: true,

        autoplay: true,
        effect: "fade",
        // Navigation arrows
        navigation: {
            nextEl: ".experience-swiper .btn-next",
            prevEl: ".experience-swiper .btn-prev",
        },

        thumbs: { swiper: bottomSlider },
    });
});
