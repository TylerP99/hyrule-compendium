/***********************************/
/*           Constants             */
/***********************************/

/******** Path Data for SVG ********/


function get_page_height() {
    return Math.max( document.body.scrollHeight, 
                     document.body.offsetHeight, 
                     document.documentElement.clientHeight, 
                     document.documentElement.scrollHeight,
                     document.documentElement.offsetHeight )
}



// Goals for border: adjust to height of page (dynamically????)

class Glyph_Border {

    /*===========================================*/
    /* Basic Border Structure: ul that contains  */
    /* more uls, which contain indvidual glyphs  */
    /* up to maxGlyphs defined below.            */
    /*===========================================*/



    /************Member Variables************/

    borderContainer = document.createElement("ul"); 
    minGlyphs = 0;
    maxGlyphs = 9;

    /************Member Methods************/

    //Returns current height of the currently rendered border ul
    get_height() {
        return Math.max( this.borderContainer.scrollHeight, this.borderContainer.offsetHeight, this.borderContainer.clientHeight)
    }

    //Creates border based on page size

    //Naive implementation, need live testing
    make_border() {
        let pageHeight = get_page_height();
        const glyphHeight = 20;

        for(let i = 0; i < pageHeight/glyphHeight; ++i) {
            this.make_random_glyph_ul();
        }
    }

    //Changes a random glyph with a randomly chosen effect
    //
    // Parameters: none
    //
    // Returns: Nothing, but modifies a random glyph and glyphlist within the 
    // border in some way (Possible ways described by individual animation functions)

    animate_border() {
        //Goal: Randomly toggle fade on glyphs
        //Get list of uls of lis of glyphs
        const glyphRowList = this.borderContainer.querySelectorAll("ul");

        //Pick a random ul, then a random li
        let randomIndex = Math.floor(Math.random() * glyphRowList.length);
        const randomList = glyphRowList[randomIndex];
        const numChoices = 4;

        let randomChoice = Math.floor(Math.random() * (numChoices+1));

        switch(randomChoice) {
            case 0:
                this.remove_random_glyph(randomList);
                break;
            case 1:
                this.add_random_glyph(randomList);
                break;
            case 2:
                this.change_random_glyph(randomList);
                break;
            case 3:
                this.fade_random_glyph(randomList);
                break;
            case 4:
                this.change_color_random_glyph(randomList);
                break;
            default:
                //Nothing
                break;
        }
        return;
    }


    /************** Animation Methods **************/

    //Deletes a random glyph from a glyph list, does nothing if the list is empty
    // Parameters:
    //   @ glyphRow: a reference to a ul containing the svg glyphs
    //
    // Return: Nothing, does alter glyphRow by removing a reference to a glyph
    remove_random_glyph(glyphRow) {
        const targetGlyph = this.pick_random_glyph(glyphRow); //Pick a random glyph from the glyph list to use next

        if(targetGlyph != null) { // If the glyph list is empty, pick_random_glyph will return null. Only make a change if there is a glyph to remove
            glyphRow.removeChild(targetGlyph); //Removes the glyph
        }
    }

    //Appends a random glyph to a glyph list, but does nothing if the list is full
    // Parameters:
    //   @ glyphRow: a reference to a ul containing the svg glyphs
    //
    // Return: Nothing, does alter glyphRow by adding a reference to a new glyph
    add_random_glyph(glyphRow) {
        if(glyphRow.childNodes.length < this.maxGlyphs) //This only allows lists that contain less than the maximum allowed amount of glyphs to have one added, otherwise nothing will happen
        {
            const randomGlyph = this.get_random_glyph(); //Gets a random glyph
            const glyphLi = document.createElement("li"); //Prepares containing li for glyph

            glyphLi.appendChild(randomGlyph.glyph); //Puts the glyph into the li
            glyphLi.classList.add("glyph"); //Adds the glyph class to the li for styling

            glyphRow.appendChild(glyphLi); //Adds the li to the glyph list given
        }
    }

