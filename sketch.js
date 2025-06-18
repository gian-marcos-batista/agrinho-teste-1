let car;
let obstacles = [];
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  car = new Car();
}

function draw() {
  background(220);

  if (!gameOver) {
    car.update();
    car.show();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].hits(car)) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255, 0, 0);
    text("GAME OVER", width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    car.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    car.move(1);
  }
}

// Classe do carrinho
class Car {
  constructor() {
    this.w = 40;
    this.h = 60;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 5;
  }

  update() {
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
  }

  move(dir) {
    this.x += dir * this.speed * 10;
  }
}

// Classe dos obstáculos
class Obstacle {
  constructor() {
    this.w = 40;
    this.h = 40;
    this.x = random(0, width - this.w);
    this.y = -this.h;
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.y > height;
  }

  hits(car) {
    return (
      this.x < car.x + car.w &&
      this.x + this.w > car.x &&
      this.y < car.y + car.h &&
      this.y + this.h > car.y
    );
  }
}
