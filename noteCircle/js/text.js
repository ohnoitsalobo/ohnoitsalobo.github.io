let mouseOver = "<br /><br /><small>Tap the mode name to hear what it sounds like.<br /><br />\
On computer, use the numbers 1-8 to play different notes of the scale.<br />\
Press  <i>Shift</i> + number to hear the chord corresponding to that scale degree i.e. the \u2160 chord, the \u2162 chord, the \u2165 chord, etc.</small>";

let modeText = [
"<b><i>Major (Ionian)</i></b><br /><br />\
The major scale is one of the most, if not <i>the</i> most, well-known scales.<br />\
The <i>relative minor</i> scale of any key uses the <i>same</i> notes as the major scale, but uses the 6th note as the root instead.",
        
"<b><i>Melodic minor</i></b><br /><br />\
The melodic minor is simply the <u>major scale</u> with <u>the 3rd note lowered</u> by one half-step (minor 3rd vs major 3rd).<br />\
As its name suggests, composers often prefer its sound when creating melodies, as opposed to the harmonic minor which has a three-semitone jump between its 6th and 7th notes.<br />\
Interestingly, the melodic minor scale is special in that it is played differently while ascending vs descending. When <i>ascending</i> the scale, it is played as you see here, but when <i>descending</i> it usually reverts back to the <i>natural minor</i> scale.",

"<b><i>Harmonic minor</i></b><br /><br />\
The harmonic minor is a modification of the natural minor (Aeolian mode). As its name suggests, its sound is often preferred for creating harmonies. The harmonic minor is created by taking the 7th note of the natural minor scale and raising it a half-step, to create a stronger feeling of tension and release with the root / octave.",

"<b><i>Harmonic major</i></b><br /><br />\
The harmonic major is a 'constructed' scale that is used in a few old compositions but is most common in jazz. It is created by raising the 3rd note of the harmonic minor scale and raising it by a half-step.",

"<b><i>Double harmonic</i></b><br /><br />\
The double harmonic scale is a scale that is generally unfamiliar in Western music. It is also known as the <i>Byzantine scale</i> or <i>Gypsy major</i> and resembles some Arabic scales.",

"<b><i>Other scales</i></b><br /><br />\
Explore other scales by clicking the highlighted notes.<br />These do not auto-play or have keyboard keys assigned yet."
];

let videoLink = "<br /><br /><a href=\"https://www.youtube.com/watch?v=VPWQC4pdEco&list=PLMvVESrbjBWplAcg3pG0TesncGT7qvO06&index=14\"><small>Watch 12ToneVideos' introduction on the subject of modes.</small></a><br /><br />";
let majorText = [
videoLink + "<b>Ionian</b>, or major - the first 'modern' scale, in a manner of speaking. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 1 + 2 + 2 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 4 5 6 7</b><br /><br />\
<small>The Ionian mode is the most well known scale, but all of its modes are scales in their own right, and serve different emotional purposes in music.</small>",

videoLink + "<b>Dorian</b> - the second mode of the major scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 2 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 4 5 6 \u266D7</b><br /><br />\
<small>The Dorian mode could be considered two steps 'darker' than Ionian due to its lowered 3rd and 7th intervals.</small>",

videoLink + "<b>Phrygian</b> - the third mode of the major scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 2 + 2 + 1 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 4 5 \u266D6 \u266D7</b><br /><br />\
<small>The Phrygian mode could be considered four steps 'darker' than Ionian due to its lowered 2nd, 3rd, 6th, and 7th intervals.</small>",

videoLink + "<b>Lydian</b> - the fourth mode of the major scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 2 + 1 + 2 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 \u266F4 5 6 7</b><br /><br />\
<small>The Lydian mode could be considered one step 'brighter' than Ionian due to its raised 4th interval.</small>",

videoLink + "<b>Mixolydian</b> - the fifth mode of the major scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 1 + 2 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 4 5 6 \u266D7</b><br /><br />\
<small>The Mixolydian mode could be considered one step 'darker' than Ionian due to its lowered 7th interval.</small>",

videoLink + "<b>Aeolian</b> - the sixth mode of the major scale, also called the <i>natural minor</i>. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 2 + 1 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 4 5 \u266D6 \u266D7</b><br /><br />\
<small>The Aeolian mode could be considered three steps 'darker' than Ionian due to its lowered 3rd, 6th, and 7th intervals.</small>",

videoLink + "<b>Locrian</b> - the seventh mode of the major scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 2 + 1 + 2 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 4 \u266D5 \u266D6 \u266D7</b><br /><br />\
<small>The Locrian mode is commonly considered the 'darkest' diatonic mode due to its lowered 2nd, 3rd, 5th, 6th, and 7th intervals.</small>"
];

