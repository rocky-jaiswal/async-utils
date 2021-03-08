"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runConditionally = (condition) => async (state) => {
    if (condition.whenTrue(state)) {
        return await condition.thenDo(state);
    }
    return state;
};
exports.default = runConditionally;
//# sourceMappingURL=runConditionally.js.map