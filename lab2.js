/*********************************************************
LAB 2: SORTING AND CAMPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour
*/

// make a constructor function, called Blob, that makes blobs
function Blob(name) {
    this.name = name;
}

// create an instance of Blob named blob
var blob = new Blob(blob);

// declare variables & initial conditions for calculating the blob takeover
var pplConsumed =  0;
var pplRemaining = 1000;
var rateOfConsumption = 1;
var hoursSpentInDowington = 0;

// use a loop to calc how long it took blob to finish with Dowington
// initialize i (hours) to 1
for (var i = 1, j = rateOfConsumption; pplRemaining > 0 ; i++, j++) {
  hoursSpentInDowington = i;
  rateOfConsumption = j;
  pplRemaining = pplRemaining - rateOfConsumption;
}

console.log("hoursSpentInDowington is " + hoursSpentInDowington);

 // assign hoursSpentInDowington the value of the above calculation
 hoursSpentInDowington = 45;

// create a function that takes a population for an arbitrary town,
// and the starting consumption rate, and returns the number of hours
// the blob needs to ooze its way through that town

function hoursToOoze(population, peoplePerHour) {
  var hours = 0;
  var pop = population;
  var pph = peoplePerHour;

// use a loop to calc how long it took blob to finish with Dowington
// initialize i (hours) to 1
  for (var i = 1, j = pph; pop > 0; i++, j++) {
      pph = j;
      hours = i;
      pop -= pph;
    }
  console.log("hours is " + hours);
  return hours;
}

// create a method, Blob.hoursToOoze, and assign it the above function, hoursToOoze
Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
assert(blob.hoursToOoze(1000, 0) === 46, "lazy blob takes the 1st hour off.");
assert(blob.hoursToOoze(5, 5) === 1, "small town + hungry blob === 1 hour.");

assert(blob.hoursToOoze(500000, 1) === 1000, "500,000 takes only 1,000 hrs");

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

function SentientBeing (homePlanet, language) {
  this.homePlanet = homePlanet;
  this.language = language;
  this.hello = hello[this.language];
  this.sayHello = function(sb) {
    console.log(this.hello);
    return sb.hello;
  };
}

// Create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).
var klingon = new SentientBeing('Qo"noS', "klingon");
var romulan = new SentientBeing("Romulus", "romulan");
var human = new SentientBeing("Earth", "federation standard");

function Klingon() {}
function Romulan() {}
function Human() {}
Human.prototype = new SentientBeing("Earth", "federation standard");
Klingon.prototype = new SentientBeing('Qo"noS', "klingon");
Romulan.prototype = new SentientBeing("Romulus", "romulan");

assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
assert((new Human()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Romulan()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
assert((new Romulan()).sayHello(new Human()) === "hello",
  "the human should hear hello");
assert((new Klingon()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Klingon()).sayHello(new Human()) === "hello",
  "the human should hear hello");

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one
//*********************************************************
function lastLetterSort(stringArray) {

  function byLastLetter(a, b) {

    var lastCharA = a.charAt(a.length - 1).toLowerCase();
    var lastCharB = b.charAt(b.length - 1).toLowerCase();

    console.log(lastCharA.charCodeAt(0));
    console.log(lastCharB.charCodeAt(0));
    return lastCharA.charCodeAt(0) - lastCharB.charCodeAt(0);
  }
  return stringArray.sort(byLastLetter);
}

function sumArray(numberArray) {
  var sum = 0;
  numberArray.forEach(function(currentValue, index, arrary) {
    sum += currentValue;
  });
  return sum;
}

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(arrayA, arrayB) {
    return sumArray(arrayA) - sumArray(arrayB);
  });
}

// Test Cases:
var myArray = [1, 2, 3, 4, 5];
console.log("The sum of myArray is " + sumArray(myArray));

var bigArray = [
                [1, 2, 3, 4, 5],
                [1, 2, 3,],
                [1, 2]
              ];

console.log(bigArray);

sumSort(bigArray);
console.log(bigArray);

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
