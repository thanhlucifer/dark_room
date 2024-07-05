class ListChosen {
    constructor() {
        this.chosenItems = [];
    }

    addChosenItem(item) {
        // Remove any existing item of the same type
        this.chosenItems = this.chosenItems.filter(chosenItem => chosenItem.type !== item.type);
        this.chosenItems.push(item);
    }

    getChosenItems() {
        return this.chosenItems;
    }
}


