let PI_ = 3.141592653589793;

let noteRotation  = [ 0*PI_/6, 1*PI_/6, 2*PI_/6, 3*PI_/6, 4*PI_/6, 5*PI_/6, 6*PI_/6, 7*PI_/6, 8*PI_/6, 9*PI_/6, 10*PI_/6, 11*PI_/6 ];
let keyIndex = 0, currentNoteRotation = 0, lockNotes = 0, lockedIndex = 0;
let majorRotation = 0;
let melodicMinorRotation = 0;
let harmonicMinorRotation = 0;
let harmonicMajorRotation = 0;
let doubleHarmonicRotation = 0;

let majorModeIndex = 0;
let melodicMinorModeIndex = 0;
let harmonicMinorModeIndex = 0;
let harmonicMajorModeIndex = 0;
let doubleHarmonicModeIndex = 0;
let otherModeIndex = 0;
let currentlySelectedMode = 0;

let doEvery = 30;
let shortAxis, Size, speed = 0.4;
let scale = 0.75;
let pianoColors = 0;
let majorMinorOther = 0;
let showEnharmonic = 0;
let showOverlay = 1;
let interacted = 1;

// \u266D    flat   
// \u266E    natural
// \u266F    sharp  
// \u{1D12A} double sharp
// \u{1D12B} double flat 

let pianoSelect;;
let pianoMode = ["Piano keys on", " Piano keys off"];
let keySelect;
let keyList = [ "C", "C\u266F/D\u266D", "D", "D\u266F/E\u266D", "E", "F", "F\u266F/G\u266D", "G", "G\u266F/A\u266D", "A", "A\u266F/B\u266D", "B" ];
let keySharpList = [ "C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B" ];
let keyFlatList = [ "C", "D\u266D", "D", "E\u266D", "E", "F", "G\u266D", "G", "A\u266D", "A", "B\u266D", "B" ];
let keySharperList = [ "B\u266F", "C\u266F", "C\u{1D12A}", "D\u266F", "D\u{1D12A}", "E\u266F", "F\u266F", "F\u{1D12A}", "G\u266F", "G\u{1D12A}", "A\u266F", "A\u{1D12A}" ];
let keyFlatterList = [ "D\u{1D12B}", "D\u266D", "E\u{1D12B}", "E\u266D", "F\u266D", "G\u{1D12B}", "G\u266D", "A\u{1D12B}", "A\u266D", "B\u{1D12B}", "B\u266D", "C\u266D" ];

let modeSelect;
let modeList = [
"Major",
"Melodic minor"   ,
"Harmonic minor"  ,
"Harmonic major"  ,
"Double harmonic" ,
"Other scales"    
];

let majorModeSelect;
let majorModeList = [                        //_0_1_2_3_4_5_6_
"Mode: \u2160\nIonian"                   ,   // 0 2 4 5 7 9 11  q
"Mode: \u2161\nDorian"                   ,   // 0 2 3 5 7 9 10  w
"Mode: \u2162\nPhrygian"                 ,   // 0 1 3 5 7 8 10  e
"Mode: \u2163\nLydian"                   ,   // 0 2 4 6 7 9 11  r
"Mode: \u2164\nMixolydian"               ,   // 0 2 4 5 7 9 10  t
"Mode: \u2165\nAeolian\n(natural minor)" ,   // 0 2 3 5 7 8 10  y
"Mode: \u2166\nLocrian"                      // 0 1 3 5 6 8 10  u
];
// let majorIntervals = [2, 2, 1, 2, 2, 2, 1]
// let majorIntervals = [0, 2, 4, 5, 7, 9, 11]

