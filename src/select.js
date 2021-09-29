import {useState, useEffect} from 'react';
import routes from './routes.js';
import axios from 'axios';
import {createUseStyles} from 'react-jss';
import {Button} from '@mui/material';

const useStyles = createUseStyles({
	ul: {
		textAlign: 'center',
	},
});

export default function Select(props){

	const classes = useStyles();

	const [decks, setDecks] = useState([]);
	const [auth, setAuth] = useState(null);

	useEffect(()=>{
				axios({
					method: 'get',
					url: routes.root + '/decks',
				}).then(result => {
					setDecks(result.data);
				}).catch(error=>console.log(error));
	},[]);

	return (
		<div className={classes.ul}>
		<ul style={{listStyleType:'none'}}>
		{decks.map(deck => (
			<li key={deck.pk}>
			<Button onClick={() => props.handleSelection(deck.pk)}>{deck.fields.title}</Button>
			</li>
		))}
		</ul>
		</div>
	)
}
