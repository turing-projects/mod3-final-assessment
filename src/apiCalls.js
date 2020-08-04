export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (url, title) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({long_url: url, title: title})
  })
  .then(response => response.json())
}

export const deleteUrl = async (id) => {
  let url = await fetch(`http://localhost:3001/api/v1/urls/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/JSON'
    }
  })
   return url;
}