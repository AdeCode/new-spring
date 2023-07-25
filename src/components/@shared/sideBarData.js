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
// {
// 	title: "Transaction",
// 	path: "/about-us",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "Users",
// 			path: "",
// 			icon: <FiUsers />,
// 		},
// 		{
// 			title: "Waitlist",
// 			path: "/dashboard/waitlist",
// 			icon: <FiFileText />,
// 		},
// 		{
// 			title: "Customers",
// 			path: "/dashboard/customers",
// 			icon: <FiUser />,
// 		},
// 	],
// },
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
// {
// 	title: "SpringPay",
// 	path: "",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "SpringPay",
// 			path: "/springpay",
// 			icon: <FiBriefcase />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Generate New Invoice",
// 			path: "/invoice/generate",
// 			icon: <FiBriefcase />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Add/Receive NGN",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Send NGN",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Add NGN to FX Wallets",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Global Payout",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Receive USD, GBP & EUR",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 	],
// },

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
// {
// 	title: "Wallets/Cards",
// 	path: "",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "Payins",
// 			path: "/formik",
// 			icon: <FiBriefcase />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Payouts",
// 			path: "/dashboard/payouts",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 	],
// },
// {
// 	title: "Communication",
// 	path: "",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "Countries",
// 			path: "",
// 			icon: <BiWorld />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "Institutions",
// 			path: "",
// 			icon: <IoSchoolOutline />,
// 			cName: "sub-nav",
// 		},
// 	],
// },
// {
// 	title: "Reports",
// 	path: "",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "Businesses",
// 			path: "",
// 			icon: <FiBriefcase />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "API requests",
// 			path: "",
// 			icon: <AiOutlineApi />,
// 			cName: "sub-nav",
// 		},
// 	],
// },
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
// {
// 	title: "Support",
// 	path: "",
// 	iconClosed: <MdKeyboardArrowDown />,
// 	iconOpened: <MdKeyboardArrowUp />,

// 	subNav: [
// 		{
// 			title: "Businesses",
// 			path: "",
// 			icon: <FiBriefcase />,
// 			cName: "sub-nav",
// 		},
// 		{
// 			title: "API requests",
// 			path: "",
// 			icon: <AiOutlineApi />,
// 			cName: "sub-nav",
// 		},
// 	],
// },

];
