// This is a safe retreat with simple examples of tests.
// If you are at sea, duplicate this file and replace one of the tests with
// a part of what's frustrating you.

// Also you can collect pieces of simple javascript here
// as a test showing the input and output

describe('Playground', () => {
  const data = {
    str: 'hello',
    num: 3,
    nan: NaN,
  }

  beforeAll(() => {
    data.promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  })

  it('chai with strings', () => {
    const { str } = data
    //
    const doubleStr1 = str + str
    const doubleStr2 = [str, str].join('')
    const doubleStr3 = `${str}${str}`
    //
    doubleStr1.should.be.a('string').eql('hellohello')
    doubleStr2.should.be.a('string').eql('hellohello')
    doubleStr3.should.be.a('string').eql('hellohello')
  })

  it('chai with nubmers', () => {
    const { num } = data
    num.should.be.a('number').gte(1)
    data.property('num').should.be.a('number').lt(5).and.not.gt(99)
  })

  it('should not be a number', () => {
    const { nan } = data
    nan.should.be.NaN
  })

  it('should use chai-as-promised', () => {
    return data.promise.should.eventually.equal(true)
  })
})
