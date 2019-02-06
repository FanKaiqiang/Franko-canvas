function setCanvasSize(canvas, x = 960, y = 480) { //设置画板大小
  canvas.width = x
  canvas.height = y
}

function drawCircle(x, y, radius) { //画圆
  context.beginPath()
  context.arc(x - 50, y - 80, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) { //画线
  context.beginPath();
  context.moveTo(x1 - 50, y1 - 80) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2 - 50, y2 - 80) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) { //监听用户
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  var scroll = {
    x: 0,
    y: 0

  }
  wrapper.onscroll = (e) => {//窗口滚动
    scroll.y = e.target.scrollTop
    scroll.x = e.target.scrollLeft
  }

  canvas.onmousedown = function (aaa) {//按下鼠标
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 66 + scroll.x, y - 96 + scroll.y, 30, 30)
    } else if (brushEnabled) {
      context.fillRect(0, 0, 2000, 2000)
    }
    else {
      lastPoint = {
        "x": x + scroll.x,
        "y": y + scroll.y
      }
      drawCircle(x + scroll.x, y + scroll.y, circleWidth)
    }
  }
  canvas.onmousemove = function (aaa) {//移出鼠标
    var x = aaa.clientX
    var y = aaa.clientY
    if (!using) { return }

    if (eraserEnabled) {
      context.clearRect(x - 60 + scroll.x, y - 90 + scroll.y, 30, 30)
    } else {
      var newPoint = {
        "x": x + scroll.x,
        "y": y + scroll.y
      }
      drawCircle(x + scroll.x, y + scroll.y, circleWidth)
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

  }
  canvas.onmouseup = function (aaa) {//收起鼠标
    using = false
  }
  canvas.onmouseout = function (aaa) {//移出鼠标
    using = false
  }
}
