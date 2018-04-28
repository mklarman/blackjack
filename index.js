
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = []
var players = []
var counter = 0
var playerWin = 0
var dealerWin = 0
var winCounter = 0


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
var playerPoints2 = document.getElementById("playerPoints2")
var dealerCards = document.getElementById("dealerCards")
var dblDown2 = document.getElementById("dblDown2")
var theCount = document.getElementById("theCount")
var winStreak = document.getElementById("winStreak")

playerPoints2.style.display = "none"
secondHand.style.display = "none"
hitPlr2.style.display = "none"
hitPlr.style.display = "none"
plrStay.style.display = "none"
plrStay2.style.display = "none"
dblDown.style.display = "none"
dealCards.style.display = "none"
splitP.style.display = "none"
dblDown2.style.display = "none"

playerWins.innerHTML = playerWin
dealerWins.innerHTML = dealerWin
theCount.innerHTML = counter


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
	counter = 0
	
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
	players[1].score2 = 0
	playerPoints2.style.display = "none"
	hitCounter = 0
	dealCards.style.display = "none"
	hitPlr.style.display = "block"
	plrStay.style.display = "block"
	dblDown.style.display = "block"
	dblDown2.style.display = "none"
	secondHand.style.display = "none"
	plrStay2.style.display = "none"
	hitPlr2.style.display = "none"
	splitP.style.display = "none"

	if(deck.length < 15){
		shuffleCheck()
	}

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

	if(winCounter > 2){
		hotStreak()
	}else{

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
	countDeck(card1)
	countDeck(card2)
	countDeck(card3)
	countDeck(card4)
	checkForSplit()
	checkScore()
	deckCount.innerHTML = deck.length
	console.log([players[0].score, players[1].score])
	}

}

function hotStreak(){
	card1 = deck.pop()
	card2 = deck.pop()
	players[0].hand.push(card1)
	players[0].hand.push(card2)
	updateDlr()
	var card1Points = 0
	var card2Points = 0

	while(players[1].score < 18){
		card3 = deck.pop()
		card4 = deck.pop()
		if(card3.Value == "A" && card4.Value == "A"){
			card1Points = card3.Weight[1]
			card2Points = card4.Weight[0]
			players[1].score = card1Points + card2Points
		}else if(card3.Value == "A"){
			card1Points = card3.Weight[1]
			card2Points = card4.Weight
			players[1].score = card1Points + card2Points
		}else if(card4.Value == "A"){
			card1Points = card3.Weight
			card2Points = card4.Weight[1]
			players[1].score = card1Points + card2Points
		}else{
			card1Points = card3.Weight
			card2Points = card4.Weight
			players[1].score = card1Points + card2Points
		}	
	}

	players[1].hand.push(card3)
	players[1].hand.push(card4)
	playerPoints.innerHTML = players[1].score
	renderPlayer()
	renderDealer()
	countDeck(card1)
	countDeck(card2)
	countDeck(card3)
	countDeck(card4)
	checkForSplit()
	deckCount.innerHTML = deck.length
}

