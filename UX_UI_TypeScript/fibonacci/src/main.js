function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    }
    else {
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }
}
function fibonacciLoop(count) {
    var fibSeries = [];
    for (var i = 0; i < count; i++) {
        fibSeries.push(fibonacciRecursive(i));
    }
    return fibSeries;
}
var sum = 0;
var fibNumbers = fibonacciLoop(10); // Thay 10 bằng số lượng số Fibonacci bạn muốn tính
fibNumbers.forEach(function (number) {
    sum += number;
});
console.log("Các số Fibonacci:", fibNumbers);
console.log("Tổng các số Fibonacci:", sum);
