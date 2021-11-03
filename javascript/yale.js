// 1 = level, 2 = rising, 3 = falling
const TONE_UTF_CODES = 
{
    "1": "\u0304",
    "2": "\u0301",
    "3": "\u0300",
    "-": "\u0304",
    "/": "\u0301",
    "\\": "\u0300"
}

const TONE_CHARS = Object.keys(TONE_UTF_CODES); 
let prev_contents = ""; 

window.onload =
    function()
    {
        let input_box = document.getElementById("text_input");
        input_box.oninput = checkToneNeeded;
		prev_contents = input_box.value; 
    };

// checks if a tone mark needs to be added and adds it if so 
function checkToneNeeded() {
    // get textarea DOM object
    let element = document.getElementById("text_input");
    let contents = element.value; 

    // only need to check for entered tone character if a character was entered,
    // not deleted
    if(contents.length > prev_contents.length) {
        // save cursor position 
        let caret_position = element.selectionStart;

        // figure out what the new character is + its position 
        let entered_char_index = findDiffCharIndex(contents, prev_contents); 
        let entered_char = contents[entered_char_index]; 

        // if the last character entered was one of the tone numbers/chars, 
        // replace it with its corresponding HTML character 
        if (TONE_CHARS.find(char => char === entered_char)) {
            // special rule #1: 
            // if you press -, /, or \ twice in a row it should replace the tone mark 
            // on the previous character with the actual char
            if ((contents.length > 1) && (contents[entered_char_index-1] === TONE_UTF_CODES[entered_char])) {
                element.value = contents.substring(0, entered_char_index - 1) + contents.substring(entered_char_index); 

                // reset cursor position to where it was -1 to compensate for char replacement
                element.selectionStart = caret_position - 1; 
                element.selectionEnd = caret_position - 1; 
            }

            // special rule #2: 
            // pressing -, /, or \ three times in a row means you get both the 
            // tone mark AND the escaped character
            else if((contents.length > 1) && (contents[entered_char_index-1] === entered_char)) {
                // tone mark is inserted 2 indices before the entered char, and one of the normal chars is erased 
                element.value = contents.substring(0, entered_char_index - 1) + TONE_UTF_CODES[entered_char] +contents.substring(entered_char_index); 

                // reset cursor position 
                element.selectionStart = caret_position; 
                element.selectionEnd = caret_position; 
            }

            // normal case - replace the entered char with its tone mark
            else {
                element.value = contents.substring(0, entered_char_index) + TONE_UTF_CODES[entered_char] + contents.substring(entered_char_index + 1);

                // cursor position will have reset, so I'll put cursor position back where it was before :) 
                element.selectionStart = caret_position; 
                element.selectionEnd = caret_position; 
            }
        } 
    }

    prev_contents = element.value; 
    return; 
}

// takes two strings as input 
// returns the index of the first character that is different between the two in
// the LONGER string; returns -1 if both strings are exactly the same 
function findDiffCharIndex(str1, str2) {
	if(str1 === str2) {
		return -1; 
	}

    let index = 0; 

    // compare character-by-character for the length of the shorter string until 
    // we find one that differs
    while(index < Math.min(str1.length, str2.length)) {
        if(str1[index] !== str2[index]) {
            return index; 
        }

        index++; 
    }

    // if we get here, the strings are different, but one must be longer than 
    // the other. so the next character in the longer string is the differing 
    // one 
    return index; 
}