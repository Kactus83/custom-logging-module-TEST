
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomChoice(items: number[]) {
    return items[Math.floor(Math.random() * items.length)];
}