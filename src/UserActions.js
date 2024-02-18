import React from "react";

const UserActions = props => {
	let { state, click } = props;

	if(state.manager.toLowerCase() === state.curAcc) {
		return(
			<div style={userPart}>
				<p>Current account</p>
				<input type="text" size="50" value={state.curAcc} />
				<button style={userButtonDisabled} id="rev-winner" disabled={true} onClick={click}>Am I winner</button>
			</div>
		);
	}
	else {
		return(
			<div style={userPart}>
				<p>Current account</p>
				<input type="text" size="50" value={state.curAcc} />
				<button style={userButtonEnabled} id="rev-winner" disabled={false} onClick={click}>Am I winner</button>
			</div>
		);
	}
};

export default UserActions;

const userPart = {
	display: 'flex',
	flexFlow: 'column wrap',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	height: '250px'
}

const userButtonEnabled = {
	backgroundColor: 'paleturquoise',
	color: 'white',
	height: '10x',
	width: '150px'
}

const userButtonDisabled = {
	backgroundColor: 'red',
	color: 'whitesmoke',
	height: '10x',
	width: '150px'
}