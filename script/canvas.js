/******/

// function autoSetCanvasSize(canvas) {
//   setCanvasSize(960, 480)
// }

function setCanvasSize(canvas, x = 960, y = 480) { //设置画板大小
  // var pageWidth = document.documentElement.clientWidth
  // var pageHeight = document.documentElement.clientHeight
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
    console.log(scroll.y)
  }

  // // 特性检测
  // if (document.body.ontouchstart !== undefined) {
  //   // 触屏设备 苏菲就是个触屏设备啊哥
  //   canvas.ontouchstart = function (aaa) {
  //     var x = aaa.touches[0].clientX
  //     var y = aaa.touches[0].clientY
  //     console.log(x, y)
  //     using = true
  //     if (eraserEnabled) {
  //       context.clearRect(x - 5, y - 5, 30, 30)
  //     } else {
  //       lastPoint = {
  //         "x": x,
  //         "y": y
  //       }
  //       drawCircle(x, y, circleWidth)
  //     }
  //   }
  //   canvas.ontouchmove = function (aaa) {
  //     console.log('边摸边动')
  //     var x = aaa.touches[0].clientX
  //     var y = aaa.touches[0].clientY

  //     if (!using) { return }

  //     if (eraserEnabled) {
  //       context.clearRect(x - 5, y - 5, 30, 30)
  //     } else {
  //       var newPoint = {
  //         "x": x,
  //         "y": y
  //       }
  //       drawCircle(x, y, circleWidth)
  //       drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
  //       lastPoint = newPoint
  //     }
  //   }
  //   canvas.ontouchend = function () {
  //     console.log('摸完了')
  //     using = false
  //   }
  // } else {
  // 非触屏设备
  canvas.onmousedown = function (aaa) {//按下鼠标
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 66 + scroll.x, y - 96 + scroll.y, 30, 30)
    } else {
      lastPoint = {
        "x": x + scroll.x,
        "y": y + scroll.y
      }
      console.log(scroll.x)
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

// }