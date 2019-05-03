/*---------------------
Created by Christoph Dethloff, 30.04.2019
----------------------*/
var a = [];
var i, j, min, n;
const States = Object.freeze({minimum_searching: "searching", minimum_found: "found", minimum_swaping: "swaping", minimum_swapped: "swapped"});
var state;
var Colors;
var slider_speed, slider_intervall, button, input_elemnt_width;
//---------------
var interval_lower = 2;
var interval_upper = 50;
var element_width = 10;
var frame_Rate = 20;

function setup() {
    for (let z = 0; z < floor(windowWidth / element_width)-10; z++)
      a.push(floor(random(interval_lower, interval_upper)));
    n = a.length;
    i = 0;
    min = i;
    j = i + 1;
    state = States.minimum_searching;

    createP("Speed:");
    slider_speed = createSlider(1, 60, 20, 1);
    createP("<br>Element Size:");
    input_elemnt_width = createInput('10');
    createP("Variety:");
    slider_intervall = createSlider(5, 100, 50, 1);
    button = createButton('Update');
    button.mousePressed(reset);

    createCanvas(windowWidth, windowHeight-120);
    frameRate(frame_Rate);
    noStroke();
}

function reset() {
  a = [];
  element_width = input_elemnt_width.value();
  interval_upper = slider_intervall.value();
  for (let z = 0; z < floor(windowWidth / element_width)-10; z++)
    a.push(floor(random(interval_lower, interval_upper)));
  n = a.length; i = 0; min = i; j = i + 1;
  state = States.minimum_searching;
  loop();
}

function draw() {
    clear();
    background(52);
    frameRate(slider_speed.value());

    switch(state) {
      case States.minimum_searching:
        Colors = {i: "red", min:"blue", j:"grey"};
        if(j >= n) state = States.minimum_found;
        if(a[j] < a[min]) min = j;
        ++j;
        break;

      case States.minimum_found:
        Colors = {i: "red", min:"green", j:"white"};
        state = States.minimum_swaping;
        break;

      case States.minimum_swaping:
        Colors = {i: "green", min:"red", j:"white"};
        let help = a[min];
        a[min] = a[i];
        a[i] = help;
        state = States.minimum_swapped
        break;
    }
    //Output to Canvas
    for (let z = 0; z < n; z++) {
      let h = map(a[z], interval_lower, interval_upper, 2, windowHeight-120);
      if(z === i)
        fill(Colors.i);
      else if(z === min)
        fill(Colors.min);
      else if (z === j)
        fill(Colors.j);
      else
        fill(255);
      rect(z * element_width, windowHeight-120 - h, element_width, h);
    }

    if(state == States.minimum_swapped) {
      ++i; min = i; j = i + 1;
      state = States.minimum_searching;
    }

    if(i >= n) {
      console.log("Sorted!");
      noLoop();
    }
}
