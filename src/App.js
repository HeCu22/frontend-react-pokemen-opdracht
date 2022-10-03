import React, {useState, useEffect} from 'react';
import CounterResult from "./components/CounterResult";
import Button from "./components/Button";
import Card from "./components/Card";
import logo from './assets/logo.png';
import './App.css';
import axios from "axios";


function App() {
    const [counter, setCounter] = useState(0);
    const [endpoint, setEndpoint] = useState(`https://pokeapi.co/api/v2/pokemon/`);
    const [pokemons, setPokemons] = useState("");
    console.log('Ik ben zojuist app aangeroepen!');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [nextPokemons, setNextPokemons] = useState("");
    const [prevPokemons, setPrevPokemons] = useState("");
    const [formState, setFormState] = useState({
        inputName: ""
    });

    useEffect(() => {
        // declareren fetch asysnchrone functie
        async function fetchData() {
            console.log('fetch');
            toggleError(false);
            toggleLoading(true);
            try {
                const {data: {results, next, previous}} = await axios.get(endpoint);
                console.log((results));
                setPokemons((results));
                setNextPokemons((next));
                setPrevPokemons((previous));
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        console.log('🍌 Ik ben voor de eerste keer gemount');
        fetchData();
    }, [endpoint]);


    useEffect(() => {
        // declareren fetch na update input value
        async function fetchDataUpdate() {
            console.log('fetchDataUpdate');
            toggleError(false);
            toggleLoading(true);
            try {
                const {data: {id}} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${formState.inputName}`);
                console.log('update', (id));
                setPokemons('');
                setEndpoint(`https://pokeapi.co/api/v2/pokemon/?offset=${id - 1}&limit=20`);
                setNextPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${id - 1}&limit=20`);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        console.log('♻️ Ik ben geupdate', formState);
        if (counter > 0) {
            fetchDataUpdate();
        }
        if (counter > 3) {
            console.log('🍓 Ik ben hoger dan 3! mijn maximum is 5 keer nieuwe input!');
        }
    }, [counter]); // <--- dit betekent welke fase: UPDATING


    function handleSubmit(e) {
        e.preventDefault();
        console.log(`Het formulier is verstuurd`);
        setCounter(counter + 1);
    }

    function handleChange(evt) {
        setFormState({inputName: evt.target.value});
    }

    return (
        <div className="outer-container">
            <section className="inner-container" key={pokemons.url}>

                {loading && <span>Loading...</span>}
                {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
                {!pokemons && !error &&
                    <span>geen pokemons </span>}

                {counter < 5 && <CounterResult amount={counter}/>}
                {counter >= 5 && <> unmounted......please refresh </>}
                {(pokemons && counter < 5) &&
                    <>
                        {console.log('Ik ben app gerenderd')}

                        <header>
                            <img alt="logo" src={logo}/>
                        </header>
                        <main className="card-deck">
                            <form onSubmit={handleSubmit}>
                                <legend>Starten vanaf naam:</legend>
                                <label htmlFor="name-field">
                                    <input type="text" id="name-field"
                                           name="inputName"
                                           value={formState.inputName}
                                           onChange={handleChange}
                                    />
                                </label>

                            </form>

                            <div className="button-row">
                                <Button
                                    boolean={!prevPokemons}
                                    clickHandler={() => setEndpoint(prevPokemons)}
                                >
                                    Vorige
                                </Button>
                                <Button boolean={!nextPokemons}
                                        clickHandler={() => setEndpoint(nextPokemons)}
                                >
                                    Volgende
                                </Button>
                            </div>


                            {/*{console.log(`Naam:`, inputValue, endpoint, nextPokemons)}*/}
                            <>
                                {pokemons && pokemons.map((item) => {
                                    return(<Card key={item.name} cardpick={item.url}/>)
                                })}
                            < />S
                        </main>

                    </>
                }
            </section>
        </div>
    );
}

export default App;