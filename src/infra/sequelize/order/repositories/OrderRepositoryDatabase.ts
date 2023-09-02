import Order from "../../../../domain/order/entities/Order";
import OrderRepository from "../../../../domain/order/repositories/OrderRepository";
import OrderItemModel from "../models/OrderItemModel";
import OrderModel from "../models/OrderModel";

export default class OrderRepositoryDatabase implements OrderRepository {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.getTotal(),
				items: entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					product_id: item.productId,
					quantity: item.quantity,
				})),
			},
			{
				include: [{ model: OrderItemModel }],
			}
		);
	}
}
