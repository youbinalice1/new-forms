let circles = [];
const airData = [
  [
    "1990",
    "53.79893865"
  ],
  [
    "1991",
    "58.69095428"
  ],
  [
    "1992",
    "59.75299844"
  ],
  [
    "1993",
    "52.20461276"
  ],
  [
    "1994",
    "49.03697708"
  ],
  [
    "1995",
    "48.02974649"
  ],
  [
    "1996",
    "47.37690938"
  ],
  [
    "1997",
    "46.04241651"
  ],
  [
    "1998",
    "40.67055016"
  ],
  [
    "1999",
    "39.70149469"
  ],
  [
    "2000",
    "35.87412261"
  ],
  [
    "2001",
    "35.67034383"
  ],
  [
    "2002",
    "32.70588269"
  ],
  [
    "2003",
    "35.09244421"
  ],
  [
    "2004",
    "32.24445677"
  ],
  [
    "2005",
    "32.22305387"
  ],
  [
    "2006",
    "31.66649107"
  ],
  [
    "2007",
    "28.23306267"
  ],
  [
    "2008",
    "28.04246969"
  ],
  [
    "2009",
    "28.8757873"
  ],
  [
    "2010",
    "31.09338229"
  ],
  [
    "2011",
    "26.72221089"
  ],
  [
    "2012",
    "26.57914912"
  ],
  [
    "2013",
    "25.27971525"
  ],
  [
    "2014",
    "24.79922863"
  ],
  [
    "2015",
    "22.89273206"
  ],
  [
    "2016",
    "23.3226594"
  ],
  [
    "2017",
    "21.74204695"
  ],
  [
    "2018",
    "20.00237934"
  ],
  [
    "2019",
    "19.56350789"
  ],
  [
    "2020",
    "15.06691545"
  ],
  [
    "2021",
    "15.86556864"
  ],
  [
    "2022",
    "15.63964681"
  ]
]
let cols; let rows; let size = 10;
let r = size / 2;

let k = 5.3;

let ugm = 0

let newK = 1, timeline = 0

console.log(airData)

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width / size;
  rows = height / size;

  for (let i = 0; i < cols; i++) {
    circles[i] = [];
    for (let j = 0; j < rows; j++) {
      let x = size / 2 + i * size;
      let y = size / 2 + j * size;
      let d = dist(x, y, width / 2, height / 2);
      let angle = d / k;
      circles[i][j] = new Circle(x, y, angle);
    }
  }

}

function draw() {
  const value = 255 - parseInt((parseInt(airData[ugm][1]) - 15) * (255 / 45))
  background(value, value, value)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      circles[i][j].display();
      circles[i][j].move(0.04);
    }
  }
}

function update(index) {
  ugm = index
  newK = (airData[index][1] / 2) - 7
  document.getElementById("year").innerText = airData[index][0]
  document.getElementById("pollution").innerText = `${Math.floor(airData[index][1])}ugm`
}

function keyPressed() {
  if (key == "s") { saveCanvas("pattern") }
}

class Circle {
  constructor(cx, cy, angle) {
    this._angle = angle;
    this.cx = cx;
    this.cy = cy;
  }

  get angle() {
    return this._angle * newK
  }

  display() {
    push();
    translate(this.cx, this.cy);
    noFill();
    //ellipse(0, 0, r*2, r*2);
    let c = map(abs(this.angle % TWO_PI), 0, TWO_PI, 0, 255);

    noStroke();
    fill(c);
    let x = r * cos(this.angle);
    let y = r * sin(this.angle);
    rect(x, y, 5, 5);
    //arc(x, y, size, size, this.angle, this.angle + PI/2);
    pop();
  }

  move(speed) {
    this._angle -= speed;
  }
}

onload = () => {
  update(0)
  document.querySelector("input").oninput = i => {
    update(i.target.value)
  }
}