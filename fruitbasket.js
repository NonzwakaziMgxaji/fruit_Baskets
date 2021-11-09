module.exports = function FruitBasket(pool){

    async function createBasket(fruit, qty, price){
        let fruitbasket = await pool.query('insert into fruit_basket (fruit_name, quantity, price) values($1, $2, $3)', [fruit, qty, price])
    }

    async function findFruit(fruit){
        let fruits = await pool.query('select fruit_name, quantity, price from fruit_basket where fruit_name = $1', [fruit])

        return fruits.rows;
    }

    async function updateFruit(fruit) {
        let fruitIn =  await pool.query('select * from fruit_basket where fruit_name = $1', [fruit])
        if(fruitIn.rowCount === 0){
            await pool.query('insert into fruit_basket (fruit_name, quantity, price) values($1, $2, $3)', [fruit, 1, '3.00'])
        } else{
            await pool.query('update fruit_basket set quantity = quantity+1 where fruit_name = $1', [fruit])
        } 
    }

    async function totalPrice() {
        // let totalAmount = price*quantity;
        // let total =  await pool.query('select * from fruit_basket where fruit_name = &1', [fruit])
        // return total[0].price; 
        let total = await pool.query('select sum(price*quantity) as price from fruit_basket')
       
        return total.rows[0].price;
    }

    async function totalQty() {
        let qty =  await pool.query('select sum(quantity) as quantity from fruit_basket')

        return qty.rows[0].quantity; 
    }

    return {
        createBasket,
        findFruit,
        updateFruit,
        totalPrice,
        totalQty
    }
}

