import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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


	return (
		<div className={classes.bar}>
		<Box sx={{flexGrow:1}}>
		<AppBar position='static'>
		<Toolbar>
		<div className={classes.bookend}>
		{ props.title === '' ? <div/> :
		<Button color='inherit' onClick={() => props.handleSelection(-1)}>
		Home	
		</Button>}
		</div>
		<Typography variant='h5' component='div' sx={{flexGrow:1}}>
		{props.title}	
		</Typography>
		<div className={classes.bookend}>
		<Typography variant='h5' component='div' sx={{flexGrow:1}}>
			WissenMap
		</Typography>
		</div>
		</Toolbar>
		</AppBar>
		</Box>
		</div>
	)
}
