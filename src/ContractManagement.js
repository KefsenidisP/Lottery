import React from "react";

const ContractManagement = props => {
  let { state, clickReset, clickChange, clickKill, changed } = props;

  const manager = state.manager.toLowerCase();
	const coOwner = state.coOwner.toLowerCase();
	
	if(manager === state.curAcc || coOwner === state.curAcc) {
		return(
			<div style={ownerPart}>
				<p>New owner's account</p>
				<input type="text" size="50" value={state.newOwner} onChange={changed} />
				<button style={ownerButtonsEnabled} id="reset" disabled={false} onClick={clickReset}>Reset</button>
				<button style={ownerButtonsEnabled} id="chg-owner" disabled={false} onClick={clickChange}>Change Owner</button>
        <button style={ownerButtonsEnabled} id="kill" disabled={false} onClick={clickKill}>Destroy</button>
			</div>
		);
	}
	else {
		return(
			<div style={ownerPart}>
				<p>New owner's account</p>
				<input type="text" size="50" value={state.newOwner} onChange={changed} />
				<button style={ownerButtonsDisabled} id="reset" disabled={true} onClick={clickReset}>Reset</button>
				<button style={ownerButtonsDisabled} id="chg-owner" disabled={true} onClick={clickChange}>Change Owner</button>
        <button style={ownerButtonsDisabled} id="kill" disabled={true} onClick={clickKill}>Destroy</button>
			</div>
		);
	}
};

export default ContractManagement;

const ownerPart = {
	display: 'flex',
	flexFlow: 'column wrap',
	alignContent: 'space-between',
	justifyContent: 'space-between',
	alignItems: 'center',
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