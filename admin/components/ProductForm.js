import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductForm = () => {
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productPrice, setProductPrice] = useState('');

	const [goToProducts, setGoToProducts] = useState(false);

	const router = useRouter();

	const createProduct = async event => {
		event.preventDefault();
		const data = { productName, productDescription, productPrice };
		await axios.post('/api/products', data);
		setGoToProducts(true);

		if (goToProducts) {
			router.push('/products');
		}
	};
	return (
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
	);
};

export default ProductForm;
