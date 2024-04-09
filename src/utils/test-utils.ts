
/**
 * Delay utility function
 */
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Random choice utility function
 */
export function randomChoice<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}
