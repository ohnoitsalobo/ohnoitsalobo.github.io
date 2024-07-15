let keyIndex = 0, currentNoteRotation = 0, lockNotes = 0, lockedIndex = 0;
let numOfRotations = 0;

let keyList = [ "C", "C\u266F/D\u266D", "D", "D\u266F/E\u266D", "E", "F", "F\u266F/G\u266D", "G", "G\u266F/A\u266D", "A", "A\u266F/B\u266D", "B" ];
let keySharpList = [ "C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B" ];
let keyFlatList = [ "C", "D\u266D", "D", "E\u266D", "E", "F", "G\u266D", "G", "A\u266D", "A", "B\u266D", "B" ];
let keySharperList = [ "B\u266F", "C\u266F", "C\u{1D12A}", "D\u266F", "D\u{1D12A}", "E\u266F", "F\u266F", "F\u{1D12A}", "G\u266F", "G\u{1D12A}", "A\u266F", "A\u{1D12A}" ];
let keyFlatterList = [ "D\u{1D12B}", "D\u266D", "E\u{1D12B}", "E\u266D", "F\u266D", "G\u{1D12B}", "G\u266D", "A\u{1D12B}", "A\u266D", "B\u{1D12B}", "B\u266D", "C\u266D" ];

let modeSelect;
let modeList = [
"Major scale",
"Melodic minor scale"   ,
"Harmonic minor scale"  ,
"Harmonic major scale"  ,
"Double harmonic scale" ,
"Other scales"    
];

let majorModeSelect;
let majorModeList = [          // let majorModeList = [                  // _0_1_2_3_4_5_6_
"Ionian"                   ,   // "\u2160\nIonian"                   ,   // 0 2 4 5 7 9 11  q
"Dorian"                   ,   // "\u2161\nDorian"                   ,   // 0 2 3 5 7 9 10  w
"Phrygian"                 ,   // "\u2162\nPhrygian"                 ,   // 0 1 3 5 7 8 10  e
"Lydian"                   ,   // "\u2163\nLydian"                   ,   // 0 2 4 6 7 9 11  r
"Mixolydian"               ,   // "\u2164\nMixolydian"               ,   // 0 2 4 5 7 9 10  t
"Aeolian\n(natural minor)" ,   // "\u2165\nAeolian\n(natural minor)" ,   // 0 2 3 5 7 8 10  y
"Locrian"                      // "\u2166\nLocrian"                      // 0 1 3 5 6 8 10  u
];
// let majorIntervals = [2, 2, 1, 2, 2, 2, 1]
let majorIntervals = [0, 2, 4, 5, 7, 9, 11];

let melodicMinorModeSelect;
let melodicMinorModeList = [                        // let melodicMinorModeList = [                                // _0_1_2_3_4_5_6_
"Melodic minor\n(ascending)"                   ,    // "\u2160\nMelodic minor\n(ascending)"                   ,    // 0 2 3 5 7 9 11  q
"Dorian \u266D2\n(Phrygian \u266E6)"           ,    // "\u2161\nDorian \u266D2\n(Phrygian \u266E6)"           ,    // 0 1 3 5 7 9 10  w
"Lydian (\u266F5)"                             ,    // "\u2162\nLydian augmented (\u266F5)"                   ,    // 0 2 4 6 8 9 11  e
"Lydian \u266D7\n(overtone scale)"             ,    // "\u2163\nLydian dominant (\u266D7)\n(overtone scale)"  ,    // 0 2 4 6 7 9 10  r
"Mixolydian \u266D6\n(Aeolian major (\u266E3))",    // "\u2164\nAeolian major (\u266E3)\n(Mixolydian \u266D6)",    // 0 2 4 5 7 8 10  t
"Half-diminished\n(Aeolian \u266D5)"           ,    // "\u2165\nHalf-diminished\n(Aeolian \u266D5)"           ,    // 0 2 3 5 6 8 10  y
"Altered dominant\n(Super-Locrian)"                 // "\u2166\nAltered dominant\n(Super Locrian)"                 // 0 1 3 4 6 8 10  u
];
// let melodicMinorIntervals = [2, 1, 2, 2, 2, 2, 1];
let melodicMinorIntervals = [0, 2, 3, 5, 7, 9, 11];

