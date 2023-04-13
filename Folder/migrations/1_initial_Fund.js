const Fund= artifacts.require("Funding")

module.exports= function (deployer){
    deployer.deploy(Fund)
}