let melodicMinorText = [
"<b>Melodic minor</b> (Ionian \u266D3)<br /><br />\
The melodic minor is simply the <u>major scale</u> with <u>the 3rd note lowered</u> by one half-step (minor 3rd vs major 3rd).<br />\
The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 2 + 2 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 4 5 6 7</b><br /><br />\
<small>As its name suggests, composers often preferred its sound when creating melodies, as opposed to the harmonic minor which has a three-semitone jump between its 6th and 7th notes.<br />\
Interestingly, the melodic minor scale is special in that it is played differently while ascending vs descending. When <i>ascending</i> the scale, it is played as you see here, but when <i>descending</i> it usually reverts back to the <i>natural minor</i> scale.</small>",

"<b>Dorian \u266D2 / Phrygian \u266E6</b> - the second mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 2 + 2 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 4 5 6 \u266D7</b>",

"<b>Lydian \u266F5</b> (Lydian augmented) - the third mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 2 + 2 + 1 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 \u266F4 \u266F5 6 7</b>",

"<b>Lydian \u266D7</b> (Lydian dominant / overtone scale) - the fourth mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 2 + 1 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 \u266F4 5 6 \u266D7</b>",

"<b>Aeolian \u266E3</b> (Aeolian major / Mixolydian \u266D6) - the fifth mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 1 + 2 + 1 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 4 5 \u266D6 \u266D7</b>",

"<b>Aeolian \u266D5</b> (half-diminished) - the sixth mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 1 + 2 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 4 \u266D5 \u266D6 \u266D7</b>",

"<b>Locrian \u266D4</b> (Altered dominant / Super Locrian) - the seventh mode of the melodic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 1 + 2 + 2 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 \u266D4 \u266D5 \u266D6 \u266D7</b>"
];

let harmonicMinorText = [
"<b>Harmonic minor</b> (Aeolian \u266E7)<br /><br />\
The harmonic minor is a modification of the natural minor (Aeolian mode) - it is created by taking the 7th note of the natural minor scale and raising it a half-step, to create a stronger feeling of tension and release with the root / octave.<br />\
The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 2 + 1 + 3 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 4 5 \u266D6 7</b><br /><br />\
<small>As its name suggests, its sound is often preferred for creating harmonies.</small>",

"<b>Locrian \u266E6</b> - the second mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 2 + 1 + 3 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 4 \u266D5 6 \u266D7</b>",

"<b>Ionian \u266F5</b> (augmented major) - the third mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 1 + 3 + 1 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 4 \u266F5 6 7</b>",

"<b>Dorian \u266F4</b> (Ukrainian Dorian) - the fourth mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 3 + 1 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 \u266F4 5 6 \u266D7</b>",

"<b>Phrygian \u266E3</b> (Phrygian major / dominant) - the fifth mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 3 + 1 + 2 + 1 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 3 4 5 \u266D6 \u266D7</b>",

"<b>Lydian \u266F2</b> - the sixth mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 3 + 1 + 2 + 1 + 2 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266F2 3 \u266F4 5 6 7</b>",

"<b>Locrian \u266D4 \u{1D12B}7</b> (Altered diminished / Ultra Locrian) - the seventh mode of the harmonic minor scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 1 + 2 + 2 + 1 + 3</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 \u266D4 \u266D5 \u266D6 \u{1D12B}7</b>"
];

