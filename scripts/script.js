const animatecss = (el, animation) => {
  el.classList.add("animate__animated")
  el.classList.add("animate__" + animation)
}

const slideshow = {
  _page: 0,
  get page() {
    return this._page
  },
  set page(index) {
    if (index > slides.length - 1 || index < 0)
      return false
    this._page = index
    this.loadSlide(index)
  },
  scrollLock: false,
  loadSlide: async index => {
    const spin = document.querySelector("#loading").classList
    spin.remove("hidden")
    spin.add("show")
    if (index == 0)
      document.getElementById("left").classList.add("hidden")
    else
      document.getElementById("left").classList.remove("hidden")
    if (index + 1 == slides.length)
      document.getElementById("right").classList.add("hidden")
    else
      document.getElementById("right").classList.remove("hidden")
    const oldMain = document.querySelector("main")
    oldMain.classList.add("hidden")
    const slide = slides[index],
      html = await (await fetch(`slides/${slide.id}.html`)).text(),
      main = document.createElement("main")
    document.title = slide.name
    main.id = slide.id
    main.innerHTML = html
    main.classList.add("hidden");
    [...main.children].map((i, j) => {
      animatecss(i, "fadeInUp")
      i.style.animationDelay = ((j * 200) + 80) + "ms"
    })
    oldMain.replaceWith(main)
    Splitting()
    document.querySelector("header").innerHTML = `<p>${slide.name}</p><p>${slideshow.page + 1}/${slides.length}</p>`
    document.querySelector("footer p").innerHTML = slide.footer || ""
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
      if (slide.onshow)
        slide.onshow()
    }, 50)
  },
  next() {
    this.page = this.page + 1
  },
  prev() {
    this.page = this.page - 1
  }
}

onkeydown = e => {
  switch (e.code) {
    case "ArrowRight":
    case "ArrowDown":
      // case "Space":
      slideshow.next()
      break
    case "ArrowLeft":
    case "ArrowUp":
      slideshow.prev()
      break
  }
}

/*onwheel = e => {
  if (slideshow.scrollLock == false) {
    slideshow.scrollLock = true
    setTimeout(() => { slideshow.scrollLock = false }, 600)
    e.deltaY < 0 ? slideshow.prev() : slideshow.next()
  }
}*/

onload = async () => {
  document.documentElement.style.setProperty('--animate-duration', '.8s')
  slideshow.page = 0;
  ([...document.querySelectorAll("#left, #right")]).map((i, j) => {
    i.onmouseover = () => {
      i.classList.remove("mouseOut")
      i.classList.add("mouseOver")
    }
    i.onmouseout = () => {
      i.classList.remove("mouseOver")
      i.classList.add("mouseOut")
    }
    i.onclick = () => {
      j ? slideshow.next() : slideshow.prev()
    }
  })
}
