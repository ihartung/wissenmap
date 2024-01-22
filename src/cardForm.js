import {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material'
import routes from './routes.js';
import axios from 'axios';

export default function CardForm(props){

	const [frontState, setFrontState] = useState(props.front);
	const [backState, setBackState] = useState(props.back);


    const submitCard = e => {
	e.preventDefault();

	var data = new FormData();

	data.append('front', frontState)
	data.append('back', backState)
	data.append('id', props.pk)
	data.append('deck', props.deckId)
	let headers = {'Authorization': localStorage.getItem('token')}

	axios.post(routes.root + '/card', data)
	.then(results => {
	    props.processDeck(results.data);
	    }).catch(e => {
		console.log(e);
		});

	}


    return (
	<div m={3}>
	    <Grid container justifyContent="center" spacing={1}>
		<Grid item md={3}>
		    <TextField fullWidth label='Front' multiline id='front' value={frontState} onChange={(e) => setFrontState(e.target.value)}/>
		</Grid>
		<Grid item md={8}>
		    <TextField fullWidth label='Back' multiline id='back' value={backState} onChange={(e) => setBackState(e.target.value)}></TextField>
		</Grid>
		<Grid item md={1}>
		    <Button onClick={submitCard} variant='contained' color="primary">submit</Button>
		</Grid>
	    </Grid>
	</div>
	)



}
