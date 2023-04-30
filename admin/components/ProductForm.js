import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductForm = ({
	_id,
	productName: existingName,
	productDescription: existingDescription,
	productPrice: existingPrice,
	productImages,
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

	const uploadImages = async event => {
		const files = event.target?.files;
		if (files?.length > 0) {
			const data = new FormData();
			for (const file of files) {
				data.append('file', file);
			}

			const response = await axios.post('/api/upload', data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
		}
	};

	return (
		<form onSubmit={saveProduct}>
			<label>Product name</label>
			<input
				value={productName}
				onChange={e => setProductName(e.target.value)}
				type="text"
				placeholder="Product name"
			/>
			<label>Photos</label>
			<div className="mb-2">
				<label className="w-24 h-24 cursor-pointer text-center flex text-sm items-center justify-center gap-1 text-gray-500 rounded-lg bg-gray-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<div>Upload</div>
					<input type="file" onChange={uploadImages} className="hidden" />
				</label>
				{!productImages?.length && <div>NO Photos available for product</div>}
			</div>
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
