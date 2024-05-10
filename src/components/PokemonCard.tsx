import { Link } from "react-router-dom";

type Props = {
  name: string;
  url: string;
};

export const PokemonCard = ({ name, url }: Props): JSX.Element => {
  return (
    <Link key={name} to={`/${url.split("/")[6]}`}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          url.split("/")[6]
        }.png`}
        alt={`A picture of ${name}`}
      />
      <div>{name}</div>
    </Link>
  );
};
