addLayer("c", {
    name: "Genesis", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-3]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new MetaNum(1),
        lifetime: new MetaNum(0),
    }},
    color: "#0c398d",
    requires: new MetaNum(0), // Can be a function that takes requirement increases into account
    resource: "Consistency", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    discount: function() {
        let total = MetaNumOne
        if (hasUpgrade("w", 12)) total = total.mul(1.25)
            return total
    },
    tabFormat: {
    "Upgrades": {
        content: ["main-display","blank", ["infobox", "lore"], "upgrades"],
        
    },
    "Information": {
        content: [["infobox", "basic"],["infobox", "softcap"],["infobox", "num"]]
    },
},
    upgrades: {
        11: {
        title: "The Genesis",
        description: "x3 Skill gain",
        cost: new MetaNum(0.001),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
          12: {
        title: "The Base Increaser",
        description: "+0.0001 base gain",
        cost: new MetaNum(0.0025),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },

         13: {
        title: "Advancing",
        description: "Skill boosts themselves [(log10(x+1)+1)^25, Cap: x3]",
        cost: new MetaNum(0.00625),
         currencyInternalName: "points",
        currencyDisplayName: "skills",
        effect() {
return player.points.add(1).log10().add(1).pow(25).min(3)
        },
        effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))}
    },
         14: {
        title: "More increase",
        description: "+0.0002 base skill gain",
        cost: new MetaNum(0.015625),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
          15: {
        title: "More increase",
        description: "+0.0001 base skill gain, x1.5 Skill gain and introduces reset layer",
        cost: new MetaNum(0.0390625),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        },
              21: {
        title: "Recursive",
        description: "Skill boosts Attempts and itself [log10(10x+1)+1]^0.5",
        cost: new MetaNum(0.5),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        
        effect() {let gain = new MetaNum(player.points.mul(10).add(1).log10().add(1).pow(0.5))
            if (hasMilestone("r", 4)) gain = gain.pow(player.r.points.add(1).log10().pow(0.5).add(1))
                if (hasUpgrade("c", 32)) gain = gain.pow(1.5)
                    gain = softcap(gain, 10, 0.1)
            return gain
        },
          effectDisplay() {return "x"+format(upgradeEffect(this.layer, this.id))},
         unlocked() {return hasMilestone("r", 3)},
        },
          22: {
        title: "First Skill",
        description: "Attempts also add base skill gain [x+1]^0.7/10000 [Cap: +1]",
        cost: new MetaNum(1),
        currencyInternalName: "points",
        currencyDisplayName: "skill",
        effect() {
            let boost = new MetaNum(player.r.points.add(1).pow(0.7).div(10000))
            let capped = true
            let softcap = new MetaNum(10)
            let hardcap = new MetaNum(1)
            if (capped = true) {
                return boost.min(hardcap)
            }
        return boost},
       effectDisplay() {return "+"+format(upgradeEffect(this.layer, this.id))+" base"},
         unlocked() {return hasMilestone("r", 3)},
        },
          23: {
        title: "Exponents all of a sudden?",
        description: "^1.01 Skill gain, here's another x3 Skill gain [Order: + > x > ^ > ^^ ...]",
        cost: new MetaNum(2),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("r", 3)},
        },
   24: {
        title: "filler",
        description: "x1.25 Skill gain",
        cost: new MetaNum(3),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
        unlocked() {return hasMilestone("r", 3)},
        },
        25: {
        title: "The REAL beginning",
        description: "x3 Skill gain, At this point, The journey begins for real.",
        cost: new MetaNum(5),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("r", 3)},
        },
        31: {
        title: "Recovery",
        description: "^1.025 Skill gain if Skill < 1000, Otherwise: x3 Skill gain",
        cost: new MetaNum(0.05),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
         32: {
        title: "Unexplainable Victory",
        description: "^1.5 recursive's effect",
        cost: new MetaNum(1e3),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
         33: {
        title: "Triangularity",
        description: "product of attempt and skill boosts wins [log10(x+1)/10+1]",
        cost: new MetaNum(1e4),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
           34: {
        title: "Weaker Softcaps",
        description: "'recursive' Softcap delays by xlog10(Skill+1)^0.8/5+1",
        cost: new MetaNum(3e5),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
          35: {
        title: "Descaled",
        description: "Attempt milestones req are /1.5",
        cost: new MetaNum(1e7),
        currencyInternalName: "points",
        currencyDisplayName: "skills",
         unlocked() {return hasMilestone("b", 2)},
        },
       
    },
    
     autoUpgrade() {return hasMilestone("b",1)},
    infoboxes: {
        lore: {
        title: "The Genesis...",
        body() { return "You found yourself in a reality that were once third dimension... now was collapsed to two dimensions, Thus also comes with pre-TFirD progression to introduce the seemingly 'endless' journey... [Yes, this is an offical port of SamDBI v4, as this is made by the owner of ROBLOX's SamDBI v4, Call this SamDBI v5: Outblox-platformized if you want, But this will be similar to SamDBI v4, Except the introductory]" },
        
    },
      num: {
        title: "Number Libary this game uses",
        body() { return "This game uses a number libary: MetaNum, MetaNum is a number libary made by dl5dl that allows for even more unfathomably large number, surpassing even the limits of ExpantaNum.js [ω+1] or hugenumber.js [ω^ω], The limit of this number libary is exactly where the well-defined BEAF ends (fε0(x) or {a, b [1 / 2] 2} in BAN), Now, Obviously, don't use it UNLESS your game is certainly exceeding ExpantaNum limits." },
        
    },
     basic: {
        title: "The VERY basic of this game",
        body() { return "Starting off with basic button simulator game with upgrade tree, Consistency boosts Skill gain by 1.3^[log10(x+1)^0.9]" },
        
    },
    softcap: {
        title: "Softcap",
        body() { "Lists every softcap in Class Negative"
            "sdashahdskajhdka" },
        
    },
    },
    layerShown() {return true}
})

addLayer("r", {
    name: "Retrying", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-2]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new MetaNum(1),
    }},
    color: "#ff9900",
    branches: "c",
    requires: new MetaNum(0.1), // Can be a function that takes requirement increases into account
    resource: "Attempts", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        if (hasMilestone("b", 1)) mult = mult.mul(2)
        if (hasUpgrade("c", 21)) mult = mult.mul(upgradeEffect("c", 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    tabFormat: {
    "Upgrades": {
        content: ["main-display","blank",["prestige-button", function() { return "Retry the " }], ["infobox", "lore"], "milestones"],
        
    },
    "Buttons": {
        content: ["clickables"]
    },
    "Information": {
        content: [["infobox", "info"]]
    },
},
    milestones: {
    1: {
        requirementDescription: "Attempt #2 - Existence's Buttons",
        effectDescription: "x3 Skill gain, Unlock Consistency buttons, Consistency will boost skill gain by 1.3^[log10(x+1)^0.9]",
        done() { return player[this.layer].points.gte(2) }
    },
    2: {
        requirementDescription: "Attempt #3 - Trial and Error",
        effectDescription: "Attempts boost Consistency [log10(x+1)^1.5+1], x2 Skill gain",
        done() { return player[this.layer].points.gte(3) }
    },
    3: {
        requirementDescription: "Attempt #5 - Post-Genesis and The Proper Beginning",
        effectDescription: "Class -1 is visible, x1.5 Skill gain, and New Genesis Upgrades",
        done() { return player[this.layer].points.gte(5) }
    },
    4: {
        requirementDescription: "Attempt #25",
        effectDescription: "Change ^25 to ^2 But the cap is removed entirely and softcapless",
        done() { return player[this.layer].points.gte(25) }
    },
     4: {
        requirementDescription: "Attempt #100",
        effectDescription: "Attempt boosts 'Recursion' by: ^[log10(x+1)^0.5+1]",
        done() { return player[this.layer].points.gte(100) }
    },
},
    clickables: {
        11: {
display() {return "Genesis | 0.0001 Skill for 1 Consistency"},
canClick() {return player.points.gte(0.0001)},
onClick() {
    player.points = player.points.sub(0.0001),
    player.c.points = player.c.points.add(1)
},
onHold() {
    player.points = player.points.sub(0.0001),
    player.c.points = player.c.points.add(1)
},
        },
        12: {
display() {return "Blissful | 0.01 Skill for 6.25 Consistency"},
canClick() {return player.points.gte(0.01)},
onClick() {
    player.points = player.points.sub(0.01),
    player.c.points = player.c.points.add(6.25)
},
onHold() {
    player.points = player.points.sub(0.01),
    player.c.points = player.c.points.add(6.25)
},
        },

 13: {
display() {return "Calmness | 1 Skill for 39.06 Consistency"},
canClick() {return player.points.gte(1)},
onClick() {
    player.points = player.points.sub(1),
    player.c.points = player.c.points.add(39.06)
},
onHold() {
    player.points = player.points.sub(1),
    player.c.points = player.c.points.add(39.06)
},
  },

  21: {
display() {return "[Primordial] The First Difficulty | 10 Skill for 100 Consistency"},
canClick() {return player.points.gte(10)},
onClick() {
    player.points = player.points.sub(10),
    player.c.points = player.c.points.add(100)
},
onHold() {
    player.points = player.points.sub(10),
    player.c.points = player.c.points.add(100)
},
  },

},

    infoboxes: {
        lore: {
        title: "Retrying",
        body() { return "After about 2-3 minutes, The player has reached the first reset layer, Resets everything to retry, However returning a boost, and now this is where 'difficulty buttons' begin to appear at right here. " },
        
    },
     info: {
        title: "Attempt",
        body() { return "Attempt is a currency reset everything previous but allows the ability for milestone boosts, This layer should not be too hard, infact it would probably take you <5 minutes to complete it, However, after this point, The game actually begins, Softcap begins at 1k." },
        
    },
    },
    
})

