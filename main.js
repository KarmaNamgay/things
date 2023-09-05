function setup(){
    canvas=createCanvas(300,300);
    canvas.position(520,300);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier("DoodelNet");
}
function draw(){
    strokeWeight(10);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clear_area(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML="Name: "+results[0].label;
        document.getElementById("confidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+"%";
        utterthis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis);
    }
}