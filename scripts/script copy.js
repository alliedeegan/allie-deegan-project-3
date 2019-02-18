
// VARIABLES
let counter = 1;
let score = 0;

const correctAnswerText = ["Nice!", "Take that, Color Wizard!", "Crushin' it!", "You got it!"];
const wrongAnswerText = ["Nope!", "Yiiiikes", "Not even close!", "Your friends are probably doomed", "Hah! No."]

const results = {
    amazing: {
        message: "You saved all of your friends! You're the real Color Wizard!",
        img: "assets/crystal.png",
        alt: "An illustration of a purple crystal ball."
    },
    good: {
        message: "Not bad, Rookie! You saved almost everyone. Too bad that one friend got turned into a cat. I'm sure she'll get over it.",
        img: "assets/cat.png",
        alt: "A illustration of an annoyed black cat."
    },
    fair: {
        message: "The good news is it could have been worse. Some of you friends escaped with you! We don't need to talk about what happened to the others.",
        img: "assets/eyeball.png",
        alt: "An illustration of eye balls in a jar."
    },
    poor: {
        message: "So. That went badly, hey? At least you saved that one friend. Sorry about your friends who are soup now.",
        img: "assets/cauldron.png",
        alt: "An illustration of a bubbling cauldron."
    },
    bad: {
        message: "All your friends are dead. Good luck making new ones!",
        img: "assets/cemetery.png",
        alt: "An illustration of a gravestone in a cemetary."
    }
}

// SMALL FUNCTIONS

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

//Create a single random hex code
const generateHexCode = function(){
    return "#" + (fullHexValue(randNum(), randNum(), randNum())).toUpperCase();
};

// Create an array of three random hex codes
const generateHexCodesArray = function(){
    return [generateHexCode(), generateHexCode(), generateHexCode()];
};

//Display the name of the 'correct' hex code
const displayHexName = function(hexcode){
    $(".question .color-code h2").text(hexcode);
};

//Determines which correct or inccorrect response user receives 
const getSmallNumber = function(){
    const num = Math.floor(Math.random() * 4);
    return num;
};

//Displays the value of random hex codes
const displayColors = function (colorCodes) {
    $(".question .option-1").css("background-color", colorCodes[0]).data("id", colorCodes[0]);
    $(".question .option-2").css("background-color", colorCodes[1]).data("id", colorCodes[1]);
    $(".question .option-3").css("background-color", colorCodes[2]).data("id", colorCodes[2]);
};


// LARGE FUNCTIONS

//Generates questions
const generateQuestion = function () {
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

// Checks the user's answer
const checkAnswer = function (correctHexCode) {
    $(".question .option").bind("click", function () {
        $(".question .option").unbind("click");
        console.log($(this).data("id"));
        console.log(correctHexCode);
        if ($(this).data("id") === correctHexCode) {
            $(".question h3").text(`${correctAnswerText[getSmallNumber()]}`);
            $(this).css("border", "5px solid #55E6C1");
            score+=1;
        } else {
            $(".question h3").text(`${wrongAnswerText[getSmallNumber()]}`);
            $(this).css("border", "5px solid #FC427B");
        }

        if (counter < 10){
            $(".next").show();
        } else {
            $(".finish").show();
        }
    });
};


//Handler for all click events
const eventHandler = function(){
    //handler for splash screen
    $("button.splash").on("click", function(){
        $("h1.splash").removeClass("active");
        $("h1.splash").hide();
        $("button.splash").removeClass("active");
        $("button.splash").hide();
        $("section.start-page").addClass("active");
    });

    //handler for play game
    $("button.play").on("click", function(){
        $("section.start-page").removeClass("active");
        $("section.how-to").removeClass("active");
        $("section.question").addClass("active");
    });

    //handler for how-to
    $("button.how-to").on("click", function(){
        $("section.start-page").removeClass("active");
        $("section.how-to").addClass("active");
    });

    //handler for how-to navigation forward
    $("body").on("click", ".next-how-to", function () {
        const currentPartId = `*[data-part="${$('.active-part').attr('data-part')}"]`;
        const nextPartId = parseInt($('.active-part').attr('data-part')) + 1;
        const nextPart = `*[data-part="${nextPartId}"]`;
        $(currentPartId).removeClass("active-part");
        $(nextPart).addClass("active-part");
    });

    //hander for how-to navigation backward
    $("body").on("click", ".last-how-to", function () {
        const currentPartId = `*[data-part="${$('.active-part').attr('data-part')}"]`;
        const lastPartId = parseInt($('.active-part').attr('data-part')) - 1;
        const lastPart = `*[data-part="${lastPartId}"]`;
        $(currentPartId).removeClass("active-part");
        $(lastPart).addClass("active-part");
    });

    //handler for how-to back to start-menu
    $("button.start-menu").on("click", function(){
        $("section.how-to").removeClass("active");
        $("section.start-page").addClass("active");
    });

    //handler for replay
    $('button.replay').on("click", function(){
        location.reload();
    });

    //handler for next question
    $(".next").on("click", function () {
        $(this).hide();
        $(".option").css("border", "5px solid #fff");
        $(".question h3").text(" ");
        counter+=1;
        if (counter <=10){
            generateQuestion();
        }
    });
    
    //handler for Finish
    $(".finish").on("click", function(){
        $("section.question").hide();
        $("section.result").show();
        showResult();
    }); 
};


// Show's the User's score and result screen
const showResult = function(){
    $(".user-score").text(score);
    if (score === 10){
        $(".result-text p").text(results.amazing.message);
        $(".result-text img").attr("src", `${results.amazing.img}`);
        $(".result-text img").attr("alt", `${results.amazing.alt}`);
    } else if (score < 10 && score >= 8){
        $(".result-text p").text(results.good.message);
        $(".result-text img").attr("src", `${results.good.img}`);
        $(".result-text img").attr("alt", `${results.good.alt}`);
    } else if (score < 8 && score >= 6){
        $(".result-text p").text(results.fair.message);
        $(".result-text img").attr("src", `${results.fair.img}`);
        $(".result-text img").attr("alt", `${results.fair.alt}`);
    } else if (score < 6 && score >= 3){
        $(".result-text p").text(results.poor.message);
        $(".result-text img").attr("src", `${results.poor.img}`);
        $(".result-text img").attr("alt", `${results.poor.alt}`);
    } else {
        $(".result-text p").text(results.bad.message);
        $(".result-text img").attr("src", `${results.bad.img}`);
        $(".result-text img").attr("alt", `${results.bad.alt}`);
    }
};


const init = function(){
    particlesJS.load('particles-js', 'scripts/particles.json');
    eventHandler();
    generateQuestion();
};


$(document).ready(function(){
    init();
});