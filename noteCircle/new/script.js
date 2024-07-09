let key_Select   = document.getElementById("keySelect");    // get key selector
let scale_Select = document.getElementById("scaleSelect");  // get scale selector
let mode_Select  = document.getElementById("modeSelect");   // get mode selector
const optionChanged = new CustomEvent("change");

let noteCircle = document.getElementById('noteCircle');
let noteCircleDOM, _0, _1, _2, _3, _4, notes_base, notes_rot = 0;
let _0rot = 0, _1rot = 0, _2rot = 0, _3rot = 0, _4rot = 0, num_rot = 0;

noteCircle.addEventListener("load", function(){

    // get the inner DOM of the svg
    noteCircleDOM = noteCircle.contentDocument;
    _0 = noteCircleDOM.getElementById("major");           _0.style.transformOrigin = "-19% 18%";  _0.style.transition = "opacity 10ms, transform 500ms";
    _1 = noteCircleDOM.getElementById("melodicMinor");    _1.style.transformOrigin = "-19% 18%";  _1.style.transition = "opacity 10ms, transform 500ms";
    _2 = noteCircleDOM.getElementById("harmonicMinor");   _2.style.transformOrigin = "-19% 18%";  _2.style.transition = "opacity 10ms, transform 500ms";
    _3 = noteCircleDOM.getElementById("harmonicMajor");   _3.style.transformOrigin = "-19% 18%";  _3.style.transition = "opacity 10ms, transform 500ms";
    _4 = noteCircleDOM.getElementById("doubleHarmonic");  _4.style.transformOrigin = "-19% 18%";  _4.style.transition = "opacity 10ms, transform 500ms";
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
    event.preventDefault(); // prevent page scroll
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
    notes_base.style.transform = "rotate(" + notes_rot + "deg)";
});

scale_Select.addEventListener("wheel", event => {
    event.preventDefault(); // prevent page scroll
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
        y.selectedIndex = 0; y.dispatchEvent(new CustomEvent("change"));
    }
});

mode_Select.addEventListener("wheel", event => {
    event.preventDefault(); // prevent page scroll
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
    // calculate rotation for each mode 'mask'
    let a = document.getElementById("scaleSelect");
    _0rot =          majorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _1rot =   melodicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _2rot =  harmonicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _3rot =  harmonicMajorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    _4rot = doubleHarmonicIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360);
    let _temp = "translate(283.60605px, 131.65039px) ";
    _0.style.transform = _temp + "rotate(" + _0rot + "deg)";
    _1.style.transform = _temp + "rotate(" + _1rot + "deg)";
    _2.style.transform = _temp + "rotate(" + _2rot + "deg)";
    _3.style.transform = _temp + "rotate(" + _3rot + "deg)";
    _4.style.transform = _temp + "rotate(" + _4rot + "deg)";
    
    let x = document.getElementById("modeSelectText");
    x.innerHTML = allModesList[a.selectedIndex][event.srcElement.selectedIndex];
});

let majorScale = [];
let melodicMinorScale = [];
let harmonicMinorScale = [];
let harmonicMajorScale = [];
let doubleHarmonicScale = [];
let _images = [majorScale, melodicMinorScale, harmonicMinorScale, harmonicMajorScale, doubleHarmonicScale];

function loadScales(){
    // let begin = "<object width=\"50%\" type=\"image/svg+xml\" data=\"modes/svg/";
    let begin = "<object type=\"image/svg+xml\" data=\"../modes/svg/";
    let end = ".svg\">Please use a web browser with SVG image support to see the image.</object>";
    for(let j = 0; j < 17; j++){
        for(let i = 0; i < 7; i++){
            let index = i+( j*7);
            let filenum = i+(imageOrder[j]*7)+2;
            majorScale          [index] = begin + "major-"          + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + end;
            melodicMinorScale   [index] = begin + "melodicminor-"   + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + end;
            harmonicMinorScale  [index] = begin + "harmonicminor-"  + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + end;
            harmonicMajorScale  [index] = begin + "harmonicmajor-"  + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + end;
            doubleHarmonicScale [index] = begin + "doubleharmonic-" + (filenum < 100 ? "0" : "") + (filenum < 10 ? "0" : "") + filenum + end;
        }
    }
}

function drawNotes(){
    img1.remove();
    img2.remove();
    let index = notesAreLocked();
    let offset = 0;
    if     (index == 1 ) offset = 12;
    else if(index == 3 ) offset = 13;
    else if(index == 6 ) offset = 14;
    else if(index == 8 ) offset = 15;
    else if(index == 10) offset = 16;
    let alt1 = "Pattern: " + modeList[majorMinorOther] + "\nKey: " + keySharpList[notesAreLocked()] + "\n" + allModesList[majorMinorOther][currentlySelectedMode]; // "Notation image 1";
    let alt2 = "Pattern: " + modeList[majorMinorOther] + "\nKey: " + keyFlatList [notesAreLocked()] + "\n" + allModesList[majorMinorOther][currentlySelectedMode]; // "Notation image 2";
    if(majorMinorOther < 5){
        img1 = createDiv(_images[majorMinorOther][index*7+currentlySelectedMode]);
        if(offset) 
            img2 = createDiv(_images[majorMinorOther][offset*7+currentlySelectedMode]);
    }
    img1.parent('img1');
    img1.elt.title = alt1;
    if(offset){
        img2.parent('img2');
        img2.elt.title = alt2;
    }
    showImg = true;
}
