const game = () => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    function jump() {
        if (dino.classList != "jump") {
            dino.classList.add("jump");

            setTimeout(function () {
                dino.classList.remove("jump");
            }, 800);
        }
    }

    let isAlive = setInterval(function () {
        // get current dino Y position
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        // get current cactus X position
        let cactusLeft = parseInt(
            window.getComputedStyle(cactus).getPropertyValue("left")
        );

        // detect collision
        if (cactusLeft < 80 && cactusLeft > 0 && dinoTop >= 100) {
            //collision
            cactus.style.display = "none"
            const speech = [...document.querySelectorAll(".speech")]
            speech.map((i, j) => {
                i.style.display = "unset"
                if (j) //next button
                    i.onclick = () => slideshow.next()
            })
        }
    }, 10);

    document.addEventListener("keydown", function (event) {
        jump();
    })
}

const slides = [
    {
        name: "Pattern",
        id: "p5",
        onload: () => {
            let info = document.getElementById("info"),
                bubble = document.getElementById("infoBubble"),
                src = info.getAttribute("src"),
                i = "info.svg",
                x = "Xbutton.svg"
            info.onclick = () => {
                if (src.endsWith(i)) {
                    src = src.replace(i, x)
                    bubble.style.display = "unset"
                }
                else {
                    src = src.replace(x, i)
                    bubble.style.display = "none"
                }
                info.setAttribute("src", src)
            }
        },
        onshow: () => {
            document.querySelector("iframe").focus()
        }
    },
    {
        name: "Title page",
        id: "title",
        onload: () => {
            const button = document.querySelector(".material-symbols-outlined")

        }

    },
    {
        id: "londonData",
        onload: game
    },
    {
        name: "DAQI",
        id: "DAQI",
    },
    {
        name: "Introduction",
        id: "introN02",
    },
    {
        name: "Particles",
        id: "particles",
        onload: game

    },

    {
        name: "londonIntro",
        id: "londonIntro",
    },
    {
        name: "Air pollution in Greater London by Borough",
        id: "boroughs",
        footer: "Data from <a href='https://example.com'>London Assembly</a>.",
        onload: async () => {
            const data = await (await fetch("data/boroughs.json")).json();

            [...document.querySelectorAll("svg path")].map(i => {
                i.onmouseover = () => {
                    document.getElementById("borough").innerText = `${i.id.replace(" and ", " & ")}: ${data[i.id] ? `${data[i.id]}ugm-3` : "No data"}`
                }

                i.onmouseout = () => {
                    document.getElementById("borough").innerText = "Hover over a borough to view data"
                }
                const gradient = chroma.scale(['#c9c9c9', '#666666', '#2d2d2d']).domain([40, 55])
                i.style.fill = data[i.id] ? gradient(data[i.id]) : "white"
            })
        }
    },
    {
        name: "Cigarette intro",
        id: "CigaretteIntro"
    },
    {
        name: "cigaretteData",
        id: "cigaretteData",
        onload: async () => {
            const data = await (await fetch("data/cities.json")).json()
            const select = document.querySelector("select")
            Object.entries(data).forEach(i => {
                const option = document.createElement("option")
                option.value = i[1]
                option.innerText = i[0]
                select.appendChild(option)
            })
            //87 - 189
        },
        onshow: () => {
            const tobacco = document.getElementById("tobacco"),
                width = tobacco.offsetWidth
            const changeSize = percent => {
                console.log(percent, width)
                tobacco.style.width = width * (percent / 100) + "px"
            }
            const select = document.querySelector("select"),
                fn = () => {
                    document.querySelector("h2").innerText = select.options[select.selectedIndex].innerText
                    document.querySelector("h3 span").innerText = select.value
                    let minWidth = 40
                    changeSize(minWidth + ((45 / (189 - minWidth)) * (select.value - 87)))
                }
            select.oninput = fn
            select.value = ""
            fn()
        }
    }

]

