import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const [product, setProduct] = React.useState(null);
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`https://localhost:44364/api/Products/${id}`).then(({ data }) => {
            setProduct(data);
        });
    }, [id]);

    return (
        <div className="container">
            {
                product !== null ?
                    <div className="product_item">
                        <img src={product.image} alt="картинка" />
                        <div className="product_item_descr">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <span>Цена: {product.price}</span>
                        </div>
                    </div> : <span>Загрузка</span>
            }
        </div>
    );
}

export default Product;