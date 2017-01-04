/* eslint-disable */
const wrapWithPre = text => `<pre>${text}</pre>`

trae.get('http://www.clashapi.xyz/')
  .then(res => {
    const node = document.getElementById('json')
    node.innerHTML = wrapWithPre(JSON.stringify(res.data, null, '\t'))
  });

const params = {
  q: 'funny cat',
  api_key: 'dc6zaTOxFJmzC'
}

const giphyAPI = trae.create({baseUrl: 'http://api.giphy.com/v1'})

const getUrls = resp => {

}

giphyAPI.after()

giphyAPI.get('gifs/search', { params })
  .then(res => {
    const node = document.getElementById('text')
    node.innerHTML = wrapWithPre(JSON.stringify(res.data, null, '\t'))
  });
