// Gotta create a players object.  This object will hold a name and a score.  Object
// is made with a function that loops through an argument and for each i we create the player object and push it to an array.
// Need functions for: creating a deck, shuffling a deck, dealing cards, summing up hand totals,
// hitting, staying, updating points, declaring a winner.  Restart the game using the same deck.


var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = []
var players = []

function createPlayers(num){
	hand = []
	for(i=0; i<=num; i++){
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
                     weight = 11;
              var card = { Value: cards[x], Suit: suits[i], Weight: weight };
              deck.push(card);
		}
	}

	return deck;
}

function deal(){
	// remove top card from deck
	var card = deck[deck.length-1];
	deck.splice(deck.length-1, 1);
	return card;
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

function dealHands()
    {
        // alternate handing cards to each player
        // 2 cards each
        for(var i = 0; i < 2; i++)
        {
            for (var x = 0; x < players.length; x++)
            {
                var card = deck.pop();
                players[x].Hand.push(card);
                renderCard(card, x);
                updatePoints();
            }
        }

        updateDeck();
    }

