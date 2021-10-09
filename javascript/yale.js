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

window.onload =
    function()
    {
        let input_box = document.getElementById("text_input");
        input_box.oninput = checkToneNeeded;
    };

function checkToneNeeded() {
    // get textarea DOM object
    let element = document.getElementById("text_input");
    let contents = element.value; 
    
    // if the last character entered was one of the tone numbers/chars, 
    // replace it with its corresponding HTML character 
    let entered_char = contents.substring(contents.length - 1);
    if (TONE_CHARS.find(char => char === entered_char)) {
        element.value = contents.substring(0, contents.length - 1) + TONE_UTF_CODES[entered_char]; 
    } 
}