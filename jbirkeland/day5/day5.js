//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");

class GameMatch {
  constructor() {
    this.id = gameList.length + 1000;
    this.turn = 0; //This is the index of this.players whose turn it is
    this.players = [];
    this.round = 0;
  }
}

class Character {
  constructor(name, race, profession) {
    this.id = characterList.length + 1000;
    this.name = name
    this.race = race
    this.profession = profession
    this.equipment = {
      head: {},
      chest: {},
      legs: {},
      arm_p: {},
      arm_s: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: 5,
      defense: 5,
      hp_current: 20,
      hp_max: 20
    }
    //This method searches for an item in the itme list with this name
    //And adds it to this character's inventory
    this.pickupItem = function(searchName) {
      console.log(this);
      for (var item of item_list) {
        console.log(item.name);
        if (item.name == searchName) {
          console.log("Found a match!");
          this.inventory.push(item);
          break;
        }
      }
    }
    //This method searches for a given slot and overwrites
    //it with an empty object
    this.unequipItem = function(slot) {
      for (var slotName in this.equipment) {
        console.log(slotName);
        if (slotName == slot) {
          console.log("Found item slot. Removing.");
          this.equipment.slotName = {};
          break;
        }
      }
    }
  }
}

// This holds all possible items
var item_list = [{
    name: 'Sword',
    slot: 'arm_p',
    bonuses: {
      attack: 5
    }
  },
  {
    name: 'Shield',
    slot: 'arm_s',
    bonuses: {
      defense: 5
    }
  }
];

var gameList = [];

//Create character list with two default characters
var characterList = []
characterList.push(new Character('Yer Boi', 'Heretic Astartes', 'Noise Marine'))
characterList.push(new Character('Yer Gal', 'Heretic Astartes', 'Noise Marine'))

for (character of characterList) character.pickupItem('Sword');

// Create a GET endpoint
app.get('/game', (req, res) => {
  var foundGame = characterList.find(character => character.id == req.query.gameid)
  if (foundGame) {
    if (req.query.addcharacter) {
      if (foundGame.players.length < 2) {
        var foundProfile = characterList.find();
      }
    }
    //Render a template called 'game' from the 'views' folder
    //And send it a variable called "sendData"
    res.render('game', {
      sendData: foundGame
    })
  } else {
    res.redirect('/newgame');
  }
});

//This endpoint creates a new game
app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch())
  res.redirect('/game/?gameid=' + characterList[characterList.length - 1].id)
});

// Create a GET endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid)
  if (foundProfile) {
    //Render a template called 'profile' from the 'views' folder
    //And send it a variable called "sendData"
    res.render('profile', {
      sendData: foundProfile
    })
  } else {
    res.redirect('/newprofile');
  }
});

//This endpoint creates a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('Yer Gal', 'Heretic Egirl', 'Noise Marine'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
});

//Start an http listen server
app.listen(3000);
