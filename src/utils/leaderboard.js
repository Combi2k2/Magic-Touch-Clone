var file_dir = "../Data/leaderboard.json";
let leaderboard_size = 0;

function updateLeaderboard(mode, score) {
    localStorage.setItem(leaderboard_size++, [mode, score])
}

function leaderboardElement(game_mode)  {
    var leaderboard = document.createElement("div");
    leaderboard.classList += "leaderboard";
    leaderboard.textContent = `LEADERBOARD:\r\nID  Mode    Score\r\n`;

    var scores = [];

    for(let i = 0 ; i < leaderboard_size ; ++i) {
        let data = localStorage.getItem(i).split(',');
        let data_mode  = data[0];
        let data_score = data[1];

        if (data_mode == game_mode) {
            scores.push(data_score);
            scores.sort();
            scores = scores.reverse();

            if (scores.length > 5)
                scores = scores.slice(0, 5);
        }
    }
    for(let i = 0 ; i < scores.length ; ++i)    {
        if (game_mode == 'Classic') leaderboard.textContent += `${i}.  Classic ${scores[i]}\n`;
        if (game_mode == 'Insane')  leaderboard.textContent += `${i}.  Insane  ${scores[i]}\n`;
    }
    
    return  leaderboard;
}