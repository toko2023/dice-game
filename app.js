//Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчидыг энд зарлая.
//Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

//Идэвхитэй тоглогчийн id
var activePlayer;

//Хоёр тоглогчийн цуглуулсан оноонууд.
var scores;

//Идэвхитэй тоглогчийн цуглуулж буй ээлжийн оноо.
var roundScore;

//Шооны зургийг үзүүлэх элементийг DOMЕ-оос хайж олоод энд хадгалья
var diceDom = document.querySelector('.dice');
initGame();
//Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame(){
    //Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;
    //Тоглогчийн ээлжийг хадгалах хувьсагч. 1-р тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэнэ.
    activePlayer = 0;
    //Тоглогчидын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0]
    //Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;
    //Программ эхлүүлэхэд бэлтгэе.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Тоглогчийн нэрийг буцааж гаргах
    document.getElementById("name-0").textContent = "Тоглогч 1";
    document.getElementById("name-1").textContent = "Тоглогч 2";
    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");

    diceDom.style.display = 'none';
}

//Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function(){
    //
    if(isNewGame){
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
    } else {
       alert("Тоглоом дууслаа. Та 'шинээр эхлэх' товчийг дарна уу.");
    }  
});

// Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(isNewGame){
        // Уг тоглогчийн ээлжиндээ цуглуулсан оноог глобаль оноон дээр нэмж өгнө.
        scores[activePlayer] = scores[activePlayer] + roundScore;

        //Дэлгэц дээрх оноог өөрчилнө.
        document.getElementById("score-" +activePlayer).textContent = scores[activePlayer];

        //Уг тоглогч хожсон эсэхийг(оноо нь 100-с их эсэх) шалгах
        if(scores[activePlayer] >= 100){
           //Тоглоомыг дууссан төлөвт оруулна.
           isNewGame = false;
           /*document.getElementById("name-" + activePlayer).textContent = "Та яллаа.";*/
           document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
           document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
           
           document.getElementById('current-' + activePlayer).textContent = '0';
           diceDom.style.display = "none";
           
        } else {
           // Ээлжийн оноог нь 0 болгоно.
           switchToNextPlayer();
        } 
    } else {
        alert("Тоглоом дууслаа. Та 'шинээр эхлэх' товчийг дарна уу.");
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

//Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector('.btn-new').addEventListener("click", initGame);





