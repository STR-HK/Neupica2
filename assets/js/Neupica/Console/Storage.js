export class Storage {
    constructor() {
        this.storage = {}
    }

    get length() {
        return Object.keys(this.storage).length
    }

    key(index) {
        return Object.keys(this.storage)[index]
    }

    getItem(key) {
        return this.storage[key]
    }

    setItem(key, value) {
        return (this.storage[key] = value)
    }

    removeItem(key) {
        return delete this.storage[key]
    }

    clear() {
        return (this.storage = {})
    }
}
