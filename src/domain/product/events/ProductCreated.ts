import Event from "../../@shared/events/Event";

export default class ProductCreated implements Event {
	dataTimeOccurred: Date;
	eventData: any;

	constructor(eventData: any) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
