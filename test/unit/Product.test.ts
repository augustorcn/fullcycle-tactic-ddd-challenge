import Product from "../../src/domain/product/entities/Product";

describe("Product aggregate", () => {
	it("should throw 'Id is required' exception when product is created without id", () => {
		expect(() => {
			new Product("", "Book", 100);
		}).toThrowError("Id is required");
	});

	it("should throw 'Name is required' exception when product is created without name", () => {
		expect(() => {
			new Product("1", "", 100);
		}).toThrowError("Name is required");
	});

	it("should throw 'Price must be greater than zero' exception when product is created with 0 price", () => {
		expect(() => {
			new Product("1", "Book", 0);
		}).toThrowError("Price must be greater than zero");
	});

	it("should create a valid product", () => {
		const product = new Product("1", "Book", 100);
		expect(product).toBeDefined();
	});
});
