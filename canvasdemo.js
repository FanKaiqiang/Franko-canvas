var canvasdemo = document.getElementById('xxx');
var context = canvasdemo.getContext('2d');
var lineWidth = 5/*初始宽度为5*/
var circleWidth=2.5

autoSetCanvasSize(canvasdemo)/*设定屏幕宽度*/

listenToUser(canvasdemo)/*监听用户操作 */


var eraserEnabled = false/*初始不使用橡皮 */
pen.onclick = function () {/*点击笔使用笔*/
  eraserEnabled = false
  lineWidth=5
  circleWidth=2.5
  pen.classList.add('active')
  eraser.classList.remove('active')
  brush.classList.remove('active')
}
brush.onclick = function () {/*点击笔使用笔*/
  lineWidth=10
  circleWidth=5
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
  pen.classList.remove('active')
}
eraser.onclick = function () {/*点击笔使用橡皮*/
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
  brush.classList.remove('active')
}
clear.onclick = function () {/*点击笔使用删除*/
  var r = confirm("是否要删除你的画作？")
  if (r == true) {
    context.clearRect(0, 0, canvasdemo.width, canvasdemo.height);
  }
}
download.onclick = function () {/*保存画作 */
  var url = canvasdemo.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  var x = prompt('请为您的画作命名','我的画儿');
  if(x){
  a.download = x
  a.target = '_blank'
  a.click()
  }
}


red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  // red.classList.add('active')
  // green.classList.remove('active')
  // blue.classList.remove('active')
}
orange.onclick = function () {
  context.fillStyle = 'orange'
  context.strokeStyle = 'orange'
}
yellow.onclick = function () {
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
}
green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
}
cyan.onclick = function () {
  context.fillStyle = 'cyan'
  context.strokeStyle = 'cyan'
}
blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
}
purple.onclick = function () {
  context.fillStyle = 'purple'
  context.strokeStyle = 'purple'
}
black.onclick = function () {
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
}

thin.onclick = function () {
  lineWidth = 5
}
thick.onclick = function () {
  lineWidth = 10
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备 苏菲就是个触屏设备啊哥
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      console.log(x, y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 30, 30)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
        drawCircle(x, y, circleWidth)
      }
    }
    canvas.ontouchmove = function (aaa) {
      console.log('边摸边动')
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 30, 30)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawCircle(x, y, circleWidth)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function () {
      console.log('摸完了')
      using = false
    }
  } else {
    // 非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 30, 30)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
        drawCircle(x, y, circleWidth)
      }
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      if (!using) { return }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 30, 30)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawCircle(x, y, circleWidth)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function (aaa) {
      using = false
    }
  }

}