import { Link } from "react-router-dom";

type Props = {
  name: string;
  url: string;
};

export const PokemonCard = ({ name, url }: Props): JSX.Element => {
  return (
    <Link
      key={name}
      to={`/${url.split("/")[6]}`}
      className="group flex h-36 w-max flex-col items-center justify-between"
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          url.split("/")[6]
        }.png`}
        alt={`A picture of ${name}`}
        className="group-hover:scale-125"
      />
      <h2 className="text-xl capitalize group-hover:text-white">{name}</h2>
    </Link>
  );
};
