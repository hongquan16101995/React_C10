import {Link, Route, Routes} from "react-router-dom";
import ProductManager from "../product/ProductManager";
import FormProduct from "../product/FormProduct";
import HomeTour from "../tour/HomeTour";
import FormCreate from "../tour/FormCreate";
import FormUpdate from "../tour/FormUpdate";

export default function Navbar() {
    return (
        <>
            <Link to={'/product'}>Product</Link>&ensp;
            <Link to={'/tours'}>HomeTour</Link>
            <Routes>
                <Route path={'product'} element={<ProductManager data={'values'} />}></Route>
                <Route path={'form-product'} element={<FormProduct/>}></Route>
                <Route path={'tours'} element={<HomeTour/>}></Route>
                <Route path={'form-create'} element={<FormCreate/>}></Route>
                <Route path={'form-update/:id'} element={<FormUpdate/>}></Route>
            </Routes>
        </>
    );
}
