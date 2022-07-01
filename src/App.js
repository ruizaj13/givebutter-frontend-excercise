import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchEvolutionChainById, fetchPokemonDetailsByName, fetchPokemonSpeciesByName } from "./api";

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
        const typesAndMoves = await fetchPokemonDetailsByName(name)
        const speciesId = await fetchPokemonSpeciesByName(name)
        const evolutions = await fetchEvolutionChainById(speciesId.evolution_chain.url.split('/')[6])
        
        //Recursively retrieves evolutions from deeply nested object
        const evolutionChain = []

        const getEvolutions = (array) => {
          if (array[0].evolves_to.length > 0) {
            evolutionChain.push(array[0].species.name)
            getEvolutions(array[0].evolves_to)
          } else {
            evolutionChain.push(array[0].species.name)
            return
          }
        }

        getEvolutions([evolutions.chain])

        const pokeDetails = {
            name: name,
            types: typesAndMoves.types.map(pokeType => { return pokeType.type.name }),
            moves: typesAndMoves.moves.slice(0, 4).map(pokeMove => { return pokeMove.move.name }),
            evolutions: evolutionChain
        }

        setPokemonDetails(pokeDetails)
        console.log(evolutions.chain)
        console.log(pokeDetails)
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
                            <p><strong>{pokemonDetails.name}</strong></p>
                            <div className={'details'}>
                                <div>
                                    <p><strong>Types</strong></p>
                                    <ul>
                                        {pokemonDetails.types.map(pokeType => {
                                            return (
                                                <li key={pokeType}>{pokeType}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <p><strong>Moves</strong></p>
                                    <ul>
                                        {pokemonDetails.moves.map(pokeMove => {
                                            return (
                                                <li key={pokeMove}>{pokeMove}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <p className={'evolutions'}><strong>Evolutions</strong></p>
                            <div className={'pokedex__evolution-chain'}>
                                {pokemonDetails.evolutions.map(evolution => {
                                    return (
                                        <em>{evolution}</em>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
