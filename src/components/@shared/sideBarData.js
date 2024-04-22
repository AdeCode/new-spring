import React from "react";
import { FiLogOut } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { AiOutlineApi } from "react-icons/ai";
import { IoSchoolOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";




export const SidebarData = [
{
	title: "Invoices",
	path: "",
	iconClosed: <MdKeyboardArrowDown />,
	iconOpened: <MdKeyboardArrowUp />,

	subNav: [
		{
			title: "Invoices",
			path: "/invoice",
			icon: <span className="material-symbols-outlined">list_alt</span>,
			cName: "sub-nav",
		},
		{
			title: "Create Invoice",
			path: "/invoice/generate",
			icon: <span className="material-symbols-outlined">create_new_folder</span>,
			cName: "sub-nav",
		},
	],
},
{
	title: "Customers",
	path: "",
	iconClosed: <MdKeyboardArrowDown />,
	iconOpened: <MdKeyboardArrowUp />,

	subNav: [
		{
			title: "Recent Customers",
			path: "/dashboard/customers",
			icon: <span className="material-symbols-outlined">group</span>,
			cName: "sub-nav",
		},
		
	],
},
{
	title: "Settings",
	path: "",
	iconClosed: <MdKeyboardArrowDown />,
	iconOpened: <MdKeyboardArrowUp />,

	subNav: [
		{
			title: "Manage Users",
			path: "/settings/manage-users",
			icon: <span className="material-symbols-outlined">manage_accounts</span>,
			cName: "sub-nav",
		},
		{
			title: "Profile Information",
			path: "/settings/personal-information",
			icon: <span className="material-symbols-outlined">info</span>,
			cName: "sub-nav",
		},
		{
			title: "Web Information",
			path: "/settings/web-information",
			icon: <span className="material-symbols-outlined">settings</span>,
			cName: "sub-nav",
		},
	],
},
];
