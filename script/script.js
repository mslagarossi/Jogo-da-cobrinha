let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); /* renderiza o desenho que vai acontecer no canvas. Vai tratar o arquivo como um plano 2D*/
let box = 32; /* 32 pixels */
let snake = [];
snake[0] = {
    x: 8 * box, /* *8 Somente para setar a posição inicial */
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /* math.floor retira a parte flutuante do math.random (o número depois da vírgula) */
    y: Math.floor(Math.random() * 15 + 1) * box /* math.random  cria um número aleatório até 1 */
}

function criarBG(){ /* desenho do canvas */
    context.fillStyle = "Lightgreen";
    context.fillRect(0, 0, 16 * box, 16* box); /* 16 quadradinhos */
}

/* A cobrinha é um array de coordenadas.
Ela vai trabalhar com a adição de um elemento e a retirada do último, fazendo com que ela ande.
*/
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){ /* desenho da comida */
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); /* pega o keydown (evento de clique) e chama o update (função a ser criada ainda) */

/* função update não está funcionado */
function update(event){ /* != do contrário para impedir que seja criada mais uma cabeça */
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    /*for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); /* o interval de 100 milisegundos é parado 
            alert('Game over :(' + '\n' + pontos);
        }
    }*/
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;
    var pontos = 0;
    /* setar o x e o y para que a cobra tenha um ponto de partida */
    if(direction == "right") snakeX += box; /* plano cartesiano - dar a ilusão de mudança de sentido */
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); /* retira a última pra dar a ilusão de que está andando, quando está apenas sendo reescrito num quadrado à frente */
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box; /* food recebe novamente uma posição aleatória */
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        for(pontos = 0; pontos <= snake.length; pontos++){
            newpontos = pontos;
            document.getElementById("score").innerHTML = pontos;
        }
    }

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); /* o interval de 100 milisegundos é parado */
            alert('Game over :(' + '\n' + 'Pontuação final: ' + newpontos);
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); /* Adiciona o quadrado à frente */
}

let jogo = setInterval(iniciarJogo, 100); /* iniciar o jogo após 100 milisegundos e a cada esse mesmo tempo o jogo ser atualizado e não travar */

