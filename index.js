// Gotta create a players object.  This object will hold a name and a score.  Object
// is made with a function that loops through an argument and for each i we create the player object and push it to an array.
// Need functions for: creating a deck, shuffling a deck, dealing cards, summing up hand totals,
// hitting, staying, updating points, declaring a winner.  Restart the game using the same deck.


var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = []
var players = []
var activePlayer = 1

function startGame(){
	createPlayers(1)
	getDeck()
	shuffle()
	deal()
	console.log([players[0].score, players[1].score])
}

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
	
	for (var i = 0; i < 1000; i++){
		
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
	
}

function shuffleCheck(){
	if(deck.length <= 10){
		deck.length = 0
		getDeck()
		shuffle()
	}
}

function deal(){
	card1 = deck.pop()
	card2 = deck.pop()
	card3 = deck.pop()
	card4 = deck.pop()

	players[0].hand.push(card1)
	players[0].hand.push(card2)
	players[1].hand.push(card3)
	players[1].hand.push(card4)
	shuffleCheck()
	checkScore()
	console.log([players[0].score, players[1].score])
}

function checkScore(){
	var card1 = players[0].hand[0].Weight
	var card2 = players[0].hand[1].Weight
	var card3 = players[1].hand[0].Weight
	var card4 = players[1].hand[1].Weight

	players[0].score = card1 + card2
	players[1].score = card3 + card4
	blackjack()

	return [players[0].score, players[1].score]

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
	return players[1].score
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
	return players[1].score2
	splitBustCheck()
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
	return players[0].score
	checkForBust()
}


function add(a, b) {
    return a + b;
}

function hitPlayer(){
	card = deck.pop()
	players[1].hand.push(card)
	updatePly()
	console.log(players[1].score)
	if(players[1].score > 21){
	checkForBust()
	}
}

function hitDealer(){
	while(players[0].score < 17 && players[0].score > 0){
		card = deck.pop()
		players[0].hand.push(card)
		updateDlr()
	}
	checkForWinner()
}

function stay(){
	hitDealer()

}
function blackjack(){
	var blackjack = false
	if(players[0].hand[0].Value == "J" || "Q" || "K"){
		if(players[0].hand[1].Value == "A"){
			console.log(players[0].name + " has blackjack")
			blackjack = true
			console.log(players[0].hand)
		}
	}
	if(players[0].hand[0].Value == "A"){
		if(players[0].hand[1].Value == "J" || "Q" || "K"){
			console.log(players[0].name + " has blackjack")
			blackjack = true
			console.log(players[0].hand)
			}
		}
	if(players[1].hand[0].Value == "J" || "Q" || "K"){
		if(players[1].hand[1].Value == "A"){
			console.log(players[1].name + " has blackjack")
			blackjack = true
			console.log(players[1].hand)
		}
	}
	if(players[1].hand[0].Value == "A"){
		if(players[1].hand[1].Value == "J" || "Q" || "K"){
			console.log(players[1].name + " has blackjack")
			blackjack = true
			console.log(players[1].hand)
			}
	}

	if(blackjack == true){
		end()
	}
	

}
function checkForBust(){
	for(i=0; i<players.length; i++){
		if(players[i].score > 21){
			console.log(players[i].name + " " + "has busted")
			end()

		}
	}
}
function checkForWinner(){
	if(players[0].score > 21){
		checkForBust()
	}else if(players[0].score > players[1].score){
		console.log("Dealer Wins")
		end()
	}else if(players[1].score > players[0].score){
		console.log("Player Wins")
		end()
	}else{
		checkForPush()
	}
}

function checkForPush(){
	if(players[0].score && players[1].score != 0 && players[0].score == players[1].score ){
			console.log("It's a push")
			end()	
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
		end()
	}

}



function checkForSplit(){
	var split = false
	if(players[1].hand[0].Value == players[1].hand[1].Value){
		split = true
		players[1].hand.length = 1
		players[1].hand2 = []
		players[1].hand2.push(players[1].hand[0])
		players[1].score = players[1].hand[0].Weight
		players[1].score2 = players[1].hand2[0].Weight
	}
	console.log([players[1].score, players[1].score2])
}



function end(){
	for(i = 0; i<players.length; i++){
		players[i].score = 0
		players[i].hand.length = 0
	}
	deal()
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


