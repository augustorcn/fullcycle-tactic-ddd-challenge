import OrderItem from "../../src/domain/order/entities/OrderItem";

describe("OrderItem entity", () => {
	it("should throw 'Quantity must be greater than 0' exception when order item is created with without quantity", () => {
		expect(() => {
			new OrderItem("1", "Book", 100, "2", 0);
		}).toThrowError("Quantity must be greater than 0");
	});

	it("should calculate total when total method is called", () => {
		const item = new OrderItem("1", "Book", 100, "5", 2);
		let total = item.getTotal();
		expect(total).toBe(200);
	});
});
