const Ship = (name, length) => {
  const type = {
    name: name,
    length: length,
    hits: Array.from(Array(length).keys()).fill(null, 0),
  };

  return {
    type,
  };
};

export default Ship;
