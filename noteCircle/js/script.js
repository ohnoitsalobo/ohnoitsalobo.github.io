/*-----------------------------------*\
                VARS
\*-----------------------------------*/
let noteCircle = document.getElementById('noteCircle');     // SVG div
let noteCircleDOM, _0, _1, _2, _3, _4, noteCircle_base;     // vars for each layer of SVG
let _0rot = 0, _1rot = 0, _2rot = 0, _3rot = 0, _4rot = 0, num_rot = 0;     // rotation of each layer
let touchArray;     // touch the note names to play
let transpose;      // keep track of which note is root and transpose tones accordingly

const key_Select   = document.getElementById("keySelect");    // get key selector
const scale_Select = document.getElementById("scaleSelect");  // get scale selector
const mode_Select  = document.getElementById("modeSelect");   // get mode selector
const other_Mode_Select  = document.getElementById("otherModeSelect");   // get mode selector

const key_Slider = document.getElementById('keySlider');        // get key range slider
const mode_Slider = document.getElementById('modeSlider');      // get mode range slider
const key_SliderText = document.getElementById('keySliderText');    // get key text field
const mode_SliderText = document.getElementById('modeSliderText');  // get mode text field

const optionChanged = new CustomEvent("change");    // to 'cause' options to change

/*-----------------------------------*\
            eventlisteners
\*-----------------------------------*/

document.addEventListener('keydown', event => {
    playKeyboard(event);    // handle keyboard events on the page
});

