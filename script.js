
let counter = 1;
let score = 0;


//Generates a random number between 0 and 255 
const randNum = function (){
    const num = Math.floor(Math.random() * 256);
    return num;
};


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



const generateHexCode = function(){
    return "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
};


const generateHexCodesArray = function(){
    return [generateHexCode(), generateHexCode(), generateHexCode()];
};


const displayHexName = function(hexcode){
    $(".question-1 .color-code h2").text(hexcode);
};


const checkAnswer = function (correctHexCode) {
    $(".question-1 .option").bind("click", function () {
        $(".question-1 .option").unbind("click");
        console.log($(this).data("id"));
        console.log(correctHexCode);
        if ($(this).data("id") == correctHexCode) {
            $(".question-1 .color-code h3").text("You're correct")
            console.log("you're a winner otter baby");
            score+=1;

        } else {
            console.log("you are a newt now. Hey Newty baby.")
            $(".question-1 .color-code h3").text("You're incorrect")
        }

        if (counter < 10){
            $(".next").show();
        } else {
            $(".finish").show();
        }
    });
};

const generateQuestion = function() {
    let colorCodes = generateHexCodesArray();
    let correctHexCode = colorCodes[0];
    displayHexName(correctHexCode);
    console.log(correctHexCode);
    checkAnswer(correctHexCode);
    console.log(colorCodes);
    const colorCodesRandom = colorCodes.sort();
    console.log(colorCodesRandom);
    displayColors(colorCodesRandom);
};



const displayColors = function(colorCodes){
    $(".question-1 .option-1").css("background-color", colorCodes[0]).data("id", colorCodes[0]);
    $(".question-1 .option-2").css("background-color", colorCodes[1]).data("id", colorCodes[1]);
    $(".question-1 .option-3").css("background-color", colorCodes[2]).data("id", colorCodes[2]);
};

//check to see if user guess is correct

generateQuestion();


$(".next").on("click", function () {
    $(this).hide();
    $(".question-1 .color-code h3").text("");
    counter+=1;
    if (counter <=10){
        generateQuestion();
    }
});

$(".finish").on("click", function(){
    $("h4").show();
    $("h4 span").text(score);
});






// $('.start').on("click", function(){
//     // $(".landing-page").hide();
//     $(".question-1").show();
// });







$(document).ready(function(){


});