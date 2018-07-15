// csv to json , created listed in excel and saved as csv 
// https://www.csvjson.com/csv2json

var characterList = [
    {
        "Name": "Konnor",
        "descripton": "",
        "baseAttackPower": 10,
        "baseHealth": 100,
        "counter": 10
    },
    {
        "Name": "Farrah",
        "descripton": "",
        "baseAttackPower": 6,
        "baseHealth": 100,
        "counter": 6
    },
    {
        "Name": "Mommy",
        "descripton": "",
        "baseAttackPower": 18,
        "baseHealth": 100,
        "counter": 18
    },
    {
        "Name": "Daddy",
        "descripton": "",
        "baseAttackPower": 25,
        "baseHealth": 100,
        "counter": 25
    }
];


// copy of character list, will remove from this array each enemy as they are defeated
// used copy because will be remove items when selecting enemys, a shallow copy will remove from both arrays
// https://medium.com/@gamshan001/javascript-deep-copy-for-array-and-object-97e3d4bc401a
var enemyList = Array.from(characterList);

// initialize global varaibles
var match = new Fight();
var hero = {};
var badguy = {};

// draw function
function drawCharList(userList, divID) {
    // draw something with attribute of "fighterId" with value of array index for jquery
    var htmlstring = ""
    for (var i = 0; i < userList.length; i++) {
        htmlstring = htmlstring + "<div class='col-lg-1'><button class='fighter' fighterId = '" + i + "'>" + userList[i].Name + "</button></div>"
    }
    $(divID).html(htmlstring);
}

function drawHero(divID) {

    $(divID).html("<div class='col-lg-2'> Hero: <button class='herohere'> " + hero.Name + "</button> </div>");
}

function drawDefender(divID) {

    $(divID).html("<div class='col-lg-2'> defender: <button> " + badguy.Name + "</button> </div>");
}

function drawEnemyRow(divID) {
    // draw something with attribute of "badguyId" with value of array index for jquery
    var htmlstring = ""
    for (var i = 0; i < enemyList.length; i++) {
        htmlstring = htmlstring + "<div class='col-lg-1'><button class='badguy' badguyId = '" + i + "'>" + enemyList[i].Name + "</button></div>";
    }
    $(divID).html(htmlstring);
}

function selectHero() {
    // game screen state 1:  

    console.log("I am in the selectHero Function!")

    // extract hero id from attrivute figherId of clicked object
    fighterId = parseInt($(this).attr("fighterId"));

    // set Hero global variable for battle 
    hero = characterList[fighterId];
    console.log("fighter ", hero)

    // update enemylist by remvoing hero character
    // enemy list is a copy of characterlist
    enemyList.splice(fighterId, 1);
    console.log(enemyList);

    // draw hero row 
    drawHero("#herorow");

    // draw enemy list
    drawEnemyRow('#enemyRow');

    console.log("I am done here in selectHero")
}

function selectBadGuy() {
    // game screen state 2:  
    console.log("I am in the selectBadGuy Function!")

    // extract hero id from attrivute figherId of clicked object
    badguyId = parseInt($(this).attr("badguyId"));

    // set Hero global variable for battle 
    badguy = enemyList[badguyId];
    console.log("defener", badguy)

    // update enemylist by extracting selected badguy
    enemyList.splice(badguyId, 1);
    console.log(enemyList);

    // draw defender row 
    console.log("Add in function here!  ")

}

function resetGame(list, divID) {
    drawCharList(list, divID);
}


// in state1:  wait for elements to load to attach click handlers
$(document).ready(function () {

    console.log("Testing Javascript Load");
    console.log(characterList);
    console.log(enemyList);

    // fight below example
    match.init();
    hero = characterList[0];
    badguy = characterList[1];
    match.enterHero(hero);
    match.enterVillian(badguy);


    resetGame(characterList, "#charlist");

    // click to select Hero, hero variable is assigned in there
    $(".fighter").on("click", selectHero);


    // click for heroclick
    var heroclick = 0;
    $(".herohere").on("click", function () {
        console.log("heroclick "+heroclick+"!") ;
        heroclick++;
    });


    // click to attack 
    var attackcount = 0;
    $("#attack").on("click", function () {
        console.log("Attack "+attackcount+"!") ;
        attackcount++;
    });
    /// click to reset
    var restartcount = 0;
    $("#restart").on("click", function () { 
        console.log("Restart "+restartcount+"!") ;
        restartcount++;
    });



});

