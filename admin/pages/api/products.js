import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
	const { method } = req;
	await mongooseConnect();

	if (method === 'GET') {
		if (req.query?.id) {
			const product = await Product.findOne({
				_id: req.query.id,
			});
			res.status(200).json(product);
		} else {
			const products = await Product.find();
			res.status(200).json(products);
		}
	}

	if (method === 'POST') {
		const { productName, productDescription, productPrice } = req.body;
		const product = await Product.create({
			productName,
			productDescription,
			productPrice,
		});
		res.status(200).json(product);
	}
}