let melodicMinorModeSelect;
let melodicMinorModeList = [                                    //_0_1_2_3_4_5_6_
"Mode: \u2160\nMelodic minor\n(ascending)"                 ,    // 0 2 3 5 7 9 11  q
"Mode: \u2161\nDorian \u266D2\n(Phrygian \u266E6)"         ,    // 0 1 3 5 7 9 10  w
"Mode: \u2162\nLydian augmented (\u266F5)"                 ,    // 0 2 4 6 8 9 11  e
"Mode: \u2163\nLydian dominant (\u266D7)\n(overtone scale)",    // 0 2 4 6 7 9 10  r
"Mode: \u2164\nAeolian major (\u266E3)\n(Mixolydian \u266D6)"        ,    // 0 2 4 5 7 8 10  t
"Mode: \u2165\nHalf-diminished\n(Aeolian \u266D5)"         ,    // 0 2 3 5 6 8 10  y
"Mode: \u2166\nAltered dominant\n(Super Locrian)"               // 0 1 3 4 6 8 10  u
];
// let melodicMinorIntervals = [2, 1, 2, 2, 2, 2, 1];
// let melodicMinorIntervals = [0, 2, 3, 5, 7, 9, 11];

let harmonicMinorModeSelect;
let harmonicMinorModeList = [                          //_0_1_2_3_4_5_6_
"Mode: \u2160\nHarmonic minor"                   ,     // 0 2 3 5 7 8 11  q
"Mode: \u2161\nLocrian \u266E6"                  ,     // 0 1 3 5 6 9 10  w
"Mode: \u2162\nAugmented major\n(Ionian \u266F5)",     // 0 2 4 5 8 9 11  e
"Mode: \u2163\nUkrainian Dorian\n(Dorian \u266F4)",    // 0 2 3 6 7 9 10  r
"Mode: \u2164\nPhrygian dominant"                ,     // 0 1 4 5 7 8 10  t
"Mode: \u2165\nLydian \u266F2"                   ,     // 0 3 4 6 7 9 11  y
"Mode: \u2166\nAltered diminished\n(Ultra-Locrian)"    // 0 1 3 4 6 8 9   u
];
// let harmonicMinorIntervals = [2, 1, 2, 2, 1, 3, 1];
// let harmonicMinorIntervals = [0, 2, 3, 5, 7, 8, 11];

let harmonicMajorModeSelect;
let harmonicMajorModeList = [               //_0_1_2_3_4_5_6_
"Mode: \u2160\nHarmonic major"         ,    // 0 2 4 5 7 8 11  q
"Mode: \u2161\nDorian \u266D5"         ,    // 0 2 3 5 6 9 10  w
"Mode: \u2162\nPhrygian \u266D4"       ,    // 0 1 3 4 7 8 10  e
"Mode: \u2163\nLydian \u266D3"         ,    // 0 2 3 6 7 9 11  r
"Mode: \u2164\nMixolydian \u266D2"     ,    // 0 1 4 5 7 9 10  t
"Mode: \u2165\nLydian \u266F2 \u266F5" ,    // 0 3 4 6 8 9 11  y
"Mode: \u2166\nLocrian \u{1D12B}7"          // 0 1 3 5 6 8 9   u
];
// let harmonicMajorIntervals = [2, 2, 1, 2, 1, 3, 1];
// let harmonicMajorIntervals = [0, 2, 4, 5, 7, 8, 11];

let doubleHarmonicModeSelect;
let doubleHarmonicModeList = [                                           //_0_1_2_3_4_5__6_
"Mode: \u2160\nDouble harmonic"                                      ,   // 0 1 4 5 7 8  11  q
"Mode: \u2161\nLydian \u266F2 \u266F6"                               ,   // 0 3 4 6 7 10 11  w
"Mode: \u2162\nPhrygian \u266D4 \u{1D12B}7"                          ,   // 0 1 3 4 7 8  9   e
"Mode: \u2163\nHungarian minor"                                      ,   // 0 2 3 6 7 8  11  r
"Mode: \u2164\nMixolydian \u266D2 \u266D5\n(Locrian \u266E3 \u266E6)",   // 0 1 4 5 6 9  10  t
"Mode: \u2165\nIonian \u266F2 \u266F5"                               ,   // 0 3 4 5 8 9  11  y
"Mode: \u2166\nLocrian \u{1D12B}3 \u{1D12B}7"                            // 0 1 2 5 6 8  9   u
];
// let doubleHarmonicIntervals = [1, 3, 1, 2, 1, 3, 1];
// let doubleHarmonicIntervals = [0, 1, 4, 5, 7, 8, 11];

