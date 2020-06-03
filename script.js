const outputText = document.getElementById('text');

const goForward = document.getElementById('forward');
const goBack = document.getElementById('backward');
const goLeft = document.getElementById('left');
const goRight = document.getElementById('right');

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

const inventory = [];

let content1 = inventory[0];
let content2 = inventory[1];
let content3 = inventory[2];
let content4 = inventory[3];
let content5 = inventory[4];
let content6 = inventory[5];
let content7 = inventory[6];
let content8 = inventory[7];

let whereAmI = "nowhere"

function updateInventory() {
	let iLen = inventory.length;
	if (iLen === 1) {
		item1.innerHTML = content1;
	}
	// item2.innerHTML = content2;
	// item3.innerHTML = content3;
	// item4.innerHTML = content4;
	// item5.innerHTML = content5;
	// item6.innerHTML = content6;
	// item7.innerHTML = content7;
	// item8.innerHTML = content8;
}


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


goForward.addEventListener("click", forwardClick);
goBack.addEventListener("click", backClick);
goLeft.addEventListener("click", leftClick);
goRight.addEventListener("click", rightClick);
initialise.addEventListener("click", initGame);
attack.addEventListener("click", attackIt);
pickUp.addEventListener("click", pickItUp);
search.addEventListener("click", searchIt);
reset.addEventListener("click", startOver);


const player = {
	name: "Morton",
	// gender: "Male",
	class: "Lover",
	strength: 50,
	health: 10,
}

