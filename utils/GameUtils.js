
export default class GameUtils {

  isMoveLegal(card, trick, hand) {
    if (!trick || trick.length === 0)
      return true;
    return card.suit === trick[0].suit || !this.hasSuitInHand(trick[0], hand);
  }

  getTrickWinner(trick) {
    // works for no trump only
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

  getTrickWinners(tricks) {
    let scores = [0,0,0,0];
    let prevWinner = 0;
    for (let i=0; i< tricks.length; i++) {
      let trickWin = this.getTrickWinner(tricks[i]);
      let winner = (trickWin + prevWinner) % 4;
      prevWinner = winner;
      scores[winner]++;
    }
    return scores;
  }

  hasSuitInHand(card, hand) {
    for (let i=0; i < hand.length; i++) {
      if (hand[i].suit === card.suit) return true;
    }
    return false;
  }

}
