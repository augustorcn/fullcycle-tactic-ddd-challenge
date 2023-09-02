import Product from "../entities/Product";

export default class IncreasePrice {
	static calculate(products: Product[], percentage: number): Product[] {
		products.forEach((product) => {
			product.changePrice(
				(product.price * percentage) / 100 +
					product.price
			);
		});
		return products;
	}
}