function checkScore(){
	var card1 = players[0].hand[0]
	var card2 = players[0].hand[1]
	var card3 = players[1].hand[0]
	var card4 = players[1].hand[1]
	if(card2.Value == "A" && card1.Value == "A" ){
		card1 = players[0].hand[0].Weight[1]
		card2 = players[0].hand[1].Weight[0]
	}else if(card1.Value == "A"){
		card1 = players[0].hand[0].Weight[1]
		card2 = players[0].hand[1].Weight
	}else if(card2.Value == "A"){
		card2 = players[0].hand[1].Weight[1]
		card1 = players[0].hand[0].Weight
	}else{
		card2 = players[0].hand[1].Weight
		card1 = players[0].hand[0].Weight
	}
	if(card4.Value == "A" && card3.Value == "A"){
		card3 = players[1].hand[0].Weight[1]
		card4 = players[1].hand[1].Weight[0]
	}else if(card3.Value == "A"){
		card3 = players[1].hand[0].Weight[1]
		card4 = players[1].hand[1].Weight
	}else if(card4.Value == "A"){
		card4 = players[1].hand[1].Weight[1]
		card3 = players[1].hand[0].Weight
	}else{
		card3 = players[1].hand[0].Weight
		card4 = players[1].hand[1].Weight
	}
	console.log([card1, card2, card3, card4])
	
	players[0].score = card1 + card2
	players[1].score = card3 + card4
	dealerPoints.innerHTML = card1
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
	playerPoints.innerHTML = players[1].score
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
		for(i=0; i<acesP2.length; i++){
			if(acesP2[i][1] + pointsP2 <= 21){
				pointsP2 = acesP2[i][1] + pointsP2
			}else{
				pointsP2 = acesP2[i][0] + pointsP2
			}
		}

	}
	players[1].score2 = pointsP2
	playerPoints2.innerHTML = players[1].score2

	if(players[1].hand2.length > 2){
		checkForBust2()
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
	dealerPoints.innerHTML = players[0].score
}


function add(a, b) {
    return a + b;
}

function hitPlayer(){
	if(players[1].hand.length > 1){
		dblDown.style.display = "none"
	}
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
	countDeck(card)
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand.push(card)
	playerCards.appendChild(cardHolder)
	updatePly()
	checkForBust()
	if(players[1].score > 21 && players[1].score2 !== 0){
		hitPlr2.style.display = "block"
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		plrStay2.style.display = "block"
		dblDown2.style.display = "block"
	}
}


