// csv to json , created listed in excel and saved as csv 
// https://www.csvjson.com/csv2json

var PlayerList = [
    {
        "name": "Konor",
        "descripton": "",
        "baseAttackPower": 10,
        "curAttackPower": 10,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 10
    },
    {
        "name": "Farrah",
        "descripton": "",
        "baseAttackPower": 6,
        "curAttackPower": 6,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 6
    },
    {
        "name": "Mommy",
        "descripton": "",
        "baseAttackPower": 18,
        "curAttackPower": 18,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 18
    },
    {
        "name": "Daddy",
        "descripton": "",
        "baseAttackPower": 25,
        "curAttackPower": 25,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 25
    }
]

// initialize global varaibles
var activePlayerList = PlayerList.slice();  // make copy of array, one character
var match = new Fight();
var hero = {};
var badguy = {};
var defeatedList = [];

//////////////////////////////////////////////////////////////////////////////////
// draw functions are used to update the screen. They are called by the functions in onclick
//

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
    for (var i = 0; i < activePlayerList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='badguy' badguyId = '" + i + "'>" + activePlayerList[i].name + "</button></div>";
    }
    $(divID).html(htmlstring);
}

//////////////////////////////////////////////////////////////////////////////////
//  Below select functions are the onclick responses
//
// select hero function 
function selectHero() {
    // game screen state 1:  

    console.log("---> select hero function");
    console.log("BEFORE: ", activePlayerList);
    // extract hero id from attrivute figherId of clicked object
    fighterId = parseInt($(this).attr("fighterId"));
    console.log("fighterId: ", fighterId)

    // set Hero global variable for battle 
    hero = PlayerList[fighterId];
    match.enterHero(hero);
    console.log("fighter ", hero)

    // update activePlayerList by remvoing hero character
    // enemy list is a copy of characterlist

    activePlayerList.splice(fighterId, 1);
    console.log("AFTER: ", activePlayerList);

    // draw hero row 
    drawHero("#herorow");

    // draw enemy list
    drawEnemyRow('#enemyRow');

    console.log("I am done here in selectHero")
}

// select bad guy function
function selectBadGuy() {
    // game screen state 2:  
    console.log("---> select villian")

    // extract hero id from attrivute figherId of clicked object
    badguyId = parseInt($(this).attr("badguyId"));

    // set Hero global variable for battle 
    badguy = activePlayerList[badguyId];
    match.enterVillian(badguy);
    console.log("defender", badguy)

    // update activePlayerList by extracting selected badguy
    activePlayerList.splice(badguyId, 1);
    console.log(activePlayerList);

    // draw defender row, this is the bad guy line
    drawDefender("#defender");
    console.log("Add in function here!  ");

    // draw enemy list (updates with character gone)
    drawEnemyRow('#enemyRow');

}

// attack function
function selectAttack() {
    // game screen state 3:  
    console.log("----> attack function")

    if (match.heroAlive) {
        if (match.villianAlive) {
            // attack
            match.heroAttack();
        } else {
            alert("You beat him already!");
            defeatedList.push(badguy);
        }
    } else {
        if (!match.villianAlive) {
            alert("Wow!  You died AND your opponent died!  What a battle! ")
        } else {
            alert("Sorry you aren't alive! ");
        }

    }


}


// reset game
function resetGame() {
    list = PlayerList;
    divID = "#herorow";

    activePlayerList = list.slice();
    drawCharList(list, divID);
    match = new Fight();
    match.init();
    hero = {};
    badguy = {};
    $('#enemyRow').html("Hero Row");
    $('#defender').html("");
}

//////////////////////////////////////////////////////////////////////////////////
//   setup the onclick functions 
// 