let harmonicMajorText = [
"<b>Harmonic major</b> (Ionian \u266D6)<br /><br />\
The harmonic major is a 'constructed' scale that is used in a few old compositions but is most common in jazz. It is created by raising the 3rd note of the harmonic minor scale by a half-step, or alternatively by lowering the 6th note of the major scale.<br />\
The pattern of semitones is<br /><br />\
<b>Root + 2 + 2 + 1 + 2 + 1 + 3 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 3 4 5 \u266D6 7</b>",

"<b>Dorian \u266D5</b> - the second mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 2 + 1 + 3 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \2 \u266D3 4 \u266D5 6 \u266D7</b>",

"<b>Phrygian \u266D4</b> - the third mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 1 + 3 + 1 + 2 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 \u266D4 5 \u266D6 \u266D7</b>",

"<b>Lydian \u266D3</b> - the fourth mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 3 + 1 + 2 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 \u266F4 5 6 7</b>",

"<b>Mixolydian \u266D2</b> - the fifth mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 3 + 1 + 2 + 2 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 3 4 5 6 \u266D7</b>",

"<b>Lydian \u266F2 \u266F5</b> - the sixth mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 3 + 1 + 2 + 2 + 1 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266F2 3 \u266F4 \u266F5 6 7</b>",

"<b>Locrian \u{1D12B}7</b> - the seventh mode of the harmonic major scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 2 + 1 + 2 + 1 + 3</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u266D3 4 \u266D5 \u266D6 \u{1D12B}7</b>"
];

let doubleHarmonicText = [
"<b>Double harmonic</b><br /><br />\
The double harmonic scale is a scale that is generally unfamiliar in Western music. It is also known as the <i>Byzantine scale</i> or <i>Gypsy major</i> and resembles some Arabic scales.<br />\
The pattern of semitones is<br /><br />\
<b>Root + 1 + 3 + 1 + 2 + 1 + 3 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 3 4 5 \u266D6 7</b>",

"<b>Lydian \u266F2 \u266F6</b> - the second mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 3 + 1 + 2 + 1 + 3 + 1 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266F2 3 \u266F4 5 \u266F6 7</b>",

"<b>Phrygian \u266D4 \u{1D12B}7</b> - the third mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 2 + 1 + 3 + 1 + 1 + 3</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>11 \u266D2 \u266D3 \u266D4 5 \u266D6 \u{1D12B}7</b>",

"<b>Lydian \u266D3 \u266D6</b> (Hungarian minor) - the fourth mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 2 + 1 + 3 + 1 + 1 + 3 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 2 \u266D3 \u266F4 5 \u266D6 7</b>",

"<b>Mixolydian \u266D2 \u266D5</b> - the fifth mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 3 + 1 + 1 + 3 + 1 + 2</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 3 4 \u266D5 6 \u266D7</b>",

"<b>Ionian \u266F2 \u266F5</b> - the sixth mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 3 + 1 + 1 + 3 + 1 + 2 + 1</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266F2 3 4 \u266F5 6 7</b>",

"<b>Locrian \u{1D12B}3 \u{1D12B}7</b> - the seventh mode of the double harmonic scale. The pattern of semitones is<br /><br />\
<b>Root + 1 + 1 + 3 + 1 + 2 + 1 + 3</b><br /><br />\
The intervals can be notated as<br /><br />\
<b>1 \u266D2 \u{1D12B}3 4 \u266D5 \u266D6 \u{1D12B}7</b>"
];

let otherModesText = [

];

let allModesText = [
majorText,
melodicMinorText,
harmonicMinorText,
harmonicMajorText,
doubleHarmonicText
// majorModeList,
// melodicMinorModeList,
// harmonicMinorModeList,
// harmonicMajorModeList,
// doubleHarmonicModeList
];

