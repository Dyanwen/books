const kaikeba = {
    info: {
        name: 'chenxi'
    },
    get name() {
        return this.info.name;
    },
    set name(v) {
        this.info.name = v;
    }
}

console.log(kaikeba.name)
kaikeba.name = 'doudian'
console.log(kaikeba.name)