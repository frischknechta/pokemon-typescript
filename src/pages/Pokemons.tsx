import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { pokemonsSchema } from "../types";
import { useState } from "react";
import { PokemonCard } from "../components/PokemonCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Pokemons = (): JSX.Element => {
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
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
    <main className="flex min-h-screen flex-col items-center bg-red-500">
      <h1 className="my-5 text-center text-4xl">My pokemon app</h1>
      <form className="relative flex w-1/4 justify-center">
        <input
          className="h-8 w-full rounded border border-black p-2"
          type="text"
          name="searchBar"
          id="searchBar"
          value={filter}
          onChange={(event) => setFilter(event?.target.value)}
        />
        <FontAwesomeIcon
          icon="magnifying-glass"
          className="absolute right-2 top-2 h-4"
        />
      </form>
      <div className="grid w-full grid-cols-5 justify-items-center gap-y-5 py-5">
        {data.results
          .filter(
            (elem) => elem.name.includes(filter) || elem.url.includes(filter),
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
    </main>
  );
};
