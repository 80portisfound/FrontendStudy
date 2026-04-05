// ─── 1. setTimeout (비동기의 기초) ──────────────────────
console.log("1: 시작");

setTimeout(function() {
    console.log("3: 1초 후 실행 (setTimeout)");
}, 2000);

console.log("2: setTimeout 등록 직후");

// ─── 2. Promise ─────────────────────────────────────────
function fetchData(succeed, delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (succeed) {
                resolve("데이터 로드 성공!");
            } else {
                reject(new Error("데이터 로드 실패"));
            }
        }, delay);
    });
}

fetchData(true, 200)
    .then(function(data) {
        console.log("4: Promise 성공 -", data);
        return fetchData(false, 200);
    })
    .catch(function(err) {
        console.log("5: Promise 실패 -", err.message);
    });

// ─── 3. async / await ───────────────────────────────────
async function loadData() {
    try {
        const result = await fetchData(true, 600);
        console.log("6: async/await 성공 -", result);
    } catch (err) {
        console.log("6: async/await 실패 -", err.message);
    }
}

loadData();