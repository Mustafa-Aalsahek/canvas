var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

/*ctx.fillStyle = "rgba(255,0,0,0.5)";
ctx.fillRect(400,400,100,100);
// ctx.fillText("Hello there!",200,200,200);

for (let i=0;i<100;i++) {

    setTimeout(() =>{
        var r =parseInt(Math.random()*255);
        var g =parseInt(Math.random()*255);
        var b =parseInt(Math.random()*255);
        var a = Math.random();

    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI, true);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    ctx.fill();
    ctx.stroke();
    },100 * i);
}
ctx.beginPath();
ctx.moveTo(100,200);
ctx.lineTo(300,200);
ctx.lineTo(200,400);
ctx.lineTo(100,200);

ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
ctx.stroke();*/


var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 50;
var minRadius = 2;
window.addEventListener('mousemove', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
});
window.addEventListener('resize', function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var circleArray = [];
for (var i=0;i<700;i++){
    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;
    var a = Math.random();

    var radius = Math.random() * 10 +1 ;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var xv = (Math.random() - 0.5) * 3;
    var yv= (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x,y,xv,yv,radius, r, g, b, a));
}

function Circle(x,y,xv,yv,radius, r, g, b, a){
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2, false);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();
       /* ctx.strokeStyle = 'red';
        ctx.stroke(); */
    }

    this.update = function (){
        this.draw();

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.xv = -this.xv;

        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.yv = -this.yv;

        }
        this.x += this.xv;
        this.y += this.yv;

     /*   if (this.radius > 0){
            this.radius -=1;
        } */
        // interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if (this.radius < maxRadius){
                this.radius += 1;
            }
        }else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
    }
}


console.log(circleArray);
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for (var i=0;i< circleArray.length;i++){
        circleArray[i].update();

    }
    console.log('works');
}
animate();