let reversals = "no";
let number = 7;
let data;
let spread = 3;
let UvsR3 = ["upright3", "reversed3"];
let UvsR5 = ["upright5", "reversed5"];
let controlback = false;

function spreadSetting(value){
    spread = value;
}
function reversed(value){
    reversals = value;
}

$(document).ready(function(){
        $("#menu").load("components/menu.html");
        $("#warning").load("components/warning.html");    
});

// Reading starts here
function thirdScreen(arg) {
window.scrollTo(0, 0);
number = 7;        

document.getElementById("div-content").innerHTML='<div><img src="images/instructions.png" style="max-width:150px" /></div><div class="instruction-title" style="color:#447eac">Instructions</div><div class="first-instructions"><p class="item1" style="color:#ffffff">Think about what you want to ask and formulate a clear question. You can say it aloud or just in your mind.</p><p class="item2" style="color:#ffffff">While focusing on your question, press the "Shuffle Cards" button. You should keep your question in your mind till the shuffling is complete.</p><p class="item3" style="color:#ffffff">Three or five cards from the top of the shuffled deck will appear on the screen. The number of cards depends on what spread you are using.</p><p style="text-align:center;margin-top: -20px;"><br><button id="1" type="button" class="btn btn-lg" style="background-color: #f57700; color: white" onclick="start()">SHUFFLE CARDS</button></p><div>';
}
function start(){
    $('#second-screen').removeClass('second-screen-main'); //remove margin-top to keep shuffle.gif centralized 
    $('#content').css('min-height', '100vh');   
    document.getElementById("div-content").innerHTML='<div id="shuffle"><img class="shuffling" src="images/shuffle.gif" /></div>';
    getData();
    
}
function getData(){
     $.ajax({ 
        url: "js/cardsinfo.json",
        dataType: "json",
        cache: false,
        success: function (json) {
        
        data = json;
        shuffleCards(); 
        setTimeout(function(){
            
        $('#second-screen').addClass('second-screen-main');  
        $('#content').css('min-height', '');    
        if (parseInt(spread, 10) === 3){     
        document.getElementById("div-content").innerHTML='<div id="show-cards"><div class="instruction-title" style="color:#447eac">Results</div><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;color:#ffffff">This is your three cards spread. The cards from left to right represent the past, present, and future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);color:#ffffff">Click on each card to know their meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-lg" style="margin-top: 20px;color:#ffffff;background-color: #f57700;" id="newq" onclick="thirdScreen(this.id);">Ask another question</button></div></div>'; 
        } else {
        document.getElementById("div-content").innerHTML='<div id="show-cards"><div class="instruction-title" style="color:#447eac">Results</div><div id="show-cards-top"><p class="item1" style="font-size:calc(15px + 0.5vw);margin-top: 30px;color:#ffffff">This is your five cards spread. The cards from left to right represent the past, recent past, present, near future, and future.</p><p class="item2" style="font-size:calc(15px + 0.5vw);color:#ffffff">Click on each card to know their meaning.</p></div><div id="cards"></div><div><button type="button" class="btn btn-lg" style="margin-top: 10px;color:#ffffff;background-color: #f57700;" onclick="thirdScreen();">Ask another question</button></div></div>';    
            
        }
            
        showCards();
    }, number + [100 + 10]);    
        }
});
}
function shuffleAlgorithm(array) {
  for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

  return array;

    
}

function shuffleCards () {
data = shuffleAlgorithm(data);
    if (number > number - [number - 1] ){
        number--;
        window.setTimeout(shuffleCards, 1000);
        
    }
    
}

// Show reading results
function showCards() {
    if (reversals === "no") {
    for (let i = 0; i < spread; i++) {
        if (parseInt(spread, 10) === 3){   
        let images = '<img name="' + data[i]['name'] + ' tarot card meaning" class="upright3" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';
        $('#cards').append(images);
        }else {
        let images = '<img name="' + data[i]['name'] + ' tarot card meaning" class="upright5" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';
        $('#cards').append(images);   
        }
    }
    } else {
      for (let i = 0; i < spread; i++) {
        if (parseInt(spread, 10) === 3){
        let position3 = UvsR3[Math.floor(Math.random()*UvsR3.length)];  
		let UpvsRev3 = "";	
		if (position3 == "reversed3") {
			UpvsRev3 = "reversed ";
		}	
        let images = '<img name="' + UpvsRev3 + data[i]['name'] + ' tarot card meaning" class="'+ position3 + '" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';
        $('#cards').append(images);
        }else {
        let position5 = UvsR5[Math.floor(Math.random()*UvsR5.length)];   
		let UpvsRev5 = "";	
		if (position5 == "reversed5") {
			UpvsRev5 = "reversed ";
		}		
        let images = '<img name="' + UpvsRev5 + data[i]['name'] + ' tarot card meaning" class="'+ position5 + '" src="' + data[i]['img'] + '" id="' + data[i]['id'] + '1" onclick="googleSearch(this.name)"/>';
        $('#cards').append(images);    
        }
    }  
    }
}

// Google search
function googleSearch(name){    

let addPlus = name.replace(/ /g, "+");
let googleUrl = 'https://www.google.com/search?q=' + addPlus; 	
window.open(googleUrl, '_system', 'location=yes');   

}
      
// Help section
function showHelp(arg) {
    if (arg === 'help'){
window.scrollTo(0, 0);        
controlback = true;        
$('#content').addClass('display');
$('#help').addClass('display');        
$('#div-help').removeClass('display').load("components/help.html");    
        }
 if (arg === "outhelp"){     
$('#content').removeClass('display');
$('#help').removeClass('display');      
$('#div-help').addClass('display');     
 }    
}

//Android back button handler methods
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", backKeyDown, false);
}
function backKeyDown(answer) { 
    if (controlback === false){
    $('#warning').removeClass("display");    
    $('#warningModal').modal({backdrop: 'static', keyboard: false});
    $('body').addClass("no-scroll");      
    }
    if (controlback === true){
    window.scrollTo(0, 0);    
    $('#content').removeClass('display');
    $('#help').removeClass('display');    
    $('#div-help').addClass('display');  
    controlback = false;    
    }
    if (answer === "no"){
    $( "#warningModal" ).modal( "toggle" );
    $('body').removeClass("no-scroll");      
    }
}
function exitApp() {
    navigator.app.exitApp();
}
