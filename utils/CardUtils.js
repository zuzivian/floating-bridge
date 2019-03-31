
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

  selectRandom(hand) {
    let index = Math.floor(Math.random()*hand.length);
    return hand[index];
  }

}
