"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionsDispatcher = (function () {
    function ActionsDispatcher(defaultAction) {
        defaultAction ?
            (this.actions = { default: [defaultAction] }) :
            (this.actions = {});
    }
    ActionsDispatcher.prototype.setDefaultAction = function (defaultAction) {
        this.actions.default = [defaultAction];
    };
    ActionsDispatcher.prototype.register = function (actionType, action) {
        if (typeof action === 'string') {
            this.actions[actionType] = this.actions[action];
            return;
        }
        if (this.actions[actionType]) {
            this.actions[actionType] = __spreadArrays(this.actions[actionType], [action]);
            return;
        }
        this.actions[actionType] = [action];
    };
    ActionsDispatcher.prototype.dispatch = function (actionType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.actions[actionType] && !this.actions.default) {
            throw new TypeError("No action of type " + actionType + " has been registered.");
        }
        if (!this.actions[actionType]) {
            var defaultAction = this.actions.default[0];
            args ? defaultAction.apply(void 0, args) : defaultAction();
            return;
        }
        var actions = this.actions[actionType];
        actions.forEach(function (action) { return (args ? action.apply(void 0, args) : action()); });
    };
    return ActionsDispatcher;
}());
exports.ActionsDispatcher = ActionsDispatcher;
//# sourceMappingURL=index.js.map