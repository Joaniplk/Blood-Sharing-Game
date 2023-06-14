const hitpointsT = document.getElementById("hit-points");
const scoreT = document.getElementById("score");
const GameOverT = document.getElementById("gameOver");
const TapT = document.getElementById("tap");
const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 2048;
canvas.height = 1024;

const player = new Player(canvas.width /2, canvas.height - 300, 225, 300, 7.7,"./images/Copy of px6L.png","./images/Copy of px6R.png");
const blood = new Drop(100, 100, 5, "./images/Copy of pixilart-drawing.png", canvas.width);

const PlayScrn = new Image();
PlayScrn.src = "./images/loading screen px6.png";
const Bg = new Image();
Bg.src = "./images/Copy of px_bg2.png";
let firstLoad = true;
let running = true;
let lostBefore = false;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function handleCollision(obj1, obj2){
    return (obj1.y + obj1.height) >= obj2.y && (
        (obj1.x >= obj2.x && obj1.x <= obj2.x + obj2.width)
        ||
        (obj1.x + obj1.width >= obj2.x && obj1.x + obj1.width <= obj2.x + obj2.width));
}

async function animate(){
    if(firstLoad){
        scoreT.innerText = `Score: ${player.score}`;
        hitpointsT.innerText = `Hitpoints: ${player.hitpoints}`;
        ctx.drawImage(PlayScrn,0,0, canvas.width, canvas.height);
        TapT.style.visibility = "visible";
        if(lostBefore)await sleep(300);
        if(player.controls.right || player.controls.left || player.controls.special){
            firstLoad = false;
            running = true;
            TapT.style.visibility = "hidden";
        }
    }else if(running){
        ctx.drawImage(Bg,0,0, canvas.width, canvas.height);
        player.update(ctx,0,canvas.width);
        blood.update(ctx);
        scoreT.innerText = `Score: ${player.score}`;
        hitpointsT.innerText = `Hitpoints: ${player.hitpoints}`;
        if(handleCollision(blood, player)){
            player.score++;
            blood.reset();
        }
        if(blood.y >= canvas.height){
            player.hitpoints--;
            blood.reset();
        }
        if(player.hitpoints <= 0){
            scoreT.innerText = `Score: ${player.score}`;
            hitpointsT.innerText = `Hitpoints: ${player.hitpoints}`;
            GameOverT.style.visibility = "visible";
            running = false;
            lostBefore = true;
            await sleep(500);
        }
    }else{
        if(player.controls.right || player.controls.left){
            player.reset();
            blood.reset();
            GameOverT.style.visibility = "hidden";
            firstLoad = true;
            running = false;
        }
    }
    window.requestAnimationFrame(animate);
}
animate();