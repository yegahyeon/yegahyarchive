document.addEventListener("DOMContentLoaded", () => {
    const $btnHam = $(".btn-hambugi");
    const $btnHamI = $(".btn-hambugi i");
    const $submenu = $(".menu");

    $btnHam.on("click", () => {
        $btnHam.toggleClass("active");
    });

    const bottomSlider = new Swiper(".bottom-slider", {
        // Optional parameters
        loop: true,
        slidesPerView: 11,
        spaceBetween: 20,
    });

    const selectionSlider = new Swiper(".selection-slider", {
        // Optional parameters
        loop: true,

        // autoplay: true,
        effect: "fade",
        // Navigation arrows
        navigation: {
            nextEl: ".experience-swiper .btn-next",
            prevEl: ".experience-swiper .btn-prev",
        },

        thumbs: { swiper: bottomSlider },

        on: {
            slideChange: function () {
                console.log(this.realIndex);

                const liName = document.querySelectorAll(".list-name li");
                liName.forEach((li) => {
                    li.classList.remove("active");
                    liName[this.realIndex].classList.add("active");
                });
            },
        },
    });
    // selectionSlider.slideTo(1);
});
