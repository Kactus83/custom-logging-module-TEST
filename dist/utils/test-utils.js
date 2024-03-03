"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomChoice = exports.delay = void 0;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
function randomChoice(items) {
    return items[Math.floor(Math.random() * items.length)];
}
exports.randomChoice = randomChoice;
