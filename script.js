const slides = [
  {
    name: "Air pollution in Greater London by Borough",
    id: "boroughs",
    onload: async () => {
      const data = await (await fetch("data/boroughs.json")).json();

      [...document.querySelectorAll("svg path")].map(i => {
        i.onmouseover = () => {
          document.getElementById("borough").innerText = `${i.id}: ${data[i.id] ? `${data[i.id]}ugm-3` : "N/A"}`
        }

        i.onmouseout = () => {
          document.getElementById("borough").innerText = "Hover over a borough to view data"
        }
        const gradient = chroma.scale(['#F3E101', '#FF1794', '#990344']).domain([40, 55])
        i.style.fill = gradient(data[i.id])
      })
    }
  }
]

const loadSlide = async index => {
  const spin = document.querySelector("#loading").classList
  spin.remove("hidden")
  spin.add("show")
  const oldMain = document.querySelector("main")
  oldMain.classList.add("hidden")
  const slide = slides[index],
    html = await (await fetch(`slides/${slide.id}.html`)).text(),
    main = document.createElement("main")
  document.title = slide.name
  main.id = slide.id
  main.innerHTML = html
  main.classList.add("hidden")
  oldMain.replaceWith(main)
  if (slide.onload)
    await slide.onload()
  spin.remove("show")
  spin.add("fadeOut")
  setTimeout(() => {
    spin.remove("fadeOut")
    spin.add("hidden")
  }, 200)
  setTimeout(() => {

    const main = document.querySelector("main").classList
    main.remove("hidden")
    main.add("show")
  }, 50)
}

const slideshow = {
  _page: 0,
  get page() {
    return this._page
  },
  set page(index) {
    let value = index
    if (value > slides.length)
      value = 0
    this._page = value
    loadSlide(value)
  },
  next() {
    this.page = this.page + 1
  },
  prev() {
    this.page = this.page - 1
  }
}


onload = async () => {
  loadSlide(0)
}