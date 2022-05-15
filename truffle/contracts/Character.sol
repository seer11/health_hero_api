// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Character is ERC721URIStorage, ReentrancyGuard {
    using ECDSA for bytes32; // used for crypotograhic hash
    using Counters for Counters.Counter;
    Counters.Counter private _totalSupply;

    address payable public contractOwner;
    address private marketContractAddress;

    address[] private users;

    address public signedWalletAddress;

    mapping(address => uint256) public userAddressToHighScore; 

    //Events

    struct NFTItem {
        uint256 tokenId;
        string tokenURI;
    }

    mapping(uint256 => NFTItem) tokenIdToNFTItem;

    constructor(address marketplaceAddress) ERC721("Hero Battle Character", "HBC") {
        contractOwner = payable(msg.sender);
        marketContractAddress = marketplaceAddress;
    }

    modifier onlyContractOwner() {
        require(
        msg.sender == contractOwner,
        "The caller is not the contract owner"
        );
        _;
    }

    // Functions needed for the Character
    function totalSupply() public view returns (uint256) {
        return _totalSupply.current();
    } 

    function setMarketContractAddress(address _contractAddress)
        public
        onlyContractOwner
    {
        marketContractAddress = _contractAddress;
    }

    function getUsers() public view returns (address[] memory) {
        return users;
    }


     function setHighScore(uint256 _newHighScore, address _sender) internal {
        if (userAddressToHighScore[_sender] == 0) {
        users.push(_sender);
        }
        userAddressToHighScore[_sender] = _newHighScore;
    }

    function generateBattleCharacter (uint256 _score, String memory _tokenURI, uint v, bytes32 r, bytes32 s) public nonReentrant {
        bytes32 message = keccak256(
            abi.encodePacked(_score, msg.sender, _tokenURI)
        );

        bytes32 messageHash = message.toEthSignedMessageHash();
        address walletAddress = messageHash.recover(v, r, s);
        require(walletAddress == signedWalletAddress, "Invalid signature");
        require(
            _score > userAddressToHighScore[msg.sender],
            "Already minted at this score before"
        );

        setHighScore(_score, msg.sender);
        _setTokenURI(_tokenId, _tokenURI);
        tokenIdToNFTItem[_tokenId] = NFTItem(_tokenId, _tokenURI);

       //emit chracter upgrade event
    }

    function setTokenURI(string memory _tokenURI) private {
        uint256 lastTokenId = totalSupply() - 1;
        _setTokenURI(lastTokenId, _tokenURI);
        tokenIdToNFTItem[lastTokenId] = NFTItem(lastTokenId, _tokenURI);
    }

    function setSignedWalletAddress(address _walletAddress)
        public
        onlyContractOwner
    {
        signedWalletAddress = _walletAddress;
    }

      function updateTokenURI(uint256 _tokenId, string memory _tokenURI)
        public
        onlyContractOwner
    {
        _setTokenURI(_tokenId, _tokenURI);
        tokenIdToNFTItem[_tokenId] = NFTItem(_tokenId, _tokenURI);
    }


    function getUserOwnedNFTs(address _user)
        public
        view
        returns (NFTItem[] memory)
    {
        NFTItem[] memory nfts = new NFTItem[](getBalanceOfUser(_user));
        uint256 totalNFTCount = totalSupply();
        uint256 curInd = 0;
        for (uint256 i = 0; i < totalNFTCount; i++) {
        if (ownerOf(i) == _user) {
            NFTItem storage curItem = tokenIdToNFTItem[i];
            nfts[curInd++] = curItem;
        }
        }
        return nfts;
    }

    function getAllNFTs() public view returns (NFTItem[] memory) {
        uint256 totalNFTCount = totalSupply();
        NFTItem[] memory nfts = new NFTItem[](totalNFTCount);
        for (uint256 i = 0; i < totalNFTCount; i++) {
        NFTItem storage curItem = tokenIdToNFTItem[i];
        nfts[i] = curItem;
        }
        return nfts;
    }

}