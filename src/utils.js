"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.initApp = exports.toTitleCase = exports.WebLogin = exports.Logout = exports.getFromLocalStorage = exports.writeToLocalStorage = exports.removeFromLocalStorage = exports.prepareMedia = exports.getRequest = exports.Request = exports.uuidv4 = exports.showPrompt = exports.showConfirmDialog = exports.showAdminMessage = exports.showMessage = exports.getMessage = exports.log = exports.checkUserLoggedIn = exports.youtubeParser = exports.mmFormat = exports.getParam = exports.saltConst = exports.fakeModel = void 0;
var moment_1 = require("moment");
var auth_api_1 = require("./api/auth.api");
var login_dto_1 = require("./dto/login.dto");
var util_enum_1 = require("./enums/util.enum");
exports.fakeModel = false;
exports.saltConst = "saltConst-KWLC-saltConst-KWLC";
function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search))
        return decodeURIComponent(name[1]);
}
exports.getParam = getParam;
function mmFormat(datetime, format) {
    if (format === void 0) { format = "hh:mm a"; }
    return (0, moment_1["default"])(datetime).format(format);
}
exports.mmFormat = mmFormat;
function youtubeParser(url) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[1].length == 11) ? match[1] : '';
}
exports.youtubeParser = youtubeParser;
function checkUserLoggedIn() {
    return __awaiter(this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = localStorage.getItem("userData");
                    if (!(data === null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, exports.WebLogin)({ username: username, password: password })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    if (data != null) {
                        // check expiry date
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkUserLoggedIn = checkUserLoggedIn;
var log = function (period, message) {
    if (period === void 0) { period = "earlydev"; }
    var optionalParams = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        optionalParams[_i - 2] = arguments[_i];
    }
    if (period == "earlydev") {
        //only log the stage/period you want
        console.log("earlydev", message, optionalParams);
    }
};
exports.log = log;
function PrepareData(Data, type) {
    if (type === void 0) { type = "json"; }
    if (type == "json") {
        return JSON.stringify(Data);
    }
    else if (type == "multipart") {
        var formData_1 = new FormData();
        Object.keys(Data).forEach(function (e) {
            formData_1.append(e, Data[e]);
        });
        return formData_1;
    }
}
function getMessage(result) {
    var message = "";
    if (Object.keys(result).indexOf("message") != -1) {
        message = result.message;
    }
    else if (Object.keys(result).indexOf("Message") != -1) {
        message = result.Message;
    }
    else {
        if (result.status != undefined && result.status) {
            //message = GENERIC_OK
            message = "Ok.";
        }
        else {
            //message = AN_ERROR_OCCURRED
            message = "An error occurred";
        }
    }
    return message;
}
exports.getMessage = getMessage;
function showMessage(param1, parm2, param3) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.showMessage = showMessage;
function showAdminMessage(param1, parm2) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            alert("".concat(param1, ": ").concat(parm2));
            return [2 /*return*/];
        });
    });
}
exports.showAdminMessage = showAdminMessage;
function showConfirmDialog(title, description, options) {
    if (description === void 0) { description = ""; }
    if (options === void 0) { options = []; }
    return confirm(title);
}
exports.showConfirmDialog = showConfirmDialog;
function showPrompt() {
    var result = prompt('Confirm Delete');
}
exports.showPrompt = showPrompt;
function uuidv4() {
    return (0, moment_1["default"])(new Date()).format('yyyyMMDDhhmmss');
}
exports.uuidv4 = uuidv4;
function Request(Base, Url, Data, PreparedData, method, token) {
    if (PreparedData === void 0) { PreparedData = false; }
    if (method === void 0) { method = "POST"; }
    if (token === void 0) { token = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var headers, fetchOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {};
                    headers["Content-Type"] = "application/json";
                    headers["Access-Control-Allow-Origin"] = "*";
                    headers["Allow-header"] = "*";
                    return [4 /*yield*/, getToken()];
                case 1:
                    token = _a.sent();
                    if (token != "") {
                        token = "Bearer " + token;
                        headers["Authorization"] = token;
                    }
                    else {
                        //  await Login({username, password});
                    }
                    (0, exports.log)("earlydev", "headers: ", headers);
                    fetchOptions = {
                        method: method,
                        headers: headers,
                        body: !PreparedData ? PrepareData(Data) : Data
                    };
                    return [2 /*return*/, fetch(Base + Url, fetchOptions)
                            .then(function (response) {
                            (0, exports.log)("earlydev", "1st", JSON.stringify(response), Base + Url);
                            if (response.status == 401) {
                                (0, exports.Logout)({ username: username, password: password });
                            }
                            return response.json();
                        })
                            .then(function (data) {
                            var keys = Object.keys(data);
                            console.log("keys", data);
                            if (keys.indexOf("statusCode") != -1 ||
                                data.ResponseMessage == "An Error Occured, please try again" ||
                                data.status == 400 ||
                                data.status == 401) {
                                // error occured
                                if (getMessage(data) ==
                                    "Unauthorized Access. You are using an expired token" ||
                                    data.status == 401) {
                                    //log user out, token expired, re-login needed
                                    (0, exports.Logout)({ username: username, password: password });
                                }
                                data.status = false;
                            }
                            else {
                                data.status = true;
                            }
                            return data;
                            //return PrepareResult(data, '');
                        })["catch"](function (error) {
                            return { status: false, message: error.message };
                            // return PrepareResult({}, error, true);
                        })];
            }
        });
    });
}
exports.Request = Request;
function getRequest(Base, Url, token, method, data, PrepareData) {
    if (token === void 0) { token = undefined; }
    if (method === void 0) { method = "GET"; }
    if (data === void 0) { data = undefined; }
    if (PrepareData === void 0) { PrepareData = false; }
    return __awaiter(this, void 0, void 0, function () {
        var headers, url, search, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, exports.log)("earlydev", "base", Base, " url", Url);
                    headers = {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    };
                    return [4 /*yield*/, getToken()];
                case 1:
                    token = _a.sent();
                    if (token != "") {
                        token = "Bearer " + token;
                        headers["Authorization"] = token;
                    }
                    else {
                        // await Login({username, password});
                    }
                    (0, exports.log)("earlydev", "headers: ", headers);
                    url = Base + Url;
                    if (data != undefined && !PrepareData) {
                        url = new URL(Base + Url);
                        search = new URLSearchParams(data).toString();
                        url = url + "?" + search;
                        // convert json object to url params for get request
                    }
                    options = {
                        method: method,
                        headers: headers
                    };
                    if (PrepareData) {
                        options['body'] = data;
                    }
                    return [2 /*return*/, fetch(url, options)
                            .then(function (response) {
                            (0, exports.log)("earlydev", "1st", JSON.stringify(response.status), Base + Url);
                            if (response.status == 401) {
                                (0, exports.Logout)({ username: username, password: password });
                            }
                            return response.json();
                        })
                            .then(function (data) {
                            (0, exports.log)("earlydev", "2nd", JSON.stringify(data), Base + Url);
                            var keys = Object.keys(data);
                            if (keys.indexOf("statusCode") != -1 ||
                                data.ResponseMessage == "An Error Occured, please try again" ||
                                data.status == 400 ||
                                data.status == 401) {
                                // error occured
                                if (getMessage(data) ==
                                    "Unauthorized Access. You are using an expired token"
                                    ||
                                        data.status == 401) {
                                    //log user out, token expired, re-login needed
                                    (0, exports.Logout)({ username: username, password: password });
                                }
                                data.status = false;
                            }
                            else {
                                data.status = true;
                            }
                            return data;
                        })["catch"](function (error) {
                            (0, exports.log)("earlydev", "error", (error));
                            return { status: false, message: error.message };
                        })];
            }
        });
    });
}
exports.getRequest = getRequest;
function prepareMedia(image) {
    // image crop picker
    return {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        name: image.fileName || image.modificationDate
    };
}
exports.prepareMedia = prepareMedia;
var removeFromLocalStorage = function (key) {
    localStorage.removeItem(key);
};
exports.removeFromLocalStorage = removeFromLocalStorage;
var writeToLocalStorage = function (key, data) {
    (0, exports.removeFromLocalStorage)(key);
    if (cryptoEncodeDecode != null) {
        localStorage.setItem(key, cryptoEncodeDecode.encode((data)));
    }
};
exports.writeToLocalStorage = writeToLocalStorage;
var getFromLocalStorage = function (key) {
    if (cryptoEncodeDecode != null) {
        var rawData = localStorage.getItem((key));
        if (rawData != null) {
            return cryptoEncodeDecode.decode(rawData);
        }
    }
};
exports.getFromLocalStorage = getFromLocalStorage;
var Logout = function (_a) {
    var username = _a.username, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    localStorage.clear();
                    if (!window.location.href.includes("admin")) return [3 /*break*/, 1];
                    window.location.href = "/admin/login";
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (0, exports.WebLogin)({ username: username, password: password })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.Logout = Logout;
var WebLogin = function (_a) {
    var username = _a.username, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var loginData, loginInfo, loginObject;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loginData = (0, exports.getFromLocalStorage)("userData");
                    if (loginData != "" && (loginData != null || loginData != undefined)) {
                        loginObject = JSON.parse(loginData);
                        if (typeof loginObject == 'string') {
                            loginObject = JSON.parse(loginObject);
                        }
                        (0, exports.log)("earlydev", "isExpired", (0, moment_1["default"])(new Date()).isAfter((0, moment_1["default"])(loginObject.expiryDate)), new Date(), loginObject.expiryDate, typeof loginObject);
                        if ((0, moment_1["default"])(new Date()).isAfter((0, moment_1["default"])(loginObject.expiryDate))) {
                            // return;
                        }
                        (0, exports.log)("earlydev", "makeing api i");
                        //expired make new call
                    }
                    (0, exports.log)("earlydev", "makeing api ii");
                    return [4 /*yield*/, (0, auth_api_1.loginApi)(new login_dto_1.LoginModelDTO({ username: username, password: password }))];
                case 1:
                    //make api call
                    loginInfo = _b.sent();
                    if (loginInfo.code <= util_enum_1.statusEnum.failed) {
                    }
                    else {
                        (0, exports.writeToLocalStorage)("userData", (JSON.stringify(loginInfo.data)));
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.WebLogin = WebLogin;
var getToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, rawData, result, markerSymbolInfo;
    return __generator(this, function (_a) {
        token = "";
        rawData = (0, exports.getFromLocalStorage)("userData");
        if (rawData) {
            result = JSON.parse(JSON.parse(rawData));
            markerSymbolInfo = result;
            token = markerSymbolInfo.token;
        }
        //  const result = eval(JSON.parse(rawData));
        return [2 /*return*/, token];
    });
}); };
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.toTitleCase = toTitleCase;
var username = "";
var password = "";
var hashlidEncoDecode;
var cryptoEncodeDecode;
var localStorage;
var initApp = function (userData, hashids, localStorageObj, _cryptoEncodeDecode) {
    if (!exports.fakeModel) {
        if (username) {
            username = userData.username;
            password = userData.password;
            (0, exports.WebLogin)({ username: username, password: password });
        }
        if (hashlidEncoDecode) {
            hashlidEncoDecode = hashids;
        }
        if (localStorageObj) {
            localStorage = localStorageObj;
        }
        if (cryptoEncodeDecode) {
            cryptoEncodeDecode = _cryptoEncodeDecode;
        }
    }
    else {
    }
};
exports.initApp = initApp;
