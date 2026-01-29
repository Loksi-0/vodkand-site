const useDate = (seconds: number) => {
  const date = new Date(1970, 0, 1)
  date.setUTCSeconds(seconds)
  const stringDate = date.toLocaleDateString('ru-RU')

  return stringDate
}

export default useDate