addLayer("b", {
    name: "Class Negative A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-1A]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new MetaNum(0),
    }},
    color: "#258300",
    branches: "r",
    requires: new MetaNum(10), // Can be a function that takes requirement increases into account
    resource: "Definitions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.3215, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    milestones: {
    1: {
        requirementDescription: "Definition #1 - Rating",
        effectDescription: "x2 Skill, +0.001 base skill gain, x2 Attempt gain, Automate Genesis, Define 'rating' as log10(Skill+1)^0.75, And unlock difficulty buttons",
        done() { return player[this.layer].points.gte(1) }
    },
    2: {
        requirementDescription: "Definition #2 - Winning",
        effectDescription: "Define 'winning' as a sub-layer",
        done() { return player[this.layer].points.gte(2) }
    },
     3: {
        requirementDescription: "Definition #3 - Progression",
        effectDescription: function() {
            let amount = new MetaNum(1.8)
           return "Every definition gives x"+amount+" skill gain compounding"},
        done() { return player[this.layer].points.gte(3) }
    },
    
},
    infoboxes: {
        lore: {
        title: "The Actual Beginning",
        body() { return "The grind begins here and now, You have reached the first actual difficulty out of potentially thousands, and you have scratched out the surface [aka. The very basic of the mechanics]" },
        
    },
    },
  layerShown() {
        if (inChallenge("w", 21)) return false
        else return true},
})

