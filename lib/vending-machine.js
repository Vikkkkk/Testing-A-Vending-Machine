class VendingMachine {
  constructor(content) {
    this.coinBox = content.coinBox;
    this.inventory = content.inventory;
    this.userCredit = null;
    this.userItemSeletion = null;
  }

  userInput(credit) {
    this.userCredit = credit;
    return this.userCredit;
  }

  userSelection(input) {
    const selectedItem = this.inventory.find(item => item.ItemCode === input);
    if (!selectedItem) {
      throw new Error("Invalid ItemCode");
    }
    return selectedItem.ItemName;
  }

  getInventory() {
    const printedInventory = this.inventory.map(item => {
      return `${item.ItemName}: Itemcode: ${item.ItemCode},Price ${
        item.ItemPrice
      }, quantity: ${item.ItemQuantity}`;
    });

    return printedInventory;
  }

  verifyPurchase(itemCode, credit) {
    const selectedItem = this.inventory.find(
      item => item.ItemCode === itemCode
    );
    if (!selectedItem) {
      throw "Invalid ItemCode";
    }
    const price = selectedItem.ItemPrice;
    const name = selectedItem.ItemName;
    const change = credit - price;
    let quantity = selectedItem.ItemQuantity;
    console.log(this.calcChange(change));
    const currentChange = JSON.stringify(this.calcChange(change));
    if (change < 0) {
      throw "Insufficient Amount";
    } else if (change === 0) {
      quantity -= 1;
      return `You chose ${name} and paid exact amount, there are ${quantity} left in stock`;
    } else if (change > 0) {
      quantity -= 1;
      return `You chose ${name} and the change is ${currentChange}, there are ${quantity} left in stock`;
    }
  }

  calcChange(totalChange) {
    let centValue = totalChange * 100;
    let quarters = 0;
    let dimes = 0;
    let nickels = 0;
    let toonies = 0;
    let loonies = 0;

    toonies = Math.floor(centValue / 200);
    centValue = centValue - toonies * 200;

    loonies = Math.floor(centValue / 100);
    centValue = centValue - loonies * 100;

    quarters = Math.floor(centValue / 25);
    centValue = centValue - quarters * 25;

    dimes = Math.floor(centValue / 10);
    centValue = centValue - dimes * 10;

    nickels = Math.floor(centValue / 5);
    centValue = centValue - nickels * 5;

    const currentChange = {
      toonies: toonies,
      loonies: loonies,
      quarters: quarters,
      dimes: dimes,
      nickels: nickels
    };

    Object.keys(currentChange).map(cointype => {
      if (this.coinBox[cointype] < currentChange[cointype]) {
        throw "not enough change please insert less money or input exact amount";
      }
    });

    return currentChange;
  }

  updateCoinBox(currentChange) {
    console.log(currentChange);
    Object.keys(currentChange).map(cointype => {
      this.coinBox[cointype] -= currentChange[cointype];
    });
    return this.coinBox;
  }

  restockInventory(itemCode, quantity) {
    const selectedItem = this.inventory.find(
      item => item.ItemCode === itemCode
    );
    if (!selectedItem) {
      throw "Invalid ItemCode";
    }

    selectedItem.ItemQuantity += quantity;
    return `you've restocked ${quantity} more ${
      selectedItem.ItemName
    }, now you have ${selectedItem.ItemQuantity}`;
  }

  restockCoinBox(coins) {
    Object.keys(coins).map(cointype => {
      this.coinBox[cointype] += coins[cointype];
    });

    return this.coinBox;
  }

  dispenseItem(itemCode) {
    const selectedItem = this.inventory.find(
      item => item.ItemCode === itemCode
    );
  }
} //
module.exports = VendingMachine;
