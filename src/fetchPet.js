const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // React Query: if unsuccessful request (500), want you to throw an error
  // Useful: Can do onError and stuff
  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`); // debugging purposes as is
  }

  //React Query return promise
  // Async functions always returns promises, so good so far. Don't have to await res.json. If you add await, youll add a tick / ms of delay.
  return apiRes.json();
};

export default fetchPet;