let rot_not = 0;    // handles the "notes (un)locked" animation and limits to once
noteCircle.addEventListener("load", function(){     // handle interactions on the SVG itself
    noteCircleDOM = noteCircle.contentDocument;
    noteCircleDOM.addEventListener("wheel", event => {     // prevent scrolling the page while mouse is on the SVG
        event.preventDefault();
    }, { passive: false });

    noteCircleDOM.addEventListener('keydown', event => {
        playKeyboard(event);    // handle keyboard events on the SVG
    });
    let _ps = noteCircleDOM.getElementById("playScale");    // handle 
    _ps.addEventListener("click", function (){
        playScale();
        _ps.style.pointerEvents = "none";
        _ps.childNodes[1].style.fill = "#000000"
        _ps.style.opacity = "1"
        setTimeout(function(){
            _ps.childNodes[1].style.fill = "#ffffff"
            _ps.style.opacity = "0.5"
            _ps.style.pointerEvents = "";
        }, 3750);
    });
    noteCircleDOM.getElementById("lockRotation").addEventListener("click", function (){
        lockNotes = !lockNotes;
        let _l = noteCircleDOM.getElementById("lock");
        let _a = noteCircleDOM.getElementById("arrows");
        _l.style.opacity = lockNotes ? '1' : '0.3' ;
        _a.style.opacity = lockNotes ? '1' : '0.3' ;
        _a.style.fill = lockNotes ? '#000000' : '#ffffff' ;
        
        if(rot_not < 2){
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 1} ));
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 1} ));
            noteCircleDOM.childNodes[1].style.pointerEvents = "none";
            setTimeout(function(){
                mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} ));
                mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} ));
                noteCircleDOM.childNodes[1].style.pointerEvents = "";
                rot_not++;
            }, 600);
        }
        // console.info(event.srcElement.parentElement);
    });
    noteCircle_base = noteCircleDOM.getElementById("noteCircle_base"); let _tr = ""; //"transform 750ms";
    noteCircle_base.style.transition = _tr;

    _0 = noteCircleDOM.getElementById("major");          _0.style.transition = _tr;
    _1 = noteCircleDOM.getElementById("melodicMinor");   _1.style.transition = _tr;
    _2 = noteCircleDOM.getElementById("harmonicMinor");  _2.style.transition = _tr;
    _3 = noteCircleDOM.getElementById("harmonicMajor");  _3.style.transition = _tr;
    _4 = noteCircleDOM.getElementById("doubleHarmonic"); _4.style.transition = _tr;

    touchArray = noteCircleDOM.getElementById("touch").getElementsByTagName("rect");
    // console.info(touchArray);
    for(let i = 0; i < touchArray.length; i++){
        touchArray[i].addEventListener("mousedown", playNote, false);
        touchArray[i].addEventListener("mouseover", event => {
            // console.info(event);
            if(event.buttons == 1)
                playNote(event);
        });
    }
    noteCircleDOM.getElementById("questionMark").addEventListener("click", function (){
        helpOverlay = !helpOverlay;
        let _t = event.srcElement.parentElement;
        _t.style.opacity = helpOverlay ? '1': '0.8';
        _t.childNodes[1].style.fill = helpOverlay ? 'gold': 'white';
        showHelp();
    });
    
    // noteCircleDOM.getElementById("keyScroll").addEventListener("wheel", function (){
    //     key_Select.dispatchEvent(new event.constructor(event.type, event));
    // });
    // noteCircleDOM.getElementById("root_cw").addEventListener("click", function (){
    //     key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
    // });
    // noteCircleDOM.getElementById("root_ccw").addEventListener("click", function (){
    //     key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
    // });
    // noteCircleDOM.getElementById("modeScroll").addEventListener("wheel", function (){
    //     mode_Select.dispatchEvent(new event.constructor(event.type, event));
    // });
    // noteCircleDOM.getElementById("mode_cw").addEventListener("click", function (){
    //     mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
    // });
    // noteCircleDOM.getElementById("mode_ccw").addEventListener("click", function (){
    //     mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
    // });
}, {passive : false});

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
}, {passive : false});
key_Select.addEventListener("change", event => {
    // keyIndex = event.srcElement.selectedOptions[0].value;
    currentNoteRotation = (key_Select.selectedOptions[0].value * -30) + (numOfRotations * 360);
    
    rotateNotes();
    
    drawNotes();
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
}, {passive : false});
scale_Select.addEventListener("change", event => {
    // console.info(event.srcElement.selectedOptions[0]);
    document.getElementById("sliders").style.display = '';
    noteCircleDOM.getElementById("allModes").style.display = '';
    let a = event.srcElement;
    let _y = mode_Select.selectedIndex;
    document.getElementById("img").style.display = "";
    mode_Select.style.opacity = '1';
    let yy = mode_Select.parentElement.previousElementSibling; yy.style.opacity = '1';
    _0.style.display = 'none';
    _1.style.display = 'none';
    _2.style.display = 'none';
    _3.style.display = 'none';
    _4.style.display = 'none';
    mode_Select.innerHTML="";
    for(let i = 0; i < 7; i++){
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = allModesList[a.selectedIndex][i];
        mode_Select.appendChild(opt);
    }
    mode_Select.selectedIndex = _y;
    mode_SliderText.textContent = mode_Select.selectedOptions[0].textContent;
    
    if(a.selectedIndex == 0){
        _0.style.display = '';
    } else if(a.selectedIndex == 1){
        _1.style.display = '';
    } else if(a.selectedIndex == 2){
        _2.style.display = '';
    } else if(a.selectedIndex == 3){
        _3.style.display = '';
    } else if(a.selectedIndex == 4){
        _4.style.display = '';
    } else {
        mode_Select.style.opacity = '0'; yy.style.opacity = '0'; // console.info(yy);
        document.getElementById("img").style.display = "none";
        noteCircleDOM.getElementById("allModes").style.display = 'none';
        document.getElementById("sliders").style.display = 'none';
    }
    drawNotes();
    showHelp();
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
}, {passive : false});
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
    
    drawNotes();
});

key_Slider.addEventListener('input', function() {
    
    let index = parseInt(this.value);
    if(index < 0) {
        key_Slider.value = 11;
        if(!lockNotes) key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} ));
    }
    if(index > 11) {
        key_Slider.value = 0;
        if(!lockNotes) key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 1} ));
    }
    let _d = key_Select.selectedIndex - key_Slider.value;
    if(_d >  5){ key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 1} )); }
    if(_d < -5){ key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} )); }

    key_Select.selectedIndex = key_Slider.value;
    key_Select.dispatchEvent(optionChanged);
    document.getElementById("keySliderText").textContent = key_Select.options[key_Slider.value].textContent;
});
key_Slider.addEventListener("wheel", event => {
    event.preventDefault();
    let _t= '';
    if(event.deltaY > 0) _t = 'ArrowRight';
    if(event.deltaY < 0) _t = 'ArrowLeft';
    document.dispatchEvent(new KeyboardEvent('keydown', {key : _t, shiftKey : event.shiftKey}));
}, {passive : false});

