const outputText = document.getElementById('text');

const goForward = document.getElementById('forward');
const goBack = document.getElementById('backward');
const goLeft = document.getElementById('left');
const goRight = document.getElementById('right');
const useItem1 = document.getElementById('use1');
const useItem2 = document.getElementById('use2');
const useItem3 = document.getElementById('use3');
const useItem4 = document.getElementById('use4');
const useItem5 = document.getElementById('use5');
const useItem6 = document.getElementById('use6');
const useItem7 = document.getElementById('use7');
const useItem8 = document.getElementById('use8');
const attack = document.getElementById('attack');
const pickUp = document.getElementById('pickup');
const search = document.getElementById('search');
const reset = document.getElementById('reset');

const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');
const item4 = document.getElementById('item4');
const item5 = document.getElementById('item5');
const item6 = document.getElementById('item6');
const item7 = document.getElementById('item7');
const item8 = document.getElementById('item8');

let content1 = item1.innerHTML;
let content2 = item2.innerHTML;
let content3 = item3.innerHTML;
let content4 = item4.innerHTML;
let content5 = item5.innerHTML;
let content6 = item6.innerHTML;
let content7 = item7.innerHTML;
let content8 = item8.innerHTML;

// const inventory = {"", "", "", "", "", "", "", ""};

const initialise = document.getElementById('init');
const modal = document.getElementById("welcome");
const modalOverlay = document.getElementById('modal-overlay')
const body = document.querySelector("body");
const dead = document.getElementById("gameover");
const gameOverText = document.getElementById("youaredead")

const forwardMessage = "<p><em>You go forward.</em></p>";
const backMessage = "<p><em>You go back.</em></p>";
const leftMessage = "<p><em>You go left</em></p>";
const rightMessage = "<p><em>You go right.</em></p>";
const item1Message = "<p><em>You use the " + content1 + ". Except you don't because it's just a placeholder and I don't know how to do this bit yet.</em></p>";
const item2Message = "<p><em>You use the " + content2 + ". Somebody is getting lucky! Shame you're alone. Posh wank time, is it?</em></p>";
const item3Message = "<p><em>You use nothing. Because there's nothing here, ya see?.</em></p>";
const item4Message = "<p><em>You use the " + content4 + ". Gross. Make sure you wash it before returning it to its owner.</em></p>";
const item5Message = "<p><em>You use nothing. Because there's nothing here, ya see?.</em></p>";
const item6Message = "<p><em>You use the " + content6 + ". Personally, I find that pretty insensitive.</em></p>";
const item7Message = "<p><em>You use the " + content7 + ". Nom nom.</em></p>";
const item8Message = "<p><em>You use nothing. Because there's nothing here, ya see?.</em></p>";
const attackMessage = "<p><em>You attack something. I'm really not sure what yet, because I haven't gotten that far.</em></p>"
// function() {
// 	// YOU NEED TO WORK THIS OUT, DUDE
// }
const pickUpMessage = "<p><em>You pick up something. Who knows what though. I am still working out how to build parts of this thing.</em></p>"
// function() {
// 	// YOU NEED TO WORK THIS OUT, DUDE
// }
const searchMessage = "<p><em>You search... uh... your soul? Yeah, I haven't done this bit yet. So it doesn't do anything except for giving you this friendly message.</em></p>"
// function() {
// 	// YOU NEED TO WORK THIS OUT, DUDE
// }

goForward.addEventListener("click", forwardClick);
goBack.addEventListener("click", backClick);
goLeft.addEventListener("click", leftClick);
goRight.addEventListener("click", rightClick);
useItem1.addEventListener("click", clickUse1);
useItem2.addEventListener("click", clickUse2);
useItem3.addEventListener("click", clickUse3);
useItem4.addEventListener("click", clickUse4);
useItem5.addEventListener("click", clickUse5);
useItem6.addEventListener("click", clickUse6);
useItem7.addEventListener("click", clickUse7);
useItem8.addEventListener("click", clickUse8);
initialise.addEventListener("click", initGame);
attack.addEventListener("click", attackIt);
pickUp.addEventListener("click", pickItUp);
search.addEventListener("click", searchIt);
reset.addEventListener("click", startOver);


