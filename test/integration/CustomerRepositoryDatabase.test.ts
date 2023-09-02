import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../src/infra/sequelize/order/models/CustomerModel";
import CustomerRepositoryDatabase from "../../src/infra/sequelize/order/repositories/CustomerRepositoryDatabase";
import Customer from "../../src/domain/customer/entities/Customer";
import Address from "../../src/domain/customer/valueObjects/Address";

describe("Customer repository", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a customer when a create method is called", async () => {
		const customerRepository = new CustomerRepositoryDatabase();
		const customer = new Customer("1", "Augusto");
		const address = new Address(
			"Street 1",
			1,
			"Zipcode 1",
			"City 1"
		);
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({
			where: { id: "1" },
		});

		expect(customerModel?.toJSON()).toStrictEqual({
			id: "1",
			name: customer.name,
			active: customer.isActive(),
			rewardPoints: customer.rewardPoints,
			street: address.street,
			number: address.number,
			zipcode: address.zip,
			city: address.city,
		});
	});
});
