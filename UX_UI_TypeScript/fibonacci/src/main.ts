function fibonacciRecursive(n: number): number {
    if (n <= 1) {
        return n;
    } else {
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }
}
function fibonacciLoop(count: number): number[] {
    const fibSeries: number[] = [];
    for (let i = 0; i < count; i++) {
        fibSeries.push(fibonacciRecursive(i));
    }
    return fibSeries;
}

let sum : number = 0;

const fibNumbers: number[] = fibonacciLoop(10); // Thay 10 bằng số lượng số Fibonacci bạn muốn tính
fibNumbers.forEach(number => {
    sum += number;
});

console.log("Các số Fibonacci:", fibNumbers);
console.log("Tổng các số Fibonacci:", sum);