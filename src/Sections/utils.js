import games from '../Json/games.json'
const variant = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark']

export const FirstOrSecond = (games) => {
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

const FilterTeam = (games, teams) => {
  let gamesTeam = []
  if (teams.length !== 0) {
    teams.forEach(element => {
      gamesTeam = gamesTeam.concat(games.filter((x) => x.teams.includes(element)))
    })
  } else gamesTeam = games
  return FirstOrSecond([...new Set(gamesTeam)])
}

export const FilterMonths = (filterMonth, dayFilter, teams) => {
  if (filterMonth !== 'All Months') {
    if (dayFilter !== 'All Days') {
      return (FilterTeam(games, teams).filter((x) => x.date.replaceAll('_', '/') === dayFilter))
    }
    return (FilterTeam(games, teams).filter((x) => x.month.toLowerCase() === filterMonth.toLowerCase()))
  } else {
    if (dayFilter !== 'All Days') {
      return (FilterTeam(games, teams).filter((x) => x.date.replaceAll('_', '/') === dayFilter))
    }
    return FilterTeam(games, teams)
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

export const Location = (item) => {
  let location
  const A = {
    description: '24 W. Walton St., Chicago, IL 60610',
    iframe:
      'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d79896.00036669537!2d-87.63432217110461!3d41.91107217731799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24+W+Walton+St%2C+Chicago%2C+IL+60610!3m2!1d41.9002367!2d-87.6290717!5e0!3m2!1sen!2sus!4v1498661900848'
  }
  const G = {
    description: '1734 N. Orleans St., Chicago, IL 60614',
    iframe:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.0251959124826!2d-87.64023168455779!3d41.91381707921941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34073f306a3%3A0x9e1726bbf8f23f0e!2s1734+N+Orleans+St%2C+Chicago%2C+IL+60614!5e0!3m2!1sen!2sus!4v1498666206411'
  }

  const H = {
    description: '2245 N. Southport Ave., Chicago, IL 60614',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.585683085616!2d-87.66511458455746!3d41.9232645792187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d6!2s2245+N+Southport+Ave%2C+Chicago%2C+IL+60614!5e0!3m2!1sen!2sus!4v1498666257800'
  }
  const M = {
    description: '2625 N. Orchard St., Chicago, IL 60614',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5936.571390936897!2d-87.6478374194755!3d41.92971193428922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2630e551%3A0x3e719e44a5cef714!2s2625+N+Orchard+St%2C+Chicago%2C+IL+60614!5e0!3m2!1sen!2sus!4v1498666301447'
  }
  const N = {
    description: '1409 N. Ogden Ave., Chicago, IL 60610',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.336427766927!2d-87.648358384558!3d41.90712597921987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af13a8945%3A0xb6ad1ec2b6f379ba!2s1409+N+Ogden+Ave%2C+Chicago%2C+IL+60610!5e0!3m2!1sen!2sus!4v1498666346558'
  }
  const S = {
    description: '2101 N. Fremont St., Chicago, IL 60614',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.749141506375!2d-87.65354528455761!3d41.91975117921891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196fb41dc7%3A0x970be7f7d6336df5!2s2101+N+Fremont+St%2C+Chicago%2C+IL+60614!5e0!3m2!1sen!2sus!4v1498666373464'
  }
  const D = {
    description: 'Not Difine',
    iframe: 'Not Difine'
  }
  switch (item.location.charAt(0)) {
    case 'A':
      location = A
      break
    case 'G':
      location = G
      break
    case 'H':
      location = H
      break
    case 'M':
      location = M
      break
    case 'N':
      location = N
      break
    case 'S':
      location = S
      break

    default:
      location = D
      break
  }
  return location
}

export const isMobile = window.innerWidth <= 500
