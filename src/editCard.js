import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid'
import {Typography, Button, Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import routes from './routes.js';
import cardForm from './cardForm.js';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'front',
		headerName: 'Front',
		width: 450,
		editable: true,
	},
	{
		field: 'back',
		headerName: 'Back',
		width: 450,
		editable: true,
	},
];

const prepareRows = (rows) => {
	let result = rows.map((ob, index) => {
		ob['id'] = index
		return ob});
	return result;
}

export default function DeckEdit(props){

	const {card} = props;

	const editCard = e => {
		e.preventDefault();

		var data = new FormData();

		axios.update(routes.root + '/card', data)
			.then((result) => {
				props.handleDeck(result.data);
			})
			.catch(e => {
				console.log(e);
			});

	}

	return (
		<Accordion>
		<AccordionSummary
		expandIcon={<ExpandMoreIcon />}
		aria-controls="panel1a-content"
		id="panel1a-header"
		>
		<Typography>Edit Card</Typography>
		</AccordionSummary>
		<AccordionDetails>
		<div style={{height:400}}>
		<cardForm>
		</div>
		</AccordionDetails>
		</Accordion>
	)
}
