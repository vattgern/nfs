const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.game__area'),
    car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click',startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup',stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed : 3,
    traffic: 3
};

function getQuantityElementElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}
function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.bottom = '10px';
    car.style.top = 'auto';
    for (let index = 0; index < getQuantityElementElements(100); index++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (index * 100) + 'px';
        line.y = index * 100;
        gameArea.appendChild(line);
    }

    for (let index = 0; index < getQuantityElementElements(100 * setting.traffic); index++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (index + 1);
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'url(./image/enemy.png) center / cover no-repeat';
        gameArea.appendChild(enemy);    
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}
function playGame(){
    if(setting.start){
        setting.score += setting.speed;
        score.innerHTML = "Score: <br>" + setting.score;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0){
            setting.x-= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x+= setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y+= setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
}
function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
}
function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}
function moveEnemy(){
    let enemys = document.querySelectorAll('.enemy');
    enemys.forEach(function(enemy){
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right && 
            carRect.bottom >= enemyRect.top){
            setting.start = false;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }

        enemy.y += setting.speed;
        enemy.style.top = enemy.y + 'px';
        if(enemy.y > document.documentElement.clientHeight){
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}
function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed / 2;
        line.style.top = line.y + 'px';
        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        }
    });
}