import React, {useEffect, useState} from 'react';
import axios from 'axios' ;
import './Card.css';

function Card({cardpick}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        console.log('🍌 🍌 Ik ben voor de eerste keer gemount');

        async function fetchCard() {
            try {
                const {data} = await axios.get(cardpick);
                setPokemon((data));

            } catch (e) {
                console.error(e);
            }
        }

        fetchCard();

    }, [cardpick]);

    return (
        <div className="card">

            {pokemon &&

                <article className="Card">
                    <h1> {pokemon.name} </h1>
                    <p><img src={pokemon.sprites.front_default} alt="afbeelding"/>
                    </p>
                    <p><span>Moves: </span> {pokemon.moves.length}</p>
                    <p><span>Weight: </span> {pokemon.weight}</p>
                    <h2>Abilities:</h2>

                    <ul>
                        {pokemon.abilities.map((item) => {
                            // {console.log('Ik ben map gerenderd')}
                            return <li key={item.ability.name}>
                                <span>{item.ability.name}</span>
                            </li>
                        })}

                    </ul>

                </article>
            }
        < /div>
    )
        ;
}

export default Card;
