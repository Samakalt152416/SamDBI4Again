let modInfo = {
	name: "The Modding Tree",
	id: "mymod",
	author: "",
	pointsName: "Skill",
	discordName: "",
	discordLink: "",
	initialStartPoints: new MetaNum(0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "ω",
	name: "Just Nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- isEndgame now always return false.<br>
		- 3/5 layers to sharing the release to discord.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new MetaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new MetaNum(0)
 let gain = new MetaNum(0.0001)
	if (hasUpgrade("c", 12)) gain = gain.add(0.0001)
		if (hasUpgrade("c", 14)) gain = gain.add(0.0002)
if (hasUpgrade("c", 15)) gain = gain.add(0.0001)
	if (hasMilestone("b", 1)) gain = gain.add(0.001)
if (hasUpgrade("c", 22)) gain = gain.add(upgradeEffect("c", 22))

	if (hasUpgrade("c", 11)) gain = gain.mul(3)
	if (hasUpgrade("c", 13)) gain = gain.mul(upgradeEffect("c", 13))
	if (hasUpgrade("c", 15)) gain = gain.mul(1.5)
		if (hasUpgrade("c", 23)) gain = gain.mul(3)
if (hasMilestone("r", 1)) gain = gain.mul(3)
	effecta = player.c.points.add(1).log10().pow(0.9)
            expoef = new MetaNum(1.3).pow(effecta)
	if (hasMilestone("r", 1)) gain = gain.mul(expoef)
	if (hasMilestone("r", 2)) gain = gain.mul(2)
	if (hasMilestone("r", 3)) gain = gain.mul(1.5)
		if (hasMilestone("b", 1)) gain = gain.mul(2)
			if (hasUpgrade("c", 24)) gain = gain.mul(1.25)
				if (hasUpgrade("c", 25)) gain = gain.mul(3)
					if (hasUpgrade("c", 21)) gain = gain.mul(upgradeEffect("c", 21))
						if (inChallenge("w", 21)) gain = gain.mul(9999)
if (inChallenge("w", 12)) gain = gain.div(100)

						if (inChallenge("w", 21)) gain = gain.pow(2)
							if (inChallenge("w", 13)) gain = gain.pow(0.5)
					if (hasUpgrade("c", 23)) gain = gain.pow(1.01)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

