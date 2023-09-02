import Product from "../../../../domain/product/entities/Product";
import ProductRepository from "../../../../domain/product/repositories/ProductRepository";
import ProductModel from "../models/ProductModel";

export default class ProductRepositoryDatabase implements ProductRepository {
	async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}
}
