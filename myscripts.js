window.onload = function() {

  //გველის ცვლადები.
var snakeRadius = 15;
var SNAKE_COLOR = Color.green;
var snake;
var xPos = getWidth()/2;
var yPos = getHeight()/2;

//ვაშლის ცვლადები.
var apple;
var appleRadius = 10;

//წაგების ან მოგების შემთხვევაში.
var score = 0;
var scoreText;
var winTxt;
var loseTxt;

//მიმართულების ცვლადები.
var direction = EAST;
var EAST = 0;
var SOUTH = 1;
var WEST = 2;
var NORTH = 3;

var dx =4;
var dy = 0;

function start(){
println("You have to take 20 balls to win \nAt first The game starts slow, but do not distract \nRules: Do not touch the walls")

drawSnake();
  setTimer(draw,50);
keyDownMethod(key);
addApples(Randomizer.nextInt(appleRadius+5,getWidth()-appleRadius),
           Randomizer.nextInt(appleRadius+5,getHeight()-appleRadius)
            );
  
}
// აქ ვამოწმე ყველაფერს, თუ გველი დაეჯახება ვაშლს, 
//ვაშლი გაქრება და სხვა რენდომ ადგილას გაჩნდება. 
//ამავდროულად გველის სისწრაფე იმატებს და score ცვლადი იმატებს ერთით.
//როდესაც ცვლადი score 20-ს მიაღწევს თამაში დასრულდება და დაიწერება "გილოცავ, შენ გაიმარჯვე".
function checkElm(){
  var elmT = getElementAt(snake.getX(),snake.getY()-15);
  var elmB = getElementAt(snake.getX(),snake.getY()+15);
  var elmL = getElementAt(snake.getX()-15,snake.getY());
  var elmR = getElementAt(snake.getX()+15,snake.getY());
  
  if(elmT!=null){
          remove(elmT);
          dx = dx+1;
          addApples(Randomizer.nextInt(0,getWidth()-appleRadius),
                Randomizer.nextInt(0,getHeight()-appleRadius)
                );
          score++;
  }
  if(elmB!=null){
          remove(elmB);
          dx = dx+1;
          addApples(Randomizer.nextInt(0,getWidth()-appleRadius),
                Randomizer.nextInt(0,getHeight()-appleRadius)
                );
          score++;
  }
  if(elmL!=null){
          remove(elmL);
          dx = dx+1;
          addApples(Randomizer.nextInt(0,getWidth()-appleRadius),
                Randomizer.nextInt(0,getHeight()-appleRadius)
                );
          score++;
  }
  if(elmR!=null){
          remove(elmR);
          dx = dx+1;
          addApples(Randomizer.nextInt(0,getWidth()-appleRadius),
                Randomizer.nextInt(0,getHeight()-appleRadius)
                );
          score++;
  }

  remove(scoreText);
  scoreText = new Text(score);
scoreText.setPosition(0, getHeight());
add(scoreText);

if(score == 20){
    stopTimer(draw);
    var winTxt = new Text("Congratulations, You Win :)");
    winTxt.setPosition(30, getHeight()/2);
    add(winTxt);
}
}
//აქ ვამოწმებ შემთხვევას როცა გველი ეჯახება კედელს. თუ გველი კედელს შეეჯახა ,
//თამაში დამთავრდება და პროგრამა დაგვიწერს "დსამწუხარო თქვენ წააგეთ".
function checkWall(){
  if(snake.getX()+snakeRadius>getWidth() ||
      snake.getX()<0 ||
      snake.getY()+snakeRadius>getHeight() ||
      snake.getY()<0 
      ){
      stopTimer(draw);
      loseTxt = new Text("Unfortunately, You Lose :(");
      loseTxt.setPosition(30, getHeight()/2);
      add(loseTxt);
      }
}
//ესაა მთავარი ფუნქცია სადაც გველი მოძრაობს 
function draw(){
  checkElm();
  checkWall();
  if(direction == EAST){
      snake.move(dx,0);
  } else if(direction == WEST){
      snake.move(-dx,0);
  }else if(direction == NORTH){
      snake.move(0,-dx);
  }else if(direction == SOUTH){
      snake.move(0,dx);
  }
}
// //ეს ფუნქცია პასუხისმგებელია გველის სწორ მოძრაობაზე , გველი იმართება ისრებით!
function key(e){
  if(e.keyCode == Keyboard.DOWN){
    direction=SOUTH;
}
if(e.keyCode == Keyboard.UP){
  direction=NORTH;
}
if(e.keyCode == Keyboard.RIGHT){
  direction = EAST;
}
if(e.keyCode == Keyboard.LEFT){
    direction = WEST;
}
}
//ეს ფუნქვცია ხატავს გველს კანვასზე
function drawSnake(){
  snake = new Circle(snakeRadius);
snake.setColor(SNAKE_COLOR);
snake.setPosition(xPos,yPos);
add(snake);
}
//ეს ფუნქცია ხატავს ვაშლებს
function addApples(appleX, appleY){
  apple = new Circle(appleRadius);
  apple.setPosition(appleX, appleY);
  apple.setColor(Color.red);
  add(apple);
}


  if (typeof start === 'function') {
      start();
  }
};