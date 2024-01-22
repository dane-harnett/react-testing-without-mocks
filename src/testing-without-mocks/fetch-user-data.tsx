export const fetchUserData = (userId: string, fetchImpl = fetch) => {
  // actually going to the network and doing a thing
  // using the id as an argument
  return fetchImpl(`http://localhost:8088?id=${userId}`)
    .then((res) => res.json())
    .then((jsonData) => jsonData);
};

export const createNull = (data: any): typeof fetchUserData => {
  return (userId) => {
    const fakeFetch = (url) => {
      console.log(url);
      if (url === `http://localhost:8088?id=${userId}`) {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              data,
            });
          },
        });
      } else {
        throw new Error("Unexpected URL");
      }
    };

    return fetchUserData(userId, fakeFetch);
  };
};