mode_Slider.addEventListener('input', function() {
    
    let index = parseInt(this.value);
    if(index < 0) {
        index = 6; mode_Slider.value = index;
        mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} ));
    }
    if(index > 6) {
        index = 0; mode_Slider.value = index;
        mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 1} ));
    }
    let _d = mode_Select.selectedIndex - mode_Slider.value;
    if(_d >  3){ mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY:  1} )); }
    if(_d < -3){ mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -1} )); }

    mode_Select.selectedIndex = index;
    mode_Select.dispatchEvent(optionChanged);
    document.getElementById("modeSliderText").textContent = mode_Select.options[index].textContent;
});
mode_Slider.addEventListener("wheel", event => {
    event.preventDefault();
    let _t= '';
    if(event.deltaY > 0) _t = 'ArrowUp';
    if(event.deltaY < 0) _t = 'ArrowDown';
    document.dispatchEvent(new KeyboardEvent('keydown', {key : _t, shiftKey : event.shiftKey}));
}, {passive : false});
/*-----------------------------------*\
            FUNCTIONS
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
        opt.innerHTML = (x+1) + allModesList[0][x];
        mode_Select.appendChild(opt);
    }
    let _o = document.getElementById("otherModeSelect");
    for(let x = 0; x < otherModeList.length; x++){
        let opt = document.createElement('option');
        opt.value = x;
        opt.innerHTML = otherModeList[x][0];
        _o.appendChild(opt);
    }
    scale_Select.dispatchEvent(optionChanged);
}
function rotateNotes(){
    keyIndex = (currentNoteRotation < 0) ? (currentNoteRotation / -30) % 12 : 11-((currentNoteRotation / 30)+11) % 12;
    if(lockNotes){
        key_Select.selectedIndex = keyIndex;
        key_Slider.value = keyIndex;
        key_SliderText.textContent = key_Select.options[keyIndex].textContent;
    }
    noteCircle_base.style.transform = "rotate(" + currentNoteRotation + "deg)";
    // console.info(currentNoteRotation);
}

function playNote(event){
    // console.info(event.srcElement);
    let _id;
    
    if(event.target) 
        _id = parseInt(event.srcElement.id.slice(5));
    else 
        _id = event;
    let transpose = 1;
    for(let i = 0; i < keyIndex; i++){
        transpose *= root12_2;
    }
    synth.triggerAttackRelease(tone[_id]*transpose, "8n");
    
}
function updateKeyModeSlider(x){
    if(x){
        mode_Slider.value = mode_Select.selectedIndex; mode_Slider.dispatchEvent(new Event("input"));
    }else{
        key_Slider.value = key_Select.selectedIndex; key_Slider.dispatchEvent(new Event("input"));
    }
}
function playKeyboard(e){
    // console.info(e);
    if(scale_Select.selectedIndex > 4) return;

    if(e.key == '1') { 
        playNote(0);
        touchArray[1].style.opacity = "1";
        setTimeout(function(){
            touchArray[1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '2') { 
        playNote(modeCheck(2)); 
        touchArray[modeCheck(2)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(2)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '3') { 
        playNote(modeCheck(3)); 
        touchArray[modeCheck(3)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(3)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '4') { 
        playNote(modeCheck(4)); 
        touchArray[modeCheck(4)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(4)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '5') { 
        playNote(modeCheck(5)); 
        touchArray[modeCheck(5)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(5)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '6') { 
        playNote(modeCheck(6)); 
        touchArray[modeCheck(6)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(6)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '7') { 
        playNote(modeCheck(7)); 
        touchArray[modeCheck(7)+1].style.opacity = "1";
        setTimeout(function(){
            touchArray[modeCheck(7)+1].style.opacity = "0";
        }, 500);
    }
    else if(e.key == '8') { 
        playNote(12); 
        touchArray[0].style.opacity = "1";
        setTimeout(function(){
            touchArray[0].style.opacity = "0";
        }, 500);
    }
    
    if(e.key == ' ') {
        e.preventDefault();
        noteCircleDOM.getElementById("playScale").dispatchEvent(new event.constructor("click"));
        // playScale();
    }
    if(e.key == 'ArrowLeft') {
        e.preventDefault();
        key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
        if(e.shiftKey){
            for(var i = 0; i < 6; i++){
                key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
            }
        }
        updateKeyModeSlider(0);
    }
    if(e.key == 'ArrowRight') {
        e.preventDefault();
        key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
        if(e.shiftKey){
            for(var i = 0; i < 6; i++){
                key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
            }
        }
        updateKeyModeSlider(0);
    }
    if(e.key == 'ArrowUp') {
        e.preventDefault();
        mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
        
        if(e.shiftKey && scale_Select.selectedIndex == 0 && !lockNotes){
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
            if(mode_Select.selectedIndex == 6){
                key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: 100} ));
                updateKeyModeSlider(0);
            }
        }
        updateKeyModeSlider(1);
    }
    if(e.key == 'ArrowDown') {
        e.preventDefault();
        mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
        
        if(e.shiftKey && scale_Select.selectedIndex == 0 && !lockNotes){
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
            mode_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
            if(mode_Select.selectedIndex == 3){
                key_Select.dispatchEvent(new WheelEvent("wheel", {deltaY: -100} ));
                updateKeyModeSlider(0);
            }
        }
        updateKeyModeSlider(1);
    }
    if(e.key == 'l' || e.key == 'L'){
        let _x = noteCircleDOM.getElementById("lockRotation");
        _x.dispatchEvent(new MouseEvent("click"));
    }
}

function playScale(){
    let _tt = 250;
    let _scale = scale_Select.selectedIndex;
    let _mode = mode_Select.selectedIndex;
    
    setTimeout( function(){
     playNote(modeCheck(1));
     highlightNote(0);
     touchArray[1].style.opacity = "1"; setTimeout(function(){ touchArray[1].style.opacity = "0"; }, _tt);
     setTimeout( function(){
      playNote(modeCheck(2));
      highlightNote(1);
      touchArray[modeCheck(2)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(2)+1].style.opacity = "0"; }, _tt);
      setTimeout( function(){
       playNote(modeCheck(3));
       highlightNote(2);
       touchArray[modeCheck(3)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(3)+1].style.opacity = "0"; }, _tt);
       setTimeout( function(){
        playNote(modeCheck(4));
        highlightNote(3);
        touchArray[modeCheck(4)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(4)+1].style.opacity = "0"; }, _tt);
        setTimeout( function(){
         playNote(modeCheck(5));
         highlightNote(4);
         touchArray[modeCheck(5)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(5)+1].style.opacity = "0"; }, _tt);
         setTimeout( function(){
          playNote(modeCheck(6));
          highlightNote(5);
          touchArray[modeCheck(6)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(6)+1].style.opacity = "0"; }, _tt);
          setTimeout( function(){
           playNote(modeCheck(7));
           highlightNote(6);
           touchArray[modeCheck(7)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(7)+1].style.opacity = "0"; }, _tt);
           setTimeout( function(){
            playNote(modeCheck(8));
            highlightNote(7);
            touchArray[0].style.opacity = "1"; setTimeout(function(){ touchArray[0].style.opacity = "0"; }, _tt);
            setTimeout( function(){
             if(_scale == 1 && _mode == 0) playNote(modeCheck(7) - 1); else playNote(modeCheck(7));
             highlightNote(8);
             touchArray[modeCheck(7)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(7)+1].style.opacity = "0"; }, _tt);
             setTimeout( function(){
              if(_scale == 1 && _mode == 0) playNote(modeCheck(6) - 1); else playNote(modeCheck(6));
              highlightNote(9);
              touchArray[modeCheck(6)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(6)+1].style.opacity = "0"; }, _tt);
              setTimeout( function(){
               playNote(modeCheck(5));
               highlightNote(10);
               touchArray[modeCheck(5)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(5)+1].style.opacity = "0"; }, _tt);
               setTimeout( function(){
                playNote(modeCheck(4));
                highlightNote(11);
                touchArray[modeCheck(4)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(4)+1].style.opacity = "0"; }, _tt);
                setTimeout( function(){
                 playNote(modeCheck(3));
                 highlightNote(12);
                 touchArray[modeCheck(3)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(3)+1].style.opacity = "0"; }, _tt);
                 setTimeout( function(){
                  playNote(modeCheck(2));
                  highlightNote(13);
                  touchArray[modeCheck(2)+1].style.opacity = "1"; setTimeout(function(){ touchArray[modeCheck(2)+1].style.opacity = "0"; }, _tt);
                  setTimeout( function(){
                   playNote(modeCheck(1));
                   highlightNote(14);
                    touchArray[1].style.opacity = "1"; setTimeout(function(){ touchArray[1].style.opacity = "0"; }, _tt);
                  }, _tt);
                 }, _tt);
                }, _tt);
               }, _tt);
              }, _tt);
             }, _tt);
            }, _tt);
           }, _tt);
          }, _tt);
         }, _tt);
        }, _tt);
       }, _tt);
      }, _tt);
     }, _tt);
    }, _tt);
}
/*-----------------------------------*\
        IMAGE LOADING
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
    // let begin = "<object width='50%' type='image/svg+xml' data='modes/svg/";
    let mid = "<div style='max-width: 350px;'><div class='imgText'><div style='margin-top: 4px;'>Treble (G clef)</div><div style='margin-top: 48px;'>Alto (C clef)</div><div style='margin-top: 49px;'>Bass (F clef)</div><div style='margin-top: 51px;'>Mandolin TAB</div><div style='margin-top: 57px;'>Guitar TAB</div></div>";
    let begin = mid + "<object type='image/svg+xml' data='modes/svg/";
    let end = ".svg' style='max-width: 300px; filter: invert(1);'>Please use a web browser with SVG image support to see the image.</object>";
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

    _img1.innerHTML = _images[0][0];

}

function drawNotes(){
    img1.innerHTML = "";
    img2.innerHTML = "";

    let index = keyIndex;
    let _scale = scale_Select.selectedIndex;
    let _mode  = mode_Select.selectedIndex;
    let offset = 0;
    if     (index == 1 ) offset = 12;
    else if(index == 3 ) offset = 13;
    else if(index == 6 ) offset = 14;
    else if(index == 8 ) offset = 15;
    else if(index == 10) offset = 16;
    if(_scale < 5){
        img1.innerHTML = _images[_scale][index*7+_mode];
        if(offset) {
            img2.innerHTML = _images[_scale][offset*7+_mode];
        }
    }
}

function highlightNote(x){
    let svg = document.getElementById("img1").childNodes[0].childNodes[1].contentDocument;
    let _svg = svg.childNodes[0];
    let _t = _svg.appendChild(notes_highlight[x]);
    _t.style.opacity = '0.2';

    setTimeout( function(){
        _t.style.opacity = '0';
    }, 100);

}

function modeCheck(t){
    let _scale = scale_Select.selectedIndex;
    let majorModeIndex          = (_0rot < 0) ? (_0rot / -30) % 12 : 11-((_0rot / 30)+11) % 12;
    let melodicMinorModeIndex   = (_1rot < 0) ? (_1rot / -30) % 12 : 11-((_1rot / 30)+11) % 12;
    let harmonicMinorModeIndex  = (_2rot < 0) ? (_2rot / -30) % 12 : 11-((_2rot / 30)+11) % 12;
    let harmonicMajorModeIndex  = (_3rot < 0) ? (_3rot / -30) % 12 : 11-((_3rot / 30)+11) % 12;
    let doubleHarmonicModeIndex = (_4rot < 0) ? (_4rot / -30) % 12 : 11-((_4rot / 30)+11) % 12;
    if     (t == 1){ // 0
        return 0;
    }
    else if(t == 2){ // 1
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==10 )
                return 2;
            else
                return 1;
        }
        else if(_scale == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 1 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==10 )
                return 2;
            else
                return 1;
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                return 2;
            else {
                if(harmonicMinorModeIndex == 8)
                    return 3;
                else
                    return 1;
            }
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                return 2;
            else {
                if(harmonicMajorModeIndex == 8)
                    return 3;
                else
                    return 1;
            }
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex ==10 || 
               doubleHarmonicModeIndex ==11 )
                return 1;
            else {
                if(doubleHarmonicModeIndex == 1 || 
                   doubleHarmonicModeIndex == 8)
                    return 3;
                else
                    return 2;
            }
        }
    }
    else if(t == 3){ // 2
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 1 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                return 4;
            else
                return 3;
        }
        else if(_scale == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==11 )
                return 3;
            else
                return 4;
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 2 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 5 || 
               // harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==11 )
                return 3;
            else
                return 4;
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 3 || 
               // harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex ==10 )
                return 4;
            else
                return 3;
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 3 || 
               // doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                return 4;
            else {
                if(doubleHarmonicModeIndex == 11)
                    return 2;
                else
                    return 3;
            }
        }
    }
    else if(t == 4){ // 3
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 4 || 
               majorModeIndex == 6 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==11 )
                return 5;
            else
                return 6;
        }
        else if(_scale == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 9 || 
               melodicMinorModeIndex ==10 )
                return 5;
            else {
                if(melodicMinorModeIndex == 11)
                    return 4;
                else
                    return 6;
            }
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 2 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==10 )
                return 5;
            else {
                if(harmonicMinorModeIndex == 11)
                    return 4;
                else
                    return 6;
            }
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 2 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==11 )
                return 5;
            else {
                if(harmonicMajorModeIndex == 4)
                    return 4;
                else
                    return 6;
            }
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 2 ||
               doubleHarmonicModeIndex == 3 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 7 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 11 )
                return 5;
            else {
                if(doubleHarmonicModeIndex == 4)
                    return 4;
                else
                    return 6;
            }
        }
    }
    else if(t == 5){ // 4
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 4 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 9 || 
               majorModeIndex ==10 )
                return 7;
            else
                return 6;
        }
        else if(_scale == 1){ 
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 7 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                return 7;
            else {
                if(melodicMinorModeIndex == 9 ||
                   melodicMinorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex ==10 )
                return 7;
            else {
                if(harmonicMinorModeIndex == 2 ||
                   harmonicMinorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 7 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==10 )
                return 7;
            else {
                if(harmonicMajorModeIndex == 2 ||
                   harmonicMajorModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 10 )
                return 7;
            else {
                if(doubleHarmonicModeIndex == 7 ||
                   doubleHarmonicModeIndex ==11 )
                    return 6;
                else
                    return 8;
            }
        }
    }
    else if(t == 6){ // 5
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 2 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 7 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                return 9;
            else
                return 8;
        }
        else if(_scale == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 2 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 5 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                return 9;
            else
                return 8;
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               // harmonicMinorModeIndex == 3 ||
               harmonicMinorModeIndex == 4 || 
               harmonicMinorModeIndex == 6 || 
               harmonicMinorModeIndex == 7 || 
               harmonicMinorModeIndex == 9 || 
               harmonicMinorModeIndex ==11 )
                return 8;
            else
                return 9;
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 3 ||
               harmonicMajorModeIndex == 4 || 
               harmonicMajorModeIndex == 6 || 
               // harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex == 9 || 
               harmonicMajorModeIndex ==11 )
                return 8;
            else
                return 9;
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 3 ||
               doubleHarmonicModeIndex == 4 || 
               doubleHarmonicModeIndex == 5 || 
               // doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 || 
               doubleHarmonicModeIndex == 11 )
                return 8;
            else {
                if(doubleHarmonicModeIndex == 1 )
                    return 10;
                else
                    return 9;
            }
        }
    }
    else if(t == 7){ // 6
        if     (_scale == 0){
            if(majorModeIndex == 0 || 
               majorModeIndex == 1 ||
               majorModeIndex == 3 || 
               majorModeIndex == 5 || 
               majorModeIndex == 6 || 
               majorModeIndex == 8 || 
               majorModeIndex ==10 )
                return 11;
            else
                return 10;
        }
        else if(_scale == 1){
            if(melodicMinorModeIndex == 0 || 
               melodicMinorModeIndex == 1 ||
               melodicMinorModeIndex == 3 || 
               melodicMinorModeIndex == 4 || 
               melodicMinorModeIndex == 6 || 
               melodicMinorModeIndex == 8 || 
               melodicMinorModeIndex ==10 )
                return 11;
            else
                return 10;
        }
        else if(_scale == 2){
            if(harmonicMinorModeIndex == 0 || 
               harmonicMinorModeIndex == 1 ||
               harmonicMinorModeIndex == 3 || 
               harmonicMinorModeIndex == 4 || 
               // harmonicMinorModeIndex == 5 || 
               harmonicMinorModeIndex == 8 || 
               harmonicMinorModeIndex == 9 )
                return 11;
            else {
                if(harmonicMinorModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
        else if(_scale == 3){
            if(harmonicMajorModeIndex == 0 || 
               harmonicMajorModeIndex == 1 ||
               harmonicMajorModeIndex == 3 || 
               harmonicMajorModeIndex == 5 || 
               harmonicMajorModeIndex == 6 || 
               harmonicMajorModeIndex == 8 || 
               harmonicMajorModeIndex == 9 )
                return 11;
            else {
                if(harmonicMajorModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
        else if(_scale == 4){
            if(doubleHarmonicModeIndex == 0 || 
               doubleHarmonicModeIndex == 1 ||
               doubleHarmonicModeIndex == 2 || 
               doubleHarmonicModeIndex == 5 || 
               doubleHarmonicModeIndex == 6 || 
               doubleHarmonicModeIndex == 8 || 
               doubleHarmonicModeIndex == 9 )
                return 11;
            else {
                if(doubleHarmonicModeIndex == 4 ||
                   doubleHarmonicModeIndex ==11 )
                    return 9;
                else
                    return 10;
            }
        }
    }
    else if(t == 8){ // 7
        return 12;
    }
    else
        return 0;
}

/*-----------------------------------*\
            HELP OVERLAY
\*-----------------------------------*/

