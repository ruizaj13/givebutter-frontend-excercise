import { useEffect, useState } from "react";
import { fetchAllPokemon } from "./api";

function App() {
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState()

    useEffect(() => {
        const fetchPokemon = async () => {
            const {results: pokemonList} = await fetchAllPokemon()

            setPokemon(pokemonList)
        }

        fetchPokemon().then(() => {
            /** noop **/
        })
    }, [])

    const pokemonIndex = searchValue.length === 0 ?
        pokemon : pokemon.filter(monster => monster.name.toLowerCase().startsWith(searchValue.toLowerCase()))

    const onSearchValueChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
    }

    const onGetDetails = (name) => async () => {
        /** code here **/
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={'pokedex__content'}>
                {pokemonIndex.length > 0 ?
                    (
                        <div className={'pokedex__search-results'}>
                            {
                                pokemonIndex.map(monster => {
                                    return (
                                        <div className={'pokedex__list-item'} key={monster.name}>
                                            <div>
                                                {monster.name}
                                            </div>
                                            <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) :
                    (
                        <p>No Results Found</p>
                    )
                }
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            {/*  code here  */}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
