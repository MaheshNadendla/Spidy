const canva = document.getElementById('Mycanva');
const ctx = canva.getContext('2d');
ctx.closePath(); 

function resizeCanvas() {
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


function drawCircle(ctx, x, y, radius,color, points=6, inset=0.5) {
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.moveTo(x, y - radius);

    for (let i = 0; i < points; i++) {
      ctx.lineTo(
        x + Math.cos((i * 2 * Math.PI) / points - Math.PI / 2) * radius,
        y + Math.sin((i * 2 * Math.PI) / points - Math.PI / 2) * radius
      );
      ctx.lineTo(
        x + Math.cos((i * 2 * Math.PI) / points + Math.PI / points - Math.PI / 2) * radius * inset,
        y + Math.sin((i * 2 * Math.PI) / points + Math.PI / points - Math.PI / 2) * radius * inset
      );
    }

    ctx.closePath();
    ctx.fill();
  }

//   drawStar(ctx, 200, 200, 100, 6, 0.5);

// function drawCircle(x,y,radius,color)
// {

//     ctx.moveTo(x,y);
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     ctx.fillStyle = color;
//     ctx.fill();   
//     // ctx.strokeStyle = 'black';  
//     // ctx.lineWidth = 2;        
//     // ctx.stroke();
//     ctx.closePath(); 

// }
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);  
    const g = Math.floor(Math.random() * 256);  
    const b = Math.floor(Math.random() * 256);  
    return `rgb(${r}, ${g}, ${b})`;  
}

function getRandomSize() {
    const arr = [5,6,7];
    return arr[Math.floor(Math.random() * arr.length)];
}

let points = [];

function getRandomNumber() {
    return Math.floor(Math.random() * canva.width);  
}

for(let i=0;i<window.innerWidth/3;i++)
{

    points.push({x:getRandomNumber() , y: getRandomNumber() , size : getRandomSize(), color : getRandomColor()});

}

function findClosestPoints(points, targetPoint, numClosest = 10) {
   
    const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    const sortedPoints = points.sort((a, b) => distance(a, targetPoint) - distance(b, targetPoint));
    return sortedPoints.slice(0, numClosest);
}

function DrawCanva()
{
    points.map((a,i)=>{
        drawCircle(ctx,a.x,a.y,a.size,a.color,a.size);
    })

}



DrawCanva();

document.addEventListener('mousemove', (e) => {
    const targetPoint = {x: e.clientX, y: e.clientY};

    
    ctx.clearRect(0, 0, canva.width, canva.height);

    const closestPoints = findClosestPoints(points, targetPoint);

    closestPoints.map((a) => {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.strokeStyle = a.color;  
        ctx.lineWidth = 1; 
        ctx.lineTo(targetPoint.x, targetPoint.y);  
        ctx.stroke();
        ctx.closePath();
    });
    document.body.style=`background : linear-gradient(to right ,${getRandomColor()},${getRandomColor()},${getRandomColor()})`;
    DrawCanva();
});

document.addEventListener('mouseleave',()=>{
    ctx.clearRect(0, 0, canva.width, canva.height);
    DrawCanva();
})







