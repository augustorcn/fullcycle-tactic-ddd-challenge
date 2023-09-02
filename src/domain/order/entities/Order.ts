import OrderItem from "./OrderItem";

export default class Order {
	constructor(
		readonly id: string,
		readonly customerId: string,
		readonly items: OrderItem[]
	) {
		this.id = id;
		this.customerId = customerId;
		this.items = items;
		this.validate();
	}

	validate(): boolean {
		if (this.id.length === 0) {
			throw new Error("Id is required");
		}
		if (this.customerId.length === 0) {
			throw new Error("CustomerId is required");
		}
		if (this.items.length === 0) {
			throw new Error("Items are required");
		}

		return true;
	}

	getTotal(): number {
		return this.items.reduce(
			(acc, item) => acc + item.getTotal(),
			0
		);
	}
}
