const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("jsClear");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//커스텀 커서 이미지 테스트중.. 아직 안됨
//canvas.style.cursor = 'url(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.134 1.535C9.722 2.562 8.16 4.057 6.889 5.312 5.8 6.387 5.041 7.401 4.575 8.294a3.745 3.745 0 00-3.227 1.054c-.43.431-.69 1.066-.86 1.657a11.982 11.982 0 00-.358 1.914A21.263 21.263 0 000 15.203v.054l.75-.007-.007.75h.054a14.404 14.404 0 00.654-.012 21.243 21.243 0 001.63-.118c.62-.07 1.3-.18 1.914-.357.592-.17 1.226-.43 1.657-.861a3.745 3.745 0 001.055-3.217c.908-.461 1.942-1.216 3.04-2.3 1.279-1.262 2.764-2.825 3.775-4.249.501-.706.923-1.428 1.125-2.096.2-.659.235-1.469-.368-2.07-.606-.607-1.42-.55-2.069-.34-.66.213-1.376.646-2.076 1.155zm-3.95 8.48a3.76 3.76 0 00-1.19-1.192 9.758 9.758 0 011.161-1.607l1.658 1.658a9.853 9.853 0 01-1.63 1.142zM.742 16l.007-.75-.75.008A.75.75 0 00.743 16zM12.016 2.749c-1.224.89-2.605 2.189-3.822 3.384l1.718 1.718c1.21-1.205 2.51-2.597 3.387-3.833.47-.662.78-1.227.912-1.662.134-.444.032-.551.009-.575h-.001V1.78c-.014-.014-.112-.113-.548.027-.432.14-.995.462-1.655.942zM1.62 13.089a19.56 19.56 0 00-.104 1.395 19.55 19.55 0 001.396-.104 10.528 10.528 0 001.668-.309c.526-.151.856-.325 1.011-.48a2.25 2.25 0 00-3.182-3.182c-.155.155-.329.485-.48 1.01a10.515 10.515 0 00-.309 1.67z"></path></svg>), auto;'
canvas.style.cursor = "crosshair";

ctx.fillStyle = "white"; //초기 배경색 설정
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
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

function handleCM(event){
    console.log(event);
    //기존 토글창 발생 event 막기
    event.preventDefault();
    
}

function handleSaveClick(){
    const img = canvas.toDataURL(); //data 를 url로 변환해주는 내장함수
    const link = document.createElement("a");
    link.href = img; //다운로드 할 이미지 주소
    link.download = "download img"; //가상의 이미지 다운로드 링크생성
    link.click(); //링크클릭
}

/*
function changeCursor(target, shape){
    target.style.cursor = shape;
}
*/

//<a href="https://icons8.com/icon/2nGH3T87uzqa/brush">Brush icon by Icons8</a>
if(canvas) {
    //mouse on canvas
    canvas.addEventListener("mousemove", onMouseMove);
    //mouse click down event
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", fillCanvas); //채우기
    //우클릭 했을때 뜨는 토글창 : contextmenu
    canvas.addEventListener("contextmenu", handleCM);
    
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

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
//색상선택
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));