const canvas = document.getElementById("jsCanvas");
let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    console.log(x, y);
}

function stopPainting(){
    painting = false;
}

function onMouseUp(event){
    painting = false;
}

function onMouseDown(event) {
    painting = true;
}

if(canvas) {
    //mouse on canvas
    canvas.addEventListener("mousemove", onMouseMove);
    //mouse click down event
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}