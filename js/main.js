function Player(name) {
	this.name = name
	this.inventory = [new Item("drugs", "Drugs", 10, -50),
					  new Item("martiallaw", "Martial Law", 100, 50),
					  new Item("keith", "Keith's Photos", 100, 100)]
	this.energy = 5
	this.love = 0
	this.money = 0
}

function Item(id, name, price, love_value) {
    this.id = id
	this.name = name
	this.love_val = love_value
	this.price = price
    this.instance = 0
}

function finish_game(player) {
	if(player.love == 500) {
		alert("You've won Duterte's heart and now you will make sweet love on the Presidential bed.")
	}
	else {
		alert("Duterte thinks you're an drug pusher and wants you dead.")
	}
}

function update_display(player) {
	// Update the information displayed on-screen
	$(".statName").text("Hello, " + player.name);
	$(".statCash").text("Cash: " + player.money + " PHP");
	$(".statEnergy").text(player.energy + " Energy");
	$(".statLove").text(player.love + " &hearts;");

	// Update the inventory
	inventory_html = "<h3>Inventory</h3>"
	for(i = 0; i < player.inventory.length; i++) {
		if(player.inventory[i].instance > 0) {
		    inventory_html +=  "<button type='button' class='btn btn-default valDisplay' onclick='giveItem('" + player.inventory[i].id + "')'>" + player.inventory[i].name + ": " + player.inventory[i].instance + "</span><br/>";
        }
	}
	$(".inventory").html(inventory_html);
}



// Sari-sari

function giveItem(item){
    console.log("tried to give");
    for(i = 0; i < player.inventory.length; i++) {
        if(player.inventory[i].id == item) {
            player.inventory[i].instance -= 1
            console.log("Added " + player.inventory[i].id + "!");
            $(".status").text("You gave " + player.inventory[i].name + " to Duterte! He is flattered!").fadeIn("slow");
        }  
    }
    update_display(player);
}

function buyItem(item){
	for(i = 0; i < player.inventory.length; i++) {
		if(player.inventory[i].id == item && player.money >= player.inventory[i].price) {
			player.inventory[i].instance += 1
			player.money -= player.inventory[i].price
            console.log("Added " + player.inventory[i].id + "!")
            $(".status").text("You bought " + player.inventory[i].name + "!").fadeIn("slow")
		}
	}
    update_display(player)
}
// Action Buttons


function actionWork(player) {
    if(player.energy >= 1){
        console.log("Work!")
        player.money += 200
        player.energy -= 1
        update_display(player)
    } else{
        $(".status").text("You don't have enough energy!").fadeIn("slow").delay("1000").fadeOut("slow")
    }
}

function actionSleep(player) {
    if(player.energy == 5){
        $(".status").text("Uh, do you really need to sleep?").fadeIn("slow").delay("1000").fadeOut("slow")
    } else{
        $(".status").text("Tulowg na tayo!").fadeIn("slow").delay("1000").fadeOut("slow")
    }
    console.log("Sleep!")
	// Sleep and enter the next day
	player.energy = 5
    update_display(player)
}

// Conversations
function actionTalk(player) {
    if(player.energy >= 1){
        var random;
        console.log("TALK");
        player.energy -= 1
        var random = Math.floor(Math.random() * $('.conv').length);
        $('.conv').hide().eq(random).show();
        $(".btnTalk").prop('disabled', true);
    }
    else{
        $(".status").text("You don't have enough energy!").fadeIn("slow").delay("1000").fadeOut("slow")
    }
}

function talk(result){
    if(result == "right"){
        $(".status").text("Duterte was pleased with your answer!").fadeIn("slow").delay("1000").fadeOut("slow")
        player.love += 50
    }
    if(result == "wrong"){
        $(".status").text("Duterte was anger. grrr!").fadeIn("slow").delay("1000").fadeOut("slow")
        player.love -= 10
    }
    $('.conv').fadeOut('slow')
    update_display(player)
}

player = new Player("Keith")
update_display(player)
