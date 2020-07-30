function userCard(num) {
    let card = {
        balance:100,
        transactionLimit:100,
        historyLogs:[],
        key:num
    }
    function getCardOptions() {
        return card
    }
    function putCredits(amount){
        card.balance += amount;
        historyLog('Reciving Money',amount)
    }

    function takeCredits(amount) {
        if (amount <= card.balance && amount <=card.transactionLimit ) {
            card.balance -= amount;
            historyLog('Send Money',amount)
        }else {
            console.error('error')
        }

    }

    function setTransactionLimit(newLimit) {
        card.transactionLimit = newLimit;
        historyLog('new limit',newLimit)
    }

    function transferCredits(money , cardToSendMoney) {
        let  moneyWithTax = money - money*0.05;
        if(money > card.balance){
            console.log('not enoght money');
        }else if(money > card.transactionLimit){
            console.log('you have reached maximum transaction limit');
        } else {
            historyLog('Send Money',money)
            card.balance -= money
            cardToSendMoney.putCredits(moneyWithTax)

        }
    }
    function historyLog(operationType, credits) {
        let obj = {
            operationType,
            credits,
            operationTime : new Date().toLocaleString("en-US")
        }
        card.historyLogs.push(obj)
    }

    return{
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits
    }
}





class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }
    addCard(){
        if (this.cards.length > 3){
             console.log('user already have maximum amount of cards')
        }else {
            this.cards.push(userCard(this.cards.length +1))
        }
    }
    getCardByKey(num){
        return this.cards[num - 1]
    }
}

let bob = new UserAccount('Bob');
bob.addCard()
bob.addCard()
let bobsCard1 = bob.getCardByKey(1);
let bobsCard2 = bob.getCardByKey(2);
bobsCard1.putCredits(200)
bobsCard2.putCredits(200)



bobsCard1.transferCredits(50,bobsCard2)
console.log(bobsCard1.getCardOptions());
console.log(bobsCard2.getCardOptions());


// Значить так. #task
// Необхіжно реалізувати друкарську машинку.
//     У вас є інпут. Ви в нього ввожите якусь слово і тицькаєте кнопку "друкувати".
//
//     Після того як ви тикнули кнопку вам необхідно запустити функцію яка буде друкувтаи на строніці то, шо ви ввели по одній букві з рандомною затримкою від 0.1 до 0.5 секунд.
//     Тим самим симулюючи друкування цього тексту реальною людиною.
//     НА КОЖНУ БУКВА РІЗНА ЗАТРИМКА !

let btn = document.getElementById('btn');
let inp = document.getElementById('elem');
let  p =  document.getElementById('text');

btn.onclick = ()=>{
  let text = inp.value;
  p.innerText = '';
  let  i = 0;
  function print() {
    let randomTime   = (Math.floor(Math.random()*(5- 1 + 1)) +1)*100


      if(i < text.length){
          p.innerText += text[i]
          setTimeout(print, randomTime)
      }else {
          return
      }
      i++;
  }
    print()
}


