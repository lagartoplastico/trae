/* eslint-disable */
const params = {
  q: 'kittens',
  api_key: 'dc6zaTOxFJmzC',
  limit: 4
}

const giphyAPI = trae.create({baseUrl: 'http://api.giphy.com/v1'})

const getUrls = res => res.data.data.map(gif => gif.images.fixed_height.url)

const generateImages = urls => urls.map(url => `<img src="${url}"></img>`)

giphyAPI.after(getUrls)
giphyAPI.after(generateImages)

giphyAPI.get('gifs/search', { params })
  .then(res => {
    const node = document.getElementById('gifs')
    node.innerHTML = `
      <h1>Kittens !!!</h1>
      <div class="gifs-grid">
        ${res.join('')}
      </div>
    `
  });
