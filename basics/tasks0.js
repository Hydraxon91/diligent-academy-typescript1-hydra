// const num: number = 10;
function logPersonProperties(person) {
    for (var key in person) {
        if (person.hasOwnProperty(key)) {
            var val = person[key];
            console.log(val);
        }
    }
}
var p1 = {
    name: "Asd",
    age: 12
};
logPersonProperties(p1);
