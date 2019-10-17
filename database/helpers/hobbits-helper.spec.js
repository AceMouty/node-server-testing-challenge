const Hobbits = require('./hobbits-helper');
const db = require('../dbConfig')

describe('hobits DB access', () => {
  
  it('should set the testing env', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })
  
  // Insert test's
  describe('insert method', () => {

     // before the test clean out a table
    beforeEach( async () => {
      await db('hobbits')
      .truncate()
    })

    it("Should add provided hobbit ot the database", async () => {
      
      // const records = await db('hobbits');
      // expect(records).toHaveLength(0)

      let hobbit = await Hobbits.insert({name: 'Sam'})
      expect(hobbit.name).toBe('Sam')

      hobbit = await Hobbits.insert({name: 'Frodo'})
      expect(hobbit.name).toBe('Frodo')

      const hobbits = await db('hobbits')
      expect(hobbits).toHaveLength(2)

    })
  })

})