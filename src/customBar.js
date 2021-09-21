import {useState, useEffect} from 'react';
import GoogleSocialAuth from './googleLogin.js';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import routes from './routes.js';
import axios from 'axios';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
	bar: {
		textAlign: 'center',
	},
	bookend: {
		width: '230px',
	}
});

export default function CustomBar(props){

	const classes = useStyles();

	const location = useLocation();
	const history = useHistory();

	return (
		<div className={classes.bar}>
		<Box sx={{flexGrow:1}}>
		<AppBar position='static'>
		<Toolbar>
		<div className={classes.bookend}>
		{ location.pathname == '/'?
			<div/>:
		<Button color='inherit' onClick={() => history.push('/')}>
		Home	
		</Button>}
		</div>
		<Typography variant='h5' component='div' sx={{flexGrow:1}}>
			WissenMap
		</Typography>
		{/*<DeckForm create='true'/>:*/}
		<div className={classes.bookend}>
		<GoogleSocialAuth/>
		</div>
		</Toolbar>
		</AppBar>
		</Box>
		</div>
	)
}