let harmonicMinorModeSelect;
let harmonicMinorModeList = [            // let harmonicMinorModeList = [                    // _0_1_2_3_4_5_6_
"Harmonic minor"                     ,   // "\u2160\nHarmonic minor"                     ,   // 0 2 3 5 7 8 11  q
"Locrian \u266E6"                    ,   // "\u2161\nLocrian \u266E6"                    ,   // 0 1 3 5 6 9 10  w
"Augmented major\n(Ionian \u266F5)"  ,   // "\u2162\nAugmented major\n(Ionian \u266F5)"  ,   // 0 2 4 5 8 9 11  e
"Ukrainian Dorian\n(Dorian \u266F4)" ,   // "\u2163\nUkrainian Dorian\n(Dorian \u266F4)" ,   // 0 2 3 6 7 9 10  r
"Phrygian dominant"                  ,   // "\u2164\nPhrygian dominant"                  ,   // 0 1 4 5 7 8 10  t
"Lydian \u266F2"                     ,   // "\u2165\nLydian \u266F2"                     ,   // 0 3 4 6 7 9 11  y
"Altered diminished\n(Ultra-Locrian)"    // "\u2166\nAltered diminished\n(Ultra-Locrian)"    // 0 1 3 4 6 8 9   u
];
// let harmonicMinorIntervals = [2, 1, 2, 2, 1, 3, 1];
let harmonicMinorIntervals = [0, 2, 3, 5, 7, 8, 11];

let harmonicMajorModeSelect;
let harmonicMajorModeList = [ // let harmonicMajorModeList = [         // _0_1_2_3_4_5_6_
"Harmonic major"         ,    // "\u2160\nHarmonic major"         ,    // 0 2 4 5 7 8 11  q
"Dorian \u266D5"         ,    // "\u2161\nDorian \u266D5"         ,    // 0 2 3 5 6 9 10  w
"Phrygian \u266D4"       ,    // "\u2162\nPhrygian \u266D4"       ,    // 0 1 3 4 7 8 10  e
"Lydian \u266D3"         ,    // "\u2163\nLydian \u266D3"         ,    // 0 2 3 6 7 9 11  r
"Mixolydian \u266D2"     ,    // "\u2164\nMixolydian \u266D2"     ,    // 0 1 4 5 7 9 10  t
"Lydian \u266F2 \u266F5" ,    // "\u2165\nLydian \u266F2 \u266F5" ,    // 0 3 4 6 8 9 11  y
"Locrian \u{1D12B}7"          // "\u2166\nLocrian \u{1D12B}7"          // 0 1 3 5 6 8 9   u
];
// let harmonicMajorIntervals = [2, 2, 1, 2, 1, 3, 1];
let harmonicMajorIntervals = [0, 2, 4, 5, 7, 8, 11];

let doubleHarmonicModeSelect;
let doubleHarmonicModeList = [                             // let doubleHarmonicModeList = [                                     // _0_1_2_3_4_5__6_
"Double harmonic"                                      ,   // "\u2160\nDouble harmonic"                                      ,   // 0 1 4 5 7 8  11  q
"Lydian \u266F2 \u266F6"                               ,   // "\u2161\nLydian \u266F2 \u266F6"                               ,   // 0 3 4 6 7 10 11  w
"Phrygian \u266D4 \u{1D12B}7"                          ,   // "\u2162\nPhrygian \u266D4 \u{1D12B}7"                          ,   // 0 1 3 4 7 8  9   e
"Hungarian minor"                                      ,   // "\u2163\nHungarian minor"                                      ,   // 0 2 3 6 7 8  11  r
"Mixolydian \u266D2 \u266D5\n(Locrian \u266E3 \u266E6)",   // "\u2164\nMixolydian \u266D2 \u266D5\n(Locrian \u266E3 \u266E6)",   // 0 1 4 5 6 9  10  t
"Ionian \u266F2 \u266F5"                               ,   // "\u2165\nIonian \u266F2 \u266F5"                               ,   // 0 3 4 5 8 9  11  y
"Locrian \u{1D12B}3 \u{1D12B}7"                            // "\u2166\nLocrian \u{1D12B}3 \u{1D12B}7"                            // 0 1 2 5 6 8  9   u
];
// let doubleHarmonicIntervals = [1, 3, 1, 2, 1, 3, 1];
let doubleHarmonicIntervals = [0, 1, 4, 5, 7, 8, 11];

