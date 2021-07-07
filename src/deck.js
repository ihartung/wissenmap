import {useState, useEffect} from 'react';
import {AppBar, Toolbar, makeStyles, Card, Button, Switch, CardActions, CardActionArea, CardContent} from '@material-ui/core';
import Grid, {GridSpacing} from '@material-ui/core/Grid';
import routes from './routes.js';
import DeckForm from './form.js';
import axios from 'axios';
import {useParams, useHistory}  from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 200,
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
    marginTop: 6,
    marginBottom: 6,
  },
});


function Deck(){
	const [cards, setCards] = useState([]);
	const [index, setIndex] = useState(0);
	const [side, setSide] = useState(0);
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

	const handleBack = () => {
		var tmp = 0;
		if(!index){
			tmp = cards.length - 1;
		} else {
			tmp = index - 1;
		}
		setIndex(tmp);
		setCurrentCard({'front':cards[tmp].front,'back':cards[tmp].back});
	}

	const handleNext = () => {
		const tmp = (index + 1) % cards.length;
		setIndex(tmp);
		setCurrentCard({'front':cards[tmp].front,'back':cards[tmp].back});
		setSide(0);
	}

	const handleShuffle = () => {
	}

	return (
		<div>
		<AppBar position='static'>
		<Toolbar>
			<Button color='inherit' onClick={() => history.push('/')}>
			Home
			</Button>
		</Toolbar>
		</AppBar>
		<Grid className={classes.trunk} spacing={2} container>
		<Grid className={classes.directionButton} key={0} item>
		<Button size='small' color='primary' onClick={handleBack}>Back</Button>
		</Grid>
		<Grid key={1} item>
		<Card>
			<CardActionArea className={classes.root} onClick={handleFlip}>
			<CardContent>
			<h1>{index + 1}/{cards.length}</h1>
			{ !side ? currentCard.front : currentCard.back}
			</CardContent>
			</CardActionArea>
		</Card>
		</Grid>
		<Grid key={2} className={classes.directionButton} item>
		<Button size='small' color='primary' onClick={handleNext}>Next</Button>
		</Grid>
		</Grid>
		<Button>Shuffle</Button>
		<Switch name='Reverse'/>
		<DeckForm/>
		</div>
	)


}

export default Deck;

