import useKey from './useKey'

export default function useLoader () {
  const [loaderValue, setKey] = useKey('loader')
  const loaderOnOff = (value = !loaderValue) => setKey(value)
  return { loaderValue, loaderOnOff }
}
