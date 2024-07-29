//concentric circle code starts here------
const canvas2 = document.getElementById("MyCanvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.height = window.innerHeight;
canvas2.width = window.innerWidth;
ctx2.fillStyle = "green";
ctx2.strokeStyle = "green";
ctx2.save();
ctx2.lineWidth = 4;
const cX2 = canvas2.width/2;
const cY2 = canvas2.height/2;
ctx2.translate(cX2,cY2);

function drawStarTopology(){
    for(let i=0 ; i<12; i++){
        ctx2.save();
        ctx2.beginPath();  
        ctx2.lineWidth = 0.9;  
        ctx2.rotate(Math.PI*i/6);
        ctx2.moveTo(0,0);
        ctx2.lineTo(450,0);
        ctx2.stroke();
        ctx2.restore();
    }
    for(let i=0 ; i<250; i++){
        ctx2.save();
        ctx2.beginPath();  
        ctx2.lineWidth = 0.1;  
        ctx2.rotate(i*Math.PI/100);
        ctx2.moveTo(400,0);
        ctx2.lineTo(450,0);
        ctx2.stroke();
        ctx2.restore();
    }
}
function  drawRadarPeriphery(){
    for(let i = 1; i <= 4; i++){
        ctx2.beginPath();
        ctx2.lineWidth = 2.5;
        ctx2.arc(0,0,100*i,0,Math.PI*2);
        ctx2.stroke();
        ctx2.beginPath();
    }
}
drawRadarPeriphery();
drawStarTopology();
//concentric circle code ends here--------
const canvas = document.getElementById("MyCanvas");

const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


ctx.strokeStyle = "red";
this.lineWidth = 5;
ctx.save();


const nLines = 100;
const opacityGradient = 0.005;
const fpsFactor = 1;
const rotateBy = 0.01;
const lineLength = 400;

class Rectangles{
    constructor(context,sA){
        this.context = context;
        this.startAngle = sA;
        this.rotateRadian = 0;
        this.opacity = 0;
    }
    draw(){
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(this.startAngle + this.rotateRadian);
        ctx.strokeStyle = `rgba(0,255,0,${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(lineLength,0);
        ctx.stroke();
        ctx.restore();
    }
    update(){
        this.rotateRadian = this.rotateRadian + rotateBy;
        this.opacity = this.opacity + opacityGradient;
    }
}
let lineArray = [];
let k = 0 ;

function init(k){
        lineArray.push(new Rectangles(ctx,k)); 
        // if(lineArray[10].opacity == 0.9);
        //     lineArray.shift();
}
function del(){
    if(lineArray.length >= nLines){
        lineArray.shift();
    }
}

function render(){
    lineArray.forEach((e)=>{
        e.draw();
        e.update();
     });
     
        
    
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    init(k);
    render();
    // console.log(lineArray.length);
    del();
    k+=((1/165)*fpsFactor);
    requestAnimationFrame(animate);
}
animate();