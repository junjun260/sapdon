export class Registry {
    _list: [],

    getAll() {
        return [...this._list];
    }

    register(data) {
        this._list.push(data);
    }
}