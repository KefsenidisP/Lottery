import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import web3 from './web3';
import lottery from './lottery'
import BidButtons from './BidButtons';
import OwnerActions from './OwnerActions';
import UserActions from './UserActions';
import ContractManagement from './ContractManagement';

class App extends Component {

  state = {
    manager: '',
    coOwner: '',
    balance: '',
    laptopBids: '',
    carBids: '',
    phoneBids: '',
    curAcc: '',
    winners: [],
    meta: '',
    stage: '',
    newOwner: '',
    message: ''
  };

  async componentDidMount() {
    // Metamask existence check
    try {
      const manager = await lottery.methods.beneficiary().call();
      const coOwner = await lottery.methods.coOwner().call();
      let balance = await lottery.methods.getBalance().call();
      const stage = await lottery.methods.stage().call();

      balance = web3.utils.fromWei(balance, 'ether');

      this.setState({ manager, coOwner, balance, stage: stage.toString() });

      if(!this.eventListenersSet) {
        this.setupEventListeners();
        this.eventListenersSet = true;
      }

      // Mertamask connection check
      try {
        const curAcc = await (await window.ethereum.request({ method: 'eth_requestAccounts'}))[0];
        const meta = true;
        
        this.setState({ curAcc, meta });

        await this.bidCount();

        // Timed reload. Every 30 seconds
        setTimeout(() => {
          window.location.reload(false);
        }, 5000 * 6);
      }
      catch(error) {
        const meta = false;
        this.setState({ message: 'Connection to Metamask failed!', meta });
        alert(this.state.message);
      }
    }
    catch(error) {
      const meta = false;
      this.setState({ message: 'Install Metamask in order to interact with the app, or use the sepolia testnet!', meta });
      alert(this.state.message);
    }
  }

  // Change account in Metamask event listener 
  setupEventListeners() {
    window.ethereum.on('accountsChanged', (accounts) => {
      const curAcc = accounts[0];
      this.setState({ curAcc });
    });

    lottery.events.BidBuyer().on('data', () => {
      alert("A user just bought a ticket!");
    });
  }

  async bidCount() {
    const bids = await lottery.methods.getBidNum().call();
    const laptopBids = bids[0].toString();
    const carBids = bids[1].toString();
    const phoneBids = bids[2].toString();

    this.setState({ laptopBids, carBids, phoneBids });
  }

  // The function that handles the bid trxs
  async bid(item) {
    this.setState({ message: 'Transaction pending...' });

    await lottery.methods.bid(item).send({
      from: this.state.curAcc,
      value: web3.utils.toWei('10', 'finney')
    });

    this.setState({ message: 'Transaction successful!' });

    // Call the function handling the bid number change
    await this.bidCount();
  }

  // The bid listsner
  onBid = async (event) => {
    event.preventDefault();

    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();
    const button = event.currentTarget.id;

    if(manager !== this.state.curAcc && coOwner !== this.state.curAcc && this.state.stage === "1") {
      if(button === "laptop") {
        await this.bid(0);
      }
      else if(button === "car") {
        await this.bid(1);
      }
      else if(button === "phone") {
        await this.bid(2);
      }
    }
  };

  // The function used by the owner to withdraw money from the balnce to his account
  withdraw = async (event) => {
    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(coOwner === this.state.curAcc || manager === this.state.curAcc) {
      await lottery.methods.withdraw().send({
        from: manager
      });
    }
  }

  // Check if the user is the winner
  checkWinner = async (event) => {
    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(coOwner !== this.state.curAcc && manager !== this.state.curAcc) {
      const winners = await lottery.methods.getWinners().call();
      let winner = false;
      let message = 'You have won ';
      
      for(let i = 0; i < winners.length; i++) {
        if(winners[i].toLowerCase() === this.state.curAcc) {

          this.setState({ message: 'You are the winner!' })
          winner = true;

          switch(i) {
            case 0:
              message += ' a laptop';
              break;
            case 1:
              message += ' a car';
              break;
            case 2:
              message += ' a phone';
              break; 
            default:
              this.setState({ message: 'This should never be reached' });
              break;
          }
        }
      }

      if(!winner) {
       message = 'Sorry but you have won no items!';
      }
      else {
        message += '!';
        
      }

      alert(message);

      this.setState({ message });
    }
  }

  // Owner declares the winner
  decWinner = async (event) => {
    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(manager === this.state.curAcc || coOwner === this.state.curAcc) {
      await lottery.methods.revealWinners().send({
        from: this.state.curAcc
      });
    }
  }

  reset = async (event) => {
    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(manager === this.state.curAcc || coOwner === this.state.curAcc) {
      await lottery.methods.reset().send({
        from: this.state.curAcc
      });
    }
  }

  changeOwner = async (event) => {
    event.preventDefault()

    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(manager === this.state.curAcc || coOwner === this.state.curAcc) {
      await lottery.methods.changeOwner(this.state.newOwner).send({
        from: this.state.curAcc
      });
    }
  }

  destroy = async (event) => {
    const manager = this.state.manager.toLowerCase();
    const coOwner = this.state.coOwner.toLowerCase();

    if(manager === this.state.curAcc || coOwner === this.state.curAcc) {
      await lottery.methods.destroyContract().send({
        from: this.state.curAcc
      });
    }
  }

  write = async (event) => {
    this.setState({ newOwner: event.target.value });
  }

  render() {
    if(this.state.meta) {
      return (
      <div style={page}>
        <h2 class="text-center">Lottery Contract</h2>

        <hr/>
        
        <div>
          <h2 class="text-center">Bet on the following items!</h2>
          <BidButtons state={this.state} click={this.onBid} />
        </div>

        <hr/>

        <div style={accInfoSection}>
          <UserActions state={this.state} click={this.checkWinner} />
          <ContractManagement state={this.state} clickReset={this.reset} clickChange={this.changeOwner}  clickKill={this.destroy} changed={this.write} />
          <OwnerActions state={this.state} clickWithdraw={this.withdraw} clickWinner={this.decWinner} />
        </div>
      </div>
      );
    }
    else {
      return(
        <div>
          <h1>{this.state.message}</h1>
        </div>
      )
    }
  }
}

export default App;

// Page item allignment
const page = {
  display: 'block',
  padding: 30,
  alignContent: 'center',
};

const accInfoSection = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-around'
}