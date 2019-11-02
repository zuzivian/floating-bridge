
export default class CardUtils {

  // generate a list of list of cards, randomly shuffled
  generateHands() {
    let cards = this.generateCards();
    let hands = [];

    for (let i=0; i < 4; i++) {
      let hand = cards.slice(i*13,(i+1)*13);
      hand.sort((a,b) => { return a.suit*13+a.rank > b.suit*13+b.rank });
      hands.push(hand);
    }
    return hands;
  }

  // generate a deck of 52 cards
  // shuffle cards and deal, sorted, to the 4 players
  generateCards() {
    let cards = [];

    for (let i=0; i < 4; i++) {
      for (let j = 2; j < 15; j++) {
        cards.push({ rank: j, suit: i });
      }
    }
    return this.shuffle(cards);
  }

  // shuffles an array of objects
  shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // selects a random card from a list of cards
  selectRandom(cards) {
    let index = Math.floor(Math.random()*cards.length);
    return cards[index];
  }

  getAllCardsInSuit(cards, suit) {
    suit_cards = [];
    for (let i=0; i < cards.length; i++) {
      if (cards[i].suit === suit) {
        suit_cards.push(cards[i]);
      }
    }
    suit_cards.sort(function(a,b) {return a.rank - b.rank});
    return suit_cards;
  }

  getBottomCardInSuit(cards, suit) {
    let suit_cards = this.getAllCardsInSuit(cards, suit);
    if (!suit_cards.length) return null;
    return suit_cards[0];
  }

  getTopCardInSuit(cards, suit) {
    let suit_cards = this.getAllCardsInSuit(cards, suit);
    if (!suit_cards.length) return null;
    return suit_cards[suit_cards.length-1];
  }

  getCardsPlayedInSuit(tricks, suit) {
    cards_played = [];
    for (let i = 0; i < tricks.length; i++) {
      for(let j = 0; j < tricks[i].length; j++) {
        if (tricks[i][j].suit === suit) cards_played.push(tricks[i][j]);
      }
    }
    cards_played.sort(function(a,b) {return a.rank - b.rank});
    return cards_played;
  }

  isHighestRemainingInSuit(card, tricks, suit) {
    let cards_played = this.getCardsPlayedInSuit(tricks, suit);
    // Ace not out yet
    if (card.rank == 14) return true;
    if (cards_played.length && cards_played[cards_played.length - 1].rank != 14) return false;

    let best_unplayed_rank = 14;
    for (var i = cards_played.length - 1; i > 0; i--) {
      best_unplayed_rank--;
      if (cards_played[i].rank - cards_played[i-1].rank != 1) break;
    }
    return card.rank >= best_unplayed_rank;
  }

  selectDiscard(hand) {
    let discards = [];
    for (let i=0; i < 4; i++) {
      let worst = this.getBottomCardInSuit(hand, i);
      if (worst != null) discards.push(worst);
    }
    discards.sort(function(a,b) {return a.rank - b.rank});
    return discards[0];
  }

  // selects the optimzied card to play at this point of the game
  selectBest(hand, trick, tricks, trump_suit) {

    // TODO: implement trump mechanism

    // if hand is empty
    if (!hand.length) return null;

    // pick random (or top) card if leading
    // possibly top trump card if already broken
    if (!trick.length) {
      // choose a sure winner, if any
      for (let i = 0; i < 4; i++) {
        let top_suit_card = this.getTopCardInSuit(hand, i);
        if (top_suit_card && this.isHighestRemainingInSuit(top_suit_card, tricks, i)) {
          return top_suit_card;
        }
      }
      // discard card
      return this.selectDiscard(hand);
    }

    //get leading trick/suit card info
    let leading_suit = trick[0].suit;
    let suit_cards = this.getAllCardsInSuit(hand, leading_suit);
    let top_suit_card = this.getTopCardInSuit(hand, leading_suit);
    let bottom_suit_card = this.getBottomCardInSuit(hand, leading_suit);

    if (!suit_cards.length) {
      // cannot follow suit, discard.
      // TODO: add trump option
      return this.selectDiscard(hand);
    }


    // last player, play good card if possible
    if (trick.length === 3) {
      let top_trick_card = this.getTopCardInSuit(trick, leading_suit);
      for (let i = 0; i < suit_cards.length; i++) {
        if (suit_cards[i].rank > top_trick_card.rank) return suit_cards[i];
      }
    }
    // play best card if possible
    if (this.isHighestRemainingInSuit(top_suit_card, tricks, leading_suit)) {
      return top_suit_card;
    }
    // give up, just play lowest card in suit
    return bottom_suit_card;
  }

  // removes the specified card from a listof listof cards
  removeCardFromHand(card, hands) {
    let player, index;
    for (player = 0; player < hands.length; player++) {
      index = hands[player].findIndex(c => { return c === card });
      if (index !== -1) break;
    }
    hands[player].splice(index, 1);
    return hands;
  }

}
