import Customer from "../../../../domain/customer/entities/Customer";
import CustomerRepository from "../../../../domain/customer/repositories/CustomerRepository";
import CustomerModel from "../models/CustomerModel";

export default class CustomerRepositoryDatabase implements CustomerRepository {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.Address.street,
			number: entity.Address.number,
			zipcode: entity.Address.zip,
			city: entity.Address.city,
			active: entity.isActive(),
			rewardPoints: entity.rewardPoints,
		});
	}
}
