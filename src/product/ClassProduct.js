import {Component} from "react";
import Product from "./Product";

export default class ClassProduct extends Component{
    constructor(props) {
        super(props)
        this.state = {
            products: [
                new Product("Choco pie", 35000, 10, "Good")
            ],
            name: "",
            price: "",
            quantity: "",
            description: ""
        }
    }

    render() {
        return (
            <>
                <h2>List Product</h2>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button>Update</button>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <form>
                    <h2>Create product</h2>
                    <div>
                        <label htmlFor={"name"}>Name</label>
                        <input type="text" name={"name"} id={"name"}
                               onChange={(event) => this.setState(
                                   {name: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor={"price"}>Price</label>
                        <input type="text" name={"price"} id={"price"}
                               onChange={(event) => this.setState(
                                   {price: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor={"quantity"}>Quantity</label>
                        <input type="text" name={"quantity"} id={"quantity"}
                               onChange={(event) => this.setState(
                                   {quantity: event.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor={"description"}>Description</label>
                        <input type="text" name={"description"} id={"description"}
                               onChange={(event) => this.setState(
                                   {description: event.target.value})}/>
                    </div>
                    <div>
                        <button type={"button"} onClick={this.createProduct}>Create</button>
                        <button type={"reset"}>Reset</button>
                    </div>
                </form>
            </>
        )
    }

    createProduct = () => {
        let arr = this.state.products
        arr.push(new Product(this.state.name, this.state.price,
            this.state.quantity, this.state.description))
        this.setState({products: arr})
    }
}