const player = {
	name: "Billy",
	gender: "Male",
	class: "Lover",
	strength: 50,
	health: 10,
}


let whereAmI = "nowhere"

const locBedroom = {
	iteration: 0,
	item: "condom",
	searchable: "drawer",
	enemy: "",
	bed: 0,
	wall: 0,
}

const locForest = {
	iteration: 0,
	item: "",
	searchable: "",
	enemy: "",
}

const locRiver = {
	iteration: 0,
	item: "",
	searchable: "",
	enemy: "",
}

const locRoad = {
	iteration: 0,
	item: "",
	searchable: "",
	enemy: "",
}

// body.onload = enterBedroom();


body.onload = displayModal();
function displayModal() {
	modalOverlay.style.display = "block";
	modal.style.display = "block";
}

function gameOver(cause) {
	dead.style.display = "block";
	modalOverlay.style.display = "block";
	if (cause === "wall") {
		setTimeout(gameOverText.insertAdjacentHTML("beforeend", "Wow. Just wow. You are a special kind of dumb, " + player.name + ".</p><p>You walked into the wall so many times that you killed yourself.</p><p>Honestly, with a brain like yours, it's probably better this way."), 500);
	} else if (cause === "bed") {
		setTimeout(gameOverText.insertAdjacentHTML("beforeend", "You have refused the call to adventure, and gone back to bed. Nobody will ever remember your name, #firstNamelastName#, nor will songs be sung of your deeds. At least you can rest happy knowing that you will live a long and happy li....</p><p>Oh no. The roof collapsed while you were sleeping. You're dead."), 500);
	}
}

function startOver() {
	window.location.reload();
}

function initGame() {
	if (document.getElementById("charname").value.length !== 0) {
	player.name = document.getElementById("charname").value;
	player.gender = document.querySelector('input[name="charactergender"]:checked').value;
	player.class = document.querySelector('input[name="characterstyle"]:checked').value;
	player.strength = document.getElementById("charbuild").value;
	enterBedroom();
	modal.style.display = "none";
	modalOverlay.style.display = "none";
	} else {
		document.getElementById("charactername").insertAdjacentHTML("beforeend", '<span style="color: red"> This field is required</span>')
	};
}

function updateScroll() {
    var element = document.getElementById("text");
    element.scrollTop = element.scrollHeight;
}

function forwardClick() {
	outputText.insertAdjacentHTML("beforeend", forwardMessage);
	updateScroll();
	moveCommand("forward");
}

function backClick() {
	outputText.insertAdjacentHTML("beforeend", backMessage);
	updateScroll();
	moveCommand("backward");
}

function leftClick() {
	outputText.insertAdjacentHTML("beforeend", leftMessage);
	updateScroll();
	moveCommand("left");
}

function rightClick() {
	outputText.insertAdjacentHTML("beforeend", rightMessage);
	updateScroll();
	moveCommand("right");
}

function clickUse1() {
	outputText.insertAdjacentHTML("beforeend", item1Message);
	updateScroll();
}

function clickUse2() {
	outputText.insertAdjacentHTML("beforeend", item2Message);
	updateScroll();
}

function clickUse3() {
	outputText.insertAdjacentHTML("beforeend", item3Message);
	updateScroll();
}

function clickUse4() {
	outputText.insertAdjacentHTML("beforeend", item4Message);
	updateScroll();
}

function clickUse5() {
	outputText.insertAdjacentHTML("beforeend", item5Message);
	updateScroll();
}

function clickUse6() {
	outputText.insertAdjacentHTML("beforeend", item6Message);
	updateScroll();
}

