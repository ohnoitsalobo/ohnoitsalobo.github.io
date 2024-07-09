let key_Select   = document.getElementById("keySelect");    // get key selector
let scale_Select = document.getElementById("scaleSelect");  // get scale selector
let mode_Select  = document.getElementById("modeSelect");   // get mode selector
const optionChanged = new CustomEvent("change");

let noteCircle = document.getElementById('noteCircle');
let noteCircleDOM, _0, _1, _2, _3, _4, notes_base, notes_rot = 0;
let _0rot = 0, _1rot = 0, _2rot = 0, _3rot = 0, _4rot = 0, num_rot = 0;
noteCircle.addEventListener("load",function(){

    // get the inner DOM of alpha.svg
    noteCircleDOM = noteCircle.contentDocument;
    _0 = noteCircleDOM.getElementById("majorCircle");           _0.style.transformOrigin = "-19% 18%";   _0.style.transition = "opacity 10ms, transform 500ms";
    _1 = noteCircleDOM.getElementById("melodicMinorCircle");    _1.style.transformOrigin = "-19% 18%";   _1.style.transition = "opacity 10ms, transform 500ms";
    _2 = noteCircleDOM.getElementById("harmonicMinorCircle");   _2.style.transformOrigin = "-19% 18%";   _2.style.transition = "opacity 10ms, transform 500ms";
    _3 = noteCircleDOM.getElementById("harmonicMajorCircle");   _3.style.transformOrigin = "-19% 18%";   _3.style.transition = "opacity 10ms, transform 500ms";
    _4 = noteCircleDOM.getElementById("doubleHarmonicCircle");  _4.style.transformOrigin = "-19% 18%";   _4.style.transition = "opacity 10ms, transform 500ms";
    notes_base = noteCircleDOM.getElementById("notes_base");    notes_base.style.transformOrigin = "-19% 18%"; notes_base.style.transition = "transform 500ms";
    // get the inner element by id
    // var delta = svgDoc.getElementById("delta");
    // add behaviour
}, false);

    
function process(){
    loadSelectors();
    // console.log(notes_base);
}

function loadSelectors(){
    for(var x = 0; x < keyList.length; x++){
        var opt = document.createElement('option');
        opt.value = keyList[x];
        opt.innerHTML = keyList[x];
        key_Select.appendChild(opt);
    }
    for(var x = 0; x < modeList.length; x++){
        var opt = document.createElement('option');
        opt.value = modeList[x];
        opt.innerHTML = modeList[x];
        scale_Select.appendChild(opt);
    }
    for(var x = 0; x < 7; x++){
        var opt = document.createElement('option');
        opt.value = x+1;
        opt.innerHTML = "Mode : " + opt.value;
        mode_Select.appendChild(opt);
    }
    let _x = document.getElementById("modeSelectText");
    _x.innerHTML = majorModeList[0];
    scale_Select.dispatchEvent(optionChanged);
}

key_Select.addEventListener("wheel", event => { // down +, up -
    event.preventDefault();
    if(event.deltaY > 0){
        notes_rot -= 30;
        let x = event.srcElement.selectedOptions[0].nextSibling;
        // if(x == null){ x = event.srcElement.firstChild; }
        if(x == null){ x = event.srcElement.selectedOptions[0]; notes_rot += 30;}
        x.selected = true;
    }
    if(event.deltaY < 0){
        notes_rot += 30;
        let x = event.srcElement.selectedOptions[0].previousSibling;
        // if(x == null){ x = event.srcElement.lastChild; }
        if(x == null){ x = event.srcElement.selectedOptions[0]; notes_rot -= 30;}
        x.selected = true;
    }
    event.srcElement.dispatchEvent(optionChanged);
});
key_Select.addEventListener("change", event => {
    let _t = event.srcElement.selectedOptions[0].index;
    // console.info(_t);
    notes_rot = _t*-30;
    notes_base.style.transform = "translate(283.60605px, 131.65039px) rotate(" + notes_rot + "deg)";
});

