
export default class GameUtils {

  isMoveLegal(card, trick, hand) {
    if (!trick || trick.length === 0)
      return true;
    return card.suit === trick[0].suit || !this.hasSuitInHand(trick[0], hand);
  }

  getTrickWinner(trick) {
    let winningIndex = 0;
    let winningCard = trick[0];
    for (let i=1; i<trick.length; i++) {
      if (trick[i].suit === winningCard.suit && trick[i].rank > winningCard.rank) {
        winningIndex = i;
        winningCard = trick[i];
      }
    }
    return winningIndex;
  }

  hasSuitInHand(card, hand) {
    for (let i=0; i < hand.length; i++) {
      if (hand[i].suit === card.suit) return true;
    }
    return false;
  }

}
