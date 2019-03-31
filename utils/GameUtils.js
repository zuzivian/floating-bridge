
export default class GameUtils {

  isMoveLegal(card, trick) {
    //TODO: implement
    if (!trick || trick.length === 0)
      return true;
    return card.suit === trick[0].suit;
  }

}
