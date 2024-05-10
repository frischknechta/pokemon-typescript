import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { pokemonSchema } from "../types";

export const Pokemon = (): JSX.Element => {
  const { id } = useParams();

  console.log(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
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
    <div>
      <img src={data.sprites.front_default} alt={`A picture of ${data.name}`} />
      <div>{data.name}</div>
      <div>
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
      <div># {data.id}</div>
      <div>Height: {data.height}</div>
      <div>Weight: {data.weight}</div>
      <div>Base experience: {data.base_experience}</div>
      {data.cries?.latest ? (
        <div>
          Cry:
          <audio controls src={data.cries.latest}></audio>
        </div>
      ) : null}
    </div>
  );
};
