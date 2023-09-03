import EventDispatcherConcrecte from "../../src/domain/@shared/events/EventDispatcherConcrecte";
import ProductCreated from "../../src/domain/product/events/ProductCreated";
import SendEmailWhenProductIsCreated from "../../src/infra/product/eventHandlers/SendEmailWhenProductIsCreated";

describe("Domain event dispatcher", () => {
	it("should register an event handler when the register method is called", () => {
		const eventDispatcher = new EventDispatcherConcrecte();
		const eventHandler = new SendEmailWhenProductIsCreated();
		eventDispatcher.register("ProductCreated", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
		expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(1);
		expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
			eventHandler
		);
	});

	it("should unregister an event handler when the register method is called", () => {
		const eventDispatcher = new EventDispatcherConcrecte();
		const eventHandler = new SendEmailWhenProductIsCreated();
		eventDispatcher.register("ProductCreated", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
			eventHandler
		);
		eventDispatcher.unregister("ProductCreated", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
		expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(0);
	});

	it("should unregister all event handlers when the unregisterAll method is called", () => {
		const eventDispatcher = new EventDispatcherConcrecte();
		const eventHandler = new SendEmailWhenProductIsCreated();
		eventDispatcher.register("ProductCreated", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
			eventHandler
		);
		eventDispatcher.unregisterAll();
		expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeUndefined();
	});

	it("should notify all event handlers when the notify method is called", () => {
		const eventDispatcher = new EventDispatcherConcrecte();
		const eventHandler = new SendEmailWhenProductIsCreated();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");
		eventDispatcher.register("ProductCreated", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
			eventHandler
		);
		const productCreatedEvent = new ProductCreated({
			name: "Product 1",
			description: "Product 1 description",
			price: 10.0,
		});
		eventDispatcher.notify(productCreatedEvent);
		expect(spyEventHandler).toHaveBeenCalled();
	});
});
