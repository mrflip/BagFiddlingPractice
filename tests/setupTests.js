import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

// This is a setup file, ignore it (and don't modify it)

chai.should()

chai.use(chaiAsPromised)
Error.stackTraceLimit = 50
