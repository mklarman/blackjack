// Gotta create a players object.  This object will hold a name and a score.  Object
// is made with a function that loops through an argument and for each i we create the player object and push it to an array.
// Need functions for: creating a deck, shuffling a deck, dealing cards, summing up hand totals,
// hitting, staying, updating points, declaring a winner.  Restart the game using the same deck.
// split: run a split check on the deal. If card values equal, the function will show the split button.  Put add event listener on submit button.  In that function: split the hand into two hands.  Options on first hand, need a bust check, stay options, hit option, update score function, when stay or bust that hides hand 1 options and shows hand 2 options which has all the same options.  After the player clicks stay on hand 2 is when the dealer draws, when the dealer's score is over 17 but under 21 have to check the score vs both hands of the player, if the dealer busts end the game and clear both hands and both scores 

var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = []
var players = []
var activePlayer = 1

var start = document.getElementById("startGame")
var hitPlr = document.getElementById("hitPlr")
var plrStay = document.getElementById("plrStay")
var splitHand = document.getElementById("splitHand")
var dblDown = document.getElementById("dblDown")
var deckCount = document.getElementById("deckCount")
var dealCards = document.getElementById("dealCards")
var secondHand = document.getElementById("playerCards2")
var hitPlr2 = document.getElementById("hitPlr2")
var plrStay2 = document.getElementById("plrStay2")
var splitP = document.getElementById("splitP")
var playerWins = document.getElementById("playerWins")
var dealerWins = document.getElementById("dealerWins")
var dealerPoints = document.getElementById("dealerPoints")
var playerPoints = document.getElementById("playerPoints")


secondHand.style.display = "none"
hitPlr2.style.display = "none"
hitPlr.style.display = "none"
plrStay.style.display = "none"
plrStay2.style.display = "none"
dblDown.style.display = "none"
dealCards.style.display = "none"
splitP.style.display = "none"

var playerWin = 0
var dealerWin = 0

playerWins.innerHTML = playerWin
dealerWins.innerHTML = dealerWin


function startGame(){
	createPlayers(1)
	getDeck()
	getDeck()
	getDeck()
	getDeck()
	shuffle()
	deckCount.innerHTML = deck.length
	start.style.display = "none"
	dealCards.style.display = "block"
	
}

start.addEventListener("click", function(){
	startGame()
})

hitPlr.addEventListener("click", function(){
	hitPlayer()
})

plrStay.addEventListener("click", function(){
	stay()
})

dblDown.addEventListener("click", function(){
	doubleDown()
})

dealCards.addEventListener("click", function(){
	deal()

})

hitPlr2.addEventListener("click", function(){
	hitPlayer2()

})

plrStay2.addEventListener("click", function(){
	stay2()
})

splitP.addEventListener("click", function(){
	splitCards()
})


function createPlayers(num){
	for(i=0; i<=num; i++){
		hand = new Array
		var player = {name: "player" + i, hand: hand, score: 0}
		players.push(player)
		if(player.name == "player0"){
			player.name = "Dealer"
		}
		if(player.name == "player1"){
			player.name = "Me"
			player.score2 = 0
		}
	}
	return players
}

function getDeck(){

	for(var i = 0; i < suits.length; i++){
		
		for(var x = 0; x < cards.length; x++){
			 
			 var weight = parseInt(cards[x]);
              if (cards[x] == "J" || cards[x] == "Q" || cards[x] == "K")
                      weight = 10;
              if (cards[x] == "A")
                     weight = [1, 11];
              var card = { Value: cards[x], Suit: suits[i], Weight: weight };
              deck.push(card);
		}
	}

	return deck;
}

