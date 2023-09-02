import EventHandler from "../../../domain/@shared/events/EventHandler";
import ProductCreated from "../../../domain/product/events/ProductCreated";

export default class SendEmailWhenProductIsCreatedHandler
	implements EventHandler<ProductCreated>
{
	handle(event: ProductCreated): void {
		console.log(`Sending email to .....`);
	}
}
