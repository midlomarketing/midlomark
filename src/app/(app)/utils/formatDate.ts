function FormatDate(date: string | Date) {
  const shortTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'US/Eastern',
    timeZoneName: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return shortTime.format(new Date(date))
}

function GenericDate(date: string | Date) {
  const generalDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'US/Eastern',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

  return generalDate.format(new Date(date))
}

function GenericTime(date: string | Date) {
  const generalTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'US/Eastern',
    timeStyle: 'short',
  })

  return generalTime.format(new Date(date))
}

export default FormatDate
export { GenericDate, GenericTime }
