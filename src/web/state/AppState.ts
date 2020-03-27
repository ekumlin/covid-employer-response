import { EmployersState } from "./EmployersState";

import { LocalizedStrings } from "../../common/LocalizedStrings";

export interface AppState {
	employers: EmployersState;

	strings: LocalizedStrings;
}