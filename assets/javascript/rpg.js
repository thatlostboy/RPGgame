// csv to json , created listed in excel and saved as csv 
// https://www.csvjson.com/csv2json

var playerList = [
    {
        "name": "Konor",
        "descripton": "",
        "baseAttackPower": 4,
        "curAttackPower": 4,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 4,
    },
    {
        "name": "Farrah",
        "descripton": "",
        "baseAttackPower": 3,
        "curAttackPower": 3,
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
// below was a super clever way to deep copy array of objects, just change it to json and back
// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
var activeplayerList = JSON.parse(JSON.stringify(playerList));  /// make a deep copy of original
var match = new Fight();
var hero = {};
var badguy = {};
var defeatedList = [];

//////////////////////////////////////////////////////////////////////////////////
// draw functions are used to update the screen. They are called by the functions in onclick
//

// clear badguy screen
function clearDefenderDiv(divID) {
    htmlstring = "";
    htmlstring = htmlstring + '<div class="row"><button id="attack">ATTACK</button></div>';
    $(divID).html(htmlstring);
}

// clear hero row and defender row
function clearDrawings(){
    $('#enemyRow').html("Enemy Row");
    $('#defender').html("");
}

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
    for (var i = 0; i < activeplayerList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='badguy' badguyId = '" + i + "'>" + activeplayerList[i].name + "</button></div>";
    }
    console.log(htmlstring);
    $(divID).html(htmlstring);
}

//////////////////////////////////////////////////////////////////////////////////
//  Below select functions are the onclick responses
//
// select hero function 
function selectHero() {
    // game screen state 1:  

    console.log("---> select hero function");
    console.log("BEFORE: ", activeplayerList);

    // extract hero id from attrivute figherId of clicked object
    fighterId = parseInt($(this).attr("fighterId"));
    console.log("fighterId: ", fighterId)

    // set Hero global variable for battle 
    hero = activeplayerList[fighterId];
    match.enterHero(hero);
    console.log("fighter ", hero)

    // update activeplayerList by remvoing hero character
    // enemy list is a copy of characterlist

    activeplayerList.splice(fighterId, 1);
    console.log("AFTER: ", activeplayerList);

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
    badguyId = parseInt($(this).attr("badguyId"));  // !!!!!Marking References to display pieces

    // set Hero global variable for battle 
    badguy = activeplayerList[badguyId];
    match.enterVillian(badguy);
    console.log("defender", badguy)

    // update activeplayerList by extracting selected badguy
    activeplayerList.splice(badguyId, 1);
    console.log(activeplayerList);

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

    if (!match.newVillianAlive) {
        if (activeplayerList.length === 0) {
            alert("you did it!  you killed them all!!")
        } else {
            alert("Pick someone else to fight!")
        }
    } else if (match.newHeroAlive) {
        match.newHeroAttack();
        if (!match.newVillianAlive) {
            alert("you did it!  he's dead!")
            defeatedList.push(badguy);
            badguy = {};
            clearDefenderDiv("#defender");  // !!!!!Marking References to display pieces
            if (activeplayerList.length === 0) {
                alert("you did it!  you killed them all!!")
            }
        }
    } else {
        alert("Sorry you aren't alive! ");
    }


}


// reset game
function resetGame() {

    // make a deep copy of original by converting it to json and back.    
    activeplayerList = JSON.parse(JSON.stringify(playerList));  
    divID = '#herorow';
    console.log(activeplayerList);
    drawCharList(activeplayerList, divID);
    match = new Fight();
    match.init();
    hero = {};
    badguy = {};
    defeatedList = [];
    clearDrawings();
    bindEventHandlers();  // release event handlers and add new ones based on selection
}


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



//////////////////////////////////////////////////////////////////////////////////
//   setup the onclick functions for the game
// 

$(document).ready(function () {

    console.log("Testing Javascript Load");
    console.log(playerList);
    console.log(activeplayerList);

    // reset name
    resetGame();

    $('body').on("click", '#restart', resetGame);

});


//////////////////////////////////////////////////////////////
////  basic algorithm for game

function Fight() {

    /*   format of player object expected, an associative array
    {
        "name": "Konor",
        "descripton": "",
        "baseAttackPower": 4,
        "curAttackPower": 4,
        "baseHealth": 100,
        "curHealth": 100,
        "counterAttack": 4,
    },
    */

    this.init = function () {
        this.newHero = {}
        this.newVillian = {}
        this.newHeroAlive = false;
        this.newVillianAlive = false;
        this.newVillianCounterAttack = 0;
    }

    this.enterHero = function (hero) {
        this.newHero = hero; // make a copy
        this.newHeroAlive = true;
        console.log("hero is: ", this.newHero);
    }

    this.enterVillian = function (villian) {
        this.newVillian = villian;  // make a copy
        this.newVillianAlive = true;
        console.log("villian is: ", this.newVillian);
    }

    this.newHeroAttack = function () {
        if (this.newHeroAlive) {
            // villians' health is reduced by Hero's attack Power
            this.newVillian.curHealth -= this.newHero.curAttackPower;

            // mark villian as dead if his healthpoint is <= 0
            if (this.newVillian.curHealth <= 0) {
                this.newVillianAlive = false;
                console.log("YOu killed the bad guy!")
            } else {
                // if alive, counterattack power is his
                console.log(this.newVillian);
                this.newVillianCounterAttack = this.newVillian.counterAttack;
                console.log("counterattack here??", this.newVillianCounterAttack)
            }

            // if villian is alive, hero's health is reduced by counter attack!
            if (this.newVillianAlive) {
                this.newHero.curHealth -= this.newVillianCounterAttack;
            }

            // did hero survive the counter attack? 
            if (this.newHero.curHealth <= 0) {
                this.newHeroAlive = false;
                console.log("You got your but whooped")
            }

            // log results
            console.log("hero attack: " + this.newHero.curAttackPower + " villian attack: " + this.newVillianCounterAttack);
            console.log("hero health: " + this.newHero.curHealth + "  villian health: " + this.newVillian.curHealth);

            // hero attack becomes stronger only if villian is alive (allow for overkill)
            // not fair to become more powerful beating on a dead guy
            if (this.newVillianAlive) {
                this.newHero.curAttackPower += this.newHero.baseAttackPower;
            };

        } else {
            console.log("Sorry, you are dead")
        }
    }




}

