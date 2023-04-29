const { Schema, models, model } = require('mongoose');

const ProductSchema = new Schema({
	productName: { type: String, required: true },
	productDescription: String,
	productPrice: { type: Number, required: true },
});

export const Product = models.Product || model('Product', ProductSchema);
