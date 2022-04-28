// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect, useState} from "react";

function Greeting({initialName = ''}) {
    console.log('rendering Greeting');
    // 🐨 initialize the state to the value from localStorage
    // 💰 window.localStorage.getItem('name') ?? initialName
    //const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName);

    // 🐨 Here's where you'll use `React.useEffect`.
    // The callback should set the `name` in localStorage.
    // 💰 window.localStorage.setItem('name', name)
    /*useEffect(() => {
        window.localStorage.setItem('name', name);
    });*/

    function handleChange(event) {
        setName(event.target.value)
    }

    // extra 1
    // El hecho de que cada vez que se renderize la app pase por useState y este lea de localStorage no es nada óptimo en cuanto a rendimiento
    // por ello, en lugar de que lea directamente de localStorage, tendremos que pasarle una función
    /*

    const getInitialValue = () => {
        return window.localStorage.getItem('name') ?? initialName;
    }
    const [name, setName] = useState(getInitialValue);

    */

    // We can pass a function (getInitialValue) or pass an anonymous function with the same code inside
    // Con esto, evitamos que cada vez que tecleamos se llame a localstorage para obtener el valor de 'name', de esta forma solo lo hace la 1ª que renderiza el componente
    const [name, setName] = useState(() => window.localStorage.getItem('name') ?? initialName);


    // extra 2
    // Si no pasamos 'name' como dependencia en useEffect, cada vez que se renderiza la app pasa por aquí independientemente de que lo que haya cambiado no sea 'name'
    // Lo que queremos es que solo entre aquí en el caso de que se actualice 'name'
    useEffect(() => {
        console.log('useEffect');
        window.localStorage.setItem('name', name);
    }, [name]);


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
    return <Greeting initialName='Pedro'/>
}

export default App
