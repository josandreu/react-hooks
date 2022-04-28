import * as React from 'react'
import {useEffect, useRef, useState} from "react";

// Vamos a adaptar este custom hook para que el valor que le pasamos pueda ser cualquier tipo de dato, no solo un string
// le pasamos un objeto con unas opciones, que son serialize y deserialize
function useLocalStorage(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {
    const [state, setState] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key);
        if (valueInLocalStorage) {
            return deserialize(valueInLocalStorage);
        } else {
            // comprobamos si el valor por defecto es una función
            // si es así, la ejecutamos y sino devolvemos el valor tal cual
            return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }
    });

    // obtenemos una referencia a la key al renderizar la app
    const prevRefKey = useRef(key);

    useEffect(() => {
        const prevKey = prevRefKey.current;
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey);
        }
        prevRefKey.current = key;
        // al realizar serialize, podremos almacenar cualquier tipo de dato
        window.localStorage.setItem(key, serialize(state));
    }, [key, state, serialize]);

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
