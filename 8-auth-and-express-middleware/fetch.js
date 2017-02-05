require('isomorphic-fetch')

ip()
  .then(note)

//
// HELPER FUNCTIONS
//


function ip() {
  let queryString = `query ip($args, $request) {
    ip() ip
  }`

  let query = JSON.stringify({
    query: queryString
  })

  return sendQuery(query)
}

function note(data) {
  console.log('note:\n', JSON.stringify(data, null, 2))
  return data
}

function sendQuery(query) {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: query
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    return res.data
  })
}
