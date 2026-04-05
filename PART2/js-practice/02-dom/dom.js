// ─── 1. DOM 선택 ────────────────────────────────────────
const output = document.getElementById("output");
const list = document.getElementById("list");

// ─── 2. 텍스트 변경 이벤트 ──────────────────────────────
document.getElementById("btn-change-text").addEventListener("click", function() {
    output.textContent = "텍스트가 변경되었습니다! (" + new Date().toLocaleTimeString() + ")";
});

// ─── 3. 리스트 아이템 추가 ──────────────────────────────
let itemCount = 0;
document.getElementById("btn-add-item").addEventListener("click", function() {
    itemCount++;
    const li = document.createElement("li");
    li.textContent = "아이템 " + itemCount;
    list.appendChild(li);
});

// ─── 4. 스타일 토글 ─────────────────────────────────────
document.getElementById("btn-toggle-style").addEventListener("click", function() {
    output.classList.toggle("highlight");
});