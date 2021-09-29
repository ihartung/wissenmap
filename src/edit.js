import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid'
import {Button} from '@mui/material'
import routes from './routes.js';
import axios from 'axios';

export default function DeckEdit(props){

	const editDeck = e => {
		e.preventDefault();
		
		var data = new FormData();

		axios.update(routes.root + '/deck', data)
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
