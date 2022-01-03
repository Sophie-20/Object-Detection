img = ""
animal = "";
objects = [];


function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    document.getElementById("status").innerHTML="Status: Object Detected";
    stroke("#ff0000");
    for (var i = 0; i<objects.length; i++) {
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x+10, objects[i].y+10);
        noFill();
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        //text("Cat", 400, 60, 50);
        // rect(300, 60, 270, 340);
    }
}