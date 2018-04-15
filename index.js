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
	createPlayers(2)
	getDeck()
	shuffle()
	deal()
	checkScore()
}

function createPlayers(num){
	for(i=1; i<=num; i++){
		hand = new Array
		var player = {name: "player" + i, hand: hand, score: 0}
		players.push(player)
		if(player.name == "player1"){
			player.name = "Dealer"
		}
		if(player.name == "player2"){
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
                     weight = 11;
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
}

function checkScore(){
	for(i=0; i<players.length; i++){
		var holder_i = new Array
		for(s=0; s<players[i].hand.length; s++){
			holder_i.push(players[i].hand[s].Weight)  
		}
		players[i].score = holder_i.reduce(add, 0)
		if(players[i].score > 21){
			endCheck()
		}
	}

}

function add(a, b) {
    return a + b;
}

function hitPlayer(){
		card = deck.pop()
		players[1].hand.push(card)
		checkScore()
}

function hitDealer(){
	while(players[0].score < 17){
		card = deck.pop()
		players[0].hand.push(card)
		checkScore()
	}
	endCheck()
}

function stay(){
	hitDealer()

}

function endCheck(){
	if(players[1].score > 21){
		console.log(players[1].name + " " + "busted")
		end()
	}
	else if(players[0].score > 21){
		console.log(players[0].name + " " + "busted")
		end()
	}else {
		if(players[0].score > players[1].score){
			console.log("The Dealer Wins")
			end()
		}
		if(players[1].score > players[0].score){
			console.log("Player Wins!")
			end()
		}
		if(players[1].score == players[0].score){
			console.log("It's a push!")
			end()
		}
	}
}

function end(){
	for(i = 0; i<players.length; i++){
		players[i].score = 0
		players[i].hand.length = 0
	}
	deal()
	checkScore()
}

function renderDeck(){
	
	for(var i = 0; i < deck.length; i++){
		
		var card = document.createElement("div");
		var value = document.createElement("div");
		var suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("deck").appendChild(card);
	}
}

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


