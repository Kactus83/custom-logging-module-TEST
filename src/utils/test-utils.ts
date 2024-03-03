
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomChoice<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}
