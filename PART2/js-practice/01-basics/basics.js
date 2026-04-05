// ─── 1. var / let / const ───────────────────────────────
var oldStyle = "var은 함수 스코프";
let blockScoped = "let은 블록 스코프";
const immutable = "const는 재할당 불가";

console.log(oldStyle, blockScoped, immutable);

// ─── 2. 함수 선언 vs 표현식 vs 화살표 ───────────────────
function greet(name) {
    return "Hello, " + name;
}

const greetExpr = function(name) {
    return "Hello, " + name;
};

const greetArrow = (name) => "Hello, " + name;

console.log(greet("bongjune"));
console.log(greetExpr("bongjune"));
console.log(greetArrow("bongjune"));

// ─── 3. 스코프 ──────────────────────────────────────────
function outer() {
    let x = 10;
    function inner() {
        console.log("inner에서 x:", x); // 외부 변수 접근
    }
    inner();
}
outer();

// ─── 4. 클로저 ──────────────────────────────────────────
function makeCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3