scale_Select.addEventListener("wheel", event => {
    event.preventDefault();
    if(event.deltaY > 0){
        let x = event.srcElement.selectedOptions[0].nextSibling;
        if(x == null){ x = event.srcElement.selectedOptions[0]; }
        x.selected = true;
    }
    if(event.deltaY < 0){
        let x = event.srcElement.selectedOptions[0].previousSibling;
        if(x == null){ x = event.srcElement.selectedOptions[0]; }
        x.selected = true;
    }
    event.srcElement.dispatchEvent(optionChanged);
});
scale_Select.addEventListener("change", event => {
    // console.info(event.srcElement.selectedOptions[0]);
    let a = event.srcElement;
    let x = document.getElementById("modeSelectText");
    let y = document.getElementById("modeSelect");
    x.style.display = '';
    y.style.display = '';
    _0.style.opacity = '0';
    _1.style.opacity = '0';
    _2.style.opacity = '0';
    _3.style.opacity = '0';
    _4.style.opacity = '0';
    
    if(a.selectedIndex == 0){
        x.innerHTML = majorModeList[y.selectedIndex];
        _0.style.opacity = 1;
    } else if(a.selectedIndex == 1){
        x.innerHTML = melodicMinorModeList[y.selectedIndex];
        _1.style.opacity = 1;
    } else if(a.selectedIndex == 2){
        x.innerHTML = harmonicMinorModeList[y.selectedIndex];
        _2.style.opacity = 1;
    } else if(a.selectedIndex == 3){
        x.innerHTML = harmonicMajorModeList[y.selectedIndex];
        _3.style.opacity = 1;
    } else if(a.selectedIndex == 4){
        x.innerHTML = doubleHarmonicModeList[y.selectedIndex];
        _4.style.opacity = 1;
    } else {
        x.style.display = 'none';
        y.style.display = 'none';
    }
});

mode_Select.addEventListener("wheel", event => {
    event.preventDefault();
    if(event.deltaY > 0){
        let x = event.srcElement.selectedOptions[0].nextSibling;
        if(x == null){ x = event.srcElement.firstChild; num_rot -= 1;}
        x.selected = true;
    }
    if(event.deltaY < 0){
        let x = event.srcElement.selectedOptions[0].previousSibling;
        if(x == null){ x = event.srcElement.lastChild; num_rot += 1;}
        x.selected = true;
    }
    event.srcElement.dispatchEvent(optionChanged);
});
mode_Select.addEventListener("change", event => {
    // console.info(event.srcElement.selectedOptions[0]);
    let a = document.getElementById("scaleSelect");
    let x = document.getElementById("modeSelectText");
    _0rot =          majorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _1rot =   melodicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _2rot =  harmonicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _3rot =  harmonicMajorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _4rot = doubleHarmonicIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    
    if(a.selectedIndex == 0){
        x.innerHTML = majorModeList[event.srcElement.selectedIndex];
        _0.style.transform = "rotate(" + _0rot + "deg)";
    } else if(a.selectedIndex == 1){
        x.innerHTML = melodicMinorModeList[event.srcElement.selectedIndex];
        _1.style.transform = "rotate(" + _1rot + "deg)";
    } else if(a.selectedIndex == 2){
        x.innerHTML = harmonicMinorModeList[event.srcElement.selectedIndex];
        _2.style.transform = "rotate(" + _2rot + "deg)";
    } else if(a.selectedIndex == 3){
        x.innerHTML = harmonicMajorModeList[event.srcElement.selectedIndex];
        _3.style.transform = "rotate(" + _3rot + "deg)";
    } else if(a.selectedIndex == 4){
        x.innerHTML = doubleHarmonicModeList[event.srcElement.selectedIndex];
        _4.style.transform = "rotate(" + _4rot + "deg)";
    } else {
        x.innerHTML = '';
    }
});
