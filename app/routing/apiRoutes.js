var path = require('path');
var friend = require("../data/friends");

//Add up the differences to calculate the totalDifference
var totalDifference = 0;


// ROUTING

module.exports = function (app) {
  
  //GET Requests
  

  app.get("/api/friends", function (req, res) {
    res.json(friend)
    console.log(friend)
  });


  //POST Requests

  app.post('/api/friends', function (req, res) {
    var friendSubmittal = req.body;

    //pushes to array

    friend.push(friendSubmittal);

    //object 2 friend user array who submitted survey

    var surveyDude = friend.length - 1;

    //Total difference variable

    var totalDifference = 0;

    //Lowest score match

    var lowestScore = 1000;
    var friendMatching;
    
    //For loop that goes through each friend, second loop through each score
    
    for (var i = 0; i < friend.length - 1; i++) {
      for (var j = 0; j < 10; j++) {
       
        //Difference in score
        var diff = friend[i].scores[j] - friend[surveyDude].scores[j];
       
        //Getting the absolute value of the difference
        diff = Math.abs(diff);
       
        //Calculating the total difference for all numbers
        totalDifference = totalDifference + diff;
      }
     
      //Checking to see which one has the lowest score
      if (totalDifference < lowestScore) {
        lowestScore = totalDifference;
       
        //assigning the friendMatching the value
        friendMatching = friend[i];
      }
      totalDifference = 0;
    }
   
    //Response in JSON format
    res.json(friendMatching);

    var lowestScore = 1000;

  });

}