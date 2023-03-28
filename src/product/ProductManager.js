import {useState} from "react";
import Product from "./Product";
import FormProduct from "./FormProduct";

export default function ProductManager() {

    const [index, setIndex] = useState(1)
    const [products, setProducts] = useState(
        [new Product(1, "Choco pie", 35000, 10, "Good")],
    )

    const [product, setProduct] = useState({})

    const [show, setShow] = useState(false)
    const [indexUpdate, setIndexUpdate] = useState()

    function isShow() {
        setShow(true)
    }

    function updateProduct(id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                setProduct(products[i])
                setIndexUpdate(i)
            }
        }
        setShow(true)
    }

    return (
        <>
            {show && <FormProduct product={product} parentCallback={callbackFunction}></FormProduct>}
            <button onClick={isShow}>Create new product</button>
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
                                <button onClick={() => updateProduct(item.id)}>Update</button>
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )

    function callbackFunction(childData) {
        let product = products[indexUpdate]
        if (product !== undefined) {
            products[indexUpdate] = childData.product
        } else {
            childData.product.id = index + 1
            setProducts([...products, childData.product])
            setIndex(index + 1)
        }
        setShow(false)
    }
}
