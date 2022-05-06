// var fs = require('../../fs');
// var fs = require(['fs'], function (fs) {
//     //foo is now loaded.
// });
var file_dir = "../Data/leaderboard.json";
let leaderboard_size = 0;

function updateLeaderboard(mode, score) {
    /*
    fs.readFile(file_dir, function readFileCallback(err, data)  {
        if (err)    {
            console.log(err);
            return;
        }
        var info = JSON.parse(data);
        var scores = info[mode];

        scores.push(score);
        scores.sort();
        scores = scores.reverse();

        if (scores.length > 5)
            scores = scores.slice(0, 5);
        
        info[mode] = scores;

        fs.writeFile(file_dir, JSON.stringify(info), (e) =>   {
            if (e)  throw e;
            else    console.log("JSON data is saved");
        });
    });
    */

    // function loadFile(filePath) {
    //     var result = null;
    //     var xmlhttp = new XMLHttpRequest();
    //     xmlhttp.open("GET", filePath, false);
    //     xmlhttp.send();
    //     if (xmlhttp.status==200) {
    //       result = xmlhttp.responseText;
    //     }
    //     return result;
    //   }

    // data = loadFile(file_dir)
    // var info = JSON.parse(data);
    // var scores = info[mode];

    // scores.push(score);
    // scores.sort();
    // scores = scores.reverse();

    // if (scores.length > 5)
    //     scores = scores.slice(0, 5);
    
    // info[mode] = scores;
    // console.log(info)

    // function writeFile(filePath, data) {
    //     var xmlhttp = new XMLHttpRequest();
    //     xmlhttp.open("POST", filePath, false);
    //     xmlhttp.send(JSON.stringify(data));
    // }

    // writeFile(file_dir, info)
    localStorage.setItem(leaderboard_size++, [mode, score])
    console.log(localStorage)
}
function LeaderboardElement()   {
    // fs.readFile(file_dir, function readFileCallback(err, data)  {
    //     if (err)    {
    //         console.log(err);
    //         return;
    //     }
    //     var scores = JSON.parse(data)[mode];
    //     var index = 1;

    //     var leaderboard = document.createElement("div");
    //     leaderboard.classList += "leaderboard";
    //     leaderboard.textContent = `1. ${scores[0]}}`;

    //     for(let i = 1 ; i < scores.length ; ++i)    {
    //         leaderboard.textContent += `\n${index}. `;
    //         leaderboard.textContent += `${scores[i]}`;
    //     }
        
    //     return  leaderboard;
    // });

    var leaderboard = document.createElement("div");
    leaderboard.classList += "leaderboard";
    leaderboard.textContent = `LEADERBOARD:\r\nID  Mode    Score\r\n`;

    var scores = [];

    for(let i = 0 ; i < leaderboard_size ; ++i) {
        let data = localStorage.getItem(i).split(',');
        let data_mode  = data[0];
        let data_score = data[1];

        if (data_mode == game_mode)
            scores.push(data_score)
    }
    scores.sort();
    scores = scores.reverse();

    if (scores.length > 5)
        scores = scores.slice(0, 5);
    
    for(let i = 0 ; i < scores.length ; ++i)    {
        if (game_mode == 'Classic') leaderboard.textContent += `${i}.  Classic ${scores[i]}\n`;
        if (game_mode == 'Insane')  leaderboard.textContent += `${i}.  Insane  ${scores[i]}\n`;
    }
    
    return  leaderboard;
}