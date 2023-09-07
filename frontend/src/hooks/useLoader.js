import useKey from './useKey'

export default function useLoader () {
  const [loaderValue, setKey] = useKey('loader')
  const loaderOnOff = (value) => setKey(value || !loaderValue)
  return { loaderValue, loaderOnOff }
}
