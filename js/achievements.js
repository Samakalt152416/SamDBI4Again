addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[A]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
    }},
    color: "#9ecc21",
    requires: new MetaNum(0), // Can be a function that takes requirement increases into account
    resource: "Total Achievements", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4.3215, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)

tabFormat: {
    "Achievement Set 1": {
        content: ["main-display","blank", ["infobox", "lore"], "clickables", "blank", "achievements"],
        
    },
    "Secret Achievements": {
        content: ["blank"]
    },
},
    

achievements: {
    11: {
        name: "Reality's Big Bang",
    tooltip: "The first one is always free, But the second is not so free.",
    done() { return true }, 
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
},
     12: {
        name: "The Basic Beginning",
    tooltip: "Get the First Genesis Upgrade",
    done() { return hasUpgrade("c", 11) },
     onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    13: {
        name: "Try again",
    tooltip: "Reach Attempt #2",
    done() { return player.r.points.gte(2) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     14: {
        name: "Ascending Beyond Genesis",
    tooltip: "Reach Attempt #5",
    done() { return player.r.points.gte(5) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
    15: {
        name: "It Begins, For real this time. [R1S1 Finale]",
    tooltip: "Define once [Reward: AP boosts Skill gain very slightly. [Formula: (AP/25 + 1)^0.75]]",
    done() { return hasMilestone("b", 1) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
    21: {
        name: "The Meaning of Winning",
    tooltip: "Unlock Winning.",
    done() { return hasMilestone("b", 2) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },

     22: {
        name: "The Endgame!... or is it FalseGanar after all?",
    tooltip: "Win once.",
    done() { return player.w.points.gte(1) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     23: {
        name: "Too Much Power?",
    tooltip: "Beat ToNA..?",
    done() { return hasChallenge("w", 21) },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     24: {
        name: "Dialogue",
    tooltip: "Reach 10B skill, As long as you are not in ToNA chalenge.",
    done() { let status = false 
        if (player.points.gte(1e10)) status = true
        if (inChallenge("w", 21)) status = false
    return status },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
},
      25: {
        name: "Moneies!!",
    tooltip: "Unlock Cash",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     26: {
        name: "The Dimmishing Point",
    tooltip: "Reach Attempt's Softcap",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     27: {
        name: "If you lose, You win!",
    tooltip: "Apply Axiom of Winning.",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     28: {
        name: "Existence Rank [S1R2 Finale]",
    tooltip: "Reach True Ease, to introduce existence ranks [Reward: Keep Genesis Upgrades on winning and defining respectively]",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
    31: {
        name: "The Barely Nonexistence",
    tooltip: "Reach existence rank 0.1.",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
    32: {
        name: "Semiexistent Universe",
    tooltip: "Reach existence rank of 0.5",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     33: {
        name: "Difficulty Spiking.",
    tooltip: "Reach the wins softcapping point.",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    }
    },
     34: {
        name: "Integer Limitations.",
    tooltip: "Reach 9.22Qn Skill while not in ToNA Challenge.",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
},
    35: {
        name: "Existence in Life! [S1R3 Finale]",
    tooltip: "Apply Existence theorem and Exist.",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    41: {
        name: "Multiplier",
    tooltip: "Unlock Multiplier",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    42: {
        name: "Life - Day 2",
    tooltip: "Reach 24 hours in lifetime",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
     43: {
        name: "GAINS OFFLINE",
    tooltip: "Unlock Restful",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    44: {
        name: "Winner",
    tooltip: "Unlock Winpad",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    45: {
        name: "Infinity-square-rooting",
    tooltip: "Reach 3.4e38 Skill",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    46: {
        name: "World's Richest Robloxia- i mean treeians",
    tooltip: "Reach $1E12",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
    47: {
        name: "Scratched out the surface. [S1R4 Finale]",
    tooltip: "Complete Class Negative [Reward: Everything in class negative is automated, Unlock conveyor.]",
    done() { return false },
    onComplete() {
        player[this.layer].points = player[this.layer].points.add(1)
    },
    },
},
    infoboxes: {
        lore: {
        title: "Achievements",
        body() { return "Achievements are a way to see how far you progressed so far, Now let's get into the first set, The first set includes every achievement from Genesis to Class 1, Some achievements have rewards too, Now, obviously the first set is obviously going to be an already a long journey, going multiple hours of set 1 achievements." },
        
    },
},
    layerShown() {return true}
})