import Die from './Die'
import React from 'react'
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

export default function MainSection() {
    const [dice, setDice] = React.useState(randomNumbers())
    const [tenzies, setTenzies] = React.useState(false)
    const [clickCount, setclickCount] = React.useState(0)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const value = dice[0].value
        const isSame = dice.every(die=> die.value == value)
        if(allHeld && isSame) {
            setTenzies(true)
            //setclickCount(0)
        }
    }, [dice])

    function generateNewDice() {
        return {
            key: nanoid(),
            value: Math. floor(Math. random() * 6) + 1,
            isHeld : false
        }
    }
    
    function randomNumbers() { 
        let nums = []
        for(let i = 0; i < 10; i++) {
            nums.push(generateNewDice()) 
        }
        return nums
    }
    
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.key === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const newElements = dice.map(eachNum => {
        return (
            <Die 
                key={eachNum.key} 
                number={eachNum.value} 
                isHeld={eachNum.isHeld} 
                holdDice={() => holdDice(eachNum.key)}
            />
        )
    })

    function changeNumbers() {
        setclickCount(prevCount=> prevCount + 1)
        if(tenzies) {
            setTenzies(false)
            setDice(randomNumbers())
            setclickCount(0)
        }else {
            setDice(oldDice=> oldDice.map(prevDice =>{
                return prevDice.isHeld ? prevDice : generateNewDice()
                
            }))
        }
    }

    return (
        <div className='main-box-container'>
            
            {tenzies ? <Confetti/> : ""}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>

            { 
                tenzies && 
                <div className='win-game'>
                    You won the game in {clickCount} turns
                </div>
            }
            
            <div className="main-section">
                <div className='main-section-die'> 
                        {newElements} 
                </div>
                <button className='main-section-btn' onClick={changeNumbers}>
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
        </div>
    )
}