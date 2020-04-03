type EmployeeMagnitude = 6 | 9 | null;

export class EmployeeNumber {
	public exactValue: number;

	public magnitude: EmployeeMagnitude;

	public value: number;

	public constructor(value: number) {
		this.exactValue = value;

		this.magnitude = EmployeeNumber.getEmployeeMagnitude(value);

		this.value =
			this.magnitude
				? Math.round(value / Math.pow(10, this.magnitude - 1)) / 10
				: value;
	}

	public get magnitudeLabel(): string | null {
		switch (this.magnitude) {
			case 6: return "million";
			case 9: return "billion";
			default: return null;
		}
	}

	public toString(): string {
		return this.magnitude ? `${this.value} ${this.magnitudeLabel}` : this.value.toLocaleString();
	}

	private static getEmployeeMagnitude(value: number): EmployeeMagnitude {
		if (value >= 1000000000) {
			return 9;
		}

		if (value >= 1000000) {
			return 6;
		}

		return null;
	}
}