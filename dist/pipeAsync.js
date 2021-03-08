"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipeAsync = (...functions) => async (state) => functions.reduce(async (result, next) => next(await result), state);
exports.default = pipeAsync;
//# sourceMappingURL=pipeAsync.js.map