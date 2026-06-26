// =========================================
// Pi Birthday Finder
// 변수만 수정해서 사용
// =========================================

const fs = require("fs");

// =======================
// 생일 입력 (YYYYMMDD)
// =======================
const birthday = "20260101";   // ← 여기만 수정

// =======================
// CSV 파일 읽기
// =======================
const csv = fs.readFileSync("21_Pi_One_Million_Digits.csv", "utf8");

// 숫자만 추출
const piDigits = csv.replace(/[^0-9]/g, "");

// 형식 검사
if (!/^\d{8}$/.test(birthday)) {
    console.log("생일은 YYYYMMDD 형식이어야 합니다.");
    process.exit();
}

// 검색할 문자열
const yyyyMMdd = birthday;
const yyMMdd = birthday.slice(2);
const mmdd = birthday.slice(4);

// 검색 우선순위
const targets = [
    { value: yyyyMMdd, type: "YYYYMMDD" },
    { value: yyMMdd, type: "YYMMDD" },
    { value: mmdd, type: "MMDD" }
];

let found = false;

for (const target of targets) {

    const index = piDigits.indexOf(target.value);

    if (index !== -1) {

        found = true;

        const before = piDigits.slice(Math.max(0, index - 5), index);
        const after = piDigits.slice(
            index + target.value.length,
            Math.min(piDigits.length, index + target.value.length + 5)
        );

        console.log("========== 검색 결과 ==========");
        console.log("검색 형식 :", target.type);
        console.log("찾은 숫자 :", target.value);
        console.log("위치 :", `${index + 1}번째 자리`);
        console.log(`주변 숫자 : ${before}[${target.value}]${after}`);
        console.log("==============================");

        break;
    }
}

if (!found) {
    console.log("1,000,000자리 안에서는 찾지 못했습니다.");
}