function shuffle(){
	
	for (var i = 0; i < 3000; i++){
		
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
	dealCards.style.display = "block"
	
}

function shuffleCheck(){
	if(deck.length <= 10){
		deck.length = 0
		getDeck()
		getDeck()
		getDeck()
		getDeck()
		shuffle()
	}
}

function deal(){
	hitCounter = 0
	dealCards.style.display = "none"
	hitPlr.style.display = "block"
	plrStay.style.display = "block"
	dblDown.style.display = "block"
	secondHand.style.display = "none"
	plrStay2.style.display = "none"
	hitPlr2.style.display = "none"
	splitP.style.display = "none"

	for(i = 0; i<players.length; i++){
		players[i].score = 0
		players[i].hand.length = 0
	}

	if(players[1].hand2){
		players[1].hand2.length = 0
		players[1].score2 = 0
	}

	while (playerCards.firstChild) {
    playerCards.removeChild(playerCards.firstChild);
	}

	while (secondHand.firstChild){
		secondHand.removeChild(secondHand.firstChild)
	}

	while (dealerCards.firstChild) {
    dealerCards.removeChild(dealerCards.firstChild);
	}
	shuffleCheck()

	card1 = deck.pop()
	card2 = deck.pop()
	card3 = deck.pop()
	card4 = deck.pop()

	players[0].hand.push(card1)
	players[0].hand.push(card3)
	players[1].hand.push(card2)
	players[1].hand.push(card4)
	renderPlayer()
	renderDealer()
	checkForSplit()
	checkScore()
	deckCount.innerHTML = deck.length
	console.log([players[0].score, players[1].score])

}

function checkScore(){
	var card1 = players[0].hand[0]
	var card2 = players[0].hand[1]
	var card3 = players[1].hand[0]
	var card4 = players[1].hand[1]
	if(card1.Value == "A"){
		card1 = players[0].hand[0].Weight[1]
		console.log(card1)
	}else{
		card1 = players[0].hand[0].Weight
	}
	if(card2.Value == "A" && card1.Value == "A" ){
		card2 = players[0].hand[1].Weight[0]
		console.log(card2)
	}else if(card2.Value == "A"){
		card2 = players[0].hand[1].Weight[1]
	}else{
		card2 = players[0].hand[1].Weight
	}
	if(card3.Value == "A"){
		card3 = players[1].hand[0].Weight[1]
		console.log(card3)
	}else{
		card3 = players[1].hand[0].Weight
	}
	if(card4.Value == "A" && card3.Value == "A"){
		card4 = players[1].hand[1].Weight[0]
		console.log(card4)
	}else if (card4.Value == "A"){
		card4 = players[1].hand[1].Weight[1]
	}else{
		card4 = players[1].hand[1].Weight
	}
	
	players[0].score = card1 + card2
	players[1].score = card3 + card4
	dealerPoints.innerHTML = players[0].score
	playerPoints.innerHTML = players[1].score
	blackjack()

}

function updatePly(){
	acesP = []
	trueCardsP = []
	for(i=0; i<players[1].hand.length; i++){
		if(players[1].hand[i].Value == "A"){
			acesP.push(players[1].hand[i].Weight)
		}else{
			trueCardsP.push(players[1].hand[i].Weight)
		}
	}
	console.log(acesP)
	var pointsP = trueCardsP.reduce(add, 0)
	if(acesP.length == 0){
		players[1].score = pointsP
	}else if(acesP.length == 1){
		if(acesP[0][1] + pointsP <= 21){
			players[1].score = acesP[0][1] + pointsP
		}else{
			players[1].score = acesP[0][0] + pointsP
			}
	}else{
		for(i=0; i<acesP.length; i++)
			if(acesP[i][1] + pointsP <= 21){
				pointsP = acesP[i][1] + pointsP
			}else{
				pointsP = acesP[i][0] + pointsP
			}
			players[1].score = pointsP

	}
	console.log(players[1].score)
	playerPoints.innerHTML = players[1].score
	checkForBust()
}

function updatePly2(){
	acesP2 = []
	trueCardsP2 = []
	for(i=0; i<players[1].hand2.length; i++){
		if(players[1].hand2[i].Value == "A"){
			acesP2.push(players[1].hand2[i].Weight)
		}else{
			trueCardsP2.push(players[1].hand2[i].Weight)
		}
	}
	console.log(acesP2)
	var pointsP2 = trueCardsP2.reduce(add, 0)
	if(acesP2.length == 0){
		players[1].score2 = pointsP2
	}else if(acesP2.length == 1){
		if(acesP2[0][1] + pointsP2 <= 21){
			players[1].score2 = acesP2[0][1] + pointsP2
		}else{
			players[1].score2 = acesP2[0][0] + pointsP2
			}
	}else{
		for(i=0; i<acesP2.length; i++)
			if(acesP2[i][1] + pointsP2 <= 21){
				pointsP2 = acesP2[i][1] + pointsP2
			}else{
				pointsP2 = acesP2[i][0] + pointsP2
			}
			players[1].score2 = pointsP2

	}
}

function updateDlr(){
	aces = []
	trueCards = []
	for(i=0; i<players[0].hand.length; i++){
		if(players[0].hand[i].Value == "A"){
			aces.push(players[0].hand[i].Weight)
		}else{
			trueCards.push(players[0].hand[i].Weight)
		}
	}
	var points = trueCards.reduce(add, 0)
	if(aces.length == 0){
		players[0].score = points
	}else if(aces.length == 1){
		if(aces[0][1] + points <= 21){
			players[0].score = aces[0][1] + points
		}else{
			players[0].score = aces[0][0] + points
			}
	}else{
		for(i=0; i<aces.length; i++)
			if(aces[i][1] + points <= 21){
				points = aces[i][1] + points
			}else{
				points = aces[i][0] + points
			}
			players[0].score = points

	}
	console.log(players[0].score)
	dealerPoints.innerHTML = players[0].score
	checkForBust()
}


function add(a, b) {
    return a + b;
}

function hitPlayer(){
	dblDown.style.display = "none"
	splitP.style.dislay = "none"
	var cardHolder = document.createElement("div") 
	cardHolder.setAttribute("class", "renCards")
	cardHolder.style.height = '149px'
	cardHolder.style.width = '149px'
	cardHolder.style.border = '1px solid red'
	cardHolder.style.display = 'inline-block'
	cardHolder.style.fontSize = '23px'
	cardHolder.style.textAlign = 'center'
	card = deck.pop()
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand.push(card)
	updatePly()
	playerCards.appendChild(cardHolder)
	console.log(players[1].score)
	if(players[1].score > 21 && players[1].score2 !== 0){
		hitPlr2.style.display = "block"
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		plrStay2.style.display = "block"
	}else{
		checkForBust()
	}
}

var hitCounter = 0
function hitPlayer2(){
	hitCounter++
	if(hitCounter == 1){
		dblDown.style.display == "none"
	}
	splitP.style.display = "none"
	var cardHolder = document.createElement("div") 
	cardHolder.setAttribute("class", "renCards")
	cardHolder.style.height = '149px'
	cardHolder.style.width = '149px'
	cardHolder.style.border = '1px solid red'
	cardHolder.style.display = 'inline-block'
	cardHolder.style.fontSize = '23px'
	cardHolder.style.textAlign = 'center'
	card = deck.pop()
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand2.push(card)
	updatePly2()
	secondHand.appendChild(cardHolder)
	console.log(players[1].score2)
	if(players[1].score2 > 21){
	checkForBust2()
	}
}

function renderHitForPlr(){
	for(i=2; i<players[1].hand.length; i++){
		var hitCard = document.createElement("div")
		hitCard.setAttribute("class", "renCards")
		hitCard.style.height = '149px'
		hitCard.style.width = '149px'
		hitCard.style.border = '1px solid red'
		hitCard.style.display = 'inline-block'
		hitCard.style.fontSize = '23px'
		hitCard.style.textAlign = 'center'
		hitCard.innerHTML = players[1].hand[i].Value + players[1].hand[i].Suit 

	}
}

function hitDealer(){
	while(players[0].score < 17 && players[0].score > 0){
		var cardHolder = document.createElement("div") 
		cardHolder.setAttribute("class", "renCards")
		cardHolder.style.height = '149px'
		cardHolder.style.width = '149px'
		cardHolder.style.border = '1px solid red'
		cardHolder.style.display = 'inline-block'
		cardHolder.style.fontSize = '23px'
		cardHolder.style.textAlign = 'center'
		card = deck.pop()
		deckCount.innerHTML = deck.length
		cardHolder.innerHTML = card.Value + card.Suit
		console.log(card)
		players[0].hand.push(card)
		updateDlr()
		dealerCards.appendChild(cardHolder)
	}
	if(players[1].score2 == 0){
		if(players[0].score > 21){
			checkForBust()
		}else{
			checkForPush()
			checkForWinner()
		}
	}else{
		if(players[0].score > 21){
			checkForBust2()
		}else{
			checkForWinnerSplit()
			checkForWinnerSplit2()
			checkForPush2()
		}
	}
	
}

function stay(){
	if(players[1].hand2){
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		hitPlr2.style.display = "block"
		plrStay2.style.display = "block"
	}else{
	hitDealer()
	}

}

function stay2(){
	hitDealer()
	checkForWinnerSplit()
	checkForWinnerSplit2()
}

function doubleDown(){
	var cardHolder = document.createElement("div") 
	cardHolder.setAttribute("class", "renCards")
	cardHolder.style.height = '149px'
	cardHolder.style.width = '149px'
	cardHolder.style.border = '1px solid red'
	cardHolder.style.display = 'inline-block'
	cardHolder.style.fontSize = '23px'
	cardHolder.style.textAlign = 'center'
	card = deck.pop()
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand.push(card)
	updatePly()
	playerCards.appendChild(cardHolder)
	console.log(players[1].score)
	
	if(players[1].score > 21){
	checkForBust()
	}
	stay()

}

function blackjack(){

	if(players[1].score && players[0].score == 21){
		console.log("It's a push")
		checkForWinner()
	}

	if(players[1].score == 21){
		console.log("Player has blackjack")
		checkForWinner()
	}

	if(players[0].score == 21){
		console.log("Dealer has blackjack")
		checkForWinner()
	}

}

function checkForBust(){
	for(i=0; i<players.length; i++){
		if(players[i].score > 21){
			dealCards.style.display = "block"
			hitPlr.style.display = "none"
			plrStay.style.display = "none"
			dblDown.style.display = "none"
			console.log(players[i].name + " " + "has busted")

		}
		if(players[i].score > 21 && players[i].name == "Dealer"){
			playerWin++
			dealerWin--
			playerWins.innerHTML = playerWin
			dealerWins.innerHTML = dealerWin
		}else{
			dealerWin++
			playerWin--
			playerWins.innerHTML = playerWin
			dealerWins.innerHTML = dealerWin

		}
	}
}

function checkForBust2(){
	if(players[1].score2 > 21){
		console.log("Dealer wins hand2")
		playerWin--
		dealerWin++
	}
	if(players[0].score > 21){
		console.log("Player Wins Hand2")
		playerWin++
		dealerWin--
	}
}

function checkForWinner(){
	dealCards.style.display = "block"
	hitPlr.style.display = "none"
	plrStay.style.display = "none"
	dblDown.style.display = "none"

	if(players[0].score || players[1].score > 21){
		checkForBust()
	}
	if(players[0].score && players[1].score <22){
		if(players[0].score > players[1].score){
			console.log("Dealer Wins")
		}else if(players[0].score < players[1].score){
			console.log("Player Wins")
		}else{
			checkForPush()
		}
	}

	if(players[0].score > 21){
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		checkForBust()
	}else if(players[1].score > 21){
		playerWin--
		dealerWin++
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		checkForBust()

	}else if(players[0].score > players[1].score){
		console.log("Dealer Wins")
		dealerWin++
		playerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
	}else if(players[1].score > players[0].score){
		console.log("Player Wins")
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
	}else{
		checkForPush()
	}
}

function checkForWinnerSplit(){
	dealCards.style.display = "block"
	hitPlr.style.display = "none"
	hitPlr2.style.display = "none"
	plrStay.style.display = "none"
	plrStay2.style.display = "none"
	dblDown.style.display = "none"

	if(players[0].score > 21){
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		checkForBust()
	}else if(players[0].score < 22 && players[0].score > players[1].score){
		dealerWin++
		playerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Dealer Wins hand 1")
	}else if(players[0].score < 22 && players[0].score < players[1].score){
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Player Wins hand 1")
	}else{
		checkForPush()
	}

}

function checkForWinnerSplit2(){
	if(players[0].score > 21){
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Player Wins Hand2")
	}else if(players[1].score2 > 21){
		dealerWin++
		playerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Player busts on hand2")
	}else if(players[0].score < 22 && players[0].score > players[1].score2){
		dealerWin++
		playerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Dealer wins hand2")
	}else if(players[0].score < 22 && players[0].score < players[1].score2){
		playerWin++
		dealerWin--
		playerWins.innerHTML = playerWin
		dealerWins.innerHTML = dealerWin
		console.log("Player wins hand2")
	}else{
		checkForPush2()
	}

	splitP.style.display = "none"

}
function checkForPush(){
	if(players[0].score && players[1].score != 0 && players[0].score == players[1].score ){
			console.log("It's a push")	
	}
}

function checkForPush2(){
	if(players[0].score && players[1].score != 0 && players[0].score == players[1].score ){
			console.log("It's a push on hand1")	
	}

	if(players[0].score && players[1].score2 != 0 && players[0].score == players[1].score2 ){
			console.log("It's a push on hand2")	
	}


}

function splitHit(){
	card = deck.pop()
	if(players[1].score > 21){
		players[1].hand2.push(card)
		updatePly2()
	}else{
		players[1].hand.push(card)
		updatePly()
	}

}

function splitBustCheck(){
	if(players[1].score > 21){
		console.log("You busted on hand 1")
	}
	if(players[1].score2 > 21){
		console.log("you busted on hand 2")
	}

}



function checkForSplit(){
	if(players[1].hand[0].Value == players[1].hand[1].Value){
		splitP.style.display = "block"
		secondHand.style.display = "block"
	}
}

function splitCards(){
	players[1].hand2 = []
	card = players[1].hand.pop()
	players[1].hand2.push(card)
	playerCards.removeChild(playerCards.childNodes[1]);
	var newHand = document.createElement("div")
	newHand.innerHTML = card.Value + card.Suit
	newHand.style.height = '149px'
	newHand.style.width = '149px'
	newHand.style.border = '1px solid red'
	newHand.style.display = 'inline-block'
	newHand.style.fontSize = '23px'
	newHand.style.textAlign = 'center'
	secondHand.appendChild(newHand)
	if(card.Value == "A"){
		players[1].score2 = 11
	}else{
		players[1].score2 = card.Weight
	}

}

function renderPlayer(){
	for(i=0; i<players[1].hand.length; i++){
		renderedCards = document.createElement("div")
		renderedCards.setAttribute("class", "renCards")
		renderedCards.style.height = '149px'
		renderedCards.style.width = '149px'
		renderedCards.style.border = '1px solid red'
		renderedCards.style.display = 'inline-block'
		renderedCards.style.fontSize = '23px'
		renderedCards.style.textAlign = 'center'
		renderedCards.innerHTML = players[1].hand[i].Value + players[1].hand[i].Suit
		playerCards.appendChild(renderedCards)
	}
}

var dealerCards = document.getElementById("dealerCards")
function renderDealer(){
	for(i=0; i<players[0].hand.length; i++){
		renderedCardsD = document.createElement("div")
		renderedCards.setAttribute("class", "renCards")
		renderedCardsD.style.height = '149px'
		renderedCardsD.style.width = '149px'
		renderedCardsD.style.border = '1px solid red'
		renderedCardsD.style.display = 'inline-block'
		renderedCardsD.style.fontSize = '23px'
		renderedCardsD.style.textAlign = 'center'
		renderedCardsD.innerHTML = players[0].hand[i].Value + players[0].hand[i].Suit
		
		dealerCards.appendChild(renderedCardsD)
		

	}

}
function cardCheck(value){
      return (array.indexOf(value) === -1) ? false : true   
    }

function end(){
	for(i = 0; i<players.length; i++){
		players[i].score = 0
		players[i].hand.length = 0
	}
	deal()
}

function end2(){
	
}

// function renderDeck(){
	
// 	for(var i = 0; i < deck.length; i++){
		
// 		var card = document.createElement("div");
// 		var value = document.createElement("div");
// 		var suit = document.createElement("div");
// 		card.className = "card";
// 		value.className = "value";
// 		suit.className = "suit " + deck[i].Suit;

// 		value.innerHTML = deck[i].Value;
// 		card.appendChild(value);
// 		card.appendChild(suit);

// 		document.getElementById("deck").appendChild(card);
// 	}
// }


// 	if(players[0].score && players[1].score <= 21){
// 		console.log([players[0].score, players[1].score])
// 		if(players[0].score && players[1].score !== 0){
// 			if(players[0].score > players[1].score){
// 				console.log("Dealer wins")
// 				end()
// 			}else if(players[1].score > players[0].score){
// 				console.log("Player wins")
// 				end()
// 			}else{
// 				checkForPush()
// 			}
			
			
// 		}

// 	}
// }
// function endCheck(){
// 	console.log(players[0].score)
// 	console.log(players[1].score)
// 	if(players[1].score > 21){
// 		console.log(players[1].name + " " + "busted")
// 		end()
// 	}
// 	else if(players[0].score > 21){
// 		console.log(players[0].name + " " + "busted")
// 		end()
// 	}else {
// 		if(players[0].score > players[1].score){
// 			console.log("The Dealer Wins")
// 			end()
// 		}
// 		if(players[1].score > players[0].score){
// 			console.log("Player Wins!")
// 			end()
// 		}
// 		if(players[1].score == players[0].score){
// 			console.log("It's a push!")
// 			end()
// 		}
// 	}
// }


// function checkScore2(){
// 	players[1].score = players[1].hand[0].Weight + players[1].hand[1].Weight
// 	return players[1].score
// }
// function getScore(){
// 	return [checkScore(), checkScore2()]
// }

// function cardsOne(){
// 	card1 = deck.pop()
// 	card2 = deck.pop()
// 	players[0].hand.push(card1)
// 	players[0].hand.push(card2)
// }
// function dealMe(){
// 	card1 = deck.pop()
// 	card2 = deck.pop()
// 	card3 = deck.pop()
// 	card4 = deck.pop()
// 	players[1].hand.push(card3)
// 	players[1].hand.push(card4)

// }

// function dealHands(){
//         // alternate handing cards to each player
//         // 2 cards each
//         for(var i = 0; i < 2; i++)
//         {
//             for (var x = 0; x < players.length; x++){
//                 var card = deck[deck.length-1];
//                 players[x].hand.push(card);
//                 deck.splice(deck.length-1, 1);
//                 console.log(deck)
//                 // renderCard(card, x);
//                 // updatePoints();
//             }
//         }

//     }
//     function dealer(){
// 	var card;
// 	while(players[0].hand.length<2){
// 		players[0].hand.push(deck.pop())
// 		updateDeck()
// 	}
// 	while(players[1].hand.length<2){
// 		card = deck.pop()
// 		console.log(card)
// 		if(repeat(players[0].hand, card == true)){
// 			deck.splice(index, 1);
// 			card = deck.pop()
// 			players[1].hand.push(card)
// 			updateDeck()
// 		}
		
// 	}

// }
// function getCard(){
// 	card = deck.pop()
// 	return card
// 	console.log(deck.length)
	
// }
// function updateDeck(){
// 	card = deck.pop()
// 	index = deck.indexOf(card)
// 	if (index > -1){
// 		deck.splice(index, 1);
// 	}

// }


