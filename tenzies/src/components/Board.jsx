import Die from "./Die";
import {useState} from "react";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function Board() {
    
    
    function generateNewDice() {
        return new Array(10).fill(0).map(()=>({
            value: Math.ceil(Math.random() * 10),
            locked: false,
            id: nanoid()
        }));
    }

    const [dice, setDice] = useState(generateNewDice());
    const gameWon = dice.every(die => die.locked) &&
    dice.every(die => die.value === dice[0].value);
    
    function reRollDice() {
        setDice(prevDie => prevDie.map(die => {
            return !die.locked ? {...die, value: Math.ceil(Math.random() * 10) } : die;
        }));
    }
    
    function lockDie(id){
        setDice(prevDie => prevDie.map(die => {
            return die.id === id ? { ...die, locked: !die.locked } : die;
        }))
    }
    
    const diceElements = dice.map(dieObj => <Die 
        key={dieObj.id} 
        value={dieObj.value} 
        locked={dieObj.locked} 
        lockDie={() => lockDie(dieObj.id)} />
    );
    
    const screenW = screen.width - 50;
    const screenH = screen.height - 160;

    return(
        <>
        {gameWon && <Confetti width={screenW} height={screenH}/>}
        <div className="header">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dice-container">
            {diceElements}
        </div>
        <button onClick={reRollDice} className="rollDiceBtn">{gameWon ? "New Game" : "Roll"}</button>
        
        </>
    );
}