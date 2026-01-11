const useDate = (seconds) => {
  let d = new Date(1970, 0, 1)
  d.setUTCSeconds(seconds)
  d = d.toLocaleDateString('ru-RU')

  return d
}

export default useDate
