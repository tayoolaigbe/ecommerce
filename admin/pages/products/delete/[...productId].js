import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DeleteProductPage() {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState(null);

	const { productId: id } = router.query;
	const goBack = () => {
		router.push('/products');
	};

	const deleteProduct = async () => {
		await axios.delete(`/api/products?id=${id}`);
		goBack();
	};

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/api/products?id=${id}`).then(response => {
			setProductInfo(response.data);
		});
	}, [id]);
	return (
		<Layout>
			<h1 className="text-center">
				Do you really want to delete this {productInfo?.productName}?
			</h1>
			<div className="flex gap-2 justify-center">
				<button className="btn-default" onClick={goBack}>
					No
				</button>
				<button onClick={deleteProduct} className="btn-red">
					Yes
				</button>
			</div>
		</Layout>
	);
}
