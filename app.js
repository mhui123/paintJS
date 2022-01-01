const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("jsClear");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function fillCanvas(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function clearCanvas(){
    ctx.clearRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
}

if(canvas) {
    //mouse on canvas
    canvas.addEventListener("mousemove", onMouseMove);
    //mouse click down event
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas); //채우기
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(clearBtn){
    clearBtn.addEventListener("click",clearCanvas);
}
//색상선택
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));