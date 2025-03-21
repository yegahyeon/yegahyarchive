$(function () {
    const $window = $(window);

    let mouseX = 0,
        mouseY = 0;
    let currentX = 0,
        currentY = 0;
    let targetX = 0,
        targetY = 0;
    const easing = 0.015;
    const scale = 1.2;

    const $btnHam = $(".btn-hambugi");
    const $btnHamI = $(".btn-hambugi i");
    const $submenu = $(".menu");

    $btnHam.on("click", () => {
        $btnHam.toggleClass("active");
    });
    // 갤러리 요소와 설정
    const $gallery = $(".pic-list");
    const $galleryPic = $(".pic-con");

    $window.on("load", () => {
        $galleryPic.classlist.add(".active");
    });
    // 마우스 이벤트
    $window.on("mousemove", (e) => {
        // 화면 중앙 기준으로 마우스 위치 계산 (-1 ~ 1 범위)
        mouseX = (e.clientX / $window.innerWidth() - 0.5) * 2;
        mouseY = (e.clientY / $window.innerHeight() - 0.3) * 2;

        // 이동 범위 계산
        const moveRange = 1000; // 이동 범위 제한 (픽셀 단위)
        targetX = mouseX * moveRange;
        targetY = mouseY * moveRange;
    });

    // 부드러운 애니메이션
    function smoothMove() {
        // 현재 위치 업데이트
        currentX = Number(
            (currentX + (targetX - currentX) * easing).toFixed(1)
        );
        currentY = Number(
            (currentY + (targetY - currentY) * easing).toFixed(1)
        );

        // 갤러리 위치 업데이트
        $gallery.css(
            "transform",
            `translate(${-currentX}px, ${-currentY + 100}px)`
        );

        // 다음 프레임 요청
        requestAnimationFrame(smoothMove);
    }

    // 애니메이션 시작
    smoothMove();
});
