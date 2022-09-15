import Chai                             from 'chai'
import ChaiAsPromised                   from 'chai-as-promised'
import ChaiEach                         from 'chai-each'
import Sinon                            from 'sinon'
import ChaiSinon                        from 'sinon-chai'

// This is a setup file, ignore it (and don't modify it)

// See https://github.com/chaijs/chai-things/issues/4 for use of c-a-prom with c-things

Chai.use(ChaiEach)
Chai.use(ChaiSinon)
Chai.use(ChaiAsPromised) // must be last

global.sinon  = Sinon
global.expect = Chai.expect

Error.stackTraceLimit = 50

