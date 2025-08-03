import { useEffect, useState } from 'react';
import './App.css';
//import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Stockgraph from './components/Stockgraph';


function App() {
    const [products, setProducts] = useState();

    useEffect(() => {
        populateProductData();
    }, []);

    const contents = products === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Product Code</th>
                    <th>StockQuantity</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>DateAdded</th> 
                </tr>
            </thead>
            <tbody>
                {products.map(forecast =>
                    <tr key={forecast.id}>
                        <td>{forecast.name}</td>
                        <td>{forecast.productCode}</td>
                        <td>{forecast.stockQuantity}</td>
                        <td>{forecast.sku}</td>
                        <td>{forecast.price}</td>
                        <td>{forecast.category}</td>
                        <td>{forecast.dateAdded}</td>  
                    </tr>
                )}
            </tbody>
        </table>;


    return (
        <div className="App">

            <div className='container'>
                <Header></Header>
                {<h4 id="tableLabel">Available Products</h4>}
                {contents}
            
            <Stockgraph></Stockgraph>
                <Footer></Footer>
            </div>
        </div>
    );

    async function populateProductData() {
        const [response2] = await Promise.all([
            fetch('ProductsAPI')
        ]);
        //if (response1.ok) {
        //    const weatherResponse = await response1.json();
        //    setForecasts(weatherResponse);
        //}
        if (response2.ok) {
            const productResponse = await response2.json();
            setProducts(productResponse.result);
        }
    }
}

export default App;