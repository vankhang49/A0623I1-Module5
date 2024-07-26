let arr = [1,-5,10,4,3,9];
let persons = [
    {
        name: "Khang",
        age: 2
    },
    {
        name: "Khang1",
        age: 4
    }
]
// ques1
let newArr = arr.filter((item, index) => item === 5);
console.log(newArr);
//ques2
let sumArr = arr.reduce((prev, item) => prev + item);
console.log(sumArr);

//ques3
let checkNumber = arr.reduce((prev, item) => (item === 6? item : prev),"Not found!");
console.log(checkNumber);

//ques4
let checkArr = arr.every((item) => item>0);
console.log(checkArr);

//ques5
let findNumber = arr.find((item) => item > 3);
console.log(findNumber);

//ques6
let [first, ...rest] = arr;
console.log(first);
console.log(rest);

//ques7
// let names = persons.map((person, index) => person.name);
// let ages = persons.map((person, index) => person.age);
// console.log(names, ages);
 let [{name, age}, {name:name1, age:age1}] = persons;
console.log([name, name1]);
console.log([age, age1]);

//ques8

function sumSpread(...arr) {
    return arr.reduce((prev,item)=>prev+item);
}
let arr2 = [1, 3, 4, 5];
let sumNewArr = sumSpread(...arr, ...arr2);
console.log(sumNewArr);

//ques9
let names = ["A", "B", "C", "D", "E"];
let namesString = names.reduce((prev, item) => (prev +", [" + item + "]"), "Welcome");
console.log(namesString);

//ques10

let book = {
    title: "Lão Hạc",
    author: "Nam Cao",
    pages: "3",
    displayInfo(){
        console.log(`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`);
    }
}
book.displayInfo();