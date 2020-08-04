export const getUrls = async () => {
  let urls = await fetch('http://localhost:3001/api/v1/urls')
  if (!urls.ok) {
    throw new Error('Couldn\'t get URLS')
  } else {
    let response = await urls.json()
    return response;
  }
}

export const postUrl = async (url, title) => {
  let data = await fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({long_url: url, title: title})
  })
  if (!data.ok) {
    throw new Error('URL submit failed')
  } else {
    let response = await data.json()
    return response;
  }
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