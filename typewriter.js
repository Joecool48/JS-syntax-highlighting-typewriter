unction addSpan (text, element, color) {
    newSpan = document.createElement ("span");
    newSpan.setAttribute ("class", color);
    console.log (newSpan);
    element.appendChild (newSpan);
    newSpan.innerHTML = text;
}
var isAlpha = function(ch){
    return /^[A-Z]$/i.test(ch);
}
var isNumber = function (num) {
    return /^[0-9]$/i.test(num);
}
function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function htmlUnescape(str){
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}
//A function that counts the number of spaces in a line of text ignoring multiple between letters;
//So, "Hi      my          name is      bob" returns 4
function checkSpaces (text) {
    var spaceOccurences = 0;
    var ignoreSpaces = false;
    for (i = 0; i < text.length; i++) {
        if (text[i] == " " && !ignoreSpaces) {
            spaceOccurences += 1;
            ignoreSpaces = true;
        }
        else if (isAlpha(text[i]) || isNumber (text[i])) {
            ignoreSpaces = false;
        }
    }
    return spaceOccurences;
}
var plainTextColor = "white";
var seperators = [";", ",",".", ":", "[", "]", "{", "}", "(", ")"];
var seperatorColor = "white";
var functionColor = "blue";
var keywords = ["new", "for", "if", "else", "while", "break", "continue", "return", "class", "struct", "function", "goto", "static", "public", "private", "protected", "void"]; //...
var keywordColor = "red";
var stringColor = "yellow";
//Figure out how to implement escape characters correctly
var escapeCharacters = ["\n", "\t", "\'", "\"", "\\"];
var escapeCharacterColor = "violet";
var operators = ["=", "+", "-", "!", "*", "/", "%", "|", "&", "~", "^", "<", ">"];
var operatorColor = "red";
var leftToAdd = "";
var isString = false;
var numberColor = "violet"
var stringMatchingQuote = undefined;
var booleans = ["true", "false", "True", "False"];
var booleanColor = "magenta";
var specialValues = ["null", "undefined"];
var specialValueColor = "violet";
var primitiveTypes = ["int", "char", "bool", "boolean", "float", "double", "short", "long", "byte"];
var primitiveTypeColor = "magenta";
var otherTypes = ["String", "string"];
var otherTypeColor = "blue";
var functionDeclarationColor = "green"
var declarationParameterColor = "orange";
function setupTypewriter(t, content, codeSample) {
        var text = htmlUnescape (content.innerHTML);
        content.innerHTML = "";
        var isPlainText = true;
        var cursorPosition = 0;
        var typeSpeed = 100;
        var tempTypeSpeed = 0;
        var color = "white";
        var type = function() {
            var isPlainText = true;
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            //Check for space
            if (text[cursorPosition] === " ") {
                console.log ("Space found");
                t.appendChild( document.createTextNode( '\u00A0' ) );
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check for any characters that still need to be added
            else if (codeSample && leftToAdd != "") {
                addSpan (leftToAdd.slice(0,1), t, color);
                leftToAdd = leftToAdd.slice(1);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check to see if it is a standalone int or float            
            else if (codeSample && cursorPosition > 0 && !isString && leftToAdd === "" && !isAlpha (text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + 1]) && isNumber(text[cursorPosition])) {
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            else if (codeSample && text[cursorPosition] === "." && isNumber (text[cursorPosition - 1]) && isNumber (text[cursorPosition - 1])) {
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Add the colored char that is part of the string
            else if (codeSample && isString && leftToAdd == "") {
                addSpan (text[cursorPosition], t, stringColor);
                if (text[cursorPosition] === stringMatchingQuote) {
                    isString = false;
                }
                isPlainText = false;
                cursorPosition += 1;
            }
            //Test to see if the line is beginning as a string
            else if (codeSample && (text[cursorPosition] === '"' || text[cursorPosition] === "'")) {
                isString = true;
                addSpan (text[cursorPosition], t, stringColor);
                stringMatchingQuote = text[cursorPosition];
                console.log ("Matching Quote: " + text[cursorPosition]);
                cursorPosition += 1;
                isPlainText = false;
            }
            else if (codeSample && leftToAdd == "") {
                for (i = 0; i < escapeCharacters.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + escapeCharacters[i].length) == escapeCharacters[i]) {
                        addSpan (escapeCharacters[i].slice (0,1),t,escapeCharacterColor);
                        cursorPosition += 1;
                        leftToAdd += escapeCharacters[i].slice (1);
                        color = escapeCharacterColor;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < keywords.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + keywords[i].length) === keywords[i]) {
                        color = keywordColor;
                        addSpan (keywords[i].slice(0,1),t,keywordColor);
                        leftToAdd = keywords[i].slice (1);
                        cursorPosition += 1;
                        isPlainText = false;
                        break;
                    }
                }
                //Check for operators
                for (i = 0; i < operators.length; i++) {
                    if (text[cursorPosition] === operators[i]) {
                        if (operators[i] === "<") {
                            addSpan ("&lt;",t,operatorColor);
                        }
                        else if (operators[i] === ">") {
                            addSpan ("&gt;",t,operatorColor);
                        }
                        else {
                            addSpan (operators[i], t, operatorColor);                            
                        }

                        cursorPosition += 1;
                        isPlainText = false;
                        break;
                    }
                }
                //Check for seperators
                for (i = 0; i < seperators.length; i++) {
                    if (text[cursorPosition] === seperators[i]) {
                        addSpan (seperators[i], t, seperatorColor);
                        cursorPosition += 1;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < booleans.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + booleans[i].length) === booleans[i]) {
                        addSpan (booleans[i].slice (0,1),t,booleanColor);
                        cursorPosition += 1;
                        leftToAdd += booleans[i].slice (1);
                        color = booleanColor;
                        isPlainText = false;
                        break;
                    }
                }
                // for (i = 0; i < specialValues.length; i++) {
                //     if (text.slice (cursorPosition, cursorPosition + specialValues[i].length) === specialValues[i]) {
                //         console.log ("Found " +  specialValues[i]);
                //         addSpan (specialValues[i].slice (0,1),t,specialValueColor);
                //         cursorPosition += 1;
                //         leftToAdd += specialValues[i].slice (1);
                //         color = specialValueColor;
                //         isPlainText = false;
                //         break;
                //     }
                // }
                for (i = 0; i < primitiveTypes.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + primitiveTypes[i].length) === primitiveTypes[i] && !isAlpha(text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + primitiveTypes[i].length])) {
                        addSpan (primitiveTypes[i].slice (0,1),t,primitiveTypeColor);
                        cursorPosition += 1;
                        leftToAdd += primitiveTypes[i].slice (1);
                        color = primitiveTypeColor;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < otherTypes.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + otherTypes[i].length) === otherTypes[i] && !isAlpha(text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + otherTypes[i].length])) {
                        addSpan (otherTypes[i].slice (0,1),t,otherTypeColor);
                        cursorPosition += 1;
                        leftToAdd += otherTypes[i].slice (1);
                        color = otherTypeColor;
                        isPlainText = false;
                        break;
                    }
                }
                //Find function declarations by searching for parenthesis next to a character for a function.
                //Also searches for the left curply brace to indicate a declaration of a function.
                if (codeSample && isAlpha (text[cursorPosition]) && !isString && leftToAdd == "") {
                    console.log ("Function check");
                    var i = cursorPosition;
                    var paranthesis = cursorPosition;
                    var curlyBrace = cursorPosition;
                    var isFunction = false;
                    var isFunctionDeclaration = false;
                    //Not exactly sure how to check for this well, but this should work for now
                    while (text[i] != "\n") {

                        //Checks to make sure there are no spaces in between the function letters
                        var spaces = checkSpaces (text.slice (cursorPosition, i));
                        if (text[i] == '(') {
                            paranthesis = i;
                            isFunction = true;
                            
                        }
                        else if (text[i] == "{") {
                            curlyBrace = i;
                            isFunctionDeclaration = true;
                            break;
                        }
                        i++;
                    }
                    var j = paranthesis;
                    while (text[j] == " " && text[j] != "\n") {
                        j--;
                    }
                    if (isFunction && (!isAlpha(text[j - 1]) || text[cursorPosition - 1] != "\n" || text[j - 1] != " ")) {
                        console.log (text[j - 1]);
                        isFunction = false;
                    }
                    if (isFunction && isFunctionDeclaration) {
                        console.log ("Is declaration")
                        isPlainText = false;
                        addSpan (text[cursorPosition],t,functionDeclarationColor);
                        cursorPosition += 1;
                        leftToAdd = text.slice (cursorPosition,paranthesis);
                        color = functionDeclarationColor;
                    }
                    else if (isFunction) {
                        console.log ("Is function")
                        isPlainText = false;
                        addSpan (text[cursorPosition],t,functionColor);
                        cursorPosition += 1;
                        leftToAdd = text.slice (cursorPosition,paranthesis);
                        color = functionColor;
                    }

                }
            }
            if (isPlainText) {
                color = plainTextColor;
                t.innerHTML += text[cursorPosition];
                cursorPosition += 1;

            }
            //Actual typewriter effect implemented
            if (cursorPosition < text.length) {
                setTimeout(type, tempTypeSpeed);
            }
            if (cursorPosition >= text.length - 1) {
                function resetTimer () {
                window.clearInterval(action);
                }
            }
        };

        return {
            type: type
        };
    }