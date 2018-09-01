# JS-syntax-highlighting-typewriter
A JS file for html pages that will auto syntax highlight, and display with a typewriter animation

Put <script type="text/javascript" src="typewriter.js"></script> at the bottom of your html document.

To setup the effect simply call the function setupTypewriter with the HTML document object as a argument.
This is where the text will be displayed.

Setup the typewriter to output to the typewriter element:

# var typewriter = setupTypewriter(document.getElementById("typewriter"));

Add the input to the typewriter:

# typewriter.parseHtml(document.getElementById("typewriter"));

Set the typewriter speed (Higher numbers are slower):

# typewriter.setTypeSpeed(300);

Sets whether the element where the text is being printed should auto scroll to the bottom:

# typewriter.scrollLock(true);

Simply clears the screen of all the text:

# typewriter.clearScreen();

Actually starts the typing. To stop, simply call stop.

# typewriter.type();

To change the colors and things that are highlighted, go to the top of the JS file and modify the strings containing the colors, or the
array of strings with the keywords.
