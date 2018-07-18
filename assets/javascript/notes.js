function drawHeroRow() {
    console.log("stuff");
}


BEFORE:     

function drawEnemyRow() {
    var htmlstring = ""
    // draws the enermy rows along with the class
    for (var i = 0; i < activeplayerList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='badguy' badguyId = '" + i + "'>" + activeplayerList[i].name + "</button></div>";
    }
    console.log(htmlstring);
    $(divID).html(htmlstring);
} 

$(document).ready(function () {

    drawHeroRow();
    
    // click to select hero, after hero is clicked, it will call function to draw the row of the enemies
    $(".fighter").on("click", drawEnemyRow);

    // click to select badguy.  
    $(".badguy").on("click", drawDefender);

    // click to attack
    $("#attack").on("click", drawAttack);

});




AFTER: 

function drawEnemyRow() {
    var htmlstring = ""
    for (var i = 0; i < activeplayerList.length; i++) {
        htmlstring = htmlstring + "<div class='col-sm-2'><button class='badguy' badguyId = '" + i + "'>" + activeplayerList[i].name + "</button></div>";
    }
    console.log(htmlstring);
    $(divID).html(htmlstring);
} 

$(document).ready(function () {

    drawHeroRow();
    
    /// click to select hero, after hero is clicked, it will call function to draw the row of the enemies
    $("body").on("click", ".fighter", drawEnemyRow);

    // click to select bad guy
    $("body").on("click", ".badbuy", drawDefender);

    // click to attack
    $("body").on("click", "#attack", drawAttack);

});
