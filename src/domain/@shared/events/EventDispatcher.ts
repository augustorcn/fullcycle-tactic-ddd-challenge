import Event from "./Event";
import EventHandler from "./EventHandler";

export default interface EventDispatcher {
	notify(event: Event): void;
	register(eventName: string, eventHandler: EventHandler): void;
	unregister(eventName: string, eventHandler: EventHandler): void;
	unregisterAll(): void;
}
