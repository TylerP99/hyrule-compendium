/***********************************/
/*           Constants             */
/***********************************/

/******** Path Data for SVG ********/

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
function get_page_height() {
    return Math.max( document.body.scrollHeight, 
                     document.body.offsetHeight, 
                     document.documentElement.clientHeight, 
                     document.documentElement.scrollHeight,
                     document.documentElement.offsetHeight )
}



// Goals for border: adjust to height of page (dynamically????)

class Glyph_Border {
    borderContainer = document.createElement("ul");
    minGlyphs = 0;
    maxGlyphs = 10;

    get_height() {
        return Math.max( this.borderContainer.scrollHeight, this.borderContainer.offsetHeight, this.borderContainer.clientHeight)
    }

    make_border() {
        let counter = 0
        while(this.get_height() < get_page_height())
        {
            console.log(`${this.get_height()} vs ${get_page_height()}`)
            this.make_random_glyph_ul();
            counter++;
            if(counter > 100) {break;}
        }
    }

    animate_border() {
        
    }

    make_random_glyph_ul() {
        //Goal: Put a random number of random glyphs into the ul
        const glyphUl = document.createElement("ul");

        //Minimum number of glyphs allowed in the ul
        const lowerLimit = this.minGlyphs;

        //Maximum number of glyphs allowed in the ul, non inclusive
        const upperLimit = this.maxGlyphs;

        const numberOfGlyphs = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;

        for(let i = 0; i < numberOfGlyphs; ++i)
        {
            const glyphLi = document.createElement("li");
            const randomGlyph = this.get_random_glyph();

            glyphLi.appendChild(randomGlyph.glyph);
            glyphUl.appendChild(glyphLi);
        }

        console.log(glyphUl);
        this.borderContainer.appendChild(glyphUl);
        //return glyphUl;
    }

    get_random_glyph() {
        const randomCharCode = Math.floor(Math.random() * 26);
        const randomChar = String.fromCharCode("a".charCodeAt(0) + randomCharCode);
        
        const randomGlyph = new Glyph(randomChar);

        return randomGlyph;
    }

    // Better done in glyph class probably
    // fade()
    // color_swap()
    // glyph_swap()

    // create_svg_shell()
}


// This should make the svg element glyph
class Glyph {

    constructor(char) {
        this.glyph = this.make_svg_glyph(char);
    }

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


    get_char_path(char) {
        let path = "";
        char = char.toLowerCase();

        switch(char) {
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
                path = "wat";
                break;
        }
        return path;
    }
}


let glyphBorder = new Glyph_Border();
glyphBorder.make_border();
document.querySelector(".glyph-border-left").appendChild(glyphBorder.borderContainer);

let glyphBorder2 = new Glyph_Border();
glyphBorder2.make_border();
document.querySelector(".glyph-border-right").appendChild(glyphBorder2.borderContainer);

console.log(glyphBorder.get_height());
console.log(get_page_height())
console.log(glyphBorder.borderContainer.querySelectorAll("li"))