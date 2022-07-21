const defaultSizes = [1, 2, 4, 6];

export const getTeamSize = (size: number) => ({
  value: size,
  label: size === 1 ? `${size} Person` : `max. ${size} Personen`,
});

export const getDefaultTeamSizes = () => defaultSizes.map((size) => getTeamSize(size));
