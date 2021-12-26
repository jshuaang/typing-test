import './Type.css';
import randomWords from 'random-words';
import { useEffect, useRef, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Type() {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state.name || 'player';
    const [words, setWords] = useState(null);
    const [time, setTime] = useState(60);
    const [rangeValue, setRangeValue] = useState(0);
    const [wordInput, setWordInput] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [currChar, setCurrChar] = useState('')
    const [charIndex, setCharIndex] = useState(-1);
    const [correct, setCorrect] = useState(0);
    const [show, setShow] = useState(false);
    const ref = useRef(null)

    useEffect(() => {
        setWords(new Array(200).fill(null).map(() => randomWords()));
        ref.current.focus();
        start();
    }, []);

    const start = () => {
        const intervalTime = setInterval(() => {
            setTime((prevTime) => {
                if(prevTime === 0){
                    clearInterval(intervalTime);
                    setShow(true);
                    setTime(0);
                }else{
                    return prevTime - 1;
                }
            });
        }, 1000);
    };

    const handleInput = (e) => {
        if(e.keyCode === 32){
            if(words[wordIndex] === wordInput.trim()){
                setWordIndex(wordIndex + 1);
                setWordInput('');
                setRangeValue(rangeValue + 1);
                setCharIndex(-1);
                setCorrect(correct + 1);
            }
        }else if(e.keyCode === 8){
            console.log(charIndex)
            console.log(wordInput.length)
            if(wordInput.length > 0){
                setCharIndex(charIndex - 1);
            }else{
                setCharIndex(-1);
            }
        }else{
            setCharIndex(charIndex + 1);
            setCurrChar(e.key);
        }
    }

    const filterCharInput = (wordIdx, charIdx, char) => {
        if(wordIndex === wordIdx && charIdx === charIndex && currChar){
            if(currChar === char){
                return 'background-green';
            }else{
                return 'background-red';
            }
        }
    }

    const handleClose = () => setShow(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '50px',
            width: '400px',
            textAlign: 'center'
        },
    };


    return (
        <div id="typeContainer" className="container-typing">
            <div>
                <h1>{time}</h1>
            </div>
            <input type="range" value={rangeValue} min={0} max={200} className="slider" readOnly/>
            <input ref={ref} type="text" value={wordInput} onChange={(e) => setWordInput(e.target.value.trim())} onKeyUp={(e) => {
                handleInput(e);
            }}/>
            <div className="container-words">
                {words?.map((word, i) => (
                    <span key={i}>
                        {word.split('').map((char, idx) => (
                            <span className={filterCharInput(i, idx, char)} key={idx}>{char}</span>
                        ))}
                        <span> </span>
                    </span>
                ))}
            </div>
            <Modal
                isOpen={show}
                onRequestClose={handleClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Congratulation {name}!</h2>
                <div>You get {correct} correct words</div>
                
                <button className="changePlayer" onClick={() => navigate('/')}>Change Player</button>
                <button className="newGame" onClick={() => window.location.reload()}>New Game</button>
            </Modal>        
        </div>
    )
}

export default Type
