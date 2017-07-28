function Player(name) {
	this.name = name
	this.inventory = [new Item("Drugs", 10, -50),
					  new Item("Martial Law", 100, 50),
					  new Item("Keith's Photos", 100, 100)]
	this.energy = 10
	this.love = 0
	this.money = 0
	this.day = 1
	this.current_action = ""
	this.location = ""
}

function Item(name, price, love_value) {
	this.name = name
	this.love_val = love_value
	this.price = price
	this.instance = 0
}

function buy_item(player, item_name) {
	// Increase instances of item in inventory
	// Reduce player money
	for(i = 0; i < player.inventory.length; i++) {
		if(player.inventory[i].name == item_name && player.money >= player.inventory[i].price) {
			player.inventory[i].instance += 1
			player.money -= player.inventory[i].price
		}
	}
}

function give_item(player, item_name) {
	// Reduce instance of item in inventory
	// Increase love meter
	for(i = 0; i < player.inventory.length; i++) {
		if(player.inventory[i].name == item_name && player.inventory[i].instance > 0) {
			player.inventory[i].instance -= 1
			player.love += player.inventory[i].love_val
		}
	}
}

function sleep(player) {
	// Sleep and enter the next day
	player.energy = 10
	player.day += 1
}

function update_display(player) {
	// Update the information displayed on-screen
	$(".statName").text("Hello, " + player.name)
	$(".statCash").text("Cash: " + player.money + " PHP")
	$(".statEnergy").text(player.energy + " Energy")
	$(".statLove").text(player.love + " <3")
	$(".statDay").text("Day " + player.day)

	// Update the inventory
	inventory_html = "<h3>Inventory</h3>"
	for(i = 0; i < player.inventory.length; i++) {
		if(player.inventory[i].instance > 0) {
			inventory_html += player.inventory[i].name + ": " + player.inventory[i].instance + "<br/>"
		}
	}
	$(".inventory").html(inventory_html)
	$(".statLocation").text(player.location)
}

function update_location(player, location) {
	player.location = location

	// Update action buttons depending on location
	if(location == "Home") {
		$(".btnThree").html("Sleep")
		$(".btnThree").click(function() {
			sleep(player)
			update_display(player)
		})
	}

	if(location == "Sari-sari store") {
		$(".btnOne").html("Buy "+player.inventory[0].name)
		$(".btnOne").click(function() {
			buy_item(player, player.inventory[0].name)
			update_display(player)
		})
		$(".btnTwo").html("Buy "+player.inventory[1].name)
		$(".btnTwo").click(function() {
			buy_item(player, player.inventory[1].name)
			update_display(player)
		})
		$(".btnThree").html("Buy "+player.inventory[2].name)
		$(".btnThree").click(function() {
			buy_item(player, player.inventory[2].name)
			update_display(player)
		})
	}
	update_display(player)
}

player = new Player("Keith")
update_display(player)
update_location(player, "Home")

$(".locOne").click(function() {
	update_location(player, "Home")
})
$(".locTwo").click(function() {
	update_location(player, "Malacanang")
})
$(".locThree").click(function() {
	update_location(player, "Sari-sari store")
})