addLayer("b", {
    name: "Class Negative A", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[-1A]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new MetaNum(0),
    }},
    color: "#258300",
    branches: "r",
    requires: new MetaNum(10), // Can be a function that takes requirement increases into account
    resource: "Definitions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.3215, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)

    milestones: {
    1: {
        requirementDescription: "Definition #1 - Rating",
        effectDescription: "x2 Skill, +0.001 base skill gain, x2 Attempt gain, Automate Genesis, Define 'rating' as log10(Skill+1)^0.75, And unlock difficulty buttons",
        done() { return player[this.layer].points.gte(1) }
    },
    2: {
        requirementDescription: "Definition #2 - Winning",
        effectDescription: "Define 'winning' as a sub-layer",
        done() { return player[this.layer].points.gte(2) }
    },
     3: {
        requirementDescription: "Definition #3 - Progression",
        effectDescription: "Every definition gives 30%(c) skill gain, (c) is defined as compounding",
        done() { return player[this.layer].points.gte(3) }
    },
    
},
    infoboxes: {
        lore: {
        title: "The Actual Beginning",
        body() { return "The grind begins here and now, You have reached the first actual difficulty out of potentially thousands, and you have scratched out the surface [aka. The very basic of the mechanics]" },
        
    },
    },
  layerShown() {
        if (inChallenge("w", 21)) return false
        else return true},
})

