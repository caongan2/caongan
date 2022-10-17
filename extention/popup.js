let changeColor = document.getElementById("changeColor");
let modal = document.getElementById("myModal");
let new_div = document.getElementById('new_div')

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  new_div.innerHTML = '<form style="width: 100%">\n' +
      '    <canvas id="myCanvas" width="800" height="680" style="border:10px solid #3fc41c;"></canvas>\n' +
      '\n' +
      '    <img  id="img1" src="img/img1.jpg" height="700" width="550" />\n' +
      '    <img style="display: none" id="img2" src="img/img2.jpg" height="700" width="550" />\n' +
      '    <img style="display: none" id="img3" src="img/img3.jpg" height="700" width="550"/>\n' +
      '    <img style="display: none" id="img4" src="img/img4.jpg" height="700" width="550"/>\n' +
      '</form>'
});