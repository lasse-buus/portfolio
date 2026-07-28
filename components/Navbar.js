import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes, faMoon } from "@fortawesome/free-solid-svg-icons";
import userData from "@constants/data";
import { useTheme } from "next-themes";
import Image from "next/image";

const Navbar = () => {
	const { theme, setTheme } = useTheme();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleDarkMode = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const [menuIcon, setMenuIcon] = useState(faBars);

	const toggleMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
		setMenuIcon(menuIcon === faBars ? faTimes : faBars);
	};

	const iconStyle = { width: "20px", height: "20px" };

	const menuItems = ["About", "Blog", "Trips", "Contact"].map((item) => (
		<li key={item}>
			<Link
				href={`/${item.toLowerCase()}`}
				className="text-sm font-medium text-white cursor-pointer hover:border-b hover:border-white dark:hover:border-synthPink dark:text-white md:dark:text-black"
			>
				{item}
			</Link>
		</li>
	));

	return (
		<nav className="relative flex flex-col items-start justify-between max-w-6xl my-4 sm:mx-auto md:my-8 md:items-center md:flex-row">
			<Link href="/" className="block">
				<h1 className="flex text-4xl font-semibold text-synth dark:text-white">
					<Image className="h-[35px] dark:invert dark:brightness-0" src="/b-letter-logo.svg" alt="Logo" width={35} height={35} />
					{userData.name}
				</h1>
				<p className="text-xs font-light text-black dark:text-white">
					{userData.designation}
				</p>
			</Link>

			{/* Mobile menu button */}
			<div className="absolute right-0 mt-[25px] md:hidden">
				<button
					onClick={toggleMenu}
					className="relative right-0 text-gray-900 transform -translate-x-1/2 -translate-y-1/2 top-1/2 dark:text-gray-100 focus:outline-none"
				>
					<FontAwesomeIcon icon={menuIcon} style={iconStyle} />
				</button>
			</div>

			{/* Desktop menu */}
			<div className="items-center hidden space-x-4 md:flex absolute left-[50%] translate-x-[-50%] bg-synth dark:bg-white dark:border-black border border-white rounded-full">
				<ul className="flex px-6 py-3 space-x-8">{menuItems}</ul>
			</div>

			{/* Right-side icons */}
			<div className="flex absolute right-12 mt-[25px] md:mt-0 translate-y-[-50%] sm:flex justify-center gap-4 align-middle md:right-0 md:relative md:translate-y-0">
				<button
					onClick={toggleDarkMode}
					className="text-gray-900 dark:text-gray-100 focus:outline-none"
					style={{
						"--tw-text-opacity": "1",
						color: `rgba(255, 202, 127, var(--tw-text-opacity))`,
					}}
				>
					<FontAwesomeIcon
						icon={theme === "dark" ? faLightbulb : faMoon}
						style={iconStyle}
					/>
				</button>
				<a
					href="https://github.com/lasse-buus"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-900 dark:text-gray-100 hover:text-synthPink dark:hover:text-synthPink"
				>
					<FontAwesomeIcon icon={faGithub} style={iconStyle} />
				</a>
			</div>

			{/* Mobile menu list */}
			{mobileMenuOpen && (
				<div className="flex flex-col w-full mt-4 text-left md:hidden">
					<ul className="flex flex-col gap-2">{menuItems}</ul>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
