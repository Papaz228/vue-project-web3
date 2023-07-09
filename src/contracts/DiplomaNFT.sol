// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.19;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract DiplomaNft is ERC721Enumerable, Ownable {
//     using Strings for uint256;
//     uint256 maxSupply = 1000;
//     string public baseURI = "https://gateway.pinata.cloud/ipfs/";
//     mapping(uint256 => string) private tokenHashes;
//     mapping(address => uint[]) private userTokenIds;

//     constructor() ERC721("DiplomaToken", "DIPT") {}

//     function _baseURI() internal view virtual override returns (string memory){
//         return baseURI;
//     }

//     function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
//         _requireMinted(tokenId);
//         return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenHashes[tokenId])) : "";
//     }

//     function changeBaseURI(string memory newBaseURI) public onlyOwner{
//         baseURI = newBaseURI;
//     }

//     function mintDiplomaNFT(address collector) public payable returns(uint){
//         uint256 _currentSupply = totalSupply();
//         require(_currentSupply < maxSupply);
//         _safeMint(collector, _currentSupply); 
//         userTokenIds[collector].push(_currentSupply);
//         return _currentSupply;
//     }

//     function setTokenHash(uint tokenId, string calldata hash) external {
//         tokenHashes[tokenId] = hash;
//     }

//     function getUserTokenIds(address userAddress) public view returns(uint256[] memory) {
//         return userTokenIds[userAddress];
//     }

//     function getTokenHash(uint tokenId) public view returns(string memory) {
//         return tokenHashes[tokenId];
//     }

//     function getAllTokenHashesForUser(address user) external view returns(string[] memory) {
//         uint[] memory currentTokenIds  = getUserTokenIds(user);
//         string[] memory hashes = new string[](currentTokenIds.length);
//         for(uint i = 0; i < currentTokenIds.length; i++) {
//             hashes[i] = getTokenHash(currentTokenIds[i]);
//         }
//         return hashes;
//     }
// }