window.onload = function () {
 //-------------------------------------------------------------------------------------------------- Hangman --------------------------------------------------------------------------------------------------------- 
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory= [""];     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  
  	var hints= [""];
	//chosenCategory = ["melissa", "glen", "adam", "megan", "dominik", "sean", "moon"];
	//hints = ["Doesn't like curry", "Likes purple croissants", "Creator of facebook group chat", "Plans a November wedding", "Has a terrible landlord", "6th member of the team", "What shape is our croissant?"];
	chosenCategory = ["default"];
	hints= ["Please add some words"];
	
  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    


  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
	showLives.style.color = "white";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
	  showLives.style.color = "red";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
			  showLives.style.color = "green";
			win();
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "alphactive");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    //chosenCategory = ["melissa", "glen", "adam", "megan", "dominik", "sean", "moon", "alien", "forrest-gump", "gladiator", "godfather", "star-wars", "dublin", "singapore", "bangkok", "amsterdam", "prague"];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      //hints = ["Doesn't like curry", "Likes purple croissants", "Creator of facebook group chat", "Plans a November wedding", "Has a terrible landlord", "6th member of the team", "What shape is our croissant?", "Science-Fiction horror film", "The person who likes to run", "Historical drama", "True boss", "A long time ago in a galaxy far, far away", "Capital of Ireland", "Garden city", "Capital of Thailand", "Netherlands capital", "Czech Republic capital"];
    

    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue : " +  hints [hintIndex];
	 document.getElementById('clue').style.visibility = "visible"; 
	 document.getElementById('clue').style.color = "yellow";
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
  
    
  //------------------------------------------------------------------------------------------ Confetti --------------------------------------------------------------------------------------------------------------
  
 
	// variable for confetti interval id storage
var autoconfetti=0;

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var content = document.getElementsByClassName("modal-content")[0];

// create interval and store confetti interval ID
function startconfetti() {
	var confettiid = 	setInterval(confetti, 640);
	return confettiid;
}

function stopconfetti() {
	clearInterval(autoconfetti);
	autoconfetti=0;
}


// When the user clicks the button, open the modal 
win = function() {
	if(autoconfetti==0){
		modal.style.display = "block";
		autoconfetti= startconfetti();
		window.scrollTo(0, 0);
	}
}




// When the user clicks on <div> (x), close the modal
content.onclick = function() {
    modal.style.display = "none";
	stopconfetti();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		stopconfetti();
    }
}

//This function generates the confetti
var amount = 8;
function confetti() {
	for(var i = 0; i < amount * 2; i++) {
		var a = document.createElement("div");
		document.body.appendChild(a);
		a.outerHTML = '<div class = "confetti i' + Math.floor(Math.random() * 4) + '" style = "left: ' + Math.floor(Math.random() * document.body.clientWidth) + 'px;"></div>';
	}
}


//------------------------------------------------------------------------------------------------------- Creator -----------------------------------------------------------------------------------------------------------


  //This runs when you click add question button
  addWord= function(){
	  // get the Error <p> by ID
	var hmanErr = document.getElementById("hangmanAddError");
    //Get each of the inputs by id
    var wordInput = document.getElementById("wordInput");
	var wordInputV = wordInput.value;
    var hintInput = document.getElementById("hintInput");
	var hintInputV = hintInput.value;
	
    //if both input values available add the values into the word and hint array
	if(wordInput.value.match(/\D/) != null && hintInput.value.match(/\D/) != null){	
		  if(chosenCategory[0]==="default"){
			  chosenCategory.pop();
			  hints.pop();  
		  }
		  
		chosenCategory.push(wordInputV);
		hints.push(hintInputV);
		// hide Error <p>
		hmanErr.setAttribute('style','visibility: hidden; color:red');
	}
	else{
		hmanErr.setAttribute('style','visibility: visible; color:red');
	}
		//clear the inputs
		wordInput.value = "";
		hintInput.value = "";
  }

}

