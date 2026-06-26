const fs = require("fs");

const birthday = "20050131";

// 문자열 읽기
const pi = fs.readFileSync("pi.txt", "utf8");

const targets = [
    { type: "YYYYMMDD", value: birthday },
    { type: "YYMMDD", value: birthday.slice(2) },
    { type: "MMDD", value: birthday.slice(4) }
];

for (const target of targets) {

    const index = pi.indexOf(target.value);

    if (index !== -1) {

        console.log("검색 형식 :", target.type);
        console.log("위치 :", index + 1);

        const before = pi.slice(Math.max(0, index - 5), index);
        const after = pi.slice(index + target.value.length, index + target.value.length + 5);

        console.log(`${before}[${target.value}]${after}`);
        process.exit();
    }
}

console.log("찾지 못했습니다.");
