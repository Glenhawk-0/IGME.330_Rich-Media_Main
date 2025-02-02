const pets = [
    {
        name: "Peacock",
        care: .7,
        danger: .1,
        epicness: .8
    },
    {
        name: "Ostrich",
        care: .5,
        danger: .6,
        epicness: .2
    },
    {
        name: "Dragon",
        care: .9,
        danger: .9,
        epicness: 1
    }   
]

const monsters = Array.from({length: 1000}, (_, i) => {
    return {
        care: Math.random(),
        danger: Math.random()
    }
});

export {
    pets,
    monsters
}