import { z } from "zod";

export const pokemonsSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
  cries: z
    .object({
      latest: z.string().nullable(),
      legacy: z.string().nullable(),
    })
    .nullable(),
  base_experience: z.number(),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export type Pokemons = z.infer<typeof pokemonsSchema>;

export type Pokemon = z.infer<typeof pokemonSchema>;
