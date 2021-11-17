const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("jsClear");
const colors = document.getElementsByClassName("jsColor");

//canvas size
canvas.width = 700;
canvas.height = 700;


ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
}

if(canvas) {
    //mouse on canvas
    canvas.addEventListener("mousemove", onMouseMove);
    //mouse click down event
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0,0, 700, 700);
})