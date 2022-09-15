import _ from 'lodash'
import SpacexQuery1 from '../src/SpacexQuery1'
// import * as ProcessBag from './ProcessBag'

//
// Code part -- normally this would be in ProcessBag.js but
// for this exercise you will just work in this file.

export function scrubNil(bag) {
  return _.omitBy(bag, _.isNil)
}

// this works because the IDs are distinct
export function flightsByID() {
  const oneFlightPerID = _.mapKeys(SpacexQuery1.data.histories, 'flight.id')
  const allFlightsPerID = _.mapValues(oneFlightPerID, (flight) => [
    flight?.flight,
  ]) // a list of length 1
  return scrubNil(allFlightsPerID)
}

export function rocketMissionName(flight) {
  const { mission_name, rocket } = flight
  const { rocket_name } = rocket
  return `${mission_name} - ${rocket_name}`
}

// FIXME -- this does not work, because it returns only one flight per rocket name
// the lodash _.groupBy method will do what you want.
// Usually you write code in one file and tests in another but just switch to the
// test file to figure out how to do this correctly
export function flightsByRocketName() {
  return _.mapKeys(SpacexQuery1.data.histories, 'flight.rocket.rocket_name')
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
    const byID = Groupers.id()
    console.error(
      _.mapValues(byID, (flights) => _.map(flights, rocketMissionName)),
    )
  })

  //   describe('groupFlights', () => {
  //     it('returns flights by id', () => {
  //       const result = groupFlights({ by: 'id' })
  //       expect(result).to.eql({})
  //     })
  //   })
})
