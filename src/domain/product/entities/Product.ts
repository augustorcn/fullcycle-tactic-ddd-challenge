export default class Product {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly price: number
	) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.validate();
	}

	validate(): boolean {
		if (this.id.length === 0) {
			throw new Error("Id is required");
		}
		if (this.name.length === 0) {
			throw new Error("Name is required");
		}
		if (this.price <= 0) {
			throw new Error(
				"Price must be greater than zero"
			);
		}
		return true;
	}
}
