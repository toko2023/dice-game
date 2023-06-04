//Тоглогчийн ээлжийг хадгалах хувьсагч. 1-р тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэнэ.
var activePlayer = 0;

//Тоглогчидын цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0]

//Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;

//Шооны аль талаараа буусаныг хадгалах хувьсагч. 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
var diceNumber = Math.floor(Math.random()*6) + 1;

//Программ эхлүүлэхэд бэлтгэе.
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

var diceDom = document.querySelector('.dice');
diceDom.style.display = 'none';

//Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function(){
    //1-6 доторх санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //Шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.style.display = "block";
    //Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.src = 'dice-' + diceNumber + '.png';

    //Буусан тоо нь 1-ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if(diceNumber !== 1){
        // 1-ээс ялгаатай тоо буусан тул тоглогчид нэмж өгнө.
        roundScore = roundScore + diceNumber;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        switchToNextPlayer();
    }
});

// Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function(){
    // Уг тоглогчийн ээлжиндээ цуглуулсан оноог глобаль оноон дээр нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //Дэлгэц дээрх оноог өөрчилнө.
    document.getElementById("score-" +activePlayer).textContent = scores[activePlayer];

    //Уг тоглогч хожсон эсэхийг(оноо нь 100-с их эсэх) шалгах
    if(scores[activePlayer] >= 20){
        document.getElementById("name-" + activePlayer).textContent = "Та яллаа.";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        // Ээлжийн оноог нь 0 болгоно.
        switchToNextPlayer();
    } 
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer(){
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
    // Тоглогчийн ээлжийг солино.
    activePlayer === 0 ? (activePlayer = 1) :(activePlayer = 0);
    //Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // Шоог түр алга болгоно.
    diceDom.style.display = "none";
}



