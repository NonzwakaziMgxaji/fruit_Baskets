let assert = require("assert");
let fruitFactory = require("../fruitbasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/fruits';

const pool = new Pool({
    connectionString
});

describe('The fruitbasket function', function () {
    let fruit = fruitFactory(pool);

    beforeEach(async function () {
        await pool.query("delete from fruit_basket;");
    });

    it('should find all the fruit baskets for a given fruit Banana,', async function () {
        await fruit.createBasket('Banana', 1, '3.00');
        assert.deepEqual(await fruit.findFruit('Banana'), [{fruit_name: 'Banana', price: '3.00', quantity: 1}])
    });

    it('should find all the fruit baskets for a given fruit Pineapple,', async function () {
        await fruit.createBasket('Pineapple', 1, '12.00');
        assert.deepEqual(await fruit.findFruit('Pineapple'), [{fruit_name: 'Pineapple', price: '12.00', quantity: 1}])
    });

    it('should update the number of fruits in a given basket Banana', async function () {
        await fruit.createBasket('Banana', 1, '3.00');
        await fruit.updateFruit('Banana');
        let find = await fruit.findFruit('Banana');
        assert.equal(find[0].quantity, 2);
    });

    it('should update the number of fruits in a given basket Strawberry', async function () {
        await fruit.createBasket('Strawberry', 5, '15.00');
        await fruit.updateFruit('Strawberry');
        let find = await fruit.findFruit('Strawberry');
        assert.equal(find[0].quantity, 6);
    });

    it('should show the total price for a given fruit basket', async function () {
        await fruit.createBasket('Banana', 1, '3.00');
        await fruit.createBasket('Banana', 1, '3.00');
        assert.equal(await fruit.totalPrice(), '6.00')
    });

    it('should show the total price for a given fruit basket', async function () {
        await fruit.createBasket('Apple', 1, '1.50');
        await fruit.createBasket('Apple', 1, '1.50');
        assert.equal(await fruit.totalPrice(), '3.00')
    });

    it('should show the sum of the total of the fruit baskets for a given fruit type Kiwi', async function () {
        await fruit.createBasket('Kiwi', 1, '5.00');
        await fruit.createBasket('Kiwi', 1, '5.00');
        assert.equal(await fruit.totalQty(), 2)
    });

    it('should show the sum of the total of the fruit baskets for a given fruit type Grapes', async function () {
        await fruit.createBasket('Grapes', 2, '10.00');
        await fruit.createBasket('Grapes', 1, '10.00');
        assert.equal(await fruit.totalQty(), 3)
    });

    after(function () {
        pool.end();
    })
});