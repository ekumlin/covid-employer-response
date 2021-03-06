import React from "react";
import { RouteProps } from "react-router-dom";

import EmployerListSearchFiltersSelector from "../EmployerListSearchFiltersSelector/EmployerListSearchFiltersSelector";

import "./EmployerListSearchFiltersPopup.scss";

export interface SelectorProps {
	initialValue: boolean;

	label: string;

	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface Props extends RouteProps {
	childProps: SelectorProps[];

	multiselect: boolean;

	onClose: () => void;

	title: string;
}

const EmployerListSearchFiltersPopup: React.FC<Props> = (props: Props): React.ReactElement => {
	const { childProps, multiselect, onClose, title } = props;

	const children: JSX.Element[] = childProps.map((p: SelectorProps, i: number): JSX.Element => (
		<EmployerListSearchFiltersSelector
			key={i}
			initialValue={p.initialValue}
			label={p.label}
			multiselect={multiselect}
			onChange={p.onChange}
		/>
	));

	return (
		<>
			<div className="EmployerListSearchFiltersPopup__Container">
				<h3>{title}</h3>
				{children}
			</div>
			<div className="EmployerListSearchFiltersPopup__Overlay" onClick={onClose} />
		</>
	);
};

export default EmployerListSearchFiltersPopup;
