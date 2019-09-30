const chai = require('chai');

const SimpleStorage = artifacts.require('SimpleStorage');
chai.should();

/** @test {SimpleStorage} contract */
contract('SimpleStorage', (accounts) => {
    let simpleStorageInstance;

    beforeEach(async () => {
        simpleStorageInstance = await SimpleStorage.new();
        simpleStorageInstance.setup(6);
    });

    /**
     * Test the two contract methods
     * @test {SimpleStorage#set} and {SimpleStorage#get}
     */
    it('...should store the value 89.', async () => {
        ((await simpleStorageInstance.get()).toString()).should.be.equal('6');

        // Set value of 89
        await simpleStorageInstance.set(89, { from: accounts[0] });

        // Get stored value
        ((await simpleStorageInstance.get()).toString()).should.be.equal('89');
    });
});
