import * as React from 'react'
import {useEffect, useState} from "react";

// Cuando creamos un custom hook, como es el caso, el nombre por convención tiene que empezar por useLoquesea
// Un custom hook es una función que utiliza hooks, así de simple
function useLocalStorage(key, defaultValue = '') {
    const [state, setState] = useState(() => window.localStorage.getItem(key) ?? defaultValue);

    useEffect(() => {
        window.localStorage.setItem(key, state);
    }, [key, state]);

    return [state, setState];
}

function Greeting({initialName = ''}) {
    const [name, setName] = useLocalStorage('name', initialName);

    function handleChange(event) {
        setName(event.target.value)
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={handleChange} id="name"/>
            </form>
            {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        </div>
    )
}

function App() {
    return <Greeting initialName='Paco'/>
}

export default App
