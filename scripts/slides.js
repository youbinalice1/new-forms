/*

html in slides folder

*/

const slides = [
    {
        name: "Title page",
        id: "title",
        onload: () => {
            const button = document.querySelector(".material-symbols-outlined")
            
        }
        
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
                const gradient = chroma.scale(['#F3E101', '#FF1794', '#990344']).domain([40, 55])
                i.style.fill = gradient(data[i.id])
            })
        }
    },
    {
        name: "New page",
        id: "newpage",
        footer: "Hello"
    },

]

