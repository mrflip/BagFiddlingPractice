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