addLayer("w", {
    name: "Winning", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[W]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new MetaNum(0),
    }},

    color: "#585858",
    branches: "b",
    requires: function() {
        return new MetaNum(100)
    }, // Can be a function that takes requirement increases into account
    resource: "Wins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: function() {
        if (inChallenge("w", 21)) return new MetaNum(0.0001)
        return new MetaNum(.1)
    },  // Prestige currency exponent
     
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
upgrades: {
 11: {
        title: "First Win",
        description: "x3 Attempt gain, x1.3 Skill gain, and unlocks more upgrades... Boring.",
        cost: new MetaNum(1),
        },
    12: {
        title: "First Win",
        description: "Unlock Challenges, /1.25 Genesis Prices.",
        cost: new MetaNum(2),
        },
         13: {
        title: "what to name?",
        description: "Unlock attempt upgrades in the milestones tab.",
        cost: new MetaNum(4),
        },
        14: {
        title: "Nerfer 0",
        description: "Challenge 12 goal gets nerfed by 75%",
        cost: new MetaNum(9),
        },
        21: {
        title: "Cash generator.",
        description: "Unlock the cash layer.",
        cost: new MetaNum(15),
        },
    },

challenges: {
    11: {
        name: "The First Tower",
        challengeDescription: "[INFORMATION: REDACTED, TOO EASY TO HAVE ONE]",
        canComplete() {return player.points.gte(0)},
        goalDescription: "Free Win.",
        rewardDescription: "Nothing, because it does not need one.",
        },
         12: {
        name: "The None Tower",
        challengeDescription: "[DEBUFF: /100 Skill gain]",
        canComplete() {
               let goal = new MetaNum(1)
            if (hasUpgrade("w", 14)) goal = goal.div(4)
            return player.points.gte(goal)},
        goalDescription: function() {
            let goal = new MetaNum(1)
            if (hasUpgrade("w", 14)) goal = goal.div(4)
            return "get "+goal+" skill"
        },
        rewardDescription: "Definition boosts attempts by x2 each compounding.",
        },
         13: {
        name: "It Is Impossible To Know If Its a Tower Or Not Because It Is So Easy That It Doesnt Even Exist",
        challengeDescription: "[DEBUFF: Square-root your skill gain]",
        canComplete() {return player.points.gte(100)},
        goalDescription: "Reach 100 Skill.",
        rewardDescription: "x1.25 Skill gain",
        },
         21: {
        name: "Tower of Negative Abyss",
        challengeDescription: "[DEBUFF: x9999 skill gain, ^2 Skill gain in challenge, But you can't do win reset, definition layer is invisible], Once you complete this challenge, This will be invisible and it is an permanent challenge completion. ",
        canComplete() {return player.points.gte(1e20)},
        unlocked() {
            let status = false
            if (hasUpgrade("w", 12)) status = true
           if (hasChallenge("w", 21)) status = true
           return status
        },
        goalDescription: "Reach 1e108 Skill.",
        rewardDescription: "Permanently unlock bonus content that do not affect the progression.",
        },
},
    infoboxes: {
        lore: {
        title: "Winning",
        body() { return "No, this is not the endgame of this game, Winning reset everything that have row value less than 2, In return you get win(s), Which is used for.. again, More upgrades, However, One thing you unlock is challenges, To clarify, you do not need to complete these challenges, as the reward is not very strong." },
        
    },
    },
    layerShown() {return hasMilestone("b", 2)}
})

addLayer("w", {
    name: "Winning", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "[W]", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new MetaNum(0),
    }},

    color: "#585858",
    branches: "w",
    requires: function() {
        return new MetaNum(0)
    }, // Can be a function that takes requirement increases into account
    resource: "Cash", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: function() {
        if (inChallenge("w", 21)) return new MetaNum(0.0001)
        return new MetaNum(.1)
    },  // Prestige currency exponent
     
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(0.0001)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new MetaNum(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
passiveGeneration() {return hasMilestone("b", 3)},
    layerShown() {return hasMilestone("b", 3)}
})




