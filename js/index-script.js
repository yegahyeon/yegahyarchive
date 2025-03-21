$(function () {
    const $rd1 = $(".rd-1");
    const $rd2 = $(".rd-2");
    const $rd3 = $(".rd-3");

    let ypos; // 스크롤 위치를 추적하기위한 변수

    //패럴랙스 효과를 관리하는 함수
    function parallax() {
        ypos = $(window).scollTop(); // 현재 window의 스크롤 위치를 가져옯니다
        // updatePosition(".round-list", ypos, 0.8, "top"); // 배경에 대한 top 위치 업데이트
        updatePosition($(".rd-3"), ypos, 0.2, "margin-top"); // 빠른 속도로 움직이는 요소 위치 업데이트

        function updatePosition(selector, scrollPos, factor, type) {
            $(selector).css(type, `${scrollPos * factor}px`); // 계산된 값을 사용하여 CSS 속성값을 부여

            // 스크롤 이벤트가 발생할 때 parallax 함수를 호출
            $(window).on("scroll", function () {
                requestAnimationFrame(parallax);
            });

            parallax();
        }
    }
});
