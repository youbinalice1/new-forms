const slides = [
    {
        name: "Title page",
        id: "title",
        onload: () => {
            const button = document.querySelector(".material-symbols-outlined")

        }

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
        onload: () => {
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
            });

        }

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
                i.style.fill = gradient(data[i.id])
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
    },

]

