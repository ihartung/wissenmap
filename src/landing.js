import {setState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import routes from 'routes';
import DeckForm from 'form';


export default function Landing(){

	const [decks, setDecks] = useState([]);
	
	useEffect({
		const result = await axios(
			'${routes.root}/decks'
		);
		setDecks(result.decks);
	},[]);

	return (
		<DeckForm/>
		<ul>
		{decks.map(deck => (
			<li key={deck.id}>
			<a href='${routes.root}/${deck.id}'>{deck.title}</a>
			</li>
		))}
		</ul>
	)
}