    //Changes a random glyph to a new random glyph in a glyph list, but does nothing if the list is empty
    // Parameters:
    //   @ glyphRow: a reference to a ul containing the svg glyphs
    //
    // Return: Nothing, does alter glyphRow by removing a reference to one glyph and adding another
    change_random_glyph(glyphRow) {
        const targetGlyph = this.pick_random_glyph(glyphRow); //Chooses a random glyph from the glyph list

        if(targetGlyph != null) { //If the glyph list is empty, targetGlyph will get null from pick_random_glyph and nothing should happen. If we do have a glyph to change, change it.
            targetGlyph.removeChild(targetGlyph.firstChild); //Remove the svg from the li element

            const newGlyph = this.get_random_glyph(); //Get a new random glyph

            targetGlyph.appendChild(newGlyph.glyph); //Append the svg element into the li, changing the glyph successfully
        }

    }

    //Toggles the fade class on a random glyph in a glyph list. The glyph will fade out if the fade class is added. It will reappear when the fade class is removed. This will do nothing if the list is empty
    //
    // Parameters:
    //   @ glyphRow: a reference to a ul containing the svg glyphs
    //
    // Return: Nothing, does toggle the "fade" class of an li containing a glyph svg element
    fade_random_glyph(glyphRow) {
        const targetGlyph = this.pick_random_glyph(glyphRow);

        if(targetGlyph != null)
        {
            targetGlyph.classList.toggle("fade")
        }
    }

    //Toggles the color of a random glyph in a glyph list. When the class is added, the glyph changes to orange. When removes, it changes back to blue (default). Will do nothing if the list is empty.
    //
    // Parameters:
    //   @ glyphRow: a reference to a ul containing the svg glyphs
    //
    // Return: Nothing, does toggle the "glyph-active" class of an li containing a glyph svg element
    change_color_random_glyph(glyphRow) {
        const targetGlyph = this.pick_random_glyph(glyphRow); //Picks a random glyph from glyphRow, or returns null if the list is empty

        if(targetGlyph != null) //Only makes a change if the list has a glyph
        {
            targetGlyph.classList.toggle("glyph-active") //Toggle the color of the glyph by changing the class
        }
    }

    //Given a list of glpyhs, returns a reference to a random one, or null if the list is empty
    //
    // Parameters:
    //   @glyphRow: a reference to a ul containing svg glyphs
    //
    // Return: A reference to an li containing an svg glyph
    pick_random_glyph(glyphRow) {
        const glyphNodeList = glyphRow.childNodes; //Get the list of lis for the ul
        if(glyphNodeList.length == 0) { return null; } //IF the list is empty, return null for the caller to handle
        const randomIndex = Math.floor(Math.random() * glyphNodeList.length); //Gets a random index based on the length of the nodelist
        return glyphNodeList[randomIndex]; //Return random glyph
    }

    // Creates a row of random glyphs and appends it to the glyphContainer ul
    // No parameters or returns
    make_random_glyph_ul() {
        const glyphUl = document.createElement("ul"); // Create the containing ul

        const lowerLimit = this.minGlyphs; //Minimum number of glyphs allowed in the ul

        const upperLimit = this.maxGlyphs + 1; //Maximum number of glyphs allowed in the ul, non inclusive

        const numberOfGlyphs = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit; //Get a random number for the amount of glyphs to generate for the ul. lowerLimit is the minimum amount of glyphs required

        for(let i = 0; i < numberOfGlyphs; ++i) //Runs numberOgGlyphs times to populate the ul with that many glyphs
        {
            const glyphLi = document.createElement("li"); //Create the li to contain the svg glyph
            glyphLi.classList.add("glyph"); //Add the class for styles

            const randomGlyph = this.get_random_glyph(); //Generate a random glyph to use

            glyphLi.appendChild(randomGlyph.glyph); //Append the glyph to the li
            glyphUl.appendChild(glyphLi); //Append the li to the ul
        }
        this.borderContainer.appendChild(glyphUl); //Append the ul to the borderContainer ul
    }

