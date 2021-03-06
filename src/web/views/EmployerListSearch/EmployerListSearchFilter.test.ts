import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";

import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

describe("EmployerListSearchFilter", (): void => {
	const createEmployerRecordDataRow = (overrides: Partial<EmployerRecord>): EmployerRecord => {
		const base: EmployerRecord = new EmployerRecord();

		// Include these by default so that lookups don't fail for not including them.
		base.employeesBefore = new EmployerEmployeeProfile();
		base.location = new EmployerLocation();

		return Object.assign(base, overrides);
	};

	const createFilterDataRow = (overrides: Partial<EmployerListSearchFilter>): EmployerListSearchFilter => {
		const base: EmployerListSearchFilter = new EmployerListSearchFilter();

		return Object.assign(base, overrides);
	};

	test.each([
		[ { text: "" }, { name: "foo" }, true ],
		[ { text: "f" }, { name: "foo" }, true ],
		[ { text: "o" }, { name: "foo" }, true ],
		[ { text: "fo" }, { name: "foo" }, true ],
		[ { text: "foo" }, { name: "foo" }, true ],
		[ { text: "afoo" }, { name: "foo" }, false ],
		[ { text: "fooa" }, { name: "foo" }, false ],
		[ { text: "" }, { name: "FOO" }, true ],
		[ { text: "F" }, { name: "FOO" }, true ],
		[ { text: "o" }, { name: "FOO" }, true ],
		[ { text: "fO" }, { name: "FOO" }, true ],
		[ { text: "Foo" }, { name: "FOO" }, true ],
		[ { text: "aFOO" }, { name: "FOO" }, false ],
		[ { text: "FOOa" }, { name: "FOO" }, false ],
		[ { text: "fo" }, { ticker: "FOO" }, true ],
		[ { text: "fooo" }, { ticker: "FOO" }, false ],
		[ { text: "fO" }, { aliases: [ "bar", "foo" ] }, true ],
		[ { text: "Foooo" }, { aliases: [ "bar", "foo" ] }, false ],
		[ { text: "BA" }, { aliases: [ "bar", "foo" ] }, true ],
		[ { text: "barr" }, { aliases: [ "bar", "foo" ] }, false ],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: null },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: null },
			true,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: null },
			false,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: null },
			false,
		],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: { type: "range", upperBound: 10 } },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: { type: "range", upperBound: 10 } },
			true,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: { type: "range", upperBound: 10 } },
			false,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: { type: "range", upperBound: 10 } },
			false,
		],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: { lowerBound: 600, type: "range", upperBound: 5000 } },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: { lowerBound: 600, type: "range", upperBound: 5000 } },
			true,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: { lowerBound: 600, type: "range", upperBound: 5000 } },
			true,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: { lowerBound: 600, type: "range", upperBound: 5000 } },
			false,
		],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: { lowerBound: 6000, type: "range", upperBound: 500000 } },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: { lowerBound: 6000, type: "range", upperBound: 500000 } },
			false,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: { lowerBound: 6000, type: "range", upperBound: 500000 } },
			true,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: { lowerBound: 6000, type: "range", upperBound: 500000 } },
			true,
		],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: { lowerBound: 200000, type: "range", upperBound: 500000 } },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: { lowerBound: 200000, type: "range", upperBound: 500000 } },
			false,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: { lowerBound: 200000, type: "range", upperBound: 500000 } },
			false,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: { lowerBound: 200000, type: "range", upperBound: 500000 } },
			true,
		],
		[
			{ small: false, medium: false, large: false },
			{ employeesBefore: { type: "exactly", upperBound: 500000 } },
			false,
		],
		[
			{ small: true, medium: false, large: false },
			{ employeesBefore: { type: "exactly", upperBound: 500000 } },
			false,
		],
		[
			{ small: false, medium: true, large: false },
			{ employeesBefore: { type: "exactly", upperBound: 500000 } },
			false,
		],
		[
			{ small: false, medium: false, large: true },
			{ employeesBefore: { type: "exactly", upperBound: 500000 } },
			true,
		],
	])(
		"properly matches inputs with isMatch (%# %p)",
		(fo: Record<string, any>, ro: Record<string, any>, expected: boolean): void => {
			const f: EmployerListSearchFilter = createFilterDataRow(fo);
			const r: EmployerRecord = createEmployerRecordDataRow(ro);

			expect(EmployerListSearchFilter.isMatch(f, r)).toBe(expected);
		},
	);
});
