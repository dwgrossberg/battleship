const Ship = (name, length) => {
  const type = {
    name: name,
    length: length,
    hits: [],
  };

  return {
    type,
  };
};

export default Ship;
