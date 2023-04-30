import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductForm = ({
	_id,
	productName: existingName,
	productDescription: existingDescription,
	productPrice: existingPrice,
}) => {
	const [productName, setProductName] = useState(existingName || '');
	const [productDescription, setProductDescription] = useState(
		existingDescription || ''
	);
	const [productPrice, setProductPrice] = useState(existingPrice || '');

	const [goToProducts, setGoToProducts] = useState(false);

	const router = useRouter();

	const saveProduct = async event => {
		event.preventDefault();
		const data = { productName, productDescription, productPrice };

		if (_id) {
			// update product
			await axios.put('/api/products', { ...data, _id });
		} else {
			// create product
			await axios.post('/api/products', data);
		}
		setGoToProducts(true);
	};

	if (goToProducts) {
		router.push('/products');
	}

	return (
		<form onSubmit={saveProduct}>
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
