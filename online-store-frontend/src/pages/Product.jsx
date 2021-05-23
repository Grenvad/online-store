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
        <>
            {
                product !== null ?
                    <div><h2>{product.name}</h2></div> : <span>Загрузка</span>
            }
        </>
    );
}

export default Product;