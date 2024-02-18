import React from "react";
import phone from './images/phone.jpg'
import laptop from './images/laptop.jpg'
import car from './images/car.webp'

const BidButtons = props => {
	let { state, click } = props;

	if(state.curAcc === state.manager.toLowerCase() || state.stage === "2") {
		return(
			<div style={bidSection}>
				
				<div style={bidBoxes}>
					<p style={boxHeaders}>A laptop</p>

					<div style={images}>
						<img src={laptop} alt="Can't load" width="300px" height="200px" />
					</div>

					<div style={info}>
						<button style={bidButtonsDisabled} id="laptop" disabled={true} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.laptopBids}</p>
					</div>
				</div>

				<div style={bidBoxes}>
					<p style={boxHeaders}>A car</p>

					<div style={images}>
						<img src={car} alt="Can't load" width="300px" height="200px" />
					</div>
					
					<div style={info}>
						<button style={bidButtonsDisabled} id="car" disabled={true} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.carBids}</p>
					</div>
				</div>

				<div style={bidBoxes}>
					<p style={boxHeaders}>A phone</p>

					<div style={images}>
						<img src={phone} alt="Can't load" width="300px" height="200px" />
					</div>

					<div style={info}>
						<button style={bidButtonsDisabled} id="phone" disabled={true} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.phoneBids}</p>
					</div>
				</div>
			</div>
		);
	}
	else {
		return(
			<div style={bidSection}>
				<div style={bidBoxes}>
					<p style={boxHeaders}>A laptop</p>

					<div style={images}>
						<img src={laptop} alt="Can't load" width="300px" height="200px" />
					</div>

					<div style={info}>
						<button style={bidButtonsEnabled} id="laptop" disabled={false} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.laptopBids}</p>
					</div>
				</div>

				<div style={bidBoxes}>
					<p style={boxHeaders}>A car</p>

					<div style={images}>
						<img src={car} alt="Can't load" width="300px" height="200px" />
					</div>

					<div style={info}>
						<button style={bidButtonsEnabled} id="car" disabled={false} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.carBids}</p>
					</div>
				</div>

				<div style={bidBoxes}>
					<p style={boxHeaders}>A phone</p>

					<div style={images}>
						<img src={phone} alt="Can't load" width="300px" height="200px" />
					</div>

					<div style={info}>
						<button style={bidButtonsEnabled} id="phone" disabled={false} onClick={click}>Bid</button>
						<p style={bidCounter}>{state.phoneBids}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default BidButtons;

const bidSection = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-around'
};

const bidBoxes = {
	width: '380px',
	height: '320px',
	border: '1px groove lavender',
	display: 'block'
}

const boxHeaders = {
	color: 'black',
	backgroundColor: 'whitesmoke',
	border: '1px groove lavender',
	textAlign: 'center',
	fontSize: '28px'
}

const images = {
	textAlign: 'center'
}

const info = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-around'
}

const bidButtonsEnabled = {
	backgroundColor: 'green',
	color: 'white',
	height: '45px',
	width: '80px'
}

const bidButtonsDisabled = {
	backgroundColor: 'red',
	color: 'white',
	height: '45px',
	width: '60px'
}

const bidCounter = {
	color: 'black',
	fontSize: '32px'
}