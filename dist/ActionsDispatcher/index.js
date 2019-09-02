"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionsDispatcher = (function () {
    function ActionsDispatcher(defaultAction) {
        defaultAction ?
            (this.actions = { default: [defaultAction] }) :
            (this.actions = {});
    }
    ActionsDispatcher.prototype.register = function (actionType, action) {
        if (typeof action === 'string') {
            this.actions[action] = this.actions[actionType];
            return;
        }
        if (this.actions[actionType]) {
            this.actions[actionType] = this.actions[actionType].concat([action]);
            return;
        }
        this.actions[actionType] = [action];
    };
    ActionsDispatcher.prototype.dispatch = function (actionType, args) {
        if (!this.actions[actionType] && !this.actions.default) {
            throw new Error("No action of type " + actionType + " has been registered.");
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