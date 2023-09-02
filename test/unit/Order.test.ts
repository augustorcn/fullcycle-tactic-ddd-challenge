import Order from "../../src/domain/order/entities/Order";
import OrderItem from "../../src/domain/order/entities/OrderItem";

describe("Order aggregate", () => {
	it("should throw 'Id is required' exception when order is created without id", () => {
		expect(() => {
			new Order("", "1", []);
		}).toThrowError("Id is required");
	});

	it("should throw 'CustomerId is required' exception when order is created without customerId", () => {
		expect(() => {
			new Order("1", "", []);
		}).toThrowError("CustomerId is required");
	});

	it("should throw 'Items are required' exception when order is created without items", () => {
		expect(() => {
			new Order("1", "2", []);
		}).toThrowError("Items are required");
	});

	it("should calculate total when total method is called", () => {
		const item = new OrderItem("1", "Book", 100, "5", 2);
		const item2 = new OrderItem("2", "Ipad", 200, "6", 2);
		const order = new Order("9", "10", [item]);
		let total = order.getTotal();
		expect(total).toBe(200);
	});
});
