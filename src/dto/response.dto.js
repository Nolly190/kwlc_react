"use strict";
exports.__esModule = true;
exports.ResponseDTO = void 0;
var util_enum_1 = require("../enums/util.enum");
var ResponseDTO = /** @class */ (function () {
    function ResponseDTO() {
        var _this = this;
        this.status = false;
        this.data = [];
        this.message = "";
        this.extra_data = [];
        this.code = util_enum_1.statusEnum.failed;
        this.getResponse = function () {
            _this.status = _this.code > util_enum_1.statusEnum.failed;
            if (_this.code == util_enum_1.statusEnum.error) {
                _this.message = "An error occured";
            }
            return _this;
        };
    }
    return ResponseDTO;
}());
exports.ResponseDTO = ResponseDTO;
