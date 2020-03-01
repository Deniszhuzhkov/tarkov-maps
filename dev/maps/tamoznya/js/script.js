let box = document.getElementsByClassName('box')[0];
let scaleMax =  document.getElementById('scaleMax');
let scaleMin =  document.getElementById('scaleMin');
let scale = 0.5;
let markScale = 2.5;
let styles = document.getElementById('aas');

let as = "<style>.marks {transform: scale(";
let sx = ")}</style>";
styles.innerHTML = as + markScale + sx;

//create
for(n=0 ; n< marks.length; n++) {
    let boxSection = document.createElement('div');
    boxSection.className = 'box__section';

        for(a=0 ; a< marks[n].length; a++) {
            let img = document.createElement('img');
            img.src = 'https://tarkov-wiki.ru/img/tamojnya/5/'+ n +'/' + a +'.png';

            let boxItem = document.createElement('div');
            boxItem.className = 'box__item';

            if (marks[n][a].toolBox) {
                let toolBoxArr = marks[n][a].toolBox;
                let toolBoxItem = document.createElement('div');
                toolBoxItem.className = 'marks';
                toolBoxItem.style.top = toolBoxArr.top;
                toolBoxItem.style.left = toolBoxArr.left;
                toolBoxItem.appendChild(svgI('sv--16--tool-box' , 12));
                boxItem.appendChild(toolBoxItem);
            }

            boxItem.appendChild(img);




            boxSection.appendChild(boxItem);
        }

    box.appendChild(boxSection);
}

//end create


box.style.transform = 'scale(0.5)';

scaleMax.onclick = function () {

    scale = scale + .1;

    if (scale > .2) {
        markScale = markScale - .1;
        styles.innerHTML = as + markScale + sx;
    }

    box.style.transform = 'scale('+ scale +')';

};

scaleMin.onclick = function () {
    if (scale > 0.4) {
        scale = scale - .1;
        box.style.transform = 'scale('+ scale +')';


        if (scale < 2.5) {
            markScale = markScale + .1;
            styles.innerHTML = as + markScale + sx;
        }
    }
};

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

    if (delta > 0) {
        scale += 0.05;

        if (scale < 2.5 && markScale > .8) {
            markScale = markScale - 0.05;
            styles.innerHTML = as + markScale + sx;
        }
    }
    else if (scale > 0.4) {
        if (scale > 0.2) {
            markScale = markScale + 0.05;
            styles.innerHTML = as + markScale + sx;
        }
        scale -= 0.05;
    }

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
    };

    boxWrapper.onmouseup = function() {
        document.onmousemove = null;
        boxWrapper.onmouseup = null;
        boxWrapper.style.cursor = 'default';
    }
};


boxWrapper.ondragstart = function() {
    return false;
};

function getCoords(elem) {
    let boxWrapper = elem.getBoundingClientRect();
    return {
      top: boxWrapper.top + pageYOffset,
      left: boxWrapper.left + pageXOffset
    };
}


function svgI( name,size) {

    let svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        className = document.createAttribute('class'),
        span = document.createElement('span');


    className.value = 'icon__pic';

    useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#'+ name);

    svgElem.setAttributeNode(className);
    svgElem.appendChild(useElem);

    span.className = 'sv-icon sv-icon--size--' + size;
    span.ariaHidden = 'true';

    span.appendChild(svgElem);

    return span;
}
