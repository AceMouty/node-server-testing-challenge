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

    // Insert Test 1: The DB should be empty and return an empty object
    it("Should be empty when we first pull data from the database", async () => {
      const records = await db('hobbits');
      
      expect(records).toHaveLength(0);
      
      expect(typeof(records)).toStrictEqual('object')
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

  // Delet test's
  describe('delte method', () => {

    beforeEach( async () => {
      await db('hobbits').truncate()
      await db('hobbits').insert([
        {name: 'Sam'},
        {name: 'Frodo'}
      ])
    })

    // Delete Test 1: Delete a hobbit by the id provided
    it('should delete the hobbit by the given id', async () => {
      let hobbits = await Hobbits.getAll();
      expect(hobbits).toHaveLength(2);

      const removedHobbit = await Hobbits.remove(1);
      expect(removedHobbit).toBe(1);
    })

    // Delete Test 2: Delete a hobbit by name or id provided
    it('should delete the hobbit by the given id, and only have the hobbit frodo left', async () => {
      
      let hobbits = await Hobbits.getAll();
      expect(hobbits).toHaveLength(2);

      await Hobbits.remove(1);

      hobbits = await Hobbits.getAll();
      expect(hobbits).toHaveLength(1);
      expect(hobbits[0].name).toBe('Frodo')

    })


  })

})