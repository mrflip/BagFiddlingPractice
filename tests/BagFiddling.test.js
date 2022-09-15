import * as _ from 'lodash'
import SpacexQuery1 from '../src/SpacexQuery1'
// import * as ProcessBag from './ProcessBag'

//
// Code part -- normally this would be in ProcessBag.js but
// for this exercise you will just work in this file.

// this works because the IDs are distinct
export function flightsByID() {
  const oneFlightPerID _.mapKeys(SpacexQuery1.data.histories, 'flight.id')
  const allFlightsPerID = _.map(oneFlightPerID, (flight) => ([flight])) // a list of length 1

}

export rocketMissionName(flight) {
  const { mission_name, rocket } = flight
  const { rocket_name } = rocket
  return `${mission_name} - ${rocketName}`
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
    const byID = Groupers.byID()
    console.error(byID)
    const data = { num: 3 }
    data.property('num').should.be.a('number').lt(5).and.not.gt(99)
  })

  describe('groupFlights', () => {
    it('returns flights by id', () => {
      const result = groupFlights({ by: 'id' })
      expect(result).to.eql({})
    })
  })
})
