import {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import routes from './routes.js';
import DeckForm from './form.js';
import axios from 'axios';


export default function Landing(){

	const [decks, setDecks] = useState([]);
	
	useEffect(async ()=>{
		axios({
			method: 'get',
			url: routes.root + '/decks',
		}).then(result => {
			setDecks(result.data);
		});
		if(!localStorage.getItem('csrftoken')){
		axios({
			method: 'get',
			url: routes.root + '/csrf',
		}).then(result => {
			localStorage.removeItem('csrftoken');
			localStorage.setItem('csrftoken', result.data.csrfToken);
		});
		}
	},[]);

	return (
		<div>
		<DeckForm create='true'/>
		<ul>
		{decks.map(deck => (
			<li key={deck.pk}>
			<a href={routes.root + '/deck/' + deck.pk}>{deck.fields.title}</a>
			</li>
		))}
		</ul>
		</div>
	)
}
