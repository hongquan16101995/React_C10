import { useState} from "react";
import Product from "./Product";

export default function ProductManager() {
    let INDEX = 0

    const [products, setProducts] = useState(
        [new Product(++INDEX, "Choco pie", 35000, 10, "Good")]
    )

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")

    const createProduct = () => {
        setProducts([...products, new Product(++INDEX,name, price, quantity, description)])
    }

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
                {products.map((item) => {
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
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"price"}>Price</label>
                    <input type="text" name={"price"} id={"price"}
                           onChange={(event) => setPrice(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"quantity"}>Quantity</label>
                    <input type="text" name={"quantity"} id={"quantity"}
                           onChange={(event) => setQuantity(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"description"}>Description</label>
                    <input type="text" name={"description"} id={"description"}
                           onChange={(event) => setDescription(event.target.value)}/>
                </div>
                <div>
                    <button type={"button"} onClick={createProduct}>Create</button>
                    <button type={"reset"}>Reset</button>
                </div>
            </form>
        </>
    )
}
