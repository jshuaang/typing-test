import { useEffect, useRef, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const inputRef = useRef(null)
    const navigate = useNavigate();
    const [name, setName] = useState('')

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className='container-start'>
            <h1>React Typing Test</h1>
            <h3>Your name : </h3>
            <input type="text" ref={inputRef} placeholder='my name..' onChange={(e) => setName(e.target.value)}/>
            <button type="button" onClick={() => navigate('type', {state:{name: name}})} >start</button>
        </div>
    )
}

export default Home
