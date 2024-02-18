import React from "react";

const OwnerActions = props => {
	let { state, clickWithdraw, clickWinner } = props;

	const manager = state.manager.toLowerCase();
	const coOwner = state.coOwner.toLowerCase();
	
	if(manager === state.curAcc || coOwner === state.curAcc) {
		return(
			<div style={ownerPart}>
				<p>Owner's account</p>
				<input type="text" size="50" value={manager} />
				<p>The balance is: {state.balance}</p>
				<button style={ownerButtonsEnabled} id="withdraw" disabled={false} onClick={clickWithdraw}>Withdraw</button>
				<button style={ownerButtonsEnabled} id="dec-winner" disabled={false} onClick={clickWinner}>Declare Winner</button>
			</div>
		);
	}
	else {
		return(
			<div style={ownerPart}>
				<p>Owner's account</p>
				<input type="text" size="50" value={manager} />
				<p>The balance is: {state.balance}</p>
				<button style={ownerButtonsDisabled} id="withdraw" disabled={true} onClick={clickWithdraw}>Withdraw</button>
				<button style={ownerButtonsDisabled} id="dec-winner" disabled={true} onClick={clickWinner}>Declare Winner</button>
			</div>
		);
	}
};

export default OwnerActions;

const ownerPart = {
	display: 'flex',
	flexFlow: 'column wrap',
	alignContent: 'space-between',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	height: '250px'
}

const ownerButtonsEnabled = {
	backgroundColor: 'steelblue',
	color: 'whitesmoke',
	height: '10x',
	width: '150px'
}

const ownerButtonsDisabled = {
	backgroundColor: 'red',
	color: 'whitesmoke',
	height: '10x',
	width: '150px'
}