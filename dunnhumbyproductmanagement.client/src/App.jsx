import { useEffect, useState } from 'react';
import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Stockgraph from './components/Stockgraph';


function App() {
    const [products, setProducts] = useState();

    useEffect(() => {
        populateProductData();
    }, []);

    const contents = products === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. </em></p>
        : <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-200" aria-labelledby="tableLabel">
                <thead className="bg-gray-100">
                <tr>
                        <th className="px-4 !py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Product Code</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">StockQuantity</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">SKU</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">DateAdded</th> 
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) =>
                    <tr key={product.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.name}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.productCode}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.stockQuantity}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.sku}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.price}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.category}</div></td>
                        <td className="px-4 border-b border-gray-200 text-left"> <div className="!py-3 text-sm text-gray-900">{product.dateAdded}</div></td>  
                    </tr>
                )}
            </tbody>
            </table>
        </div> ;




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
}

export default App;