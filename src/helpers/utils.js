export const formatDate = (date, separator = '-') => {
  return new Date(date)
    .toLocaleDateString()
    .split('/')
    .reverse()
    .join(separator);
};
