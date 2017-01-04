/* eslint-disable */
const wrapWithPre = text => `<pre>${text}</pre>`

const mapCharacter = character => ({
  name: character.name,
  height: character.height,
  mass: character.mass,
  hair_color: character.hair_color,
  skin_color: character.skin_color,
  eye_color: character.eye_color,
  birth_year: character.birth_year,
  gender: character.gender
})

trae.get('https://swapi.co/api/people/')
  .then(res => {
    const node = document.getElementById('characters')
    const characters = res.data.results
      .map(mapCharacter)
      .map(character => wrapWithPre(JSON.stringify(character, null, '\t')))
    node.innerHTML = `
      <div class="grid">
        ${characters.join('')}
      </div>
    `
  });
