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

let doEvery = 30;
let shortAxis, Size, speed = 0.7;
let scale = 0.9;
let pianoColors = 1;
let majorMinorOther = 0;

// flat    \u266D
// natural \u266E
// sharp   \u266F
// double sharp \u{1D12A}
// double flat  \u{1D12B}

let pianoSelect;;
let pianoMode = ["Piano keys on", " Piano keys off"];
let keySelect;
let keyList = [
"C",
"C\u266F/D\u266D",
"D",
"D\u266F/E\u266D",
"E",
"F",
"F\u266F/G\u266D",
"G",
"G\u266F/A\u266D",
"A",
"A\u266F/B\u266D",
"B"];

let modeSelect;
let modeList = [
"Diatonic (major)",
"Melodic minor",
"Harmonic minor",
"Harmonic major",
"Double harmonic",
"Other scales"
];

let majorModeSelect;
let majorModeList = [                   //_0_1_2_3_4_5_6_
"Mode: I\nIonian (major)",              // 0 2 4 5 7 9 11  q
"Mode: II\nDorian",                     // 0 2 3 5 7 9 10  w
"Mode: III\nPhrygian",                  // 0 1 3 5 7 8 10  e
"Mode: IV\nLydian",                     // 0 2 4 6 7 9 11  r
"Mode: V\nMixolydian",                  // 0 2 4 5 7 9 10  t
"Mode: VI\nAeolian\n(natural minor)",   // 0 2 3 5 7 8 10  y
"Mode: VII\nLocrian"                    // 0 1 3 5 6 8 10  u
];

let melodicMinorModeSelect;
let melodicMinorModeList = [                                //_0_1_2_3_4_5_6_
"Mode: I\nMelodic minor\n(ascending)",                      // 0 2 3 5 7 9 11  q
"Mode: II\nDorian \u266D2\n(Phrygian \u266F6)",             // 0 1 3 5 7 9 10  w
"Mode: III\nLydian augmented (\u266F5)",                    // 0 2 4 6 8 9 11  e
"Mode: IV\nLydian dominant (\u266D7)\n(overtone scale)",    // 0 2 4 6 7 9 10  r
"Mode: V\nAeolian major\n(Mixolydian \u266D6)",             // 0 2 4 5 7 8 10  t
"Mode: VI\nHalf-diminished\n(Locrian \u266E2)",             // 0 2 3 5 6 8 10  y
"Mode: VII\nAltered dominant\n(Super Locrian)"              // 0 1 3 4 6 8 10  u
];

let harmonicMinorModeSelect;
let harmonicMinorModeList = [                       //_0_1_2_3_4_5_6_
"Mode: I\nHarmonic minor",                          // 0 2 3 5 7 8 11  q
"Mode: II\nLocrian \u266F6",                        // 0 1 3 5 6 9 10  w
"Mode: III\nAugmented major\n(Ionian \u266F5)",     // 0 2 4 5 8 9 11  e
"Mode: IV\nUkrainian Dorian",                       // 0 2 3 6 7 9 10  r
"Mode: V\nPhrygian dominant",                       // 0 1 4 5 7 8 10  t
"Mode: VI\nLydian \u266F2",                         // 0 3 4 6 7 9 11  y
"Mode: VII\nAltered diminished\n(Ultra-Locrian)"    // 0 1 3 4 6 8 9   u
];

let harmonicMajorModeSelect;
let harmonicMajorModeList = [           //_0_1_2_3_4_5_6_
"Mode: I\nHarmonic major",              // 0 2 4 5 7 8 11  q
"Mode: II\nDorian \u266D5",             // 0 2 3 5 6 9 10  w
"Mode: III\nPhrygian \u266D4",          // 0 1 3 4 7 8 10  e
"Mode: IV\nLydian \u266D3",             // 0 2 3 6 7 9 11  r
"Mode: V\nMixolydian \u266D2",          // 0 1 4 5 7 9 10  t
"Mode: VI\nLydian \u266F2 \u266F5",     // 0 3 4 6 8 9 11  y
"Mode: VII\nLocrian \u{1D12B}7"         // 0 1 3 5 6 8 9   u
];

let doubleHarmonicModeSelect;
let doubleHarmonicModeList = [                                      //_0_1_2_3_4_5__6_
"Mode: I\nDouble harmonic",                                         // 0 1 4 5 7 8  11  q
"Mode: II\nLydian \u266F2 \u266F6",                                 // 0 3 4 6 7 10 11  w
"Mode: III\nPhrygian \u266D4 \u{1D12B}7",                           // 0 1 3 4 7 8  9   e
"Mode: IV\nHungarian minor",                                        // 0 2 3 6 7 8  11  r
"Mode: V\nMixolydian \u266D2 \u266D5\n(Locrian \u266E3 \u266E6)",   // 0 1 4 5 6 9  10  t
"Mode: VI\nIonian \u266F2 \u266F5",                                 // 0 3 4 5 8 9  11  y
"Mode: VII\nLocrian \u{1D12B}3 \u{1D12B}7"                          // 0 1 2 5 6 8  9   u
];

let otherModeSelect;
let otherModeList = [
"Acoustic",                     // 00  // 0 2 4 6 7 9
"Adonai malakh",                // 01  // 0 2 4 5 7 8 10
"Algerian\n(Hungarian gypsy)",  // 02  *// 0 2 3 6 7 8 11
"Augmented",                    // 03  // 0 3 4 7 8 11
"Bebop dominant",               // 04  // 0 2 4 5 7 9 10 11
"Bebop major",                  // 05  // 0 2 4 5 7 8 9 11
"Blues",                        // 06  // 0 3 5 6 7 10
"Double harmonic\n(Flamenco)",  // 07  *// 0 1 4 5 7 8 11
"Enigmatic",                    // 08  // 0 1 4 6 8 10 11
"Gypsy",                        // 09  // 0 2 3 6 7 8 10
"Half diminished",              // 10  // 0 2 3 5 6 8 10
"Harmonic major",               // 11  *// 0 2 4 5 7 8 11
"Harmonic minor",               // 12  *// 0 2 3 5 7 8 11
"Hirajoshi",                    // 13  // 0 2 3 7 8
"Insen",                        // 14  // 0 1 5 7 10
"Istrian",                      // 15  // 0 1 3 4 6 7
"Iwato",                        // 16  // 0 1 5 6 10
"Locrian major",                // 17  // 0 2 4 5 6 8 10       // Neapolitan 5th mode
"Neapolitan major",             // 18  // 0 1 3 5 7 9 11
"Neapolitan minor",             // 19  // 0 1 3 5 7 8 11
"Octatonic",                    // 20  // 0 2 3 5 6 8 9 11
"Pentatonic major",             // 21  // 0 2 4 7 9
"Pentatonic minor",             // 22  // 0 3 5 7 10
"Persian",                      // 23  // 0 1 4 5 6 8 11
"Phrygian\ndominant",           // 24  // 0 1 4 5 7 8 10      // harmonic minor 5th mode
"Prometheus",                   // 25  // 0 2 4 6 9 10
"Tritone",                      // 26  // 0 1 4 6 7 10
"Ukrainian Dorian",             // 27  *// 0 2 3 6 7 9 10
"Whole tone"                    // 28  // 0 2 4 6 8 10
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