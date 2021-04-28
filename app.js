const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANAVS_SIZE = 700;

canvas.width = CANAVS_SIZE;
canvas.height = CANAVS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANAVS_SIZE,CANAVS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) { //마우스는 항상 움직임
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in ",x,y);
    ctx.beginPath(); //마우스를 클릭하면 beginPath를 사용해서 선이 그려짐 
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in ",x,y);
    ctx.lineTo(x, y);
    ctx.stroke();
    // ctx.closePath();
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;  // @Override
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;  // @Override
}

function handleModeClick(event){
  if (filling === true){
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
    ctx.fillStyle =ctx.strokeStyle;
  }
}

function handleCanvasClick(event){
  if (filling) {
    ctx.fillRect(0,0,CANAVS_SIZE,CANAVS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
  //console.log(image);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => 
  color.addEventListener("click",handleColorClick)
);

if (range){
  range.addEventListener("input",handleRangeChange);
}

if (mode){
  mode.addEventListener("click",handleModeClick);
}

if (saveBtn){
  saveBtn.addEventListener("click",handleSaveClick);
}