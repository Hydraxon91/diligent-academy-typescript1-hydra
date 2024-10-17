// const num: number = 10;


// console.log(num);


// function add(a: number, b: number): number{
//     return a + b
// }

// let result: number = add(5, 6);

// console.log(result);


// // interface Person{
// //     name: string,
// //     age: number,
// //     greet(message: string): void
// // };

// // let person1: Person ={
// //     name: 'Bob',
// //     age: 20,
// //     greet(message) {
// //         console.log(`Hello ${message}`);
// //     },
// // }

// // person1.greet("Abel");

// // class Person {
// //     name: string;
// //     age: number;
    
// //     constructor(name: string, age: number){
// //         this.name = name;
// //         this.age = age;
// //     }

// //     greet = (message: string) : void =>{
// //         console.log(`Hello ${message}`);
// //     }
// // }

// // let person1 = new Person("Bob", 20);

// // person1.greet("Béla")

// type UserId = number;

// let userId: UserId = 21;

// type Combinable = string | number;

// let c: Combinable = "awfawf";
// let v: Combinable = 32;

// type User = {name: string, age: number};
// type Admin = {permission: string[]}

// type UserWithRole = User & Admin;

// // let incorrectUser: UserWithRole = {
// //     name: "John Doe",
// //     age: 32,
// // }

// let correctUser: UserWithRole = {
//     name: "John Doe",
//     age: 32,
//     permission: ['read', 'write', 'admin']
// }


// const numbers: number[] = [1, 2, 3, 4, 5];
// numbers.push(6);
// console.log(numbers);

// Generic type
// const firstElement = <T>(arr: T[]): T =>{
//     return arr[0];
// }

// const names: string[] = ["Béla", 'Józsi', 'Sanyi'];
// console.log(firstElement(names));
// const nums: number[] = [1, 2, 3, 4, 5];
// console.log(firstElement(nums));

// const swap = <T>(a: T, b: T): [T, T] => {
//     return [b, a];
// }

// console.log(swap('x','y'));


// Narrowing

// interface Circle {
//     kind: 'circle';
//     rad: number;
// }

// interface Square {
//     kind: 'square';
//     side: number;
// }

// type Shape = Circle | Square;

// const getArea = (shape: Shape) => {
//     if (isCircle(shape)) {
//         return Math.PI * shape.rad * shape.rad;
//     }
//     return shape.side * shape.side;
// }

// const isCircle = (shape: Shape): shape is Circle => {
//     return shape.kind === 'circle';
// }

// const circle: Shape = {
//     kind: 'circle',
//     rad: 10 
// }

// const square: Shape = {
//     kind: 'square',
//     side: 10 
// }

// console.log(getArea(circle));
// console.log(getArea(square));


// type A = {
//     name: string;
// }

// type B = {
//     name: number;
// }

// type C = A | B;
// type D = A & B;

// type E = {
//     name: number & string;
// }

// // const c: C ={
// //     name: 1
// // }

// // const d: D = {
// //     name:
// // }

// function func(param: C): void {
//     if(param && typeof param.name === `string`){
//         console.log(param.name + ` howdy`);
//     }
//     else if(param) {
//         console.log(param.name * 235);
//     }
// }

// type User = {
//     name: string,
//     age: number,
//     id: number
// }

// class User {
//     name: string;
//     age: number;
//     id: number;
// }

// const a: User = {
//     name: `asd`,
//     age: 21,
//     id:21
// }

// // function f(p: any){
// //     if (`age` in p && `id` in p) {
// //         return p.age * p.id;        
// //     }
// // }

// function f(p: any){
//     if (p instanceof User) { // Requires class
//         return p.age * p.id;        
//     }
// }

// // const user: User = {
// //     name: `Lali`,
// //     age: 21,
// //     id: 21
// // }

interface Person {
    name: string,
    age: number
}

type PersonKeys = keyof Person; // `name` | `age`

function logPersonProperties(person: Person){
    for(const key in person){
        if(person.hasOwnProperty(key)){
            const val = person[key];
            console.log(val);
        }
    }
}

const p1: Person = {
    name: `Asd`,
    age: 12
}
logPersonProperties(p1)

