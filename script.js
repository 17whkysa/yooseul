// 일반 키 입력 시 나오는 돌려까는 칭찬 문구 14종
const praises = [
    "방금 누른 그 타이밍... 아무런 생각 없이 눌렀기에 가능한 최고의 무심함이었습니다! 👏",
    "와, 키보드를 누르는 손가락 힘이 남다르시네요. 혹시 키보드 파괴범 출신이신가요? 💪",
    "오늘따라 키보드 치는 모습이 유난히 '무언가 엄청 열심히 일하는 사람'처럼 보여서 보기 좋습니다! 🖥️",
    "세상에, 이렇게 영혼 없는 연타는 처음 봐요! 인공지능도 감탄할 기계적인 명연기입니다! 🤖",
    "남들은 평생 걸려도 못 할 '아무 의미 없는 자판 치기'를 이렇게 완벽히 해내시다니 대단합니다! 🎉",
    "타격감이 장난 아니시네요! 회사 스트레스는 전부 이 키보드가 대신 맞고 있나 봅니다. 💥",
    "우와, 방금 누른 자판 속도 정말 빠르시네요! 내용만 알찼다면 완벽했을 텐데 아쉽습니다! ✨",
    "키보드 위에 손가락을 얹은 모습만큼은 최소 백엔드 수석 개발자 급이십니다! 👍",
    "방금 누르신 키의 각도가 45도로 완벽했습니다. 쓸데없이 고퀄리티라는 말이 딱 어울려요! 📐",
    "오늘 본 사람 중에 가장 세련된 자세로 딴짓을 하고 계시네요. 스킬에 감탄합니다! 😎",
    "단언컨대, 이렇게 열정적으로 아무 내용도 안 써지는 키를 누르는 분은 당신뿐일 겁니다! ⭐",
    "손가락 움직임이 아주 유려하시네요. 피아노를 배우셨다면 참 좋았을 텐데 키보드라니! 🎹",
    "와! 방금 그 키는 정말 예술적으로 눌렸어요. 굳이 안 눌러도 되는 키였지만요! ✨",
    "당신의 그 과감한 엔터/스페이스 타격감, 부장님이 오시면 바로 업무 과몰입인 줄 속겠습니다! 🤫"
];

// 'X' 키를 눌렀을 때 나오는 악의적인 폭격 문구 7종
const insults = [
    "어휴... 얼굴 진짜 개못생겼다. 나였으면 집 밖으로 안 나왔음. 🤢",
    "X 누를 시간에 거울이나 한번 더 보세요. 깜짝 놀랄 걸요? 🪞",
    "뇌까지 청순하신가요? 굳이 누르지 말라는 걸 굳이 눌러버리네! 🤦‍♂️",
    "방금 누른 손가락마저 왠지 모르게 억울하게 생겼을 것 같아요. 헛수고 그만! 👎",
    "당신의 인성과 얼굴 모양이 방금 누른 'X' 표시처럼 주름져 있네요. 삐-! ❌",
    "지능이 혹시 일시정지 상태이신가요? 눈치까지 개판이시네요! 💩",
    "와... 진짜 구제 불능이다. 얼굴도 개못생겼는데 청개구리 심보까지? 🐸"
];

const praiseCard = document.getElementById('praiseCard');
const praiseText = document.getElementById('praiseText');
const pressedKey = document.getElementById('pressedKey');
const keyButtons = document.querySelectorAll('.key-btn');
const particleContainer = document.getElementById('particleContainer');

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 화면 이펙트 파티클
function createParticles(x, y, isInsult) {
    const emojis = isInsult ? ['🤮', '💩', '❌', '👎', '💀'] : ['✨', '👏', '🎉', '💖', '⭐', '🎈'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = getRandomItem(emojis);
        
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 50;
        
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// 키 입력 이벤트 실행 함수
function triggerKeyAction(keyChar, clientX, clientY) {
    const keyLower = keyChar.toLowerCase();
    pressedKey.innerText = keyChar === ' ' ? 'SPACE' : keyChar.toUpperCase();

    // 화면 상 가상 키보드에도 눌림 효과 적용
    keyButtons.forEach(btn => {
        const btnKey = btn.getAttribute('data-key');
        if (btnKey === keyLower) {
            btn.classList.add('pressed');
            setTimeout(() => btn.classList.remove('pressed'), 150);
        }
    });

    // X 키 분기 처리
    if (keyLower === 'x') {
        praiseCard.classList.add('insult-mode');
        praiseCard.classList.remove('active');
        
        setTimeout(() => {
            praiseCard.classList.add('active');
        }, 10);

        praiseText.innerText = getRandomItem(insults);
        
        const posX = clientX || window.innerWidth / 2;
        const posY = clientY || window.innerHeight / 2;
        createParticles(posX, posY, true);

    } else {
        praiseCard.classList.remove('insult-mode');
        praiseCard.classList.remove('active');
        
        setTimeout(() => {
            praiseCard.classList.add('active');
        }, 10);

        praiseText.innerText = getRandomItem(praises);

        const posX = clientX || window.innerWidth / 2;
        const posY = clientY || window.innerHeight / 2;
        createParticles(posX, posY, false);
    }
}

// 실물 키보드 입력 감지
window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault(); // 스페이스바 스크롤 방지
    }
    
    if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Spacebar') {
        triggerKeyAction(e.key);
    }
});

// 화면 온스크린 가상 키보드 클릭 감지
keyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const keyVal = btn.getAttribute('data-key');
        const rect = btn.getBoundingClientRect();
        const clickX = rect.left + rect.width / 2;
        const clickY = rect.top;
        
        triggerKeyAction(keyVal, clickX, clickY);
    });
});