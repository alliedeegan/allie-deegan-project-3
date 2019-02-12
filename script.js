
//Generate a random number between 0 and 255 within a function that can be run to create a new value each time

const randNum = function (){
    const num = Math.floor(Math.random() * 256);
    return num;
};

//Generate an RGB code


// I found a tutorial on Campushippo.com for converting rgb to hex. I was struggling with numbers that only returned a single digit until I found the if statement on their site that solved this problem by adding the 0 as a string. So clever!
const singleHexValue = function (rgbValue) {
    let hex = Number(rgbValue).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

//convert the RGB code to a hex code

const fullHexValue = function (r, g, b) {
    const red = singleHexValue(r);
    const green = singleHexValue(g);
    const blue = singleHexValue(b);
    return red + green + blue;
};

// use this function to create 3 variables for the options
let correctHexCode = "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
// let wrongHexCode1 = "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
// let wrongHexCode2 = "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
// console.log(correctHexCode);

//YOURE GOING TO NEED TO DEFINE A NEW CORRECT HEX CODE FOR EACH ROUND!!!!!!!!!!!!!! Possible just by re-running this code again later after each section?

//lets try to make these functions:

// let correctHexCodeFun = function(){
//     return "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
// };

let wrongHexCodeFun = function(){
    return "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
};

// use jQuery to make an h2 that holds the value of fullHexValue

$(".question-1 .color-code h2").text(correctHexCode);

//An array that holds the three color values

const colorCodes = [correctHexCode, wrongHexCodeFun(), wrongHexCodeFun()];
console.log(colorCodes);

//this will order them alphabetically, which should be random enough for my purposes.
console.log(colorCodes.sort());

//put the values into three boxes background colors and also give elements at data id
$(".option-1").css("background-color", colorCodes[0]).data("id", colorCodes[0]);
$(".option-2").css("background-color", colorCodes[1]).data("id", colorCodes[1]);
$(".option-3").css("background-color", colorCodes[2]).data("id", colorCodes[2]);

//check to see if user guess is correct

$(".option").bind("click", function(){
    $(".option").unbind("click");
    if($(this).data("id") == correctHexCode){
        $(".color-code h3").text("You're correct")
        console.log("you're a winner otter baby");

    } else {
        console.log("you are a newt now. Hey Newty baby.")
        $(".color-code h3").text("You're incorrect")
    }
    $(".next").show();
    correctHexCode = "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
});

$(".next").on("click", function(){
    $(".question-1").hide();
    $(".question-2").show();
});


$('.start').on("click", function(){
    $(".landing-page").hide();
    $(".question-1").show();
});







$(document).ready(function(){


});