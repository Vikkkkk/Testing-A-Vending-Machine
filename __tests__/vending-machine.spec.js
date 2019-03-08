const VendingMachine = require("../lib/vending-machine");
const inventory = require("../inventory.json");

describe("VendingMachine", () => {
  describe("userInput()", () => {
    beforeEach(() => {
      test.subject = new VendingMachine(inventory);
    });

    describe("when user wants to see inventory ", () => {
      it("should print the current inventory", () => {
        expect(test.subject.getInventory()).toEqual([
          "Original Cheetos: Itemcode: A1,Price 1.75, quantity: 10",
          "Jalepeno Cheetos: Itemcode: A2,Price 2.25, quantity: 10",
          "Jalepeno Lime Cheetos: Itemcode: A3,Price 2.5, quantity: 10",
          "Crunchy Cheetos: Itemcode: B1,Price 3.75, quantity: 10",
          "Flaming Hot Cheetos: Itemcode: B2,Price 1.75, quantity: 10",
          "Xtra Flaming Hot Cheetos: Itemcode: B3,Price 2, quantity: 10",
          "BBQ Cheetos: Itemcode: C1,Price 2.5, quantity: 10",
          "Cheetos Paws: Itemcode: C2,Price 3.15, quantity: 10",
          "Baked Cheetos: Itemcode: C3,Price 1.75, quantity: 10",
          "Vegan Cheetos: Itemcode: D1,Price 2, quantity: 10",
          "White Chedder Cheetos: Itemcode: D2,Price 2.5, quantity: 10",
          "Chipotle Ranch Cheetos: Itemcode: D3,Price 3.15, quantity: 10"
        ]);
      });
    });
    describe("when user put 5 dollar in ", () => {
      it("should return 5 dollar credit", () => {
        expect(test.subject.userInput(5)).toEqual(5);
      });
    });
    describe("when user input A1 ", () => {
      it("should return Original Cheetos", () => {
        expect(test.subject.userSelection("A1")).toEqual("Original Cheetos");
      });
    });

    describe("when user input A6 ", () => {
      it("Should throw error: invalid Itemcode", () => {
        expect(() => {
          test.subject.userSelection("A6");
        }).toThrow("Invalid ItemCode");
      });
    });

    describe("when user input A1 and $5 ", () => {
      it("should return You chose Original Cheetos and the change is 3.25, there are 10 in stock", () => {
        expect(test.subject.verifyPurchase("A1", 5)).toEqual(
          `You chose Original Cheetos and the change is {"toonies":1,"loonies":1,"quarters":1,"dimes":0,"nickels":0}, there are 9 left in stock`
        );
      });
    });
    describe("when user input A1 and $500 ", () => {
      it("Should throw error: insufficient change", () => {
        expect(() => {
          test.subject.verifyPurchase("A1", 500);
        }).toThrow(
          "not enough change please insert less money or input exact amount"
        );
      });
    });
    describe("when user input A1 and $1 ", () => {
      it("should Throw error: Insufficient Amount ", () => {
        expect(() => {
          test.subject.verifyPurchase("A1", 1);
        }).toThrow("Insufficient Amount");
      });
    });
    describe("when user input A1 and $1.75 ", () => {
      it("should return Exact Amount No Change", () => {
        expect(test.subject.verifyPurchase("A1", 1.75)).toEqual(
          `You chose Original Cheetos and paid exact amount, there are 9 left in stock`
        );
      });
    });
    describe("when user needs to get $1.75 of change ", () => {
      it("should return 1 loonie and 3 quarters", () => {
        expect(test.subject.calcChange(1.75)).toEqual({
          dimes: 0,
          loonies: 1,
          nickels: 0,
          quarters: 3,
          toonies: 0
        });
      });
    });
    describe("when user needs to get $175 of change ", () => {
      it("should return not enough change please insert less money or input exact amount", () => {
        expect(() => {
          test.subject.calcChange(175);
        }).toThrow(
          "not enough change please insert less money or input exact amount"
        );
      });
    });
    describe("after user gets 1.75 of change ", () => {
      it("should update the coinBox", () => {
        expect(
          test.subject.updateCoinBox(test.subject.calcChange(1.75))
        ).toEqual({
          toonies: 50,
          loonies: 49,
          quarters: 47,
          dimes: 50,
          nickels: 50
        });
      });
    });
    describe("when user restock 5 original cheetos ", () => {
      it("should indicate that you've restocked 5 more Original Cheetos and now there are 15", () => {
        expect(test.subject.restockInventory("A1", 5)).toEqual(
          "you've restocked 5 more Original Cheetos, now you have 15"
        );
      });
    });
    describe("when user input invalid itemcode ", () => {
      it("should return not enough change please insert less money or input exact amount", () => {
        expect(() => {
          test.subject.restockInventory("A5", 5);
        }).toThrow("Invalid ItemCode");
      });
    });
    describe("when user restock 5 of each coins ", () => {
      it("should return the updated coinBox count", () => {
        expect(
          test.subject.restockCoinBox({
            dimes: 10,
            loonies: 10,
            nickels: 10,
            quarters: 10,
            toonies: 10
          })
        ).toEqual({
          dimes: 60,
          loonies: 59,
          nickels: 60,
          quarters: 57,
          toonies: 60
        });
      });
    });
    //
  });
});
