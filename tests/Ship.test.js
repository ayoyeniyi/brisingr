import Ship from "../src/Ship";

test("ship instance has the length property", () => {
    const testShip = new Ship();
    expect(testShip.length).toBe(0);
});

test("ship instance has the hitAmount property", () => {
    const testShip = new Ship();
    expect(testShip.hitAmount).toBe(0);
});

test("ship instance has the sunk property", () => {
    const testShip = new Ship();
    expect(testShip.sunk).toBe(false);
});

test("hit method increments the hit count when called", () => {
    const testShip = new Ship();
    testShip.hit();
    testShip.hit();
    expect(testShip.hitAmount).toBe(2);
});

test("ship is sunk if hitAmount is same as length", () => {
    const testShip = new Ship();
    testShip.length = 5;
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});
