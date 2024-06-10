// 텍스트 보드 이벤트
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = ''; // 텍스트 초기화
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

window.onload = function () {
    setTimeout(function () {
        var dialogue = document.getElementById('dialogueChat');
        var dialogueCharacter = document.getElementById('dialogueCharacter');
        var characterCaptain = document.querySelector('.characterCaptain');
        var characterRaccon = document.querySelector('.characterRaccon');
        var ship = document.querySelector('.ship');

        // 여러 텍스트의 경우
        var texts = [
            { text: '표를 구매하셨으면 이제 배가 오니까 기다려주세요!', speed: 100 ,character: '오리선장' },
            { text: '. . .', speed: 620 ,character: '너구리선생' },
            { text: '오! 왔다!', speed: 60,character: '너구리선생'  },
            { text: '저 배를 타고 이제 여행을 떠나는거야!', speed: 110, character: '너구리선생' },
        ];

        // 하나씩 나타나게
        function typeNextText(index) {
            if (index < texts.length) {
                if (texts[index].character) {
                    dialogueCharacter.textContent = texts[index].character;
                }
                typeWriter(dialogue, texts[index].text, texts[index].speed, function() {
                    if (texts[index].text === '. . .') {
                        ship.style.visibility = 'visible';
                        animateShipToCenter(ship);
                    }
                    setTimeout(function() {
                        typeNextText(index + 1); 
                    }, 1000); // 텍스트 간의 간격
                });
            } else {
                // 다음 페이지로 이동
                setTimeout(function() {
                    // window.location.href = 'introSceneHarborByTicket.html';
                }, 800); 
            }
        }

        function animateShipToCenter(ship) {
            let currentLeft = 110; 
            const interval = setInterval(function() {
                if (currentLeft > 50) { // 중앙 도달
                    currentLeft -= 0.5; // 0.5% 이동
                    ship.style.left = currentLeft + '%';
                } else {
                    clearInterval(interval); // 정지
                }
            }, 30); // 
        }

        typeNextText(0);
    }, 1); // 수정된 지연 시간
};