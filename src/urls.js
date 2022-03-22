"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.urls = void 0;
exports.urls = __assign({ donation: "Donation", updateDonation: "Donation/UpdateDonation", branch: "Branch", getAllBranch: "Branch/GetAllBranches", getBranch: "Branch/GetBranch", createBranch: "Branch/CreateBranch", updateBranch: "Branch/UpdateBranch", deleteBranch: "Branch/Delete/", branchAssignAdmin: "Branch/AssignAdmin", blogs: "Blog/GetAllBlogs", getblog: "Blog/GetBlog/", product: "Product", allUsers: "User/Users", registerUser: "User/Register", getUser: "User/GetUser/", allPastor: "Pastor/GetAll", getPastor: "Pastor/Get", slider: "Slider", liveStream: "LiveStream", updateLiveStream: "UpdateLiveStream/" }, {
    // baseUrl: "http://nolly19o-001-site10.itempurl.com/api/",
    // baseUrl: "http://localhost:8010/proxy/api/",
    baseUrl: "https://kwlc-web.herokuapp.com/api/",
    v1: "v1/",
    "login": "User/Login/Login"
});
