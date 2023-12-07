let turn = 0;
let fight = true;
const stats = [100,25,30]
const stats2 = [110,30,20]

while(fight) {
  let Z = 0;
  let newHp = 0;
  switch (turn) {
    case 0:
      Z = randomIntFromInterval(217, 255);
      newHp = ((((2/5+2)*stats[1]*60/stats2[2])/50)+2)*Z/255;
      stats2[0] = newHp;
      turn = 1;
      console.log(stats2)
      break;
  
    case 1:
      Z = randomIntFromInterval(217, 255);
      newHp = ((((2/5+2)*stats2[1]*60/stats[2])/50)+2)*Z/255;
      stats[0] = newHp;
      turn = 0;
      console.log(stats)
      break;
    }
    if (stats[0] <= 0 || stats2[0] <= 0) {
      fight = false;
    }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}