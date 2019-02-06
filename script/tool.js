var eraserEnabled = false/*初始不使用橡皮 */
pen.onclick = function () {/*点击笔使用笔*/
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  brush.classList.remove('active')
}
brush.onclick = function () {/*点击笔使用笔*/
  lineWidth = 2000
  circleWidth = 2000
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
  var x = prompt('请为您的画作命名', '我的画儿');
  if (x) {
    a.download = x
    a.target = '_blank'
    a.click()
  }
}

colors.onclick = function (e) {  //选择画笔颜色
  context.fillStyle = e.target.classList.value
  context.strokeStyle = e.target.classList.value
}

colorPick.onchange = (e) => { //自定义画笔颜色
  colorBind.value = e.target.value
  context.fillStyle = e.target.value
  context.strokeStyle = e.target.value
}

colorBind.oninput = (e) => {
  colorPick.value = e.target.value
  context.fillStyle = e.target.value
  context.strokeStyle = e.target.value
}

dai.onchange = (e) => { //自定义画笔粗细
  daiBind.value = e.target.value
  lineWidth = e.target.value
  circleWidth = e.target.value / 2
}
daiBind.oninput = (e) => {
  dai.value = e.target.value
  lineWidth = e.target.value
  circleWidth = e.target.value / 2
}

setWidth.oninput = (e) => { //设置颜色选项的样式
  setCanvasSize(canvasdemo, e.target.value, canvasdemo.height)
}

setHeight.oninput = (e) => {
  setCanvasSize(canvasdemo, canvasdemo.width, e.target.value)
}