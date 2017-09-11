export function showLeaderboard(){
  console.log("showLeaderboard ran");
  //this refers to component
 const leaderboardDIV = document.querySelector("div.leaderboard");
 leaderboardDIV.classList.remove("hidden");
 leaderboardDIV.style.top = "0";
};
//-----------------------
