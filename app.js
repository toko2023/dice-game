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
        // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
        // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';

        // Тоглогчийн ээлжийг солино.
        // Хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго.
        // Үгүй бол идэвхитэй тоглогчийг 0 болго.
        activePlayer === 0 ? (activePlayer = 1) :(activePlayer = 0);

        //Улаан цэгийг шилжүүлэх
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        // Шоог түр алга болгоно.
        diceDom.style.display = "none";

        /*if(activePlayer === 0){
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }*/
    }
});


