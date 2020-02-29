let box = document.getElementsByClassName('box')[0];

for(n=0 ; n< 18; n++) {
    let boxItem = document.createElement('div');
        boxItem.className = 'box__item';

        for(a=0 ; a< 8; a++) {
            let img = document.createElement('img');
            img.src = 'https://tarkov-wiki.ru/img/tamojnya/5/'+ n +'/' + a +'.png';
            boxItem.appendChild(img)
        }

    box.appendChild(boxItem);
}    

let scaleMax =  document.getElementById('scaleMax');
let scaleMin =  document.getElementById('scaleMin');
box.style.transform= 'scale(0.5)';
let scale = 0.5;

scaleMax.onclick = function () {

    

    scale = scale + .1 - 0;
    box.style.transform = 'scale('+ scale +')'
    
}
scaleMin.onclick = function () {
    scale = scale - .1
    box.style.transform = 'scale('+ scale +')'
}
function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
      if ('onwheel' in document) {
        
        elem.addEventListener("wheel", handler);
      } else if ('onmousewheel' in document) {
        elem.addEventListener("mousewheel", handler);
      } else {
        elem.addEventListener("MozMousePixelScroll", handler);
      }
    } else { 
        box.attachEvent("onmousewheel", handler);
    }
  }

  addOnWheel(box, function(e) {

    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0) scale += 0.05;
    else scale -= 0.05;

    box.style.transform = box.style.WebkitTransform = box.style.MsTransform = 'scale(' + scale + ')';

    e.preventDefault();
  });




boxWrapper =  document.getElementsByClassName('box-wrapper')[0];
boxWrapper.onmousedown = function(e) { 

    var coords = getCoords(boxWrapper);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    boxWrapper.style.cursor = 'all-scroll';
    document.body.appendChild(boxWrapper);
    moveAt(e);
    

    function moveAt(e) {
        boxWrapper.style.left = e.pageX - shiftX + 'px';
        boxWrapper.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    }

    

    boxWrapper.onmouseup = function() {
        document.onmousemove = null;
        boxWrapper.onmouseup = null;
        boxWrapper.style.cursor = 'default';
    }  
}


boxWrapper.ondragstart = function() {
    return false;
};

function getCoords(elem) {
    var boxWrapper = elem.getBoundingClientRect();
    return {
      top: boxWrapper.top + pageYOffset,
      left: boxWrapper.left + pageXOffset
    };
}