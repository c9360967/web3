const { deployments, getNamedAccounts, ethers } = require("hardhat")
const {expect, assert} = require("chai")

describe("test Test contract", async ()=>{

    let firstAccount;
    let secondAccount;
    let TestExample;
    // let TestExampleAsSecondAccount;
    let TestSecond;
    beforeEach(async() => {
        await deployments.fixture(["test"]);
        firstAccount = (await getNamedAccounts()).firstAccount
        secondAccount = (await getNamedAccounts()).secondAccount
        const Test = await deployments.get("Test")
        console.log("Test address: " + Test.address)
        TestExample = await ethers.getContractAt("Test", Test.address)
        TestSecond = await ethers.getContract("Test", secondAccount)
        console.log("TestSecond address: " + TestSecond.target)
        // TestExampleAsSecondAccount = await ethers.getContractAt("Test", TestSecond.target)
    })

    it("test setOwner", async () => {
        // await TestExample.setOwner(secondAccount)
        assert.equal(await TestExample.getOwner(), firstAccount)
    })

    it("test setOwner, not owner", async () => {
        await expect(TestSecond.setOwner(secondAccount)).to.be.revertedWith("not owner")
    })

})