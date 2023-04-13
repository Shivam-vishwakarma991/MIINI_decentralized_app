import contract from "@truffle/contract"

export const loadcontract= async (name, provider)=>{
    const res= await fetch(`/contracts/${name}.json`);
    const artifact= await res.json();
    console.log(artifact)
    const _contract= contract(artifact);
    // console.log(_contract)
    _contract.setProvider(provider);
    const deployedContract= await _contract.deployed();
    return deployedContract;

}
