import Address from "../../src/domain/customer/valueObjects/Address";

describe("Address value object", () => {
	it("should throw 'Street is required' exception when address is created without street", () => {
		expect(() => {
			new Address("", 1, "00000", "City");
		}).toThrowError("Street is required");
	});

	it("should throw 'Number is required' exception when address is created without number", () => {
		expect(() => {
			new Address("Street", 0, "00000", "City");
		}).toThrowError("Number is required");
	});

	it("should throw 'Zip is required' exception when address is created without zipcode", () => {
		expect(() => {
			new Address("Street", 1, "", "City");
		}).toThrowError("Zip is required");
	});

	it("should throw 'City is required' exception when address is created without city", () => {
		expect(() => {
			new Address("Street", 1, "00000", "");
		}).toThrowError("City is required");
	});

	it("should return a toString address when toString method is called", () => {
		const address = new Address("Street", 1, "000000", "City");
		const toStringAddress = address.toString();
		expect(toStringAddress).toBeDefined();
		expect(toStringAddress).toBe("Street, 1, 000000 City");
	});
});
