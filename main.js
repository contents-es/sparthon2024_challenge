const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const TOTAL = 100;
const petalArray = [];

const petalImg = new Image();
petalImg.src = "src/벚꽃잎.png";
petalImg.addEventListener("load", () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal());
  }
  render();
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petalArray.forEach((petal) => petal.animate());
  window.requestAnimationFrame(render);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = 0;
function touchHandler(e) {
  mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
}
window.addEventListener("mousemove", touchHandler);
window.addEventListener("touchmove", touchHandler);

// Petal class
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.w = 25 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();

    this.xSpeed = 1.5 + Math.random() * 2;
    this.ySpeed = 1 + Math.random() * 1;
    this.flipSpeed = Math.random() * 0.03;
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -petalImg.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.xSpeed = 0.5;
      this.ySpeed = 0.5;
      this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
    );
  }

  animate() {
    this.x += this.xSpeed + mouseX * 5;
    this.y += this.ySpeed + mouseX * 2;
    this.flip += this.flipSpeed;
    this.draw();
  }
}
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

if (savedTodoList) {
  // savedTodoList(로컬 데이터)가 존재하면 실행
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]); // 전달인자로 전달
  }
}
const todoInput = document.querySelector("#todoInput");

function createTodo(storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const todoList = document.querySelector("#todoList");
  const newLi = document.createElement("li");
  const newBtn = document.createElement("button");
  const newSpan = document.createElement("span");
  const deleteAll = document.querySelector(".delete-btn-wrap");

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);

  newSpan.textContent = todoInput.value;

  todoList.appendChild(newLi);

  todoInput.value = "";

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");

    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
  });

  saveItemsFn();
}
