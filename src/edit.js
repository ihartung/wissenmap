import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid'
import {Button} from '@mui/material'
import routes from './routes.js';
import axios from 'axios';

export default function DeckEdit(props){

	const editDeck = e => {
		e.preventDefault();
		
		var data = new FormData();

		var headers = {'X-CSRFToken':localStorage.getItem('csrftoken')}

		axios.update(routes.root + '/deck', data, {headers})
			.then()
			.catch(e => {
				console.log(e);
			});

	}


	return (
		<div>
		<Button></Button>
		<DataGrid/>
		</div>
	)



}
