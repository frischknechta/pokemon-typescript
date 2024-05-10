import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { pokemonsSchema } from "../types";
import { useState } from "react";
import { PokemonCard } from "../components/PokemonCard";

export const Pokemons = (): JSX.Element => {
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );

      return pokemonsSchema.parse(data);
    },
    staleTime: Infinity,
  });

  if (isLoading || data === undefined) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>My pokemon app</h1>
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        value={filter}
        onChange={(event) => setFilter(event?.target.value)}
      />
      <div>
        {data.results
          .filter(
            (elem) => elem.name.includes(filter) || elem.url.includes(filter)
          )
          .map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            );
          })}
      </div>
    </div>
  );
};