    //Generates a random glyph
    // No parameters
    //
    // Return: a Glyph object that contains a reference to a generated svg element
    get_random_glyph() {
        const randomCharCode = Math.floor(Math.random() * 26); //Produce a random number from 0-25 (representing a-z)
        const randomChar = String.fromCharCode("a".charCodeAt(0) + randomCharCode); //Add the random number to the "a" character code, then generate the character from the resulting code
        
        const randomGlyph = new Glyph(randomChar); //Make a glyph from the random character

        return randomGlyph; //Return the Glyph object
    }
}


/******************* Glyph Class *******************/
/* Usage: Create a glyph with new Glyph(character) */
/* to produce the glyph for that character. Glyph  */
/* format and path information was taken from the  */
/* Sheikah symbols typeface linked in the README.  */
/***************************************************/
class Glyph {

    constructor(char) {
        this.glyph = this.make_svg_glyph(char);
    }

    // Creates an svg glyph element
    //
    // Parameters:
    //   @char: An alphabetic character case insensitive to make the corresponding glyph
    //
    // Returns: A reference to the complete svg element
    make_svg_glyph(char) {
        const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const gContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const pathContainer = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        svgContainer.setAttribute("viewBox", "-10 0 1602 2048");

        gContainer.setAttribute("transform", "matrix(1 0 0 -1 0 1638)");

        pathContainer.setAttribute("fill", "currentColor")
        pathContainer.setAttribute("d", this.get_char_path(char));

        gContainer.appendChild(pathContainer);
        svgContainer.appendChild(gContainer);

        return svgContainer;
    }

    //Returns a path string for the glyph that represents the passed character, case insensitive
    //
    // Parameters:
    //   @char: an alphabetical character, case insensitive (converted to lowercase below)
    //
    // Return: String of path data for generating an svg glyph
    get_char_path(char) {
        let path = ""; //Variable used for returning a path string at the end of the function
        char = char.toLowerCase(); //Convert the char to lowercase for uniformity

        switch(char) { //Self explanitory, each path constant below is defined in the global constant section of the file
            case "a":
                path = A_PATH;
                break;
            case "b":
                path = B_PATH;
                break;
            case "c":
                path = C_PATH;
                break;
            case "d":
                path = D_PATH;
                break;
            case "e":
                path = E_PATH;
                break;
            case "f":
                path = F_PATH;
                break;
            case "g":
                path = G_PATH;
                break;
            case "h":
                path = H_PATH;
                break;
            case "i":
                path = I_PATH;
                break;
            case "j":
                path = J_PATH;
                break;
            case "k":
                path = K_PATH;
                break;
            case "l":
                path = L_PATH;
                break;
            case "m":
                path = M_PATH;
                break;
            case "n":
                path = N_PATH;
                break;
            case "o":
                path = O_PATH;
                break;
            case "p":
                path = P_PATH;
                break;
            case "q":
                path = Q_PATH;
                break;
            case "r":
                path = R_PATH;
                break;
            case "s":
                path = S_PATH;
                break;
            case "t":
                path = T_PATH;
                break;
            case "u":
                path = U_PATH;
                break;
            case "v":
                path = V_PATH;
                break;
            case "w":
                path = W_PATH;
                break;
            case "x":
                path = X_PATH;
                break;
            case "y":
                path = Y_PATH;
                break;
            case "z":
                path = Z_PATH;
                break;
            default:
                path = "wat"; //Shouldnt happen
                break;
        }
        return path;
    }
}


