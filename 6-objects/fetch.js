require('isomorphic-fetch')

const query = `
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
`

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query
  })
})
.then(res => res.json())
.then(res => {
  console.log(JSON.stringify(res, null, 2))
})
