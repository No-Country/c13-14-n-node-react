export const fetching = async (url, options) => {
  try {
    const res = await fetch(url, { method: 'GET', ...options })
    const data = await res.json()
    return data
  } catch ({ message }) {
    //! Manejar errores
    console.log(message)
    return false
  }
}
