import * as _ from 'lodash'
import SpacexQuery1 from './SpacexQuery1'

// Normally you write code in src/ and test it in tests/
// but for this exercise ignore this file and instead
// just work in tests/BagFiddling.test.js

// this works because the IDs are distinct
export function flightsByID() {
  return _.mapKeys(SpacexQuery1.data.histories, 'flight.id')
}

// FIXME -- this does not work, because it returns only one flight per rocket name
// the lodash _.groupBy method will do what you want.
// Usually you write code in one file and tests in another but just switch to the
// test file to figure out how to do this correctly
export function flightsByRocketName() {
  return _.mapKeys(SpacexQuery1.data.histories, 'flight.rocket.rocket_name')
}

const Groupers = {
  byID: flightsByID,
  byRocketName: flightsByRocketName,
}

export function foo() {}