let keyText = [
"The <b><i>root</i></b> is the 'home' note of any given scale, also known as <i>tonic</i>, or <i>key</i>. The name <i>root</i> is also commonly used to refer to the chord that is built by playing this first note along with the 3rd and 5th note of the scale - the 'root chord' or 'root triad'.<br />\
            This interval is called a <b><i>unison</i></b> (1) interval, and in certain contexts it is also called a <b><i>diminished second</i></b> (d2, \u{1D12B}2).<br /><br />\
            <button onclick=\"playTone(0);\">Click here to hear the interval.</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor second</i></b> (min2, m2) or <b><i>flat 2</i></b> (\u266D2), or <br />\
            <b><i>augmented unison</i></b> (aug1, A1) or <b><i>sharp 1</i></b> (\u266F1).<br /><br />\
            <button onclick=\"playTwo(0, 1);\">Click here to hear the m2 interval.</button><br /><br />\
            <small>The minor second is 1 semitone above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major seventh</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 11);\">Click here to hear the inverted m2 interval (M7).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major second</i></b> (maj2, M2) or just <b>2</b>, or <br />\
            <b><i>diminished third</i></b> (dim3, d3, \u{1D12B}3).<br /><br />\
            <button onclick=\"playTwo(0, 2);\">Click here to hear the M2 interval.</button><br /><br />\
            <small>Playing a triad with a M2 interval <i>instead</i> of a 3 creates what is known as a <u>suspended</u> (sus2) chord, which is neither major nor minor, but 'takes on the character' of chords that come before it.<br /><br />\
            <button onclick=\"playThree(0, 2, 7);\">Click here to hear a sus2 chord (1 2 5).</button><br /><br />\
            The 2 can also be added to any other chord but an octave above, creating an <i>add9</i> chord.</small><br /><br />\
            <small>The major second is 2 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor seventh</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 10);\">Click here to hear the inverted M2 interval (m7).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor third</i></b> (min3, m3) or <b><i>flat 3</i></b> (\u266D3), or <br />\
            <b><i>augmented second</i></b> (aug2, A2) or <b><i>sharp 2</i></b> (\u266F2).<br /><br />\
            <button onclick=\"playTwo(0, 3);\">Click here to hear the m3 interval.</button><br /><br />\
            <small>Playing a triad with a \u266D3 interval creates the standard minor chord.</small><br /><br />\
            <button onclick=\"playThree(0, 3, 7);\">Click here to hear a minor chord (1 \u266D3 5).</button><br /><br />\
            <small>The minor third is 3 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major sixth</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 9);\">Click here to hear the inverted m3 interval (M6).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major third</i></b> (maj3, M3) or just <b>3</b>, or <br />\
            <b><i>diminished fourth</i></b> (dim4, d4) or <b><i>flat 4</i></b> (\u266D4).<br /><br />\
            <button onclick=\"playTwo(0, 4);\">Click here to hear the M3 interval.</button><br /><br />\
            <small>Playing a triad with a M3 interval creates the standard major chord.</small><br /><br />\
            <button onclick=\"playThree(0, 4, 7);\">Click here to hear a major chord (1 3 5).</button><br /><br />\
            <small>The major third is 4 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor sixth</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 8);\">Click here to hear the inverted M3 interval (m6).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>perfect fourth</i></b> (perf4, P4), or<br />\
            <b><i>augmented third</i></b> (aug3, A3) or <b><i>sharp 3</i></b> (\u266F3).<br /><br />\
            <button onclick=\"playTwo(0, 5);\">Click here to hear the P4 interval.</button><br /><br />\
            <small>Playing a triad with a P4 interval <i>instead</i> of a 3 creates what is known as a <u>suspended</u> (sus4) chord, which is neither major nor minor, but 'takes on the character' of chords that come before it.<br /><br />\
            <button onclick=\"playThree(0, 5, 7);\">Click here to hear a sus4 chord (1 4 5).</button><br /><br />\
            The 4 can also be added to any other chord but an octave above, creating an <i>add11</i> chord.</small><br /><br />\
            <small>The perfect fourth is 5 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>perfect fifth</i>.",
            // </small><br /><br />\
            // <button onclick=\"playTwo(0, 7);\">Click here to hear the inverted P4 interval (P5).</button>",
            
"In relation to the root, this interval is variously known as:<br /><br />\
            <b><i>augmented fourth</i></b> (aug4, A4) or <b><i>sharp 4</i></b> (\u266F4)<br />\
            <b><i>diminished fifth</i></b> (dim5, d5), or <b><i>flat 5</i></b> (\u266D5),<br />\
            the <b><i>tritone</i></b>, or more dramatically,<br />the <b><i>devil's interval</i></b>.<br /><br />\
            <button onclick=\"playTwo(0, 6);\">Click here to hear the devil's interval.</button><br /><br />\
            <small>The tritone is 6 semitones above the root.<br />\
            <small>Playing a triad with a \u266D5 and a \u266D3 creates what is known as a <u>diminished</u> (dim) chord. It can also be described as two minor third intervals stacked on top of each other.</small><br /><br />\
            <button onclick=\"playThree(0, 3, 6);\">Click here to hear a diminished chord (1 \u266D3 \u266D5).</button><br /><br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you ... the same interval!<br /><br />\
            There is a lot of interesting history behind this one interval, but suffice it to say that 'traditional' composers were often very reluctant (or outright refused, for example in church music) to use the 'tritone' interval as a theme in their compositions, due to its perceived dissonance.</small>",

"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>perfect fifth</i></b> (perf5, P5),<br />\
            <b><i>diminished sixth</i></b> (dim6, d6).<br /><br />\
            <button onclick=\"playTwo(0, 7);\">Click here to hear the P5 interval.</button><br /><br />\
            <small>The perfect fifth is 7 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>perfect fourth</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 5);\">Click here to hear the inverted P5 interval (P4).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>augmented fifth</i></b> (aug5, A5) or <b><i>sharp 5</i></b> (\u266F5), or<br />\
            <b><i>minor sixth</i></b> (min6, m6) or <b><i>flat 6</i></b> (\u266D6).<br /><br />\
            <button onclick=\"playTwo(0, 8);\">Click here to hear the \u266F5 interval.</button><br /><br />\
            <small>Playing a triad with a \u266F5 and a 3 creates what is known as an <u>augmented</u> (aug) chord. It can also be described as two major third intervals stacked on top of each other.</small><br /><br />\
            <button onclick=\"playThree(0, 4, 8);\">Click here to hear an augmented chord (1 3 \u266F5).</button><br /><br />\
            <small>The augmented fifth is 8 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major third</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 4);\">Click here to hear the inverted m6 interval (M3).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major sixth</i></b> (maj6, M6) or just <b>6</b>, or <br />\
            <b><i>diminished seventh</i></b> (dim7, d7, \u{1D12B}7).<br /><br />\
            <button onclick=\"playTwo(0, 9);\">Click here to hear the M6 interval.</button><br /><br />\
            <small>The sixth interval can be added to any other triad to create a 'compound' chord.</small><br /><br />\
            <button onclick=\"playFour(0, 4, 7, 9);\">Click here to hear a 6 chord (1 3 5 6).</button><br /><br />\
            <button onclick=\"playFour(0, 3, 7, 9);\">Click here to hear a m6 chord (1 \u266D3 5 6).</button><br /><br />\
            <small><small>A <i>diminished seventh</i> (dim7) chord is created by playing a sixth over a diminished triad - musically, it looks like three minor third intervals in succession. The chord is 'symmetric' around the circle, so it will tend to sound very similar no matter which of the four notes is used as the root.</small></small><br /><br />\
            <button onclick=\"playFour(0, 3, 6, 9);\">Click here to hear a dim7 chord (1 \u266D3 \u266D5 \u{1D12B}7).</button><br /><br />\
            <small>The 6 can also be added to any other chord but an octave above, creating an <i>add13</i> chord.</small><br /><br />\
            <small>The major sixth is 9 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor third</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 3);\">Click here to hear the inverted M6 interval (m3).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>minor seventh</i></b> (min7, m7), or <b><i>flat 7</i></b> (\u266D7), or <br />\
            <b><i>augmented sixth</i></b> (aug6, A6) or <b><i>sharp 6</i></b> (\u266F6).<br /><br />\
            <button onclick=\"playTwo(0, 10);\">Click here to hear the m7 interval.</button><br /><br />\
            <small>The minor seventh interval can be added to any other triad to create a 'compound' chord. It is also known as a <i>dominant seventh</i> interval.</small><br /><br />\
            <button onclick=\"playFour(0, 4, 7, 10);\">Click here to hear a 7 chord (1 3 5 \u266D7).</button><br /><br />\
            <button onclick=\"playFour(0, 3, 7, 10);\">Click here to hear a m7 chord (1 \u266D3 5 \u266D7).</button><br /><br />\
            <button onclick=\"playFour(0, 5, 7, 10);\">Click here to hear a 7sus4 chord (1 4 5 \u266D7).</button><br /><br />\
            <button onclick=\"playFour(0, 2, 7, 10);\">Click here to hear a 7sus2 chord (1 2 5 \u266D7).</button><br /><br />\
            <button onclick=\"playFour(0, 4, 8, 10);\">Click here to hear an aug7 chord (1 3 \u266F5 \u266D7).</button><br /><br />\
            <small><small>A <i>half-diminished</i> (m7\u266D5) chord is created by playing a dominant seventh over a diminished triad.</small></small><br /><br />\
            <button onclick=\"playFour(0, 3, 6, 10);\">Click here to hear a m7\u266D5 chord (1 \u266D3 \u266D5 \u266D7).</button><br /><br />\
            <small>The minor seventh is 10 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>major second</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 2);\">Click here to hear the inverted m7 interval (M2).</button>",
            
"In relation to the root, this interval is variously known as (most common first):<br /><br />\
            <b><i>major seventh</i></b> (maj7, M7) or just <b>7</b>, or <br />\
            <b><i>diminished octave</i></b> (dim8, d8) or <b><i>flat 8</i></b> (\u266D8).<br /><br />\
            <button onclick=\"playTwo(0, 11);\">Click here to hear the M7 interval.</button><br /><br />\
            <small>The major seventh interval can be added to any other triad to create a 'compound' chord.</small><br /><br />\
            <button onclick=\"playFour(0, 4, 7, 11);\">Click here to hear a maj7 chord (1 3 5 7).</button><br /><br />\
            <button onclick=\"playFour(0, 3, 7, 11);\">Click here to hear a mmaj7 chord (1 \u266D3 5 7).</button><br /><br />\
            <button onclick=\"playFour(0, 5, 7, 11);\">Click here to hear a maj7sus4 chord (1 4 5 7).</button><br /><br />\
            <button onclick=\"playFour(0, 2, 7, 11);\">Click here to hear a maj7sus2 chord (1 2 5 7).</button><br /><br />\
            <button onclick=\"playFour(0, 4, 8, 11);\">Click here to hear an augM7 chord (1 3 \u266F5 7).</button><br /><br />\
            <small>The major seventh is 11 semitones above the root.<br />\
            <u>Inverting</u> it, or going the same distance in the <i>opposite</i> direction, will give you a <i>minor second</i>.</small>",
            // <br /><br />\
            // <button onclick=\"playTwo(0, 1);\">Click here to hear the inverted M7 interval (m2).</button>",
            
"The <b><i>octave</i></b> of a given note is the same 'note name' as the note, i.e. it is simultaneously the same note <i>and</i> a different one.<br />\
            An octave (P8) interval <i>above</i> physically rings out at exactly <i>twice</i> the physical frequency; conversely, an octave <i>below</i> rings out at <i>half</i> the frequency.<br />\
            Since we commonly use a scale system built around 7 divisions of the scale, the prefix 'oct-' indicates that this is the 8th note (which is also the first note, repeated).<br /><br />\
            <button onclick=\"playTwo(0, 12);\">Click here to hear the interval.</button>"
];