# JS-syntax-highlighting-typewriter
A JS file for html pages that will auto syntax highlight, and display with a typewriter animation

Put <link rel="stylesheet" href="style5.css"> at the top of your html document.

Put <script type="text/javascript" src="typewriter.js"></script> at the bottom of your html document.

To setup the effect simply call the function setupTypewriter with 3 arguments:

The first is the element that has the text you want to be printed. 

The second is the element where you want the text to be printed.

The third is a boolean value to indicate whether you want the program to syntax highlight or not.

Get the element that has the text you want to display, and is also the location of said text.

var typer = document.getElementById('typewriter');

Setup the typewriter to print the text

typewriter = setupTypewriter(typer, typer, true);

Have the typewriter start printing the text.

typewriter.type();

To change the colors and things that are highlighted, go to the top of the JS file and modify the strings containing the colors, or the 
array of strings with the keywords.

The colors must be class names that are contained in the css file.

To define a color for use simply use the notation:

.myColor {
  color: #rrggbb;
}
