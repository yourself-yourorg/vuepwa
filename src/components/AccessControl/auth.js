const LG = console.log; // eslint-disable-line no-console

function getURLParameter(name) {
  // LG(`url ${location.search}`);
  return decodeURIComponent((new RegExp(`[?|&]${name}= ([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

export default {
  getAccessToken: () => {
    const ky = 'tkn';
    let accessToken = getURLParameter(ky);
    if (typeof Storage !== 'undefined') {
      const storedToken = localStorage.getItem(ky);
      if (accessToken) {
        localStorage.setItem(ky, accessToken);
        LG(`URI query token saved to Local Storage '${accessToken}'`);
        const redir = window.location.href.replace(`?${ky}=${accessToken}`, '');
        location.assign(redir);
        LG('Redirected to same URI without token.');
      } else if (storedToken) {
        accessToken = storedToken;
        LG(`Using token from local storage '${accessToken}'.`);
      }
    }
    // LG('---');
    return accessToken;
  },
};
