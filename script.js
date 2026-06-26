let pi = "";

async function loadPi(){

    try{

        const response = await fetch("pi.txt");

        pi = await response.text();

        document.getElementById("result").innerHTML =
        "생일을 입력하고 SEARCH를 누르세요.";

    }

    catch(error){

        document.getElementById("result").innerHTML =
        "<div class='fail'>pi.txt를 불러올 수 없습니다.</div>";

    }

}

loadPi();

function searchPi(){

    if(pi==="") return;

    const birthday =
    document.getElementById("birthday").value.trim();

    if(!/^\d{8}$/.test(birthday)){

        alert("YYYYMMDD 형식으로 입력하세요.");

        return;

    }

    const targets=[

        {
            type:"YYYYMMDD",
            value:birthday
        },

        {
            type:"YYMMDD",
            value:birthday.slice(2)
        },

        {
            type:"MMDD",
            value:birthday.slice(4)
        }

    ];

    for(const target of targets){

        const index = pi.indexOf(target.value);

        if(index!=-1){

            const start=index+1;
            const end=index+target.value.length;

            const before=
            pi.slice(Math.max(0,index-5),index);

            const after=
            pi.slice(
                index+target.value.length,
                index+target.value.length+5
            );

            document.getElementById("result").innerHTML=`

<div class="success">
검색 성공!
</div>

<b>검색 형식</b> : ${target.type}<br>

<b>위치</b> : ${start} ~ ${end}<br><br>

${before}
<span class="highlight">${target.value}</span>
${after}

`;

            return;

        }

    }

    document.getElementById("result").innerHTML=
    "<div class='fail'>찾지 못했습니다.</div>";

}
