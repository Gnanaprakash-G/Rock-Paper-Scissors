let Totolscore=JSON.parse(localStorage.getItem('score'))||{
  wins:0,losses:0,ties:0
}
update()
let isauto=false
let intervalid;
function auto()
{
  if (!isauto)
  {
    document.querySelector('.autoplay-btn').innerHTML='Stop Play'
    intervalid=setInterval(function()
    {
      game(pickCompMove(),pickCompMove())
    },1000)
    isauto=true
  }
  else{
    document.querySelector('.autoplay-btn').innerHTML='Auto Play'
    clearInterval(intervalid)
    isauto=false
  }
}
function update()
{
  document.querySelector(".js-scoreinfo").innerHTML=`Wins:${Totolscore.wins},Losses:${Totolscore.losses},Ties:${Totolscore.ties}`
}
function render(score)
{
  if (score==-1)
  {
    Totolscore.losses=0
    Totolscore.wins=0
    Totolscore.ties=0
  }
  else if (score==0)
  {
    Totolscore.ties+=1
  }
  else if (score==1)
  {
    Totolscore.losses+=1
  }
  else if (score==2)
  {
    Totolscore.wins+=1
  }
  localStorage.setItem('score',JSON.stringify(Totolscore))
  update()
}
document.querySelector('.js-movebtn1').addEventListener('click',() =>{
  game('rock')
})
document.querySelector('.js-movebtn2').addEventListener('click',() =>{
  game('paper')
})
document.querySelector('.js-movebtn3').addEventListener('click',() =>{
  game('scissor')
})
document.querySelector('.autoplay-btn').addEventListener('click',() =>{
  auto()
})
document.querySelector('.rst-btn').addEventListener('click',() =>{
      render(-1)
      if(isauto)
      {
        auto()
      }
      localStorage.removeItem('score')
})
document.body.addEventListener('keydown',(event) =>{
      if (event.key==='r')
      {
        game('rock')
      }
      else if (event.key==='p')
      {
        game('paper')
      }
      else if (event.key==='s')
      {
        game('scissor')
      }
})

function game(mymove)
{
  let cm=pickCompMove();
  let result=''
  if (cm==mymove)
  {
    result='Tie'
    render(0)
  }
  else if ((cm=='paper' && mymove=='rock')||(cm=='rock' && mymove=='scissor')||(cm=='scissor' && mymove=='paper'))
  {
    result='You Lose'
    render(1)
  }
  else
  {
    result='You Win'
    render(2)
  }

  document.querySelector('.js-wininfo').innerHTML=result

  document.querySelector('.js-moves').innerHTML=`you
  <img class="move-icon" src="img/${mymove}-emoji.png" alt="">
  <img class="move-icon" src="img/${cm}-emoji.png" alt="">
  computer`
}
function pickCompMove()
{
  let cm=''
  const randnum=Math.floor(Math.random()*3)
  if (randnum==0)
  {
    cm='rock'
  }
  else if (randnum==1)
  {
    cm='paper'
  }
  else
  {
    cm='scissor'
  }
  return cm
    }