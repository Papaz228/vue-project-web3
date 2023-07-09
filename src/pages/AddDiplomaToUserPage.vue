<template>
    <div>
      <label>Upload file</label>
      <input type="file" @change="onFileChange" accept=".pdf, .png, .jpg, .jpeg" />
      <input v-model="targetUser" type="text" placeholder="Enter target user address" />
      <button @click="uploadDiploma" :disabled="!diplomaFile">Upload Diploma</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        diplomaFile: null,
        targetUser: '',
      };
    },
    methods: {
    ...mapActions(['saveAndMintNft']),
      async uploadDiploma() {
        try {
          // Read the diploma file
          const reader = new FileReader();
          reader.onload = async () => {
            const diplomaData = new Uint8Array(reader.result);
  
            // Upload the diploma file to Pinata
            const pinataAPIKey = '8eb6f3db6916d3c7ecba';
            const pinataAPISecret = 'e1d0c01b1788a502a6d279c81369788efef055fe1f4ba2ce339d6483263c380a';
  
            const formData = new FormData();
            formData.append('file', new Blob([diplomaData]), this.diplomaFile.name);
  
            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
              method: 'POST',
              headers: {
                pinata_api_key: pinataAPIKey,
                pinata_secret_api_key: pinataAPISecret,
              },
              body: formData,
            });
  
            if (response.ok) {
              const data = await response.json();
              const ipfsHash = data.IpfsHash;
              // Process the IPFS hash as needed
              await this.saveAndMintNft([ipfsHash, this.targetUser])
              console.log('IPFS Hash:', ipfsHash);
            } else {
              throw new Error('Error uploading diploma: ' + response.statusText);
            }
          };
          reader.readAsArrayBuffer(this.diplomaFile);
        } catch (error) {
          console.error('Error uploading diploma:', error);
        }
      },
      onFileChange(event) {
        this.diplomaFile = event.target.files[0];
      },
    },
  };
  </script>
  