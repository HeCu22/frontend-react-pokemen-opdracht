import React, {useEffect, useState} from 'react';
import axios from 'axios' ;
import './Card.css';

function Card({cardpick}) {
    const [pokemon, setPokemon] = useState(null);
    console.log('Card Ik ben aangeroepen');

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
        <article className="card">
            {pokemon &&
                <>
                    <h1> {pokemon.name} </h1>
                    <p><img src={pokemon.sprites.front_default} alt="afbeelding"/>
                    </p>
                    <p><strong>Moves: </strong> {pokemon.moves.length}</p>
                    <p><strong>Weight: </strong> {pokemon.weight}</p>
                    <p><strong>Abilities:</strong></p>

                    <ul>
                        {pokemon.abilities.map((item) => {
                            // {console.log('Ik ben map gerenderd')}
                            return <li key={item.ability.name}>
                                <span>{item.ability.name}</span>
                            </li>
                        })}

                    </ul>

                </>
            }
        </article>
    )
        ;
}

export default Card;
