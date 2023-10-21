const API_URL = "https://6531befe4d4c2e3f333d41d1.mockapi.io/user";

export async function getAllUsers(signal) {
  const response = await fetch(API_URL, {
    method: "GET",
    // a signal is an object that allows you to communicate with a DOM request
    // (such as a Fetch) and abort it.
    // This makes this request cancellable.
    // this is optional, but it's a good practice to use it
    signal,
  });

  // if the request is aborted, return an empty array, no need to continue
  if (signal.aborted) {
    return [];
  }
  const data = await response.json();

  return data;
}

export async function updateUser(id, dataToBeUpdated) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToBeUpdated),
  });

  // fetch on throws an error for network errors
  // but if the server responds with an error code, it won't throw
  // so we need to check for the response.ok property
  // if it's false, we throw an error
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const updatedUser = await response.json();

  return updatedUser;
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  // fetch on throws an error for network errors
  // but if the server responds with an error code, it won't throw
  // so we need to check for the response.ok property
  // if it's false, we throw an error
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const deletedUser = await response.json();

  return deletedUser;
}
