import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { EmployerRecord } from "../../../common/EmployerRecord";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import EmployerListSearchFiltersPopup from "./EmployerListSearchFiltersPopup";

describe("<EmployerListSearchFiltersPopup />", () => {
	test("renders without exploding", () => {
		const store: Store<AppState, AnyAction> = configureStore({
			strings: {
				filters: {
					locationDefault: "locationDefault string",
					locationInternational: "locationInternational string",
					locationNational: "locationNational string",
				},
			},
		});

		const renderedValue: ReactTestRendererJSON | null =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerListSearchFiltersPopup childProps={[]} multiselect={false} onClose={(): void => { /* Do nothing. */ }} />
					</BrowserRouter>
				</Provider>,
			).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});