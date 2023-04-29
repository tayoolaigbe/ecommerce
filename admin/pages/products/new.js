import Layout from '@/components/Layout';
import axios from 'axios';
import { useState } from 'react';

const NewProduct = () => {
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productPrice, setProductPrice] = useState('');

	const createProduct = async event => {
		event.preventDefault();
		const data = { productName, productDescription, productPrice };
		await axios.post('/api/products', data);
	};
	return (
		<Layout>
			<form onSubmit={createProduct}>
				<h1>New Product</h1>
				<label>Product name</label>
				<input
					value={productName}
					onChange={e => setProductName(e.target.value)}
					type="text"
					placeholder="Product name"
				/>
				<label>Description</label>
				<textarea
					value={productDescription}
					onChange={e => setProductDescription(e.target.value)}
					placeholder="description"
				></textarea>
				<label>Price (in GBP)</label>
				<input
					value={productPrice}
					onChange={e => setProductPrice(e.target.value)}
					type="number"
					placeholder="price"
				/>
				<button type="submit" className="btn-primary">
					Save
				</button>
			</form>
		</Layout>
	);
};

export default NewProduct;
