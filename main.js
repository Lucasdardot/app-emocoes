// https://teachablemachine.withgoogle.com/models/xeyFo_L7A/
var previsao1 = ''
var previsao2 = ''

Webcam.set({
    width:350,
    heigth:300,
    imageFormat:"png",
    pngQuality:90
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function tirarfoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imagem-capturada" src="' +data_uri+ '"/>'
    })
}

console.log("ml5versão:",ml5.version)

var classificador = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xeyFo_L7A/model.json",modeloCarregado)
function modeloCarregado(){
    console.log("modelocarregado")
}

function check(){
    img = document.getElementById("imagem-capturada")
    classificador.classify(img,obterResultado)
}

function speak(){
     sintese = window.speechSynthesis
    speakdata1 = "a primeira previsão é:" +previsao1
    speakdata2 = "a segunda previsão é:" +previsao2
    var faleisso = new SpeechSynthesisUtterance(speakdata1+speakdata2)
    sintese.speak(faleisso)
}

function obterResultado(error,results){
    if(error){console.log(error)}
    else{
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        previsao1 = results[0].label
        previsao2 = results[1].label
        speak()

        if(previsao1 == "feliz"){document.getElementById("updateEmoji").innerHTML = "&#128512;"}
        if(previsao1 == "triste"){document.getElementById("updateEmoji").innerHTML = "&#128532;"}
        if(previsao2 == "feliz"){document.getElementById("updateEmoji2").innerHTML = "&#128512;"}
        if(previsao2 == "triste"){document.getElementById("updateEmoji2").innerHTML = "&#128532;"}
    }
}
