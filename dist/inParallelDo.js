"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inParallelDo = (...functions) => async (state) => {
    const promises = functions.map((fn) => fn(state));
    return Promise.all(promises);
};
exports.default = inParallelDo;
//# sourceMappingURL=inParallelDo.js.map