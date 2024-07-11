/*-----------------------------------*\

\*-----------------------------------*/
let noteCircle = document.getElementById('noteCircle');
let noteCircleDOM, _0, _1, _2, _3, _4, noteCircle_base;
let _0rot = 0, _1rot = 0, _2rot = 0, _3rot = 0, _4rot = 0, num_rot = 0;
let touchArray, currentNotesIndex;

let key_Select   = document.getElementById("keySelect");    // get key selector
let scale_Select = document.getElementById("scaleSelect");  // get scale selector
let mode_Select  = document.getElementById("modeSelect");   // get mode selector
let other_Mode_Select  = document.getElementById("otherModeSelect");   // get mode selector
const optionChanged = new CustomEvent("change");

/*-----------------------------------*\

\*-----------------------------------*/

noteCircle.addEventListener("load", function(){
    noteCircleDOM = noteCircle.contentDocument;

    noteCircle_base = noteCircleDOM.getElementById("noteCircle_base");
    noteCircle_base.style.transition = "transform 500ms";

    _0 = noteCircleDOM.getElementById("major");          _0.style.transition = "transform 500ms";
    _1 = noteCircleDOM.getElementById("melodicMinor");   _1.style.transition = "transform 500ms";
    _2 = noteCircleDOM.getElementById("harmonicMinor");  _2.style.transition = "transform 500ms";
    _3 = noteCircleDOM.getElementById("harmonicMajor");  _3.style.transition = "transform 500ms";
    _4 = noteCircleDOM.getElementById("doubleHarmonic"); _4.style.transition = "transform 500ms";

    touchArray = noteCircleDOM.getElementById("touch").getElementsByTagName("rect");
    // console.info(touchArray[0]);
    for(let i = 0; i < touchArray.length; i++){
        touchArray[i].addEventListener("click", playNote, false);
    }
}, false);

key_Select.addEventListener("wheel", event => { // down +, up -
    event.preventDefault(); // prevent page scroll
    if(event.deltaY > 0){
        let x = event.srcElement.selectedOptions[0].nextSibling;
        if(x == null){ // loop back to first element and increment rotation by 360deg
            x = event.srcElement.firstChild;
            numOfRotations -= 1;
        }
        x.selected = true;
    }
    if(event.deltaY < 0){
        let x = event.srcElement.selectedOptions[0].previousSibling;
        if(x == null){ // loop back to last element and decrement rotation by 360deg
            x = event.srcElement.lastChild;
            numOfRotations += 1;
        }
        x.selected = true;
    }
    event.srcElement.dispatchEvent(optionChanged);
});
key_Select.addEventListener("change", event => {
    // keyIndex = event.srcElement.selectedOptions[0].value;
    currentNoteRotation = (key_Select.selectedOptions[0].value * -30) + (numOfRotations * 360);
    rotateNotes();
    
    let x = document.getElementById("modeSelectText");
    let _t = key_Select.selectedOptions[0].innerHTML + " | ";

    x.innerHTML = _t + allModesList[scale_Select.selectedIndex][mode_Select.selectedIndex];
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
    let z = document.getElementById("otherModeSelect");
    x.style.display = '';
    y.style.display = '';
    z.style.display = 'none';
    _0.style.opacity = '0';
    _1.style.opacity = '0';
    _2.style.opacity = '0';
    _3.style.opacity = '0';
    _4.style.opacity = '0';
    
    let _t = key_Select.selectedOptions[0].innerHTML + " | ";
    if(a.selectedIndex == 0){
        x.innerHTML = _t + majorModeList[y.selectedIndex];
        _0.style.opacity = 1;
    } else if(a.selectedIndex == 1){
        x.innerHTML = _t + melodicMinorModeList[y.selectedIndex];
        _1.style.opacity = 1;
    } else if(a.selectedIndex == 2){
        x.innerHTML = _t + harmonicMinorModeList[y.selectedIndex];
        _2.style.opacity = 1;
    } else if(a.selectedIndex == 3){
        x.innerHTML = _t + harmonicMajorModeList[y.selectedIndex];
        _3.style.opacity = 1;
    } else if(a.selectedIndex == 4){
        x.innerHTML = _t + doubleHarmonicModeList[y.selectedIndex];
        _4.style.opacity = 1;
    } else {
        x.style.display = 'none';
        y.style.display = 'none';
        // z.style.display = '';
        y.selectedIndex = 0; y.dispatchEvent(new CustomEvent("change"));
    }
});

