function startClassification()
{
    navigator.mediaDevices.getUserMedia({ audio: true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/1GqP9nu-r/model.json', modelReady);
}

function modelReady(){
    classifier.classify(gotResults);
}
function gotResults(error, results) {
    if(error) {
        console.error(error)
    }  else {
        console.log(results);
        random_numbers_r = Math.floor(Math.random() * 225) + 1;
        random_numbers_g = Math.floor(Math.random() * 225) + 1;
        random_numbers_b = Math.floor(Math.random() * 225) + 1;
  
        document.getElementById("result_label").innerHTML = 'I can hear - '+
        results[0].label;
        document.getElementById("result_confidence").innerHTML = 'Accuracy - '+
        (results[0].confidence*100).toFixed(2)+" %";
        document.getElementById("result_label").style.color = "rgb("
        +random_numbers_r+","+random_numbers_g+","+random_numbers_r+")";
        document.getElementById("result_confidence").style.color = "rgb("
        +random_numbers_r+","+random_numbers_g+","+random_numbers_r+")";
         
        img1 = document.getElementById('animal1');
        img2 = document.getElementById('animal2');
        img3 = document.getElementById('animal3');
        img4 = document.getElementById('animal4');
  
        if (results[0].label == "Background Noise") {
            img1.src = 'Animaker-giraffe.gif';
            img2.src = 'KITTY IMG.jpg';
            img3.src = 'DOG IMG.jpg';
            img4.src = 'LION IMG 1.jpg';
        } else if (results[0].label == "cat sound") {
          img1.src = 'animal.jpg';
          img2.src = 'KITTY GIF.gif';
            img3.src = 'DOG IMG.jpg';
            img4.src = 'LION IMG 1.jpg';
        }else if (results[0].label == "dog sound") {
          img1.src = 'animal.jpg';
          img2.src = 'KITTY IMG.jpg';
            img3.src = 'DOG GIF.gif';
            img4.src = 'LION IMG 1.jpg';
        }else if (results[0].label == "lion sound") {
          img1.src = 'animal.jpg';
          img2.src = 'KITTY IMG.jpg';
            img3.src = 'DOG IMG.jpg';
            img4.src = 'LION gif.gif';
    }
    
  }
  }