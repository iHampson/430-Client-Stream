var canvas;
var ctx;
var sendBufferCanvas;
var sendBufferCtx;

function setup(){
  sendBufferCanvas = document.createElement("canvas");
  sendBufferCanvas.width = 200;
  sendBufferCanvas.height = 200;
  sendBufferCtx = sendBufferCanvas.getContext('2d');

  ctx.save();
  ctx.fillStyle = "red";
  ctx.fillRect(10,10,200,200); // Draw to screen
  ctx.restore();
  sendBufferCtx.fillRect(0,0,200,200);
  var img = sendBufferCanvas.toDataURL();

  var data = {
    x: 200 + Math.floor(Math.random()*50),
    y: 200 + Math.floor(Math.random()*50),
    height: 200,
    width: 200,
    imgData: img // get pixel data from canvas
  };
  socket.emit('draw', data);
}

function handleMessage(data){
  console.log("packet recieved");
  var image = new Image();
  image.onload = function(){
    ctx.save();
    ctx.globalCompositeOperation = "sorce-over"; // Canvas default
    ctx.drawImage(image, data.x, data.y, data.width, data.height);
    ctx.restore();
  };
  image.src = data.imgData;
}

function setupSocket(){
  socket.on('drawThis', handleMessage);
}

function init(){
  canvas = document.querySelector('#workSpace');
  ctx = canvas.getContext('2d');
  socket = io.connect();
  setupSocket();
  setup();
}

window.onload = init;
