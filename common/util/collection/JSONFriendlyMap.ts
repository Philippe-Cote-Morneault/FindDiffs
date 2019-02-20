
// TODO: Implement hashing if we have time
export class JSONFriendlyMap<K, V> {
    private pairs: Pair<K, V>[];
}

class Pair<K, V> {
    public key: K;
    public value: V;

    public constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}