function clickUse7() {
	outputText.insertAdjacentHTML("beforeend", item7Message);
	updateScroll();
}

function clickUse8() {
	outputText.insertAdjacentHTML("beforeend", item8Message);
	updateScroll();
}

function attackIt () {
	outputText.insertAdjacentHTML("beforeend", attackMessage);
	updateScroll();
}

function searchIt() {
	outputText.insertAdjacentHTML("beforeend", searchMessage);
	updateScroll();
}

function pickItUp() {
	outputText.insertAdjacentHTML("beforeend", pickUpMessage);
	updateScroll();
}


function enterBedroom () {
	whereAmI = "bedroom";
	let i = locBedroom.iteration;
	if (i === 0) {
		outputText.insertAdjacentHTML("beforeend", "<h3>Chapter One - A Call to Adventure</h3><p>" + "You slowly awaken in a small, dim room. For a while, you can't remember your name. Then it comes to you.</p><p><em>" + player.name + "</em>.</p><p>" + player.name + " is your name.</p><p>What kind of cruel, malicious, evil bastard parents would name a child somthing like that? It's practically criminal.<p></p>You wipe away a bitter tear and scan the room. It is almost entirely bare, except for a nightstand with a single drawer. In front of you, there is a door.</p>");
	} else if (i === 1) {
		outputText.insertAdjacentHTML("beforeend", "<p>" + "You are back in the bedroom. It is unchanged. Infront of you is the door. The nightstand is still un-rifled-through.</p>");
	} else if (i === 2) {
		outputText.insertAdjacentHTML("beforeend", "<p>" + "You are back in the bedroom. Again.</p>");
	} else if (i === 3) {
		outputText.insertAdjacentHTML("beforeend", "<p>" + "What is it with you and this room, " + player.name + "? You are back in the bedroom.</p>");
	} else {
		outputText.insertAdjacentHTML("beforeend", "<p>" + "You. Bedroom. <em>Again.</em></p>");
	}
	locBedroom.iteration++;
	updateScroll();
}

function moveCommand(direction) {
	if (whereAmI === "bedroom") {
		bedroomCommand(direction);
	}
}

function bedroomCommand (direction) {
	switch (direction) {
		case "forward":
			direction = "";
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Sorry, you can't go forward yet, because I haven't programmed the next area. 😬</p><p> That weird squiggle was supposed to be the grimacing emoji, but I guess this font doesn't support emojis.</p> <p> Anyway, perhaps there's more you can do in the bedroom? You know - besides the obvious.</p>"), 500);
			// setTimeout(enterForest, 1000);
			updateScroll();
		break;
		case "backward":
			direction = "";
			if (locBedroom.bed === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p> I'm not sure you really want to go to bed. But if you really, really do, then you can try again.</p>"), 500);
				locBedroom.bed++;
				updateScroll();
			} else {
				gameOver("bed");
			};
		break;
		case "left":
			direction = "";
			if (locBedroom.wall === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You walked into the wall. You now have a nosebleed.</p>"), 500);
				player.health--;
				locBedroom.wall++;
				updateScroll();
			} else if (locBedroom.wall > 0 && player.health > 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Seriously, why are you doing that? You're hurting yourself.</p>"), 500);
				player.health--;
				locBedroom.wall++;
				updateScroll();
			} else {
				gameOver("wall");
			};
		break;
		case "right":
			direction = "";
			if (locBedroom.wall === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You walked into the wall. You now have a nosebleed.</p>"), 500);
				player.health--;
				locBedroom.wall++;
				updateScroll();
			} else if (locBedroom.wall > 0 && player.health > 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Seriously, why are you doing that? You're hurting yourself.</p>"), 500);
				player.health--;
				locBedroom.wall++;
				updateScroll();
			} else {
				gameOver("wall");
			};
		break;
	}
}




// const inventory = {"","","","","","","",""} // --> need to think on how to do this


	