// in state2:  wait for elements to load to attach new click handlers
$(document).ready(function () {

    console.log("Testing Javascript Load");
    console.log(characterList);
    console.log(enemyList);

    // fight below example
    match.init();
    hero = characterList[0];
    badguy = characterList[1];
    match.enterHero(hero);
    match.enterVillian(badguy);


    resetGame(characterList, "#charlist");

    // click to select Hero, hero variable is assigned in there
    $(".fighter").on("click", selectHero);


    // click for heroclick
    // binding created when element is created
    // https://stackoverflow.com/questions/10262902/how-do-i-find-out-what-javascript-runs-when-i-click-an-element
    var heroclick = 0;
    $('body').on("click", "#herorow > div > button.herohere", function () {
        console.log("heroclick "+heroclick+"!") ;
        heroclick++;
    });

    // click to selectbadguy
    $('body').on("click", "#enemyRow > div > button.badguy", selectBadGuy);

    // click to attack 
    var attackcount = 0;
    $("#attack").on("click", function () {
        console.log("Attack "+attackcount+"!") ;
        attackcount++;
    });
    /// click to reset
    var restartcount = 0;
    $("#restart").on("click", function () { 
        console.log("Restart "+restartcount+"!") ;
        restartcount++;
    });



});



function Fight() {

    this.init = function () {
        this.heroBaseAttackPower = 0;
        this.heroAttackPower = 0;  // will increase
        this.heroBaseHealth = 0;
        this.heroHealth = 0;   // will decrease
        this.heroCounter = 0

        this.villianBaseAttackPower = 0;
        this.villianAttackPower = 0;  // will increase with battle
        this.villianBaseHealth = 0;
        this.villianHealth = 0;  // will derease
        this.villianCounter = 0

        this.heroAlive = true;
        this.villianAlive = true;
        console.log(this);
    }

    this.enterHero = function (hero) {
        this.heroBaseAttackPower = hero.baseAttackPower;
        this.heroAttackPower = hero.baseAttackPower;
        this.heroBaseHealth = hero.baseHealth;
        this.heroHealth = hero.baseHealth;
        this.heroCounter = hero.counter;

        this.heroAlive = true;
        console.log("hero is: ", hero);
    }


    this.enterVillian = function (villian) {
        this.villianBaseAttackPower = villian.baseAttackPower;
        this.villianAttackPower = villian.baseAttackPower;
        this.villianBaseHealth = villian.baseHealth;
        this.villianHealth = villian.baseHealth;
        this.villianCounter = villian.counter;

        this.villianAlive = true;

        console.log("villian is: ", villian);
    }

    this.heroAttack = function () {
        if (this.heroAlive) {
            // hero attacks
            this.villianHealth -= this.heroAttackPower;

            // villiancounters only if he is alive (this will allow for overkill)
            if (this.villianAlive) {
                this.heroHealth -= this.villianCounter;
            }


            // log results
            console.log("hero attack: " + this.heroAttackPower + " villian attack: " + this.villianCounter);
            console.log("hero health: " + this.heroHealth + "  villian health: " + this.villianHealth);

            // hero attack becomes stronger only if villian is alive (allow for overkill)
            // not fair to become more powerful beating on a dead guy
            if (this.villianAlive) {
                this.heroAttackPower += this.heroBaseAttackPower;
            };


            // villian dead yet?   
            if (this.villianHealth <= 0) {
                this.villianAlive = false;
                console.log("YOu killed the bad guy!")
            }

            // hero dead yet? 
            if (this.heroHealth <= 0) {
                this.heroAlive = false;
                console.log("You got your but whooped")
            }

        } else {
            console.log("Sorry, you are dead")
        }
    }




}

