let PI_ = 3.141592653589793;
let noteRotation  = [ 0*PI_/6, 1*PI_/6, 2*PI_/6, 3*PI_/6, 4*PI_/6, 5*PI_/6, 6*PI_/6, 7*PI_/6, 8*PI_/6, 9*PI_/6, 10*PI_/6, 11*PI_/6 ];
let noteIndex = 0, currentNoteRotation = 0, scaleRotation = 0;

let majorModeIndex = 0;
let melodicMinorModeIndex = 0;
let harmonicMinorModeIndex = 0;
let harmonicMajorModeIndex = 0;
let doubleHarmonicModeIndex = 0;

let otherModeIndex = 0;
let doEvery = 30;
let shortAxis, Size, speed = 0.2;
let pianoColors = 1;
let majorMinorOther = 0;

let keySelect;
let keyList = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
let pianoSelect;;
let pianoMode = ["Piano keys on", " Piano keys off"];

let modeSelect;
let modeList = [
"Major modes",
"Melodic minor modes",
"Harmonic minor modes",
"Harmonic major modes",
"Double harmonic modes",
"Other scales"
];

let majorModeSelect;
let majorModeList = ["Ionian\n(major)",
"Dorian",
"Phrygian",
"Lydian",
"Mixolydian",
"Aeolian\n(natural Minor)",
"Locrian"
];

let melodicMinorModeSelect;
let melodicMinorModeList = [
"Melodic minor\n(ascending)",
"Dorian b2\n(Phrygian #6)",
"Lydian\naugmented",
"Lydian dominant\n(overtone scale)",
"Mixolydian b6",
"Aeolian b5\n(Locrian #2)",
"Altered scale\n(Super Locrian)"
];

let harmonicMinorModeSelect;
let harmonicMinorModeList = [
"Harmonic minor",
"Locrian #6",
"Ionian #5",
"Ukrainian Dorian",
"Phrygian Dominant",
"Lydian #2",
"Altered Diminished"
];

let harmonicMajorModeSelect;
let harmonicMajorModeList = [
"Harmonic major",
"Dorian b5",
"Phrygian b4",
"Lydian b3",
"Mixolydian b2",
"Lydian\nAugmented #2",
"Locrian bb7"
];

let doubleHarmonicModeSelect;
let doubleHarmonicModeList = [
"Double harmonic",
"Lydian #2 #6",
"Phrygian bb7 b4",
"Hungarian minor",
"Mixolydian b5 b2",
"Ionian #5 #2",
"Locrian bb3 bb7"
];

let otherModeSelect;
let otherModeList = [
"Acoustic",                     // 00  // 0 2 4 6 7 9
"Adonai malakh",                // 01  // 0 2 4 5 7 8 10
"Algerian\n(Hungarian gypsy)",  // 02  // 0 2 3 6 7 8 11
"Augmented",                    // 03  // 0 3 4 7 8 11
"Bebop dominant",               // 04  // 0 2 4 5 7 9 10 11
"Bebop major",                  // 05  // 0 2 4 5 7 8 9 11
"Blues",                        // 06  // 0 3 5 6 7 10
"Double harmonic\n(Flamenco)",  // 07  // 0 1 4 5 7 8 11
"Enigmatic",                    // 08  // 0 1 4 6 8 10 11
"Gypsy",                        // 09  // 0 2 3 6 7 8 10
"Half diminished",              // 10  // 0 2 3 5 6 8 10
"Harmonic major",               // 11  // 0 2 4 5 7 8 11
"Harmonic minor",               // 12  // 0 2 3 5 7 8 11
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
"Phrygian dominant",            // 24  // 0 1 4 5 7 8 10      // harmonic melodicMinor 5th mode
"Prometheus",                   // 25  // 0 2 4 6 9 10
"Tritone",                      // 26  // 0 1 4 6 7 10
"Ukrainian Dorian",             // 27  // 0 2 3 6 7 9 10
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