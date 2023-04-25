song = "";

rightWristX = 0;
leftWristX = 0;
leftWristY = 0;
rightWristY = 0; 
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
canvas = createCanvas(550, 450);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Has Been Loaded!");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
}
}

function draw(){
image(video, 0, 0, 550, 450);
fill("#FF2400");
stroke("#0A0A0A");

if(scoreRightWrist > 0.2){
circle(rightWristX, rightWristY, 20);
if(rightWristY > 0 && rightWristY <= 100){
document.getElementById("speed").innerHTML = "Speed = 0.5x";
song.rate(0.5);
}
else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1.0x";
    song.rate(1);
}

else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}

else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2.0x";
    song.rate(2);
}

else if(rightWristY > 400){
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
}
}

if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    number_LeftWristY = Number(leftWristY);
    remove_decimals = Math.floor(number_LeftWristY);
    volume = remove_decimals/450;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}