let otherModeList = [
    ["Acoustic"                   ],   // 00  // 0  2  4  6  7  9
    ["Adonai malakh"              ],   // 01  // 0  2  4  5  7  8  10
    ["Algerian\n(Hungarian gypsy)"],   // 02 *// 0  2  3  6  7  8  11
    ["Augmented"                  ],   // 03  // 0  3  4  7  8  11
    ["Bebop dominant"             ],   // 04  // 0  2  4  5  7  9  10 11
    ["Bebop major"                ],   // 05  // 0  2  4  5  7  8  9  11
    ["Blues"                      ],   // 06  // 0  3  5  6  7  10
    ["Double harmonic\n(Flamenco)"],   // 07 *// 0  1  4  5  7  8  11
    ["Enigmatic"                  ],   // 08  // 0  1  4  6  8  10 11
    ["Gypsy"                      ],   // 09  // 0  2  3  6  7  8  10
    ["Half diminished"            ],   // 10  // 0  2  3  5  6  8  10
    ["Harmonic major"             ],   // 11 *// 0  2  4  5  7  8  11
    ["Harmonic minor"             ],   // 12 *// 0  2  3  5  7  8  11
    ["Hirajoshi"                  ],   // 13  // 0  2  3  7  8  
    ["Insen"                      ],   // 14  // 0  1  5  7  10 
    ["Istrian"                    ],   // 15  // 0  1  3  4  6  7
    ["Iwato"                      ],   // 16  // 0  1  5  6  10 
    ["Locrian major"              ],   // 17  // 0  2  4  5  6  8  10       // Neapolitan 5th mode
    ["Neapolitan major"           ],   // 18  // 0  1  3  5  7  9  11
    ["Neapolitan minor"           ],   // 19  // 0  1  3  5  7  8  11
    ["Octatonic"                  ],   // 20  // 0  2  3  5  6  8  9  11
    ["Pentatonic major"           ],   // 21  // 0  2  4  7  9  
    ["Pentatonic minor"           ],   // 22  // 0  3  5  7  10 
    ["Persian"                    ],   // 23  // 0  1  4  5  6  8  11
    ["Phrygian\ndominant"         ],   // 24  // 0  1  4  5  7  8  10      // harmonic minor 5th mode
    ["Prometheus"                 ],   // 25  // 0  2  4  6  9  10
    ["Tritone"                    ],   // 26  // 0  1  4  6  7  10
    ["Ukrainian Dorian"           ],   // 27 *// 0  2  3  6  7  9  10
    ["Whole tone"                 ]    // 28  // 0  2  4  6  8  10
];
let otherModeIntervals = [
    [0, 2, 4, 6, 7,  9         ],   // Acoustic
    [0, 2, 4, 5, 7,  8, 10     ],   // Adonai malakh
    [0, 2, 3, 6, 7,  8, 11     ],   // Algerian\n(Hungarian gypsy)
    [0, 3, 4, 7, 8, 11         ],   // Augmented
    [0, 2, 4, 5, 7,  9, 10, 11 ],   // Bebop dominant
    [0, 2, 4, 5, 7,  8,  9, 11 ],   // Bebop major
    [0, 3, 5, 6, 7, 10         ],   // Blues
    [0, 1, 4, 5, 7,  8, 11     ],   // Double harmonic\n(Flamenco)
    [0, 1, 4, 6, 8, 10, 11     ],   // Enigmatic
    [0, 2, 3, 6, 7,  8, 10     ],   // Gypsy
    [0, 2, 3, 5, 6,  8, 10     ],   // Half diminished
    [0, 2, 4, 5, 7,  8, 11     ],   // Harmonic major
    [0, 2, 3, 5, 7,  8, 11     ],   // Harmonic minor
    [0, 2, 3, 7, 8             ],   // Hirajoshi
    [0, 1, 5, 7, 10            ],   // Insen
    [0, 1, 3, 4, 6,  7         ],   // Istrian
    [0, 1, 5, 6, 10            ],   // Iwato
    [0, 2, 4, 5, 6,  8, 10     ],   // Locrian major
    [0, 1, 3, 5, 7,  9, 11     ],   // Neapolitan major
    [0, 1, 3, 5, 7,  8, 11     ],   // Neapolitan minor
    [0, 2, 3, 5, 6,  8, 9, 11  ],   // Octatonic
    [0, 2, 4, 7, 9             ],   // Pentatonic major
    [0, 3, 5, 7, 10            ],   // Pentatonic minor
    [0, 1, 4, 5, 6, 8, 11      ],   // Persian
    [0, 1, 4, 5, 7, 8, 10      ],   // Phrygian\ndominant
    [0, 2, 4, 6, 9, 10         ],   // Prometheus
    [0, 1, 4, 6, 7, 10         ],   // Tritone
    [0, 2, 3, 6, 7, 9, 10      ],   // Ukrainian Dorian
    [0, 2, 4, 6, 8, 10         ]    // Whole tone
];