let allModesList = [
majorModeList,
melodicMinorModeList,
harmonicMinorModeList,
harmonicMajorModeList,
doubleHarmonicModeList
];

let otherModeSelect;
let otherModeList = [
"Acoustic"                   ,  // 00  // 0  2  4  6  7  9
"Adonai malakh"              ,  // 01  // 0  2  4  5  7  8  10
"Algerian\n(Hungarian gypsy)",  // 02 *// 0  2  3  6  7  8  11
"Augmented"                  ,  // 03  // 0  3  4  7  8  11
"Bebop dominant"             ,  // 04  // 0  2  4  5  7  9  10 11
"Bebop major"                ,  // 05  // 0  2  4  5  7  8  9  11
"Blues"                      ,  // 06  // 0  3  5  6  7  10
"Double harmonic\n(Flamenco)",  // 07 *// 0  1  4  5  7  8  11
"Enigmatic"                  ,  // 08  // 0  1  4  6  8  10 11
"Gypsy"                      ,  // 09  // 0  2  3  6  7  8  10
"Half diminished"            ,  // 10  // 0  2  3  5  6  8  10
"Harmonic major"             ,  // 11 *// 0  2  4  5  7  8  11
"Harmonic minor"             ,  // 12 *// 0  2  3  5  7  8  11
"Hirajoshi"                  ,  // 13  // 0  2  3  7  8  
"Insen"                      ,  // 14  // 0  1  5  7  10 
"Istrian"                    ,  // 15  // 0  1  3  4  6  7
"Iwato"                      ,  // 16  // 0  1  5  6  10 
"Locrian major"              ,  // 17  // 0  2  4  5  6  8  10       // Neapolitan 5th mode
"Neapolitan major"           ,  // 18  // 0  1  3  5  7  9  11
"Neapolitan minor"           ,  // 19  // 0  1  3  5  7  8  11
"Octatonic"                  ,  // 20  // 0  2  3  5  6  8  9  11
"Pentatonic major"           ,  // 21  // 0  2  4  7  9  
"Pentatonic minor"           ,  // 22  // 0  3  5  7  10 
"Persian"                    ,  // 23  // 0  1  4  5  6  8  11
"Phrygian\ndominant"         ,  // 24  // 0  1  4  5  7  8  10      // harmonic minor 5th mode
"Prometheus"                 ,  // 25  // 0  2  4  6  9  10
"Tritone"                    ,  // 26  // 0  1  4  6  7  10
"Ukrainian Dorian"           ,  // 27 *// 0  2  3  6  7  9  10
"Whole tone"                    // 28  // 0  2  4  6  8  10
];
/* 
// 1
 7
 8
14
15
16
18
19
23
24
26
// 2
 0
 1
 2
 4
 5
 9
10
11
12
13
17
20
21
25
27
28
// 3
 3
 6
22
 2
 9
10
12
13
15
18
19
20
27
// 4
 0
 1
 3
 4
 5
 7
 8
11
17
21
23
24
25
26
28
15
// 5
 6
14
16
22
 1
 4
 5
 7
10
11
12
17
18
19
20
23
24
// 6
 0
 2
 6
 8
 9
16
25
26
27
28
10
15
17
20
23
// 7
 3
13
14
21
22
 0
 1
 2
 4
 5
 6
 7
 9
11
12
18
19
24
26
27
15
// 8
 3
 8
13
28
 1
 2
 5
 7
 9
10
11
12
17
19
20
23
24
// 9
21
25
 0
 4
18
27
 5
20
// 10
14
16
22
 6
 8
25
26
28
 1
 4
 9
10
17
24
27
// 11
 3
 2
 7
 8
11
12
18
19
23
 4
 5
20
*/