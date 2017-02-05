require('isomorphic-fetch')

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    query: '{ hello }'
  })
})
.then(res => res.json())
.then(res => {
  console.log(res)
})
