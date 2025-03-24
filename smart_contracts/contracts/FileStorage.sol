// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FileStorage {
    struct File {
        string ipfsHash;
        string filename;
        uint256 timestamp;
        address owner;
    }

    // Mapping from user address to their files
    mapping(address => File[]) private userFiles;

    // Event to notify when a file is uploaded
    event FileUploaded(address indexed owner, string ipfsHash, string filename, uint256 timestamp);

    // Function to upload a file
    function uploadFile(string memory _ipfsHash, string memory _filename) public {
        File memory newFile = File({
            ipfsHash: _ipfsHash,
            filename: _filename,
            timestamp: block.timestamp,
            owner: msg.sender
        });

        userFiles[msg.sender].push(newFile);
        emit FileUploaded(msg.sender, _ipfsHash, _filename, block.timestamp);
    }

    // Function to get files uploaded by a user
    function getFilesByOwner(address _owner) public view returns (File[] memory) {
        return userFiles[_owner];
    }
}

//0xAe14879343C5C1F239959503Fc6eA17245842499