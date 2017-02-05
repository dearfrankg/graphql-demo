require('isomorphic-fetch')

createMessage()
  .then(note)
  .then(({createMessage: {id}}) =>
    getMessage(id)
  )
  .then(note)
  .then(({getMessage: {id, content}}) =>
    updateMessage(id, {content, author:'frank'})
  )
  .then(note)

//
// HELPER FUNCTIONS
//

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
    return res.data
  })

}

function createMessage() {
  let queryString = `mutation createMessage($input: MessageInput) {
    createMessage(input: $input) {
      id
    }
  }`

  let query = JSON.stringify({
    query: queryString,
    variables: {
      input: {
        author: 'andy',
        content: 'hope is a good thing'
      }
    }
  })

  return sendQuery(query)
}

function getMessage(id) {
  let queryString = `query getMessage($id: ID!) {
    getMessage(id: $id) {
      id,
      content,
      author
    }
  }`

  let query = JSON.stringify({
    query: queryString,
    variables: {
      id
    }
  })

  return sendQuery(query)
}

function updateMessage(id, input) {
  let queryString = `mutation updateMessage($id: ID!, $input: MessageInput) {
    updateMessage(id: $id, input: $input) {
      id,
      content,
      author
    }
  }`

  let query = JSON.stringify({
    query: queryString,
    variables: {
      id,
      input
    }
  })

  return sendQuery(query)
}
