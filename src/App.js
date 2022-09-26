import React, {useState, useEffect} from 'react';
import CounterResult from "./components/CounterResult";
import logo from './assets/logo.png';
import './App.css';
import axios from "axios";


function App() {
    const [counter, setCounter] = useState(0);
    const [endpoint, setEndpoint] = useState(`https://pokeapi.co/api/v2/pokemon/jigglypuff`);
    const [pokemons, setPokemons] = useState("");
    console.log('Ik ben zojuist aangeroepen!');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        console.log('🍌 Ik ben voor de eerste keer gemount');

        async function fetchData() {
            console.log('fetch');
            toggleError(false);
            toggleLoading(true);
            try {
                const {data} = await axios.get(endpoint);

                setPokemons((data));
                console.log((data));


            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);



        }

        fetchData();

    }, [endpoint]);


    useEffect(() => {
        console.log('♻️ Ik ben geupdate');

        if (counter > 6) {
            console.log('🍓 Ik ben hoger dan 6!');
        }

    }, [counter === 1]); // <--- dit betekent welke fase: UPDATING


    return (

        <section className="column" key={pokemons.name}>
            {counter > 6 && <CounterResult amount={counter}/>}

            {pokemons &&
                <>
                    {console.log('Ik ben gerenderd')}


                    <header>
                        <img alt="logo" src={logo}/>
                    </header>
                    <section className="border-color">
                        <main className="card">
                            <h1> {pokemons.name} </h1>
                            <img src={pokemons.sprites.front_default} alt="afbeelding"/>
                            <p><span>Moves: </span> {pokemons.moves.length}</p>
                            <p><span>Weight: </span> {pokemons.weight}</p>
                            <h2>Abilities:</h2>

                            <ul>
                                {pokemons.abilities.map((item) => {
                                    {
                                        console.log('Ik ben map gerenderd')
                                    }
                                    return <li key={item.ability.name}>
                                        <span>{item.ability.name}</span>
                                    </li>
                                })}

                            </ul>
                        < /main>
                    </section>
                </>
            }
        </section>
    );
}

export default App;