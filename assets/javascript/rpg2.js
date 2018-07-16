// csv to json , created listed in excel and saved as csv 
// https://www.csvjson.com/csv2json

var characterList = [
    {
        "name": "1-Konnor",
        "descripton": "",
        "baseAttackPower": 10,
        "baseHealth": 100,
        "counter": 10
    },
    {
        "name": "2-Farrah",
        "descripton": "",
        "baseAttackPower": 6,
        "baseHealth": 100,
        "counter": 6
    },
    {
        "name": "3-Mommy",
        "descripton": "",
        "baseAttackPower": 18,
        "baseHealth": 100,
        "counter": 18
    },
    {
        "name": "4-Daddy",
        "descripton": "",
        "baseAttackPower": 25,
        "baseHealth": 100,
        "counter": 25
    }
];


// initialize global varaibles
var enemyList = characterList.slice();  // make copy of array
var match = new Fight();
var hero = {};
var badguy = {};
var defeatedList = [];

// draw function
function drawCharList(userList, divID) {
    // draw something with attribute of "fighterId" with value of array index for jquery
    var htmlstring = ""
    for (var i = 0; i < userList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='fighter' fighterId = '" + i + "'>" + userList[i].name + "</button></div>"
    }
    $(divID).html(htmlstring);
}

// draw hero on screen
function drawHero(divID) {

    $(divID).html("<div class='col-sm-2'> Hero: <button class='herohere'> " + hero.name + "</button> </div>");
}

// draw badguy / defeinder on screen
function drawDefender(divID) {
    htmlstring = "<div class='row'> Defender: <button> " + badguy.name + "</button> </div>";
    htmlstring = htmlstring + '<div class="row"><button id="attack">ATTACK</button></div>';
    $(divID).html(htmlstring);
    
}

// draw row of enemy
function drawEnemyRow(divID) {
    // draw something with attribute of "badguyId" with value of array index for jquery
    var htmlstring = ""
    for (var i = 0; i < enemyList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='badguy' badguyId = '" + i + "'>" + enemyList[i].name + "</button></div>";
    }
    $(divID).html(htmlstring);
}

// select hero function 
function selectHero() {
    console.log("---> select hero function");
    fighterId = parseInt($(this).attr("fighterId"));
    console.log("fighterId: ", fighterId);
    console.log("BEFORE: ", enemyList);
    enemyList.splice(fighterId, 1);
    console.log("AFTER: ", enemyList);
}



// reset game
function resetGame(list, divID) {
    console.log("hero: ", hero);
    console.log("bad guy: ",badguy);
    enemyList = list.slice();
    drawCharList(list, divID);
    match = new Fight();
    match.init();
    hero = {};
    badguy = {};
    $('#enemyRow').html("Hero Row");
    $('#defender').html("");
}


$(document).ready(function () {

    console.log("Testing Javascript Load");
    console.log(characterList);
    console.log(enemyList);

    // fight below example
    /*
    match.init();
    hero = characterList[0];
    badguy = characterList[1];
    match.enterHero(hero);
    match.enterVillian(badguy);
    */
    

    // reset name with the characters specified
    resetGame(characterList, "#herorow");

    // bind event handlers
    bindEventHandlers();

    // reset event handler
    $('body').on("click", '#restart', function () { 
        console.log("----> reset function")
        console.log("before: ",enemyList)
        resetGame(characterList, "#herorow");
        console.log("after: ",enemyList);
        // rebind event handlers, the event lost seems lost when I rewrote the page
        bindEventHandlers();
    });


    // event handler function, call this again to reconnect event handler on reset
    function bindEventHandlers() {

        console.log("Event Handlers rebinded! ");

        // click to remove item
        $('body').on("click",".fighter", selectHero);
    }





});




// bare bone game

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