$(document).ready(function () {

    console.log("Testing Javascript Load");
    console.log(PlayerList);
    console.log(activePlayerList);

    // fight below example
    /*
    match.init();
    hero = PlayerList[0];
    badguy = PlayerList[1];
    match.enterHero(hero);
    match.enterVillian(badguy);
    */

    // reset name with the characters specified
    resetGame();

    // rebind event handlers
    bindEventHandlers();


    $('body').on("click", '#restart', function () {
        resetGame();
        bindEventHandlers();

    });


    function bindEventHandlers() {
        // click event handler rebinding, call this again when resetting.   The on and off feature 
        // will cause it to unbind (off) to the old elements and rebind (on) to the newly rebuilt
        // elements.  Even though the new elements have the same name.  
        // without this, the onclick functiosn may not work correctly.
        // this fixed a lot of wierd issues on the reset click function was bound 
        // to elements that the javascript/jquery may have overwritten

        console.log("Removing and Rebinding click event handlers");

        // click to select Hero, hero variable is assigned in there
        $('body').off("click", ".fighter", selectHero);
        $('body').on("click", ".fighter", selectHero);

        // click to selectbadguy
        $('body').off("click", "#enemyRow > div > button.badguy", selectBadGuy);
        $('body').on("click", "#enemyRow > div > button.badguy", selectBadGuy);

        // click to attack        
        $('body').off("click", '#attack', selectAttack);
        $('body').on("click", '#attack', selectAttack);

        // click for heroclick
        // binding created when element is created
        // hhttps://stackoverflow.com/questions/10920355/attaching-click-event-to-a-jquery-object-not-yet-added-to-the-dom
        var heroclick = 0;
        $('body').on("click", "#herorow > div > button.herohere", function () {
            console.log("heroclick " + heroclick + "!");
            heroclick++;
        });

    }

});



////  raw algorithm for the game.    

function Fight() {

    this.init = function () {
        this.heroBaseAttackPower = 0;
        this.heroAttackPower = 0;  // will increase
        this.heroBaseHealth = 0;
        this.heroHealth = 0;   // will decrease
        this.heroCounterAttack = 0

        this.villianBaseAttackPower = 0;
        this.villianAttackPower = 0;  // will increase with battle
        this.villianBaseHealth = 0;
        this.villianHealth = 0;  // will derease
        this.villianCounterAttack = 0

        this.heroAlive = false;
        this.villianAlive = false;
    }

    this.enterHero = function (hero) {
        this.heroBaseAttackPower = hero.baseAttackPower;
        this.heroAttackPower = hero.baseAttackPower;
        this.heroBaseHealth = hero.baseHealth;
        this.heroHealth = hero.baseHealth;
        this.heroCounterAttack = hero.counterAttack;

        this.heroAlive = true;
        console.log("hero is: ", hero);
    }

    this.updateStats = function () {
        hero.curAttackPower = this.heroAttackPower
        hero.curHealth = this.heroHealth 
    }

    this.enterVillian = function (villian) {
        this.villianBaseAttackPower = villian.baseAttackPower;
        this.villianAttackPower = villian.baseAttackPower;
        this.villianBaseHealth = villian.baseHealth;
        this.villianHealth = villian.baseHealth;
        this.villianCounterAttack = villian.counterAttack;

        this.villianAlive = true;

        console.log("villian is: ", villian);
    }

    this.heroAttack = function () {
        if (this.heroAlive) {
            // hero attacks
            this.villianHealth -= this.heroAttackPower;

            // mark hero as dead if his healthpoint is <= 1
            if (this.villianHealth <= 0) {
                this.villianAlive = false;
                console.log("YOu killed the bad guy!")
            }

            // villiancounters only if he is alive (this will allow for overkill)
            if (this.villianAlive) {
                this.heroHealth -= this.villianCounterAttack;
            }


            // log results
            console.log("hero attack: " + this.heroAttackPower + " villian attack: " + this.villianCounterAttack);
            console.log("hero health: " + this.heroHealth + "  villian health: " + this.villianHealth);

            // hero attack becomes stronger only if villian is alive (allow for overkill)
            // not fair to become more powerful beating on a dead guy
            if (this.villianAlive) {
                this.heroAttackPower += this.heroBaseAttackPower;
            };



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

