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

    // Insert Test 1: The DB should be empty
    it("Should be empty when we first pull data from the database", async () => {
      const records = await db('hobbits');
      expect(records).toHaveLength(0);
    })

    // Insert Test 2: We insert data and pull all data, we should only have 2 records in the DB
    it("Should add provided hobbit ot the database", async () => {
      
      let hobbit = await Hobbits.insert({name: 'Sam'})
      expect(hobbit.name).toBe('Sam')

      hobbit = await Hobbits.insert({name: 'Frodo'})
      expect(hobbit.name).toBe('Frodo')

      const hobbits = await db('hobbits')
      expect(hobbits).toHaveLength(2)

    })
  })


})