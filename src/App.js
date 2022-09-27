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
    console.log('Ik ben zojuist aangeroepen!');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [nextPokemons, setNextPokemons] = useState("");
    const [prevPokemons, setPrevPokemons] = useState("");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        console.log('🍌 Ik ben voor de eerste keer gemount');

        async function fetchData() {
            console.log('fetch');
            toggleError(false);
            toggleLoading(true);
            try {
                const {data: {results}} = await axios.get(endpoint);

                console.log((results));
                setPokemons((results));


            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);


        }

        fetchData();

    }, [endpoint]);





    function handleSubmit(e) {
        e.preventDefault();

        setEndpoint(`https://pokeapi.co/api/v2/pokemon/?offset=${inputValue}&limit=20`);
        console.log(`Naam:`, inputValue, endpoint);
    }

    return (

        <section className="column" key={pokemons.url}>
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
            {!pokemons && !error &&
                <span>geen pokemons </span>}

            {counter > 6 && <CounterResult amount={counter}/>}

            {pokemons &&
                <>

                    <header>
                        <img alt="logo" src={logo}/>
                    </header>
                    <section className="border-color">
                        <section className="row">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name-field">
                                    <span> Naam: </span>
                                    <input type="text" id="name-field"
                                           name="naam"
                                           value={inputValue}
                                           onChange={(e) => setInputValue(e.target.value)}
                                    />
                                </label>

                            </form>


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
                        </section>
                        {console.log('Ik ben gerenderd',{pokemons})}
                        <main className="card-deck">
                            {pokemons && pokemons.map((item) => {
                                return <div key={item.url}>
                                    <Card cardpick={item.url}/>
                                </div>
                            })}
                        < /main>
                    </section>
                </>
            }
        </section>
    );
}

export default App;