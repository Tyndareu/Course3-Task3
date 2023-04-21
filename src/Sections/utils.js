import games from '../Json/games.json'
const variant = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark']

const FirstOrSecond = () => {
  games.forEach(element => {
    if (element.time.charAt(0) === '9') {
      element.variant = variant[0].toLowerCase()
      element.game = 'First Game'
    } else {
      element.variant = variant[2].toLowerCase()
      element.game = 'Second Game'
    }
  })
  return games
}

export const FilterMonths = (filterMonth, dayFilter) => {
  if (filterMonth !== 'All Months') {
    if (dayFilter !== 'All Days') {
      return (FirstOrSecond(games).filter((x) => x.date.replaceAll('_', '/') === dayFilter))
    }
    return (FirstOrSecond(games).filter((x) => x.month.toLowerCase() === filterMonth.toLowerCase()))
  } else {
    if (dayFilter !== 'All Days') {
      return (FirstOrSecond(games).filter((x) => x.date.replaceAll('_', '/') === dayFilter))
    }
    return FirstOrSecond()
  }
}

export const AllDates = (monthfilter) => {
  const allDates = ['All Days']
  if (monthfilter !== 'All Months') {
    games.filter((x) => x.month.toLowerCase() === monthfilter.toLowerCase()).forEach(element => {
      allDates.push(element.date.replaceAll('_', '/'))
    })
  } else {
    games.forEach(element => {
      allDates.push(element.date.replaceAll('_', '/'))
    })
  }

  return ([...new Set(allDates)])
}

export const Months = () => {
  const allMonths = ['All Months']
  games.forEach((element) => {
    allMonths.push(element.month)
  })
  return [...new Set(allMonths)]
}
