export default class OrderItem {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly price: number,
		readonly productId: string,
		readonly quantity: number
	) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.productId = productId;
		this.quantity = quantity;
		this.validate();
	}

	validate(): boolean {
		if (this.quantity <= 0) {
			throw new Error(
				"Quantity must be greater than 0"
			);
		}

		return true;
	}

	getTotal(): number {
		return this.price * this.quantity;
	}
}
