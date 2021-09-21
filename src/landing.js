import {useState, useEffect} from 'react';
import routes from './routes.js';
import DeckForm from './form.js';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import {createUseStyles} from 'react-jss';
import CustomBar from './customBar.js';

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

	const [decks, setDecks] = useState([]);
	const location = useLocation();

	useEffect(async ()=>{
		if(location.pathname!=='/'){
			return;
		}
		if(!localStorage.getItem('csrftoken')){
			axios({
				method: 'get',
				url: routes.root + '/csrf',
			}).then(result => {
				localStorage.removeItem('csrftoken');
				localStorage.setItem('csrftoken', result.data.csrfToken);
				axios({
					method: 'get',
					url: routes.root + '/decks',
				}).then(result => {
					setDecks(result.data);
				});
			});
		} else {
			axios({
				method: 'get',
				url: routes.root + '/decks',
			}).then(result => {
				setDecks(result.data);
			});
		}
	},[location.pathname]);

	return (
		<div className={classes.ul}>
		<CustomBar/>
		<ul style={{listStyleType:'none'}}>
		{decks.map(deck => (
			<li key={deck.pk}>
			<Link to={'/deck/' + deck.pk}>{deck.fields.title}</Link>
			</li>
		))}
		</ul>
		</div>
	)
}
