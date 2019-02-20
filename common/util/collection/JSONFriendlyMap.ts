
// TODO: Implement hashing if we have time
export class JSONFriendlyMap<K, V> {
    public size: number;

    private pairs: Pair<K, V>[];

    public clear(): void {

    }

    public has(key: K): boolean {
        this.pairs.forEach((pair: Pair<K, V>) => {
            if (pair.key === key) {
                return true;
            }
        });

        return false;
    }
}

class Pair<K, V> {
    public key: K;
    public value: V;

    public constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}