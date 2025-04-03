document.addEventListener("DOMContentLoaded", () => {
    const $window = $(window);

    let mouseX = 0,
        mouseY = 0;
    let currentX = 0,
        currentY = 0;
    let targetX = 0,
        targetY = 0;
    const easing = 0.015;
    const scale = 1.2;

    $(".btn-hambugi").on("click", () => {
        $(".btn-hambugi").toggleClass("active");

        // if ($btnHam.hasClass("active")) {
        //     // 스크롤 이벤트 바인딩
        //     window.on("scroll", () => {
        //         $btnHam.removeClass("active");
        //     });
        // }
    });
    // 갤러리 요소와 설정
    const $container = $(".pic-list");
    const $card = $(".pic-con");

    window.addEventListener("load", () => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = document.querySelectorAll(".pic-con");
        const container = document.querySelector(".pic-list");
        const containerRect = container.getBoundingClientRect();

        // 컨테이너를 9개의 구역으로 나누기 (3x3)
        const zones = [];
        const zoneWidth = containerRect.width / 5;
        const zoneHeight = containerRect.height / 5;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                zones.push({
                    x: i * zoneWidth,
                    y: j * zoneHeight,
                    width: zoneWidth,
                    height: zoneHeight,
                    used: false,
                });
            }
        }

        // 각 카드의 최종 위치를 계산
        cards.forEach((card, index) => {
            const isOdd = index % 2 === 0;
            const cardWidth = isOdd ? 200 : 300;
            const cardHeight = isOdd ? 250 : 350;

            // 사용 가능한 구역 찾기
            let availableZones = zones.filter((zone) => !zone.used);
            if (availableZones.length === 0) {
                // 모든 구역이 사용 중이면 모든 구역을 다시 사용 가능하게 설정
                zones.forEach((zone) => (zone.used = false));
                availableZones = zones;
            }

            // 랜덤하게 구역 선택
            const selectedZone =
                availableZones[
                    Math.floor(Math.random() * availableZones.length)
                ];
            selectedZone.used = true;

            // 선택된 구역 내에서 랜덤한 위치 계산 (여백 고려)
            const padding = 20; // 여백
            const maxX =
                selectedZone.x + selectedZone.width - cardWidth - padding;
            const maxY =
                selectedZone.y + selectedZone.height - cardHeight - padding;

            // 랜덤 위치 계산 시 화면 경계 고려
            let finalX = Math.max(
                selectedZone.x + padding,
                Math.min(
                    maxX,
                    selectedZone.x +
                        Math.random() * (selectedZone.width - cardWidth)
                )
            );
            let finalY = Math.max(
                selectedZone.y + padding,
                Math.min(
                    maxY,
                    selectedZone.y +
                        Math.random() * (selectedZone.height - cardHeight)
                )
            );

            // 화면 경계 체크 및 조정
            if (finalX + cardWidth > containerRect.width) {
                finalX = containerRect.width - cardWidth - padding;
            }
            if (finalY + cardHeight > containerRect.height) {
                finalY = containerRect.height - cardHeight - padding;
            }

            // GSAP 애니메이션 설정
            gsap.to(card, {
                x: finalX - containerRect.width / 2,
                y: finalY - containerRect.height / 2,
                duration: 1,
                delay: 2,
                ease: "power2.out",
            });
        });
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
        $container.css(
            "transform",
            `translate(${-currentX}px, ${-currentY + 100}px)`
        );

        // 다음 프레임 요청
        requestAnimationFrame(smoothMove);
    }

    // 애니메이션 시작
    smoothMove();
});