function hitPlayer2(){
	dblDown.style.display = "none"
	if(players[1].hand2.length < 2){
		dblDown2.style.display = "block"
	}else{
		dblDown2.style.display = "none"
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
	countDeck(card)
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand2.push(card)
	secondHand.appendChild(cardHolder)
	updatePly2()
	if(players[1].score2 > 21){
	checkForBust2()
	}
}

function splitDoubleCard(){
	dblDown2.style.display = "none"
	var cardHolder = document.createElement("div") 
	cardHolder.setAttribute("class", "renCards")
	cardHolder.style.height = '149px'
	cardHolder.style.width = '149px'
	cardHolder.style.border = '1px solid red'
	cardHolder.style.display = 'inline-block'
	cardHolder.style.fontSize = '23px'
	cardHolder.style.textAlign = 'center'
	card = deck.pop()
	countDeck(card)
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand2.push(card)
	secondHand.appendChild(cardHolder)
	updatePly2()

	if(players[1].score2 > 21){
		
		checkForBust2()
	
	}else{
	
		stay2()
	
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
		countDeck(card)
		deckCount.innerHTML = deck.length
		cardHolder.innerHTML = card.Value + card.Suit
		console.log(card)
		players[0].hand.push(card)
		updateDlr()
		dealerCards.appendChild(cardHolder)
	}
	if(players[0].score > 21){
		checkForBust()
	}
	checkForPush()
	checkForWinner()
	
	if(players[1].score2 !== 0){
		checkForBust2()
		checkForPush2()
		checkForWinnerSplit()
	}
}
	

function stay(){
	if(players[1].hand2){
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		hitPlr2.style.display = "block"
		plrStay2.style.display = "block"
	}else{
		renderedCardsD2.style.background = "white"
	hitDealer()
	}

}

function stay2(){
	renderedCardsD2.style.background = "white"
	hitDealer()
}

function doubleDown(){
	dblDown.style.display = "none"
	var cardHolder = document.createElement("div") 
	cardHolder.setAttribute("class", "renCards")
	cardHolder.style.height = '149px'
	cardHolder.style.width = '149px'
	cardHolder.style.border = '1px solid red'
	cardHolder.style.display = 'inline-block'
	cardHolder.style.fontSize = '23px'
	cardHolder.style.textAlign = 'center'
	card = deck.pop()
	countDeck(card)
	deckCount.innerHTML = deck.length
	cardHolder.innerHTML = card.Value + card.Suit
	players[1].hand.push(card)
	updatePly()
	playerCards.appendChild(cardHolder)
	
	if(players[1].score > 21){
	checkForBust()
	}else{
	stay()
	}

}

function blackjack(){

	if(players[1].score == 21 && players[0].score == 21){
		console.log("It's a push")
		checkForPush()
	}else if(players[1].score == 21){
		checkForWinner()
		console.log("Player has blackjack!")
	}else if(players[0].score == 21){
		checkForWinner()
		console.log("Dealer has blackjack!")
	}else{
		console.log("No blackjack")
	}

}

function checkForBust(){
	if(players[0].score > 21){
		dealCards.style.display = "block"
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		dblDown.style.display = "none"
		playerWin++
		winCounter++
		winStreak.innerHTML = winCounter
		playerWins.innerHTML = playerWin
		console.log("Dealer Busted")
	}else if(players[1].score > 21){
		dealCards.style.display = "block"
		hitPlr.style.display = "none"
		plrStay.style.display = "none"
		dblDown.style.display = "none"
		playerWin--
		winCounter = 0
		winStreak.innerHTML = winCounter
		playerWins.innerHTML = playerWin
		playerWins.innerHTML = playerWin
		console.log("Player Busted")
	}else{
		console.log("No one has busted")
	}
	
}

function checkForBust2(){
	if(players[1].score2 > 21){
		dealCards.style.display = "block"
		hitPlr2.style.display = "none"
		plrStay2.style.display = "none"
		dblDown2.style.display = "none"
		playerWin--
		winCounter = 0
		winStreak.innerHTML = winCounter
		playerWins.innerHTML = playerWin
		playerWins.innerHTML = playerWin
		console.log("Player busts on hand2")
	}else if(players[0].score > 21){
		playerWin++
		winCounter++
		winStreak.innerHTML = winCounter
		playerWins.innerHTML = playerWin
		playerWins.innerHTML = playerWin
		console.log("Dealer busts vs hand2")
	}
	
}

function checkForWinner(){
	dealCards.style.display = "block"
	hitPlr.style.display = "none"
	plrStay.style.display = "none"
	dblDown.style.display = "none"

	if(players[0].score < 22 && players[1].score < 22){
		if(players[0].score > players[1].score){
			playerWin--
			winCounter = 0
			winStreak.innerHTML = winCounter
			playerWins.innerHTML = playerWin
			playerWins.innerHTML = playerWin
			console.log("Dealer Wins")
		}else if(players[0].score < players[1].score){
			playerWin++
			winCounter++
			winStreak.innerHTML = winCounter
			playerWins.innerHTML = playerWin
			playerWins.innerHTML = playerWin
			console.log("Player Wins")
		}else{
			checkForPush()
		}

	}

	
}

function checkForWinnerSplit(){
	dealCards.style.display = "block"
	hitPlr.style.display = "none"
	hitPlr2.style.display = "none"
	plrStay.style.display = "none"
	plrStay2.style.display = "none"
	dblDown.style.display = "none"
	dblDown2.style.display = "none"

	if(players[0].score < 22 && players[1].score2 < 22){
		if(players[0].score > players[1].score2){
			playerWin--
			winCounter = 0
			winStreak.innerHTML = winCounter
			playerWins.innerHTML = playerWin
			playerWins.innerHTML = playerWin
			console.log("Dealer wins hand 2")
		}else if(players[0].score < players[1].score2){
			playerWin++
			winCounter++
			winStreak.innerHTML = winCounter
			playerWins.innerHTML = playerWin
			playerWins.innerHTML = playerWin
			console.log("Player Wins Hand 2")
		}else{
			checkForPush2()
		}
		
	}

}

function checkForPush(){
	if(players[0].score && players[1].score != 0 && players[0].score == players[1].score ){
			console.log("It's a push")	
	}
}

function checkForPush2(){

	if(players[0].score && players[1].score2 != 0 && players[0].score == players[1].score2 ){
			console.log("It's a push on hand2")	
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
	}
}

function splitCards(){
	splitP.style.display = "none"
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
	secondHand.style.display = "block"
	playerPoints2.style.display = "block"
	secondHand.appendChild(newHand)
	splitHandScore()

	playerPoints2.innerHTML = players[1].score2
	playerPoints.innerHTML = players[1].score

}

function splitHandScore(){
	
	if(players[1].hand2[0].Value == "A"){
	players[1].score2 = players[1].hand2[0].Weight[1]
	}else{
		players[1].score2 = players[1].hand2[0].Weight
	}

	if(players[1].hand[0].Value == "A"){
		players[1].score = players[1].hand[0].Weight[1]
	}else{
		players[1].score = players[1].hand[0].Weight
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

var renderedCardsD1 = document.createElement("div")
renderedCardsD1.style.height = '149px'
renderedCardsD1.style.width = '149px'
renderedCardsD1.style.border = '1px solid red'
renderedCardsD1.style.display = 'inline-block'
renderedCardsD1.style.fontSize = '23px'
renderedCardsD1.style.textAlign = 'center'

var renderedCardsD2 = document.createElement("div")
renderedCardsD2.style.height = '149px'
renderedCardsD2.style.width = '149px'
renderedCardsD2.style.border = '1px solid red'
renderedCardsD2.style.display = 'inline-block'
renderedCardsD2.style.fontSize = '23px'
renderedCardsD2.style.textAlign = 'center'

function renderDealer(){
	for(i=0; i<players[0].hand.length; i++){
		renderedCardsD1.innerHTML = players[0].hand[0].Value + players[0].hand[0].Suit
		renderedCardsD2.innerHTML = players[0].hand[1].Value + players[0].hand[1].Suit
		dealerCards.appendChild(renderedCardsD1)
		dealerCards.appendChild(renderedCardsD2)
		renderedCardsD2.style.background = "black"

	}

}

function countDeck(card){
	if(card.Value == "2"){
		counter++
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "3"){
		counter++
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "4"){
		counter++
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "5"){
		counter++
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "6"){
		counter++
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "10"){
		counter--
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "J"){
		counter--
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "Q"){
		counter--
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "K"){
		counter--
		theCount.innerHTML = counter
		console.log(card.value)
	
	}else if(card.Value == "A"){
		counter--
		theCount.innerHTML = counter
		console.log(card.value)
	}else{
		theCount.innerHTML = counter
	}

}



// function splitHit(){
// 	card = deck.pop()
// 	players[1].hand2.push(card)
// 	updatePly2()
// 	}else{
// 		players[1].hand.push(card)
// 		updatePly()
// 	}

// }



// function checkForWinnerSplit2(){
// 	if(players[0].score > 21){
// 		playerWin++
// 		dealerWin--
// 		playerWins.innerHTML = playerWin
// 		dealerWins.innerHTML = dealerWin
// 		console.log("Player Wins Hand2")
// 	}else if(players[1].score2 > 21){
// 		dealerWin++
// 		playerWin--
// 		playerWins.innerHTML = playerWin
// 		dealerWins.innerHTML = dealerWin
// 		console.log("Player busts on hand2")
// 	}else if(players[0].score < 22 && players[0].score > players[1].score2){
// 		dealerWin++
// 		playerWin--
// 		playerWins.innerHTML = playerWin
// 		dealerWins.innerHTML = dealerWin
// 		console.log("Dealer wins hand2")
// 	}else if(players[0].score < 22 && players[0].score < players[1].score2){
// 		playerWin++
// 		dealerWin--
// 		playerWins.innerHTML = playerWin
// 		dealerWins.innerHTML = dealerWin
// 		console.log("Player wins hand2")
// 	}else{
// 		checkForPush2()
// 	}

// 	splitP.style.display = "none"

// }

// function cardCheck(value){
//       return (array.indexOf(value) === -1) ? false : true   
//     }

// function end(){
// 	for(i = 0; i<players.length; i++){
// 		players[i].score = 0
// 		players[i].hand.length = 0
// 	}
// 	deal()
// }

// function end2(){
	
// }

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


