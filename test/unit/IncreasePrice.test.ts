import IncreasePrice from "../../src/domain/product/domainService/IncreasePrice";
import Product from "../../src/domain/product/entities/Product";

describe("IncrisePrice domain service", () => {
	it("should change the prices of all products when calculate method from IncresePrice domain service is called", () => {
		const product1 = new Product("product1", "Product 1", 10);
		const product2 = new Product("product2", "Product 2", 20);
		const products = [product1, product2];
		IncreasePrice.calculate(products, 100);
		expect(product1.price).toBe(20);
		expect(product2.price).toBe(40);
	});
});
