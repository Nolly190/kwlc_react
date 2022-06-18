export const urls = {
  donation: "Donation",
  updateDonation: "Donation/UpdateDonation",
  makeDonation: "Payment/Payment",
  contact: "Contact",

  getAllMails: "Contact/Get",

  branch: "Branch",
  getAllBranch: "Branch/GetAllBranches",
  getBranch: "Branch/GetBranch",
  createBranch: "Branch/CreateBranch",
  updateBranch: "Branch/UpdateBranch",
  deleteBranch: "Branch/Delete/",
  branchAssignAdmin: "Branch/AssignAdmin",

  blogs: "Blog/GetAllBlogs",
  getblog: "Blog/GetBlog/",
  createBlog: "Blog/CreateBlog",
  updateBlog: "Blog/UpdateBlog",
  deleteBlog: "Blog/DeleteBlog/",
  getCategories: "Blog/GetAllCategory",
  createCategory: "Blog/CreateCategory",
  updateCategory: "Blog/UpdateCategory",
  deleteCategory: "Blog/DeleteCategory/",

  product: "Product",

  allUsers: "User/Users",
  registerUser: "User/Register",
  getUser: "User/GetUser/",
  createRole: "User/CreateRole",
  editPermission: "User/EditPermission",
  addUserToRole: "User/AddUserToRole",
  rolePermission: "User/RolePermission",
  roles: "User/Roles",

  allPastor: "Pastor/GetAll",
  getPastor: "Pastor/Get",

  Payment: "Payment/Payment",

  slider: "Slider",

  liveStream: "LiveStream",
  updateLiveStream: "UpdateLiveStream/",

  NextEvent: "Event/Next",
  GetAllEvents: "Event/GetAllBranchEvent",
  GetEventsByType: "Event/GetEventByType",
  GetEventType: "Event/GetEventTypes",
  AddEventType: "Event/AddEventType",
  GetBranchEvent: "Event/GetBranchEvent/",
  EndEvent: "Event/EndEvent/",
  AddEvent: "Event/AddEvent",
  DeleteEvent: "Event/DeleteEvent/",
  UpdateEvent: "Event/UpdateEvent",

  createReport: "Report/Create",
  getAllReports: "Report/GetAll",
  uploadPastorDetails: "Message/Create",
  updatePastorDetails: "Message/Update",
  getPastorDetails: "Message/Get",
  uploadSliderDetails: "Slider",
  getById: "Slider/GetById",
  getBranchSliders: "Slider/GetBranchSliders",

  getAllPaymentHistory: "Payment/GetAllPayment",

  getAllPublishers: "KingdomPublishers/Get",
  publishersHistory: "KingdomPublishers/History",
  confirmPayment: "KingdomPublishers/ConfirmPayment",
  confirmManualPayment: "KingdomPublishers/ConfirmManualPayment",
  paymentRef: "KingdomPublishers/PaymentRef",
  editPublishers: "KingdomPublishers/EditDetails",
  registerPublishers: "KingdomPublishers/Register",
  blockPublishers: "KingdomPublishers/Block",
  raveHookPublishers: "KingdomPublishers/RaveHook",
  sendMessagePublishers: "KingdomPublishers/SendMessage",
  sendSms: "KingdomPublishers/SendSms",

  baseUrl: "https://kwlc-app.herokuapp.com/api/",
  v1: "v1/",

  ...{
    // baseUrl: "http://nolly19o-001-site10.itempurl.com/api/",
    // baseUrl: "http://localhost:8010/proxy/api/",
    login: "User/Login/Login",
  },
};