// Constants containing svg paths for generating sheikah glyphs
const A_PATH = "M80 1195l239 239v-1195h956v956h-558v-558h399v-239h-399l-239 239v558l239 239h558l239 -239v-956l-239 -239h-956l-239 239v956zM877 1036h239v-239h-239v239z";
const B_PATH = "M80 1434h239v-239h-239v239zM1275 1434h239v-239h-239v239zM478 1434h239v-398l-239 -239h-398v239h398v398zM877 1434h239v-398h398v-239h-398l-239 239v398zM319 0l-239 239v159l239 239h956l239 -239v-159l-239 -239v398h-956v-398zM478 239h638v-239h-638v239z";
const C_PATH = "M80 1195l239 239h159l239 -239v-159l-239 -239h-159v-160h159l239 -239v-159l-239 -239h-159l-239 239h398v159h-159l-239 239v160l239 239h159v159h-398zM1514 1195l-239 239h-159l-239 -239v-159l239 -239h159v-160h-159l-239 -239v-159l239 -239h159l239 239h-398v159 h159l239 239v160l-239 239h-159v159h398z";
const D_PATH = "M80 1195l239 239h956l239 -239v-956l-239 -239v1195h-1195zM80 1036h797l239 -239v-558l-239 -239h-558l-239 239h797v558h-797v239zM80 637h637v-239h-637v239z";
const E_PATH = "M80 1434h239v-239h-239v239zM1275 1434h239v-239h-239v239zM478 1195l239 239h160l239 -239v-398h-239v398h-160v-398h-239v398zM80 1036h239v-399h159l239 -239v-159l-239 -239h-159l-239 239h398v159h-159l-239 239v399zM1514 1036h-239v-399h-159l-239 -239v-159 l239 -239h159l239 239h-398v159h159l239 239v399z";
const F_PATH = "M80 1195l239 239h956l239 -239v-398h-239v398h-956v-398h-239v398zM80 637h239v-398h159v558l239 239h160l239 -239v-558h159v398h239v-398l-239 -239h-159l-239 239v558h-160v-558l-239 -239h-159l-239 239v398z";
const G_PATH = "M80 1195l239 239h956l239 -239v-956l-239 -239v1195h-956v-558h159v160l239 239h160l239 -239v-558l-239 -239h-558l-239 239h797v558h-160v-160l-239 -239h-159l-239 239v558z";
const H_PATH = "M80 1434h239v-239h-239v239zM478 1434h239v-239h-239v239zM877 1434h239v-239h-239v239zM1275 1434h239v-239h-239v239zM319 0l-239 239v558l239 239h956l239 -239v-558l-239 -239v797h-956v-797zM478 0v398l239 239h160l239 -239v-398h-239v398h-160v-398h-239z";
const I_PATH = "M80 637h239v-239h-239v239zM80 239h239v-239h-239v239zM1275 637h239v-239h-239v239zM1275 239h239v-239h-239v239zM80 797v398l239 239h159l239 -239v-956h160v956l239 239h159l239 -239v-398h-239v398h-159v-956l-239 -239h-160l-239 239v956h-159v-398h-239z";
const J_PATH = "M80 1195l239 239v-398h159v159l239 239h558l239 -239v-956l-239 -239v1195h-558v-159l-239 -239h-159l-239 239v159zM877 1036h239v-797l-239 -239h-558l-239 239h797v797zM80 637h239v-239h-239v239zM478 637h239v-239h-239v239z";
const K_PATH = "M319 0l-239 239v956l239 239v-1434zM1275 1434l239 -239v-956l-239 -239v1434zM478 1434h239v-637h-239v637zM478 637h239v-637h-239v637zM877 637h239v-637h-239v637zM877 797h239v637h-239v-637z";
const L_PATH = "M80 1195l239 239v-797h159v558l239 239h558l239 -239h-797v-558l-239 -239h-159l-239 239v558zM877 1036h637v-239h-637v239zM877 637h637v-239h-637v239zM80 239l239 -239h956l239 239h-1434z";
const M_PATH = "M80 1195l239 239h956l239 -239h-1434zM1514 239l-239 -239h-956l-239 239h1434zM80 398h239v239h-239v-239zM478 398h239v399l-239 239h-398v-239h398v-399zM877 398v399l239 239h398v-239h-398v-399h-239zM1275 637h239v-239h-239v239z";
const N_PATH = "M80 1195l239 239h159l239 -239v-159l-239 -239h-398v239h398v159h-398zM877 1434v-797h-558l-239 -239v-159l239 -239h956l239 239v956l-239 239v-1195h-956v159h558l239 239v797h-239z";
const O_PATH = "M478 1434h239v-239h-239v239zM877 1434h239v-239h-239v239zM80 637h239v-637l-239 239v398zM1275 637h239v-398l-239 -239v637zM319 1036h159l239 -239v-558h160v558l239 239h159v398l239 -239v-159l-239 -239h-159v-558l-239 -239h-160l-239 239v558h-159l-239 239v159 l239 239v-398z";
const P_PATH = "M478 1434h638v-239h-638v239zM478 1036h638v-239h-638v239zM478 637h638v-239h-638v239zM319 239h956v1195l239 -239v-956l-239 -239h-956l-239 239v956l239 239v-1195z" ;
const Q_PATH = "M80 1434h239v-239h-239v239zM478 1434h239v-239h-239v239zM478 637h239v-637h-239v637zM877 637h239v-637h-239v637zM319 0l-239 239v558l239 239h558v398h239v-398l-239 -239h-558v-797zM1275 1434l239 -239v-956l-239 -239v1434z";
const R_PATH = "M80 239h239v-239h-239v239zM1275 239h239v-239h-239v239zM80 797v398l239 239h159l239 -239v-159h160v159l239 239h159l239 -239v-398h-239v398h-159v-159l-239 -239h-160l-239 239v159h-159v-398h-239zM80 637h398l239 -239v-159h160v159l239 239h398v-239h-398v-159 l-239 -239h-160l-239 239v159h-398v239z";
const S_PATH = "M478 1036h638v-239h-638v239zM478 637h638v-239h-638v239zM717 1434v-239h-398v-956h398v-239h-398l-239 239v956l239 239h398zM877 1434v-239h398v-956h-398v-239h398l239 239v956l-239 239h-398z";
const T_PATH = "M478 1434h638v-239h-638v239zM1514 239l-239 -239h-956l-239 239h1434zM80 1195l239 239v-797h159v160l239 239h160l239 -239v-160h159v797l239 -239v-558l-239 -239h-159l-239 239v160h-160v-160l-239 -239h-159l-239 239v558z";
const U_PATH = "M1514 239l-239 -239h-956l-239 239h1434zM478 1036h239v-239h-239v239zM877 1036h239v-239h-239v239zM1275 398h239v797l-239 239v-1036zM1116 1434v-239h-797v-558h797v-239h-797l-239 239v558l239 239h797z";
const V_PATH = "M80 1195l239 239h956l239 -239v-159l-239 -239h-558v-797h-239v797l239 239h558v159h-956v-1195l-239 239v956zM877 637h239v-637h-239v637zM1275 637h239v-398l-239 -239v637z";
const W_PATH = "M478 1195v-558l239 -239h160l239 239v558h398l-239 239h-159l-239 -239v-558h-160v558l-239 239h-159l-239 -239h398zM80 1036h239v-797h956v797h239v-797l-239 -239h-956l-239 239v797z";
const X_PATH = "M80 1036h239v-638h-239v638zM1275 1036h239v-638h-239v638zM80 1195l239 239h159l239 -239v-159h160v159l239 239h159l239 -239h-398v-159l-239 -239h-160l-239 239v159h-398zM478 239v159l239 239h160l239 -239v-159h398l-239 -239h-159l-239 239v159h-160v-159 l-239 -239h-159l-239 239h398z";
const Y_PATH = "M80 239l239 -239v1036h-239v-797zM478 1195v-1195h239v1195l-239 239h-159l-239 -239h398zM1275 1434l239 -239v-797h-239v1036zM877 1434h239v-1195h398l-239 -239h-159l-239 239v1195z";
const Z_PATH = "M80 1195l239 239h956l239 -239v-558l-239 -239h-159l-239 239v399h239v-399h159v558h-1195zM319 239v558h159v-399h239v399l-239 239h-159l-239 -239v-558l239 -239h956l239 239h-1195z";