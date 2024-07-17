#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";

 console.log("-".repeat(70));
 console.log(chalk.yellow.italic(`\t"WELCOME TO BANK CONSOLE APP"`));
 console.log("-".repeat(70));

interface BankAccount {
    accountNumber : number;
    balance:number;
  
  //VOID Return Type Mean Func Dont Return  Any Value just Perform Operation:    
    withdraw(amount :number): void
    deposite(amount :number):void
    checkBalance():void
}

//Bank Account Class:
class BankAccount implements BankAccount{
    accountNumber : number;
    balance:number;

    constructor(accountNumber :number , balance:number){
        this.accountNumber =accountNumber;
        this.balance = balance ;
    }

  //Debit Money(withdraw):
  withdraw(amount: number): void {
      if(this.balance >= amount){
        this.balance -= amount
        console.log(chalk.green(`withdrawal of $${amount} Sucessfully!. Remaning balance :$${this.balance}`));
      }
      else{
        console.log(chalk.yellowBright("You have Insufficient Balance"));
      }
  } 

  //Credidt Money(deposite):
  deposite(amount: number): void {
      if(amount > 100){
        amount -= 1; //$1 fee charge if more than 4100 is deposite:
      }this.balance += amount;
      console.log(chalk.green(`Deposit of $${amount} Sucessfully!.Remaning balance :$${this.balance}`));
  }

  //Check balance:
  checkBalance(): void {
      console.log(chalk.red(`Your Current balance is: $${this.balance}`));
  }
}

//customer Class:
class Customer{
    firstName : string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account:BankAccount;

    constructor(  firstName : string,lastName: string,gender: string,age: number,mobileNumber: number,account:BankAccount){
        this.firstName =firstName 
        this.lastName =lastName
        this.gender =gender
        this.age =age
        this.mobileNumber =mobileNumber
        this.account =account 
    }
}


//Create Bank Account:

const accounts:BankAccount [] =[
    new BankAccount (1001 ,500 ),
    new BankAccount (1002 ,1000 ),
    new BankAccount (1003 ,2000 )
];

//Create customer:
const coustomer:Customer[] =[
    new Customer("Hamza" ,"khan","Male",35 ,3162223334 , accounts[0]),
    new Customer("Ali" ,"Ahmed","Male",25 ,13227804212 , accounts[1]),
    new Customer("Asif" ,"Usman","Male",40 ,92672533498 , accounts[2])
]

//Function to Interaction with Bank Account:

 
async function BankService(){
    do{
    const accInput=await inquirer.prompt({
       name:"accNumber",
       type:"number",
       message:chalk.white("Enter Your Account Number:"),
    
    });

    const coustom = coustomer.find(customers => customers.account.accountNumber === accInput.accNumber )
    if(coustom){
        console.log(chalk.yellow(`\n\t "Welcome! ${coustom .firstName } ${coustom.lastName  }"\n`));
        const ans = await inquirer.prompt({
                name:"Select",
                type:"list",
                message:chalk.white("Select an Operation to Perform:"),
                choices:["Deposit" , "Withdraw","Check Balance" ,"Exit"]
            }
        );
        switch(ans.Select){
        case "Deposit":
            const depositeAmount = await inquirer.prompt({
                name:"amount",
                type:"number",
                message:chalk.white("Enter the amount to deposit:")
            })
            coustom.account.deposite(depositeAmount.amount);
            break; 
        case "Withdraw":
            const withdrawAmount = await inquirer.prompt({
                name:"amount",
                type:"number",
                message:chalk.white("Enter the amount to withdraw:")
            })
            coustom.account. withdraw(withdrawAmount.amount);
            break; 
        case "Check Balance":
           coustom.account.checkBalance()
           break; 
        case "Exit":
            console.log(chalk.red("Exiting Bank Program..."));
            console.log(chalk.green.italic(`\n "ThankYou for using our Bank services. have a nice day!"`))  
            return;      
        }
    }
    else{
        console.log(chalk.yellowBright("Invalid Account Number!. Please try Again"));
    }
    } while(true) 
}


BankService()