let allModesList = [
majorModeList,
melodicMinorModeList,
harmonicMinorModeList,
harmonicMajorModeList,
doubleHarmonicModeList,
otherModeList
];

let allIntervals = [
majorIntervals,
melodicMinorIntervals,
harmonicMinorIntervals,
harmonicMajorIntervals,
doubleHarmonicIntervals
];


/*-----------------------------------*\

\*-----------------------------------*/

var synth = new Tone.PolySynth(6, Tone.Synth,
// var synth = new Tone.Synth(
{
    oscillator: {
        type    : 'triangle4',
        volume  : -20,
    },
    envelope: {
        attack  : 0.1,
        decay   : 0.1,
        sustain : 0.9,
        release : 0.1
    }
}
).toMaster()

/*            C     C#/Db     D     D#/Eb     E       F     F#/Gb     G     G#/Ab    A   A#/Bb     B       C'    */
let root12_2 = 1.059463;
var tone = [
/* C  */ 440/(root12_2**9),
/* C# */ 440/(root12_2**8),
/* D  */ 440/(root12_2**7),
/* Eb */ 440/(root12_2**6),
/* E  */ 440/(root12_2**5),
/* F  */ 440/(root12_2**4),
/* F# */ 440/(root12_2**3),
/* G  */ 440/(root12_2**2),
/* G# */ 440/(root12_2**1),
/* A  */ 440*(root12_2**0),
/* Bb */ 440*(root12_2**1),
/* B  */ 440*(root12_2**2),
/* C' */ 440*(root12_2**3)
];



/*-----------------------------------*\

\*-----------------------------------*/

let notes_highlight0 = " \
    <g id=\"notes_highlight \"> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect1\" width=\"30\" height=\"717\" x=\"100\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect2\" width=\"30\" height=\"717\" x=\"164\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect3\" width=\"30\" height=\"717\" x=\"228\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect4\" width=\"30\" height=\"717\" x=\"292\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect5\" width=\"30\" height=\"717\" x=\"358\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect6\" width=\"30\" height=\"717\" x=\"422\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect7\" width=\"30\" height=\"717\" x=\"486\" y=\"0\" /> \
      <rect style=\"fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5\" id=\"rect8\" width=\"30\" height=\"717\" x=\"550\" y=\"0\" /> \
    </g>";
    
var notes_highlight1 = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
notes_highlight1.setAttribute("style", "fill:#000000;fill-opacity:0.5;stroke:#000000;stroke-width:2;stroke-opacity:0.5");
notes_highlight1.setAttribute("width", "30");
notes_highlight1.setAttribute("height", "717");
notes_highlight1.setAttribute("y", "0");
notes_highlight1.setAttribute("id", "rect1");
notes_highlight1.setAttribute("x", "100");

var notes_highlight = [];

for(var x = 0; x < 15; x++){
    notes_highlight.push( document.createElementNS("http://www.w3.org/2000/svg", 'rect'));
}

for(let i = 0; i < notes_highlight.length; i++){
    notes_highlight[i].setAttribute("style", "fill:#000000;stroke:#000000;");
    notes_highlight[i].setAttribute("width", "60");
    notes_highlight[i].setAttribute("height", "740");
    notes_highlight[i].setAttribute("y", "0");
    notes_highlight[i].style = ("transition: opacity 500ms; opacity: 0.2;");
    notes_highlight[i].setAttribute("id", "rect"+i);
    if(i == 0 || i == 14){
        notes_highlight[i].setAttribute("x", "90");
    }
    if(i == 1 || i == 13){
        notes_highlight[i].setAttribute("x", "150");
    }
    if(i == 2 || i == 12){
        notes_highlight[i].setAttribute("x", "210");
    }
    if(i == 3 || i == 11){
        notes_highlight[i].setAttribute("x", "270");
    }
    if(i == 4 || i == 10){
        notes_highlight[i].setAttribute("x", "330");
    }
    if(i == 5 || i == 9){
        notes_highlight[i].setAttribute("x", "415");
    }
    if(i == 6 || i == 8){
        notes_highlight[i].setAttribute("x", "480");
    }
    if(i == 7){
        notes_highlight[i].setAttribute("x", "545");
    }
}