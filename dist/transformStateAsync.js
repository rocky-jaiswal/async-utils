"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformStateAsync = (...functions) => async (state) => {
    let s = state;
    for (const fn of functions) {
        const newState = await fn(s);
        s = newState.nextState(s);
    }
    return s;
};
exports.default = transformStateAsync;
//# sourceMappingURL=transformStateAsync.js.map