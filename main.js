var canvasdemo = document.getElementById('xxx');
var context = canvasdemo.getContext('2d');
var lineWidth = 5/*初始宽度为5*/
var circleWidth = 2.5

var list = document.querySelectorAll('.colors > li')
for (let item of list) {
  item.onclick = (e) =>{
    for(let item of list){
      item.classList.remove('active')
    }
    item.classList.add('active')
  }
  item.style.cssText = `background:${item.classList.value}`
}

setCanvasSize(canvasdemo)/*设定屏幕宽度*/

listenToUser(canvasdemo)/*监听用户操作 */




