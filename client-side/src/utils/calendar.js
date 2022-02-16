import moment from 'moment'

export const formatDate = (dateToDisplay) => {
  if (!dateToDisplay) {
    return null
  }

  const auxDate = new Date(dateToDisplay)

  const parsedDay = moment(auxDate, 'DD-MM-YYYY').format('DD MMM YYYY')
  const time = moment(auxDate, 'DD-MM-YYYY').format('h:mm a')

  const date = {
    parsedDay,
    time
  }

  return date
}