const create = async (params, credentials, feedback) => {
  try {
    let response = await fetch("/api/feedbacks/by/" + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: feedback,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByAuthor = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/feedbacks/by/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByAuthor };
