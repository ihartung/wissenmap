import {setState} from 'react';
import {Button, FormControl} from '@material-ui/core'
import routes from 'routes';
import axios from 'axios';

export default function DeckForm(update){

	const {create} = props;

	function submitDeck(){
		if(create){
		axios.post('$routes.root')
		}
		else{
		axios.post('$routes.root')
		}

	}


	return (
		<form action='submitDeck'>
		<input type='file'></input>
		<Button>submit</Button>
		</form>
	)



}
