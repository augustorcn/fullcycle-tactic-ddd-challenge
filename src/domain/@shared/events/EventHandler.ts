import Event from "./Event";

export default interface EventHandler<T extends Event = Event> {
	handle(event: T): void;
}