const locBedroom = {
	iteration: 0,
	item: "condom",
	searchable: 0,
	enemy: "",
	bed: 0,
	wallright: 0,
	wallleft: 0,
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


body.onload = function displayModal() {
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
	// player.gender = document.querySelector('input[name="charactergender"]:checked').value;
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
	command("forward");
}

function backClick() {
	outputText.insertAdjacentHTML("beforeend", backMessage);
	updateScroll();
	command("backward");
}

function leftClick() {
	outputText.insertAdjacentHTML("beforeend", leftMessage);
	updateScroll();
	command("left");
}

function rightClick() {
	outputText.insertAdjacentHTML("beforeend", rightMessage);
	updateScroll();
	command("right");
}

function attackIt() {
	command("attack");
}

function searchIt() {
	command("search");
}

function pickItUp() {
	command("pickup");
}


function enterBedroom () {
	whereAmI = "bedroom";
	let i = locBedroom.iteration;
	if (i === 0) {
		outputText.insertAdjacentHTML("beforeend", "<h3>Chapter One - A Call to Adventure</h3><p>" + "You slowly awaken in a small, dim room. For a while, you can't remember your name. Then it comes to you.</p><p><em>" + player.name + "</em>.</p><p>" + player.name + " is your name.</p><p>What kind of cruel, malicious, evil bastard parents would name a child somthing like that? It's practically criminal.<p></p>You wipe away a bitter tear and scan the room. It is almost entirely bare, except for a nightstand with a single drawer. In front of you, there is a door.</p>");
	} else if (i > 0 && locBedroom.searchable === 0) {
		outputText.insertAdjacentHTML("beforeend", "<p>You are back in the bedroom. It is unchanged. Infront of you is the door. The nightstand is still un-rifled-through.</p>");
	} else if (i === 1 && locBedroom.searchable === 1) {
		outputText.insertAdjacentHTML("beforeend", "<p>You are back in the bedroom. It is unchanged. Infront of you is the door. The room is still a mess from your search.</p>");
	} else if (i === 2 && locBedroom.searchable === 1) {
		outputText.insertAdjacentHTML("beforeend", "<p>You are back in the bedroom. Again.</p>");
	} else if (i === 3 && locBedroom.searchable === 1) {
		outputText.insertAdjacentHTML("beforeend", "<p>What is it with you and this room, " + player.name + "? You are back in the bedroom.</p>");
	} else {
		outputText.insertAdjacentHTML("beforeend", "<p>You. Bedroom. <em>Again.</em></p>");
	}
	locBedroom.iteration++;
	updateScroll();
}

function enterForest () {
	whereAmI = "forest";
	let i = locForest.iteration;
	if (i === 0) {
		outputText.insertAdjacentHTML("beforeend", "<p>Directly outside the door to your bedroom, you find yourself in the middle of a dense, dark forest.");
	} else if (i === 1) {
		outputText.insertAdjacentHTML("beforeend", "<p></p>");
	} else if (i === 2) {
		outputText.insertAdjacentHTML("beforeend", "<p></p>");
	} else if (i === 3) {
		outputText.insertAdjacentHTML("beforeend", "<p></p>");
	} else {
		outputText.insertAdjacentHTML("beforeend", "<p></p>");
	}
	locBedroom.iteration++;
	updateScroll();
}

function command(command) {
	if (whereAmI === "bedroom") {
		bedroomCommand(command);
	} else {
	forestCommand(command);
	}
}

function bedroomCommand (command) {
	switch (command) {
		case "forward":
			// setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Sorry, you can't go forward yet, because I haven't programmed the next area. 😬</p><p> That weird squiggle was supposed to be the grimacing emoji, but I guess this font doesn't support emojis.</p> <p> Anyway, perhaps there's more you can do in the bedroom? You know - besides the obvious.</p>"), 500);
			setTimeout(enterForest, 1000);
			updateScroll();
		break;
		case "backward":
			if (locBedroom.bed === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p> I'm not sure you really want to go to bed. But if you really, really do, then you can try again.</p>"), 500);
				locBedroom.bed++;
				updateScroll();
			} else {
				gameOver("bed");
			};
		break;
		case "left":
			if (locBedroom.wallleft === 0 && locBedroom.wallright === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You walked into the wall. You now have a nosebleed.</p>"), 500);
				player.health--;
				locBedroom.wallleft++;
				updateScroll();
			} else if (locBedroom.wallleft === 0 && locBedroom.wallright > 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Okay, now you just walked into the other wall. Perhaps you're not really made for adventure.</p>"), 500);
				player.health--;
				locBedroom.wallleft++;
				updateScroll();
			} else if (locBedroom.wallleft > 0 && player.health > 2) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Seriously, why are you doing that? You're hurting yourself.</p>"), 500);
				player.health--;
				locBedroom.wallleft++;
				updateScroll();
			} else if (locBedroom.wallleft > 0 && player.health === 2) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You are really very badly hurt. Please stop, for the sake of your family.</p>"), 500);
				player.health--;
				locBedroom.wallleft++;
				updateScroll();
			} else if (locBedroom.wallleft > 0 && player.health === 1) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You are going to die. You have to stop doing that!</p>"), 500);
				player.health--;
				locBedroom.wallleft++;
				updateScroll();
			} else {
				gameOver("wall");
			};
		break;
		case "right":
			if (locBedroom.wallright === 0 && locBedroom.wallleft === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You walked into the wall. You now have a nosebleed.</p>"), 500);
				player.health--;
				locBedroom.wallright++;
				updateScroll();
			} else if (locBedroom.wallright > 0 && player.health > 2) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Seriously, why are you doing that? You're hurting yourself.</p>"), 500);
				player.health--;
				locBedroom.wallright++;
				updateScroll();
			} else if (locBedroom.wallright === 0 && locBedroom.wallleft > 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Okay, now you just walked into the other wall. Perhaps you're not really made for adventure.</p>"), 500);
				player.health--;
				locBedroom.wallright++;
				updateScroll();
			} else if (locBedroom.wallright > 0 && player.health === 2) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You are really very badly hurt. Please stop, for the sake of your family.</p>"), 500);
				player.health--;
				locBedroom.wallright++;
				updateScroll();
			} else if (locBedroom.wallright > 0 && player.health === 1) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You are going to die. You have to stop doing that!</p>"), 500);
				player.health--;
				locBedroom.wallright++;
				updateScroll();
			} else {
				gameOver("wall");
			};
		break;
		case "attack":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>There is nothing to attack.</p>"), 500);
			updateScroll();
		break;
		case "search":
			if (locBedroom.searchable === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You search the room. There isn't much here, but in the nightstand you find a single condom. You eye it suspiciously, wondering how long it's been there.</p>"), 500);
				locBedroom.searchable = 1;
				updateScroll();
			} else {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You have already searched this room. There is nothing more to find.</p>"), 500);
				updateScroll();
			}
		break;
		case "pickup":
			if (locBedroom.searchable === 0) {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You can't see anything obvious to pick up. Perhaps you should search the room, first.</p>"), 500);
				updateScroll();
			} else if (locBedroom.searchable === 1 && locBedroom.item === "") {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>There is nothing else to pick up.</p>"), 500);
				updateScroll();
			} else {
				setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You pick up the condom.</p>"), 500);
				locBedroom.item = "";
				inventory.push("condom");
				updateScroll();
				updateInventory();
			}
		break;
	};
};

function forestCommand (command) {
	switch (command) {
		case "forward":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>Sorry, you can't go forward yet, because I haven't programmed the next area. 😬</p>"), 500);
			updateScroll();
		break;
		case "backward":
			setTimeout(enterBedroom, 1000);
			updateScroll();
		break;
		case "left":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You can't go left yet. I ain't written that bit.</p>"), 500);
		break;
		case "right":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>You can't go right yet. I ain't written that bit.</p>"), 500);
		break;
		case "attack":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>There is nothing to attack.</p>"), 500);
			updateScroll();
		break;
		case "search":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>There is nothing to search.</p>"), 500);
		break;
		case "pickup":
			setTimeout(outputText.insertAdjacentHTML("beforeend", "<p>There is nothing to pick up</p>"), 500);

		break;
	}
}