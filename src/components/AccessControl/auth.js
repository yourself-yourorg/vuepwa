const LG = console.log; // eslint-disable-line no-console, no-unused-vars

// function getURLParameter(name) {
//   // LG(`url ${location.search}`);
//   return decodeURIComponent(
//       (
//         new RegExp(`[?|&]${name}= ([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, '']
//       )[1].replace(/\+/g, '%20')
//     ) || null;
// }

export default {
  getAccessToken: (_accessToken, _storage) => {
    const ky = 'tkn';
    // let _accessToken = getURLParameter(ky);
    let accessToken = _accessToken;
    if (typeof _storage !== 'undefined') {
      const storedToken = _storage.get(ky);
      if (accessToken) {
        _storage.set(ky, accessToken);
        LG(`URI query token saved to Local Storage '${accessToken}'`);
        const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
        location.assign(redir);
        LG('Redirected to same URI without token.');
      } else if (storedToken) {
        accessToken = storedToken;
        LG(`Using token from local storage '${accessToken}'.`);
      }
    }

    return accessToken;
  },
};
