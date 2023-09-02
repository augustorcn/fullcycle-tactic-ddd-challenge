import Customer from "../../src/domain/customer/entities/Customer";
import Address from "../../src/domain/customer/valueObjects/Address";

describe("Customer aggregate", () => {
	it("should throw 'Id is required' exception when customer is created without id", () => {
		expect(() => {
			new Customer("", "Augusto");
		}).toThrowError("Id is required");
	});

	it("should throw 'Name is required' exception when customer is created without name", () => {
		expect(() => {
			new Customer("1", "");
		}).toThrowError("Name is required");
	});

	it("should change name when changeName method is called", () => {
		const customer = new Customer("1", "Augusto");
		customer.changeName("Augusto Alterado");
		expect(customer.name).toBe("Augusto Alterado");
	});

	it("should activate customer when activate method is called", () => {
		const customer = new Customer("1", "Augusto");
		const address = new Address(
			"Rua 1",
			123,
			"13330-250",
			"São Paulo"
		);
		customer.setAddress(address);
		customer.activate();
		expect(customer.isActive()).toBe(true);
	});

	it("should throw 'Address is mandatory to activate a customer' exception when address is undefined when you activate a customer", () => {
		expect(() => {
			const customer = new Customer("1", "Customer 1");
			customer.activate();
		}).toThrowError(
			"Address is mandatory to activate a customer"
		);
	});

	it("should deactivate customer when deactivate method is called", () => {
		const customer = new Customer("1", "Customer 1");
		customer.deactivate();
		expect(customer.isActive()).toBe(false);
	});

	it("should add reward points when addRewardPoints is called", () => {
		const customer = new Customer("1", "Customer 1");
		expect(customer.rewardPoints).toBe(0);
		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);
		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});
});
