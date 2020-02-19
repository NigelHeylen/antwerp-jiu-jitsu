const formatDate = (millis: number) => {
  const date = new Date(millis);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export {formatDate};