function showHelp(){
    let _t0 = document.getElementById("noteCircle").getBoundingClientRect();
    let _t1 = noteCircleDOM.getElementById("lockRotation").getBoundingClientRect();
    let _t2 = noteCircleDOM.getElementById("playScale").getBoundingClientRect();
    let _t3 = key_Slider.getBoundingClientRect();
    let _t4 = mode_Slider.getBoundingClientRect();
    let _t5 = scale_Select.getBoundingClientRect();

    
    let _help4 = document.getElementById("help4"); let _h4x = _t0.left+_t1.x-15 , _h4y = _t0.top+_t1.y+5;
    let _help5 = document.getElementById("help5"); let _h5x = _t0.left+_t2.x-15 , _h5y = _t0.top+_t2.y+5;
    let _help1 = document.getElementById("help1"); let _h1x = _t3.x-20, _h1y = _t3.y+5;
    let _help2 = document.getElementById("help2"); let _h2x = _t4.x-20, _h2y = _t4.y+5;
    let _help3 = document.getElementById("help3"); let _h3x = _t5.x-20, _h3y = _t5.y;

    let _htext = document.getElementById("helpText");
    
    if(helpOverlay && scale_Select.selectedIndex < 5){
        _help1.innerHTML  =  "1";
        _help1.style.left = _h1x+"px";
        _help1.style.top  = _h1y+"px";
        _help2.innerHTML  =  "2";
        _help2.style.left = _h2x+"px";
        _help2.style.top  = _h2y+"px";
        _help3.innerHTML  =  "3";
        _help3.style.left = _h3x+"px";
        _help3.style.top  = _h3y+"px";
        _help4.innerHTML  =  "4";
        _help4.style.left = _h4x+"px";
        _help4.style.top  = _h4y+"px";
        _help5.innerHTML  =  "5";
        _help5.style.left = _h5x+"px";
        _help5.style.top  = _h5y+"px";

        _htext.innerHTML= " <br \>\
            <b>1.</b> <u>Change your starting note</u> (root or tonic) <br />             \
            by rotating the lower circle.<br />                                           \
            <i>Desktop users can use ◄ and ► or mouse scroll wheel.<br />                 \
            Hold 'Shift' to rotate by 7 half-steps (a fifth interval).</i><br /><br />    \
            <b>2.</b> <u>Change the mode</u> (the distribution of intervals) <br />       \
            by rotating the upper circle.<br />                                           \
            <i>Desktop users can use ▲ and ▼ or mouse scroll wheel.<br />                 \
            Hold 'Shift' to rotate by 3 scale intervals.</i><br /><br />                  \
            <b>3.</b> <u>Change the base pattern of notes</u> (the scale). <br /><br />   \
            <b>4.</b> <u>Lock the visible notes in the pattern</u>.<br />                 \
            This keeps the same notes visible as the 'mode' pattern rotates.<br /><br />  \
            <b>5.</b> <u>Listen to the selected notes</u>. <br />                         \
            You can also tap individual note names</u>.<br />                             \
            <i>Desktop users can use 'space' and numbers 1-8.</i><br /><br />             \
            <b>See the written representation of the<br />                                \
            selected notes in notation and tablature below.</b><br /><br />               \
        ";
    }else{
        _help1.innerHTML = "";
        _help1.style = "";
        _help2.innerHTML = "";
        _help2.style = "";
        _help3.innerHTML = "";
        _help3.style = "";
        _help4.innerHTML = "";
        _help4.style = "";
        _help5.innerHTML = "";
        _help5.style = "";
        // _help6.innerHTML = "";
        // _help6.style = "";
        _htext.innerHTML = "";
    }
}
