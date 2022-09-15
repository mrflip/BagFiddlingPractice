import _ from 'lodash'
import SpacexQuery1 from '../src/SpacexQuery1'
// import * as ProcessBag from './ProcessBag'

const SpacexFlights = SpacexQuery1.data.launches

//
// Code part -- normally this would be in ProcessBag.js but
// for this exercise you will just work in this file.

export function scrubNil(bag) {
  return _.omitBy(bag, _.isNil)
}

export function rocketMissionName(flight) {
  if (!flight) {
    return '(none)'
  }
  const { mission_name, rocket } = flight
  const { rocket_name = '(none)' } = rocket || ''
  return `${mission_name} - ${rocket_name}`
}

export function rocketMissionNames(flightListsBag) {
  // return _.mapValues(flightListsBag, (flights) => _.map(flights, (flight) => rocketMissionName(flight)))
  // the line above is the wordier equivalent of this:
  return _.mapValues(flightListsBag, (flights) =>
    _.map(flights, rocketMissionName),
  )
}

// Take all the flights and reassemble them into a bag with IDs as key and a list of launches.
// { "4": [...launches for it], ...}
// The following works because the IDs are distinct:
export function flightsByID() {
  const oneFlightPerID = _.mapKeys(SpacexFlights, 'id')
  const allFlightsPerID = _.mapValues(oneFlightPerID, (flight) => [flight])
  return scrubNil(allFlightsPerID)
}

// Take take all the flights and reassemble them into a bag { "Falcon 1": [...launches for it], ...}
// FIXME -- this does not work, because it returns only one flight per rocket name
// figure out how to use lodash to make the tests pass.
export function flightsByRocketName() {
  const perRocketName = _.mapKeys(SpacexFlights, 'rocket.rocket_name')
  const allPerRocketName = _.mapValues(perRocketName, (flight) => [flight])
  return scrubNil(allPerRocketName)
}

const Groupers = {
  id: flightsByID,
  rocketName: flightsByRocketName,
}

export function groupFlights({ by }) {
  const grouper = Groupers[by]
  if (!grouper) {
    throw new Error(
      `Cannot group by ${by}, please use one of ${_.keys(Groupers).join(', ')}`,
    )
  }
  return grouper()
}

describe('Launch Queries', () => {
  it('can show ', () => {
    const byID = rocketMissionNames(groupFlights({ by: 'id' }))
    console.log('byID', byID)
    expect(byID)
      .to.be.an('object')
      .eql({
        4: ['RatSat - Falcon 1'],
        5: ['RazakSat - Falcon 1'],
        6: ['Falcon 9 Test Flight - Falcon 9'],
        10: ['CRS-2 - Falcon 9'],
        22: ['CRS-6 - Falcon 9'],
        26: ['Jason 3 - Falcon 9'],
        32: ['CRS-9 - Falcon 9'],
        38: ['SES-10 - Falcon 9'],
        39: ['NROL-76 - Falcon 9'],
        40: ['Inmarsat-5 F4 - Falcon 9'],
        42: ['BulgariaSat-1 - Falcon 9'],
        44: ['Intelsat 35e - Falcon 9'],
        54: ['SES-16 / GovSat-1 - Falcon 9'],
        55: ['Falcon Heavy Test Flight - Falcon Heavy'],
        56: ['Paz / Starlink Demo - Falcon 9'],
        57: ['Hispasat 30W-6 - Falcon 9'],
        62: ['Iridium NEXT Mission 6 - Falcon 9'],
        63: ['SES-12 - Falcon 9'],
      })
  })

  it('can show ', () => {
    const byRocketName = rocketMissionNames(groupFlights({ by: 'rocketName' }))
    console.log('rocketName', byRocketName)
    expect(byRocketName)
      .to.be.an('object')
      .eql({
        'Falcon Heavy': ['Falcon Heavy Test Flight - Falcon Heavy'],
        'Falcon 9': [
          'CRS-6 - Falcon 9',
          'Jason 3 - Falcon 9',
          'Paz / Starlink Demo - Falcon 9',
          'SES-10 - Falcon 9',
          'Intelsat 35e - Falcon 9',
          'SES-12 - Falcon 9',
          'CRS-9 - Falcon 9',
          'Inmarsat-5 F4 - Falcon 9',
          'BulgariaSat-1 - Falcon 9',
          'Hispasat 30W-6 - Falcon 9',
          'SES-16 / GovSat-1 - Falcon 9',
          'Iridium NEXT Mission 6 - Falcon 9',
          'CRS-2 - Falcon 9',
          'Falcon 9 Test Flight - Falcon 9',
          'NROL-76 - Falcon 9',
        ],
        'Falcon 1': ['RatSat - Falcon 1', 'RazakSat - Falcon 1'],
      })
  })
})
