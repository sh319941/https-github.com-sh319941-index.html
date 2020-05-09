  let blackjackgame={'you':{'scorespan':'Your-blackjack-result','div':'#your-box','score':0},
                     'dealer':{'scorespan':'dealer-blackjack-result','div':'#dealer-box','score':0 },
                     'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
                     'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
                     'wins':0,
                     'losses':0,
                     'draw':0,
                     'ishit':false,
                     'isstand':false,
                     'turnover':false,
                    };
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];
const hitsound =new Audio('C:/Users/Shine.Xavier/Desktop/Java%20Script/Challenge1/sounds/swish.mp4');
const winsound =new Audio('C:/Users/Shine.Xavier/Desktop/Java%20Script/Challenge1/sounds/cash.mp3');  
const losssound =new Audio('C:/Users/Shine.Xavier/Desktop/Java%20Script/Challenge1/sounds/aww.mp3');   
const Tiesound =new Audio('C:/Users/Shine.Xavier/Desktop/Java%20Script/Challenge1/sounds/Tie.mp3');  
document.getElementById('blackjack-hit-button').addEventListener('click', blackjackhit, false);
document.getElementById('blackjack-stand-button').addEventListener('click',blackjackstant_computer, false); 
document.getElementById('blackjack-deal-button').addEventListener('click', blackjackhitdeal, false); 

function blackjackhit()
 {
     if(blackjackgame['isstand']=== false)
     {
        let card= randomcard();
        showcard(card,YOU);
        updatescore(card,YOU);
        showsore(YOU);
        blackjackgame['ishit'] =true;
     
    }
   
 }

function randomcard()
{
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomIndex];
}

function showcard(card,activeplayer)
{
   if(activeplayer['score']<=21)
   {
    
    let cardimage =document.createElement('img');
    cardimage.src=`C:/Users/Shine.Xavier/Desktop/Java%20Script/Challenge1/images/${card}.png` ;
    document.querySelector(activeplayer['div']).appendChild(cardimage);
    hitsound.play();
    } 
}

function updatescore(card,activeplayer)
{
    if(card ==='A')
        {
            if(activeplayer['score']+blackjackgame['cardsmap'][card][1] <=21)
                {
                
                    activeplayer['score']=activeplayer['score']+blackjackgame['cardsmap'][card][1];
                }else
                {
                    activeplayer['score']=activeplayer['score']+blackjackgame['cardsmap'][card][0];
               }
        }else
        {
            activeplayer['score']=blackjackgame['cardsmap'][card]+activeplayer['score'];
        }
}
function showsore(activeplayer)
{
     if(activeplayer['score']>21)
            {
                document.getElementById(activeplayer['scorespan']).textContent='BURST!';
                document.getElementById(activeplayer['scorespan']).style.color='red';
            }else
            {
            document.getElementById(activeplayer['scorespan']).textContent=activeplayer['score'];
            }
        
}

async function blackjackstant_computer()
{
  if( blackjackgame['ishit'] === true)
  {

    if(blackjackgame['turnover']==false)
    {
    blackjackgame['isstand'] =true;
    while(DEALER['score']<17 && blackjackgame['isstand']==true)
    {
            let card= randomcard();
            showcard(card,DEALER);
            updatescore(card,DEALER);
            showsore(DEALER);
            await sleep(1000);
    }
        blackjackgame['turnover'] =true;
        let winner=computewinner();
        showresult(winner);
    }
    else
    {
        alert('Please Click Deal Again to Play');
    }
}else
{
    alert('Please complete your turn first');
}
}


function sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve,ms));
    }

function computewinner()
    {
        let winner;
        if((YOU['score'] > 21 && DEALER['score'] > 21) || (YOU['score'] == DEALER['score'] ))
        {
            
            blackjackgame['draw']++;
        }
        else if(YOU['score'] > 21 && DEALER['score'] <= 21)
        {
            blackjackgame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score'] <= 21 && DEALER['score'] > 21)
        {
            blackjackgame['losses']++;
            winner=YOU;
        }
       else if(YOU['score'] < DEALER['score'] )
        {
            blackjackgame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score'] > DEALER['score'] )
        {
            blackjackgame['wins']++;
            winner=YOU;
        }
       
    return winner;
}

function showresult(winner)
{
    let win=blackjackgame['wins'];
    let loss=blackjackgame['losses'];
    let draw=blackjackgame['draw'];
         
       let showmessage,messagecolor;
       if(winner === YOU)
       {
          document.getElementById('TotalWins').textContent=win;
           showmessage ='YOU WON';
           messagecolor ='green';
           winsound.play();
           console.log('Winning :' +blackjackgame['wins'])
       }
       else if(winner === DEALER)
       {
        document.getElementById('TotalLoss').textContent=loss;
           showmessage ='YOU LOST';
           messagecolor ='red';
           losssound.play();
           console.log('Losses :' +blackjackgame['losses'])
       }else
       {
        document.getElementById('TotalDraw').textContent=draw;
        showmessage ='YOU TIED';
        messagecolor ='yellow';
        Tiesound.play();
        console.log('draw :' +blackjackgame['draw'])
        }
    
       document.getElementById('Final-blackjack-result').textContent= showmessage;
       document.getElementById('Final-blackjack-result').style.color=messagecolor;
}
    
    

function blackjackhitdeal()
{
   if(blackjackgame['turnover']=== true)
   {
     blackjackgame['isstand'] =false;
     let yourimage =document.getElementById('your-box').querySelectorAll('img');
   
    for(let i=0;i<yourimage.length;i++)
    {
    yourimage[i].remove();
    }
    let dealerimage =document.getElementById('dealer-box').querySelectorAll('img');
    for(let i=0;i<dealerimage.length;i++)
    {
        dealerimage[i].remove();
    }
    
    YOU['score']=0;
    DEALER['score']=0;

    document.getElementById(YOU['scorespan']).textContent= YOU['score'];
    document.getElementById(DEALER['scorespan']).textContent=DEALER['score'];
    document.getElementById(YOU['scorespan']).style.color='#ffffff';
    document.getElementById(DEALER['scorespan']).style.color='#ffffff';
    document.getElementById('Final-blackjack-result').textContent='Lets Play';
    document.getElementById('Final-blackjack-result').style.color='black';
    blackjackgame['turnover'] =false;
}else
{
    alert('Please complete all Hit for you and Compauter')
}
}
 
