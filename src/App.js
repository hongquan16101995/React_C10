import './App.css';
import ProductManager from "./product/ProductManager";
import {Route, Link, Routes} from "react-router-dom";
import FormProduct from "./product/FormProduct";
import {useState} from "react";

function App() {
    const [text, setText] = useState('Product')

    function hidden() {
        setText("")
    }

    return (
        <>
            <Link onClick={hidden} to={'/product'}><h2>{text}</h2></Link>
            <Routes>
                <Route path={'product'} element={<ProductManager data={'values'} />}></Route>
                <Route path={'form-product'} element={<FormProduct/>}></Route>
            </Routes>
        </>
    );

}

export default App;
