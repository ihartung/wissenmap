import {useState, useEffect} from 'react';
import routes from './routes.js';
import AuthButton from './authButton';
import {resetCSRF} from './authButton';
import DeckSubmit from './submit.js';
import DeckEdit from './edit.js';
import Deck from './deck.js';
import Select from './select.js';
import axios from 'axios';
import {createUseStyles} from 'react-jss';
import CustomBar from './customBar.js';

const getCSRFToken = async () => {
    const response = await axios({method: 'get', url: routes.root + '/csrf'});
    axios.defaults.headers.post['X-CSRFToken'] = response.data.csrfToken;
};

const useStyles = createUseStyles({
	ul: {
		textAlign: 'center',
	},
	title: {
		marginRight: '10px',
	}
});

export default function Landing(){

	const classes = useStyles();
	const clearDeck = {title:'', id:-1, cards:[]};

	const [deck, setDeck] = useState(clearDeck);
	const [auth, setAuth] = useState(false);
	const [selection, setSelection] = useState(-1);

	useEffect(() => {
		if(localStorage.getItem('token') !== null){
			setAuth(true);
			resetCSRF();
		} else {
			getCSRFToken();
		}
	}, []);

	const handleAuth = (status) => {
		setAuth(status);	
	}

	const handleSelection = (index) => {
		setSelection(index);
		if(index==-1){
			setDeck(clearDeck);
		}
	}

	const handleDeck = (deck) => {
		setDeck(deck);
	}

	return (
		<div>
		<CustomBar handleSelection={handleSelection} title={deck.title}/>
		{ selection == -1 ?
			<Select handleSelection={handleSelection}/>:
			<Deck id={selection} handleDeck={handleDeck}/>}
		{ !auth ? null:
			selection == -1 ?
				<DeckSubmit/>:
				<DeckEdit handleDeck={handleDeck} deck={deck}/>}
		<AuthButton handleAuth={handleAuth}/>
		</div>
	)
}
