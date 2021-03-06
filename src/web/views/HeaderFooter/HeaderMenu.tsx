import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getIsProd, getIsTest } from "../../state/ducks/environment/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import { RankingsRoute, RecentsRoute } from "../EmployerRoute/EmployerRoute";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const [ isHamburgerMenuOpen, setIsHamburgerMenuOpen ] = useState<boolean | undefined>(undefined);
	const [ isEmployerListSubmenuOpen, setIsEmployerListSubmenuOpen ] = useState(false);

	const { pathname } = useLocation();

	const showBrand: boolean = pathname !== "/";

	const isTest: boolean = useSelector(getIsTest);
	const isProd: boolean = useSelector(getIsProd);
	const strings: LocalizedStrings = useSelector(getStrings);

	const closeHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(false);
	};

	const openHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(true);
	};

	const navLinks: JSX.Element = (
		<>
			<div
				className={`HeaderMenu__SubmenuContainer HeaderMenu__SubmenuContainer--${isEmployerListSubmenuOpen ? "Open" : "Closed"}`}
				onMouseEnter={(): void => setIsEmployerListSubmenuOpen(true)}
				onMouseLeave={(): void => setIsEmployerListSubmenuOpen(false)}
			>
				<NavLink
					exact={true}
					className="HeaderMenu__Link HeaderMenu__Link--HasSubmenu"
					onClick={closeHamburgerMenu}
					to="/employers"
				>
					{strings.employerList}
				</NavLink>
				<ul className="HeaderMenu__Submenu">
					<li>
						<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/employers">
							{strings.employerListAll}
						</NavLink>
					</li>
					<li>
						<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to={`/employers/${RankingsRoute}`}>
							{strings.employerListRanking}
						</NavLink>
					</li>
					<li>
						<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to={`/employers/${RecentsRoute}`}>
							{strings.employerListRecent}
						</NavLink>
					</li>
				</ul>
			</div>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/about">
				{strings.about}
			</NavLink>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/submit">
				{strings.submit}
			</NavLink>
		</>
	);

	const classState: string =
		typeof isHamburgerMenuOpen === "undefined"
			? "Preload"
			: (isHamburgerMenuOpen ? "Open" : "Closed");

	return (
		<>
			{!isTest && (
				<>
					<div className={`HeaderFooter__BurgerMenu HeaderFooter__BurgerMenu--${classState}`}>
						<div className="HeaderFooter__BurgerMenuItems">
							{navLinks}
						</div>
					</div>
					<div
						className={`HeaderFooter__BurgerMenuShade HeaderFooter__BurgerMenuShade--${classState}`}
						onClick={closeHamburgerMenu}
					/>
				</>
			)}
			<header>
				<div className="HeaderFooter__Container">
					<button className="HeaderFooter__OpenHamburgerMenu" onClick={openHamburgerMenu}>
						<i className="material-icons">menu</i>
					</button>
					<div id="brand" className={`${showBrand ? "" : "HeaderMenu__HiddenBrand"}`}>
						<NavLink title={strings.home} to="/">
							{strings.appTitleShort}
							{!isProd && <span style={{ color: "red" }}>&nbsp; [DEV]</span>}
						</NavLink>
						<div className="HeaderMenu__Subtitle">{strings.appTitle}</div>
					</div>
					{navLinks}
				</div>
			</header>
		</>
	);
};

export default HeaderMenu;
