import {useState, useEffect, useRef} from 'react';
import {FormControlLabel, Box, Card, Button, Switch, CardActionArea, CardContent, Modal} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Grid} from '@mui/material';
import routes from './routes.js';
import CardForm from './cardForm.js';
import axios from 'axios';

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


export default function Deck(props){

    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState(0);
    const [side, setSide] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [currentCard, setCurrentCard] = useState({'front':'', 'back':''});
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const {id, handleDeck} = props; 

    const classes = useStyles();

    const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	height: '60%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
    };

    const processDeck = (deck) => {
	if (deck.cards.length > 0) {
	    setCards(deck.cards);
	    setCurrentCard({
		'front': deck.cards[index].front,
		'back': deck.cards[index].back
		});
	    }
	handleDeck(deck);
	}

    const fetchDeck = () => {
	axios({
	    method: 'get',
	    url: routes.root + '/deck/' + id,
	    }).then(result => {
		processDeck(result.data);
		}).catch(error=>console.log(error));
	}

    useEffect(async ()=>{
	fetchDeck();
	},[]);

    const handleFlip = () => {
	if(side){
	    setSide(0);
	    } else {
		setSide(1);
		}
	}

    const editCard = () => {
	modalRef.current = cards[index];
	setModalOpen(true);
	}

    const addCard = () => {
	modalRef.current = {pk: -1, front: '', back: ''};
	setModalOpen(true);
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
	{cards === 0 ? (<p>No cards in Deck</p>) :
	    (<Box sx={{ flexGrow:1, marginTop:'16px'}}>
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
	    </Box>)}
	    <Box className={classes.trunk}>
		{cards === 0 ? null :
			(<><Button onClick={handleShuffle} style={{marginRight:2}} variant="contained">Shuffle</Button>
		<FormControlLabel
		    style={{marginLeft:2}}
			control={<Switch checked={reverse} onChange={handleReverse}/>} label='Reverse'/>
			</>)}
		{cards !== 0 && props.auth ? 
		    <Button onClick={editCard} style={{marginRight:2}} variant="contained">Edit Card</Button>

		: null}
		{!props.auth ? null : <div>
		<Button onClick={addCard} style={{marginRight:2}} variant="contained">Add Card</Button>
		<Modal
		    open={modalOpen}
		    onClose={()=> setModalOpen(false)}
		    aria-labelledby="modal-modal-title"
		    aria-describedby="modal-modal-description"
		>
		    <Box sx={style}>
			<CardForm processDeck {...modalRef.current} deckId={id}/>
		    </Box>
		</Modal>
		</div>}
	    </Box>
	</div>
	)
}
