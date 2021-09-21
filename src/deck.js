import {useState, useEffect} from 'react';
import {FormControlLabel, Box, Card, Button, Switch, CardActions, CardActionArea, CardContent} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Grid, GridSpacing} from '@mui/material';
import routes from './routes.js';
import DeckForm from './form.js';
import CustomBar from './customBar.js';
import axios from 'axios';
import {useParams, useHistory}  from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		width: 345,
		height: 150,
		marginTop: 75,
		textAlign: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	directionButton: {
		verticalAlign: 'middle',
		display: 'flex'
	},
	trunk: {
		flexGrow: 1,
		justifyContent: 'center',
		display: 'flex',
		marginBottom: 6,
	},
});


export default function Deck(){
	const [cards, setCards] = useState([]);
	const [index, setIndex] = useState(0);
	const [side, setSide] = useState(0);
	const [reverse, setReverse] = useState(false);
	const [currentCard, setCurrentCard] = useState({'front':'', 'back':''});

	const {id} = useParams();

	const classes = useStyles();
	const history = useHistory();

	useEffect(async ()=>{
		axios({
			method: 'get',
			url: routes.root + '/deck/' + id,
		}).then(result => {
			setCards(result.data);
			setCurrentCard({'front':result.data[0].front,'back':result.data[0].back});
		});
	},[]);

	const handleFlip = () => {
		if(side){
			setSide(0);
		} else {
			setSide(1);
		}
	}

	const handleReverse = () => {
		let change = !reverse;
		setReverse(change);
		if(change){
			setCurrentCard({'front':cards[index].back,'back':cards[index].front});
		} else {
			setCurrentCard({'front':cards[index].front,'back':cards[index].back});
		}
		setSide(0);
	}

	const handleBack = () => {
		var tmp = 0;
		if(!index){
			tmp = cards.length - 1;
		} else {
			tmp = index - 1;
		}
		setIndex(tmp);
		setCurrentCard({'front':cards[tmp].front,'back':cards[tmp].back});
		if(reverse){
			setCurrentCard({'front':cards[tmp].back,'back':cards[tmp].front});
		} else {
			setCurrentCard({'front':cards[tmp].front,'back':cards[tmp].back});
		}
		setSide(0);
	}

	const handleNext = () => {
		const tmp = (index + 1) % cards.length;
		setIndex(tmp);
		if(reverse){
			setCurrentCard({'front':cards[tmp].back,'back':cards[tmp].front});
		} else {
			setCurrentCard({'front':cards[tmp].front,'back':cards[tmp].back});
		}
		setSide(0);
	}

	function shuffle(array) {
		let currentIndex = array.length,  randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	const handleShuffle = () => {
		let tmp = shuffle(cards);
		setCards(tmp);
		if(reverse){
			setCurrentCard({'front':cards[index].back,'back':cards[index].front});
		} else {
			setCurrentCard({'front':cards[index].front,'back':cards[index].back});
		}
	}

	return (
		<div>
		<CustomBar/>
		<Box sx={{ flexGrow:1, marginTop:'16px'}}>
		<Grid className={classes.trunk} spacing={2} container>
		<Grid className={classes.directionButton} key={0} item>
		<Button size='small' color='primary' onClick={handleBack}>Back</Button>
		</Grid>
		<Grid key={1} item>
		<Card>
		<CardActionArea style={{backgroundColor:'#f0f0f0'}} onClick={handleFlip}>
		<CardContent className={classes.root}>
		{ !side ? <h2>{currentCard.front}</h2> : <h2>{currentCard.back}</h2>}
		</CardContent>
		</CardActionArea>
		</Card>
		</Grid>
		<Grid key={2} className={classes.directionButton} item>
		<Button size='small' color='primary' onClick={handleNext}>Next</Button>
		</Grid>
		</Grid>
		<Grid className={classes.trunk} spacing={2} container>
		<h2>{index + 1}/{cards.length}</h2>
		</Grid>
		</Box>
		<Box className={classes.trunk}>
		<Button onClick={handleShuffle} style={{marginRight:2}} variant="contained">Shuffle</Button>
		<FormControlLabel
		style={{marginLeft:2}}
		control={<Switch checked={reverse} onChange={handleReverse}/>} label='Reverse'/>
			</Box>
			</div>
		)


		}
