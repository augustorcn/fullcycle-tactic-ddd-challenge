import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../src/infra/sequelize/product/models/ProductModel";
import ProductRepositoryDatabase from "../../src/infra/sequelize/product/repositories/ProductRepositoryDatabase";
import Product from "../../src/domain/product/entities/Product";

describe("Product repository", () => {
	let sequileze: Sequelize;

	beforeEach(async () => {
		sequileze = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		sequileze.addModels([ProductModel]);
		await sequileze.sync();
	});

	afterEach(async () => {
		await sequileze.close();
	});

	it("should create a product when create method is called", async () => {
		const productRepository = new ProductRepositoryDatabase();
		const product = new Product("1", "Product 1", 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({
			where: { id: "1" },
		});

		expect(productModel?.toJSON()).toStrictEqual({
			id: "1",
			name: "Product 1",
			price: 100,
		});
	});
});
