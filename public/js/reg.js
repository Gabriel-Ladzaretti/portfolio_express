const storage = window.sessionStorage;

// Log visitor on server
function logVisitor(id = 1) {
  let url = window.location.protocol + "//" + window.location.host + "/reg";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.error("reg error: " + err);
  });
}

// Check browser session support
if (storage) {
  if (!storage.getItem("id")) {
    // Set unique id
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const id = array[0];
    storage.setItem("id", id);

    // Register session on server
    logVisitor(id);
  }
} else {
  // Send fallback id
  // Assuming low chance of multiply visitors with no session browser support in a given time window
  logVisitor();
}
