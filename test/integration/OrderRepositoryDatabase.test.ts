import { Sequelize } from "sequelize-typescript";
import Customer from "../../src/domain/customer/entities/Customer";
import Address from "../../src/domain/customer/valueObjects/Address";
import Product from "../../src/domain/product/entities/Product";
import OrderItem from "../../src/domain/order/entities/OrderItem";
import Order from "../../src/domain/order/entities/Order";
import CustomerModel from "../../src/infra/customer/sequelize/models/CustomerModel";
import OrderModel from "../../src/infra/order/sequelize/models/OrderModel";
import OrderItemModel from "../../src/infra/order/sequelize/models/OrderItemModel";
import ProductModel from "../../src/infra/product/sequelize/models/ProductModel";
import CustomerRepositoryDatabase from "../../src/infra/customer/sequelize/repositories/CustomerRepositoryDatabase";
import ProductRepositoryDatabase from "../../src/infra/product/sequelize/repositories/ProductRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/order/sequelize/repositories/OrderRepositoryDatabase";

describe("Order repository", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a new order when create method is called", async () => {
		const customerRepository = new CustomerRepositoryDatabase();
		const customer = new Customer("123", "Customer 1");
		const address = new Address(
			"Street 1",
			1,
			"Zipcode 1",
			"City 1"
		);
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepositoryDatabase();
		const product = new Product("123", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("123", "123", [orderItem]);

		const orderRepository = new OrderRepositoryDatabase();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel?.toJSON()).toStrictEqual({
			id: "123",
			customer_id: "123",
			total: order.getTotal(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					order_id: "123",
					product_id: "123",
				},
			],
		});
	});
});
