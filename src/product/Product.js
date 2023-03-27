export default class Product {
    id
    name
    price
    quantity
    description

    constructor(id, name, price, quantity, description) {
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
        this.description = description
    }
}
