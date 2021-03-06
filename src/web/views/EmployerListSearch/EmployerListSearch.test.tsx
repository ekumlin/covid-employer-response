import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer, { ReactTestInstance, ReactTestRenderer, act } from "react-test-renderer";
import { AnyAction, Store } from "redux";

import { getPlocStringsAsync, mockComponent } from "../../../__tests__/TestUtils";

import { AppState } from "../../state/AppState";
import configureStore from "../../state/configureStore";

import { EmployerRouteContext, DefaultContextData } from "../EmployerRoute/EmployerRouteContext";

import EmployerListSearch from "./EmployerListSearch";

jest.mock(
	"./EmployerListFilterControl/InternationalTypeFilterControl",
	(): any => mockComponent("InternationalTypeFilterControl"));

jest.mock(
	"./EmployerListFilterControl/EmployeeCountFilterControl",
	(): any => mockComponent("EmployeeCountFilterControl"));

describe("<EmployerListSearch />", (): void => {
	test("renders without exploding", async (): Promise<void> => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerListSearch />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			);

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});

	test("opens 'filters' dropdown", async (): Promise<void> => {
		const store: Store<AppState, AnyAction> = configureStore({ strings: await getPlocStringsAsync() });

		const testRenderer: ReactTestRenderer =
			renderer.create(
				<Provider store={store}>
					<BrowserRouter>
						<EmployerRouteContext.Provider value={DefaultContextData}>
							<EmployerListSearch />
						</EmployerRouteContext.Provider>
					</BrowserRouter>
				</Provider>,
			);

		const selectors: ReactTestInstance[] =
			testRenderer.root.findAll((node: ReactTestInstance): boolean => node.type === "button");

		act((): void => {
			selectors[0].props.onClick();
		});

		expect(testRenderer.toJSON()).toMatchSnapshot();
	});
});
