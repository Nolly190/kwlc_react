export const CREATION_ERROR = (title) => `${title} creation failed`;
export const CREATION_OK = (title) => `${title} creation was successful`;
export const CREATION_PENDING = (title) => `${title} creation request sent`;

export const UPDATE_ERROR = (title) => `${title} update failed`;
export const UPDATE_OK = (title) => `${title} update was successful`;
export const UPDATE_PENDING = (title) => `${title} update request sent`;

export const DELETE_ERROR = (title) => `${title} delete failed`;
export const DELETE_OK = (title) => `${title} delete was successful`;
export const DELETE_PENDING = (title) => `${title} delete request sent`;

export const AdminModules = [
    {
        name: "Users"
    },
    {
        name: "Publishers"
    },
    {
        name: "Branches"
    },
    {
        name: "Dashboard"
    },
    {
        name: "Donations"
    },
    {
        name: "Blog"
    },
    {
        name: "Roles"
    },
    {
        name: "Livestream"
    },
    {
        name: "MarketPlace"
    }
]

export const AdminNavArray = [
    {
        name: "Users",
        url: "/admin/users",
        iconTitle: "person",
        title: "Users",
    },
    {
        name: "Branches",
        url: "/admin/branches",
        iconTitle: "book_online",
        title: "Branches",
    },
    {
        name: "Dashboard",
        url: "/admin/branch-dashboard",
        iconTitle: "home",
        title: "Branch Dashboard",
    },
    {
        name: "Donations",
        url: "/admin/donations",
        iconTitle: "account_balance_wallet",
        title: "Donations",
    },
    {
        name: "Publishers",
        url: "/admin/publishers",
        iconTitle: "add_alert",
        title: "Publishers",
    },
    {
        name: "Blog",
        url: "/admin/blogs",
        iconTitle: "menu_book",
        title: "Blog",
    },
    {
        name: "Roles",
        url: "/admin/roles",
        iconTitle: "group_add",
        title: "Roles",
    },
    {
        name: "Livestream",
        url: "/admin/livestream",
        iconTitle: "camera",
        title: "Livestream",
    },
    {
        name: "MarketPlace",
        url: "/admin/marketplace",
        iconTitle: "shopping_cart",
        title: "Market Place",
    },
    {
        name: "Profile",
        url: "",
        iconTitle: "edit",
        title: "Edit Profile",
    }
]
