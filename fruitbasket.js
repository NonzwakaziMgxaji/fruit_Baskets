module.exports = function FruitBasket(pool) {

    async function createBasket(fruit, qty, price) {
        await pool.query('insert into fruit_basket (fruit_name, quantity, price) values($1, $2, $3)', [fruit, qty, price])
    }

    async function findFruit(fruit) {
        let fruits = await pool.query('select fruit_name, quantity, price from fruit_basket where fruit_name = $1', [fruit])

        return fruits.rows;
    }

    async function updateFruit(fruit, quantity) {
        await pool.query('update fruit_basket set quantity = quantity + $2 where fruit_name = $1', [fruit, quantity])
    }

    async function totalPrice(fruit) {
        let total = await pool.query('select (price*quantity) as price from fruit_basket where fruit_name = $1', [fruit])

        return total.rows[0].price;
    }

    async function totalQty(fruitType) {
        let qty = await pool.query('select sum(price*quantity) as total from fruit_basket where fruit_name = $1', [fruitType])
        
        return qty.rows[0].total;
    }

    return {
        createBasket,
        findFruit,
        updateFruit,
        totalPrice,
        totalQty
    }
}

