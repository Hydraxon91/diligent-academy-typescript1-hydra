// const num: number = 10;
var getArea = function (shape) {
    if (isCircle(shape)) {
        return Math.PI * shape.rad * shape.rad;
    }
    return shape.side * shape.side;
};
var isCircle = function (shape) {
    return shape.kind === 'circle';
};
var circle = {
    kind: 'circle',
    rad: 10
};
var square = {
    kind: 'square',
    side: 10
};
console.log(getArea(circle));
console.log(getArea(square));
