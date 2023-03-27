import './App.css';
import YourName from "./bai2/YourName";
import Syntax from "./bai2/Syntax";
import InformationBrowser from "./bai2/InformationBrowser";
import InformationBrowser2 from "./bai2/InformationBrowser2";
import ProductManager from "./product/ProductManager";
import ClassProduct from "./product/ClassProduct";

function App() {
    return (
        <>
            {/*<div>*/}
            {/*    <h3>Bài 1</h3>*/}
            {/*    <YourName></YourName>*/}
            {/*    <Syntax></Syntax>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <h3>Bài 2</h3>*/}
            {/*    <InformationBrowser></InformationBrowser>*/}
            {/*    <InformationBrowser2 test = {[{name:'C1022I2'}]}></InformationBrowser2>*/}
            {/*</div>*/}

            <ProductManager></ProductManager>
            <ClassProduct></ClassProduct>
        </>
    );
}

export default App;
