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
var isMobile = false;
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  isMobile = check;
  return check;
};

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
    console.info(isMobile);
    for(let i = 0; i < touchArray.length; i++){
        touchArray[i].addEventListener("click", playNote, false);
        if (!isMobile) touchArray[i].addEventListener("mouseover", playNote, false);
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
    _0.style.display = 'none';
    _1.style.display = 'none';
    _2.style.display = 'none';
    _3.style.display = 'none';
    _4.style.display = 'none';
    
    let _t = key_Select.selectedOptions[0].innerHTML + " | ";
    if(a.selectedIndex == 0){
        x.innerHTML = _t + majorModeList[y.selectedIndex];
        _0.style.display = '';
    } else if(a.selectedIndex == 1){
        x.innerHTML = _t + melodicMinorModeList[y.selectedIndex];
        _1.style.display = '';
    } else if(a.selectedIndex == 2){
        x.innerHTML = _t + harmonicMinorModeList[y.selectedIndex];
        _2.style.display = '';
    } else if(a.selectedIndex == 3){
        x.innerHTML = _t + harmonicMajorModeList[y.selectedIndex];
        _3.style.display = '';
    } else if(a.selectedIndex == 4){
        x.innerHTML = _t + doubleHarmonicModeList[y.selectedIndex];
        _4.style.display = '';
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

document.addEventListener('keydown', event => {
    console.log(event);
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
    // console.info(event.srcElement);
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
    // console.info(_images[0][0]);
    _img1.innerHTML = _images[0][0];
    // console.info(_img1);
    // console.info(_img2);
}

