import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { pokemonSchema } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Pokemon = (): JSX.Element => {
  const { id } = useParams();

  console.log(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      return pokemonSchema.parse(data);
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
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-5 bg-red-500">
      <Link to={"/"} className="absolute left-5 top-5 text-xl hover:text-white">
        <FontAwesomeIcon icon="chevron-left" /> Go back to Pokemons list
      </Link>
      <img src={data.sprites.front_default} alt={`A picture of ${data.name}`} />
      <h1 className="text-4xl capitalize">{data.name}</h1>
      <div className="text-2xl"># {data.id}</div>
      <div className="flex gap-5">
        {data.types.map((type) => {
          return (
            <div key={type.type.name}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${
                  type.type.url.split("/")[6]
                }.png`}
                alt={`A picture of ${type.type.name} type`}
              />
            </div>
          );
        })}
      </div>
      <div className="text-xl">HEIGHT: {data.height * 10} CM</div>
      <div className="text-xl">WEIGHT: {data.weight / 10} KG</div>
      {data.cries?.latest ? (
        <div className="flex items-center gap-5 text-xl">
          CRY:
          <audio controls src={data.cries.latest}></audio>
        </div>
      ) : null}
    </main>
  );
};
