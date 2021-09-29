import {useState} from 'react';
import {Button, Grid, FormControl} from '@mui/material'
import {spacing} from '@mui/material'
import routes from './routes.js';
import axios from 'axios';

export default function DeckSubmit(props){

	const {create} = props;

	const initialDeckState = {
		title:'',
		file:null,
	};

	const [deckSubmission, setDeckSubmission] = useState(initialDeckState);

	const handleChange = e => {
		const {name, value} = e.target;
		setDeckSubmission({...deckSubmission, [name]: value});	   
	}

	const handleFileChange = e => {
		const {name} = e.target;
		const file = e.target.files[0];
		setDeckSubmission({...deckSubmission, [name]: file});	   
	}

	const submitDeck = e => {
		e.preventDefault();
		
		var data = new FormData();

		data.append('title', deckSubmission.title)
		data.append('cards', deckSubmission.file)

		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken')}

		axios.post(routes.root + '/deck', data, {headers})
			.then()
			.catch(e => {
				console.log(e);
			});

	}


	return (
		<div m={3}>
		<Grid container spacing={1}>
		<Grid item xs={3}>
		<label htmlFor='title'>title</label>
		<input name='title' type='text' id='title' value={deckSubmission.title} onChange={handleChange}></input>
		</Grid>
		<Grid item xs={6}>
		<input name='file' type='file' onChange={handleFileChange}></input>
		</Grid>
		<Grid item xs={3}>
		<Button onClick={submitDeck} variant='contained' color="primary">submit</Button>
		</Grid>
		</Grid>
		</div>
	)



}