mode_Select.addEventListener("wheel", event => {
    event.preventDefault(); // prevent page scroll
    if(event.deltaY > 0){
        let x = event.srcElement.selectedOptions[0].nextSibling;
        if(x == null){ // loop back to first element and increment rotation by 360deg
            x = event.srcElement.firstChild;
            num_rot -= 1;
        }
        x.selected = true;
    }
    if(event.deltaY < 0){
        let x = event.srcElement.selectedOptions[0].previousSibling;
        if(x == null){ // loop back to last element and decrement rotation by 360deg
            x = event.srcElement.lastChild;
            num_rot += 1;
        }
        x.selected = true;
    }
    event.srcElement.dispatchEvent(optionChanged);
});
mode_Select.addEventListener("change", event => {
    // console.info(event.srcElement.selectedOptions[0]);
    // calculate rotation for each mode 'mask'
    let _0rot_p = _0rot, _1rot_p = _1rot, _2rot_p = _2rot, _3rot_p = _3rot, _4rot_p = _4rot;
    let a = document.getElementById("scaleSelect");
    _0rot =          majorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360); _0rot_p = _0rot - _0rot_p;
    _1rot =   melodicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360); _1rot_p = _1rot - _1rot_p;
    _2rot =  harmonicMinorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360); _2rot_p = _2rot - _2rot_p;
    _3rot =  harmonicMajorIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360); _3rot_p = _3rot - _3rot_p;
    _4rot = doubleHarmonicIntervals[event.srcElement.selectedIndex]*-30 + (num_rot*360); _4rot_p = _4rot - _4rot_p;
    _0.style.transform = "rotate(" + _0rot + "deg)";
    _1.style.transform = "rotate(" + _1rot + "deg)";
    _2.style.transform = "rotate(" + _2rot + "deg)";
    _3.style.transform = "rotate(" + _3rot + "deg)";
    _4.style.transform = "rotate(" + _4rot + "deg)";
    
    if(lockNotes){
              if(scale_Select.selectedIndex == 0){
            currentNoteRotation += _0rot_p;
        }else if(scale_Select.selectedIndex == 1){
            currentNoteRotation += _1rot_p;
        }else if(scale_Select.selectedIndex == 2){
            currentNoteRotation += _2rot_p;
        }else if(scale_Select.selectedIndex == 3){
            currentNoteRotation += _3rot_p;
        }else if(scale_Select.selectedIndex == 4){
            currentNoteRotation += _4rot_p;
        }
        numOfRotations = Math.floor(currentNoteRotation/360)+1;
        rotateNotes();
    }
    let x = document.getElementById("modeSelectText");
    let _t = key_Select.selectedOptions[0].innerHTML + " | ";

    x.innerHTML = _t + allModesList[a.selectedIndex][event.srcElement.selectedIndex];
});
/*-----------------------------------*\

\*-----------------------------------*/

function process(){
    loadSelectors();
    
    loadScales();
}

function loadSelectors(){
    for(let x = 0; x < keyList.length; x++){
        let opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = keyList[x];
        key_Select.appendChild(opt);
    }
    for(let x = 0; x < modeList.length; x++){
        let opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = modeList[x];
        if(x == modeList.length-1){
            opt.value = 5;
            opt.innerHTML = "Chromatic";
        }
        scale_Select.appendChild(opt);
    }
    for(let x = 0; x < 7; x++){
        let opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = "Mode : " + (x+1);
        mode_Select.appendChild(opt);
    }
    let _o = document.getElementById("otherModeSelect");
    for(let x = 0; x < otherModeList.length; x++){
        let opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = otherModeList[x][0];
        _o.appendChild(opt);
    }
    let _x = document.getElementById("modeSelectText");
    _x.innerHTML = "C | " + majorModeList[0];
    scale_Select.dispatchEvent(optionChanged);
    document.getElementById("lockNotes").addEventListener("click", function (){
        lockNotes = event.srcElement.checked;
        console.log(lockNotes);
    });
}
function rotateNotes(){
    keyIndex = (currentNoteRotation < 0) ? (currentNoteRotation / -30) % 12 : 11-((currentNoteRotation / 30)+11) % 12;
    if(lockNotes){
        key_Select.selectedIndex = keyIndex;
    }
    noteCircle_base.style.transform = "rotate(" + currentNoteRotation + "deg)";
    console.info(currentNoteRotation);
}

function playNote(event){
    let _id = parseInt(event.srcElement.id.slice(5));
    console.info(_id);
    let transpose = 1;
    for(let i = 0; i < keyIndex; i++){
        transpose *= root12_2;
    }
    
    synth.triggerAttackRelease(tone[_id]*transpose, "8n");
}

/*-----------------------------------*\

\*-----------------------------------*/

let _img1 = document.getElementById("img1");
let _img2 = document.getElementById("img2");
let majorScale = [];
let melodicMinorScale = [];
let harmonicMinorScale = [];
let harmonicMajorScale = [];
let doubleHarmonicScale = [];
let _images = [majorScale, melodicMinorScale, harmonicMinorScale, harmonicMajorScale, doubleHarmonicScale];
const imageOrder = [ 0, 1, 3, 4, 6, 7, 8, 10, 11, 13, 14, 16, 2, 5, 9, 12, 15];

function loadScales(){
    // let begin = "<object width=\"50%\" type=\"image/svg+xml\" data=\"modes/svg/";
    let begin = "<object class=\"img\" type=\"image/svg+xml\" data=\"../modes/svg/";
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
    console.info(_images[0][0]);
    _img1.innerHTML = _images[0][0];
    console.info(_img1);
    console.info(_img2);
}

