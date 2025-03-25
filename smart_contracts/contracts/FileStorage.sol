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
    event FileDeleted(address indexed owner, string ipfsHash);

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

    // Function to delete a file
    function deleteFile(string memory _ipfsHash) public {
        File[] storage files = userFiles[msg.sender];
        bool found = false;

        for (uint256 i = 0; i < files.length; i++) {
            if (keccak256(bytes(files[i].ipfsHash)) == keccak256(bytes(_ipfsHash))) {
                found = true;

                // Shift elements to remove the deleted file
                for (uint256 j = i; j < files.length - 1; j++) {
                    files[j] = files[j + 1];
                }
                files.pop(); // Remove last element

                emit FileDeleted(msg.sender, _ipfsHash);
                break;
            }
        }

        require(found, "File not found");
    }
}


//npx hardhat run ignition/modules/deploy.ts --network sepolia
//npx hardhat verify --network sepolia ADD