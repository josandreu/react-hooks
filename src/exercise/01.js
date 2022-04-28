// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {useState} from "react";

function Greeting({initialName = ''}) {
    // 💣 delete this variable declaration and replace it with a React.useState call
    const [name, setName] = useState(initialName);

    function handleChange(event) {
        // 🐨 update the name here based on event.target.value
        setName(`${event.target.value}`);
    }

    const [counter, setCounter] = useState(0);

    return (
        <div>
            <form>
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={handleChange} id="name"/>
            </form>
            {/*{name === '' ? 'Plase, set your name' : <p>Hello {name}</p>}*/}
            {name ? <strong>Hello {name}</strong> : 'Please type your name'}
            <div>
                <button onClick={() => setCounter(counter + 1)}>Click</button>
                <p>{counter}</p>
            </div>
        </div>
    )
}

function App() {
    return <Greeting initialName={'Pene'}/>
}

export default App
