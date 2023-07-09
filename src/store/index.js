import {createStore} from "vuex"
import { ethers } from "ethers";

import {USER_PROFILE_ABI} from "@/contracts/UserProfile.abi.js"
import {NFT_ABI} from "@/contracts/DiplomaNFT.abi.js"


const userProfileAddress = "0x5BE8f24F8008D602FA10Ae0564Dd0342FaA8ce6b"
const nftAddress = "0xD94187394CCAC3CdF5f52Cf7515bD1957AA3Bb50"
let UserProfileContract = new ethers.Contract(userProfileAddress, USER_PROFILE_ABI)
let NFTcontract = new ethers.Contract(nftAddress, NFT_ABI)
let provider
let signer

export default createStore({
  state:{
    chainId:{},


    
    userProfile: {},
    userAddress:"",

    skillRequests: [],
    userProfiles: []
  },

  getters:{
  },

  mutations:{
  },

  actions:{
    async connectWallet({state}) {
      if (typeof window.ethereum !== 'undefined') {
          console.log("Etherium client installed!");
          if (window.ethereum.isMetaMask === true) {
              console.log("MetaMask connected!");
              if (window.ethereum.isConnected() !== true) {
                  console.log("MetaMask is not connected!");
                  await window.ethereum.enable();
              }
      console.log("MetaMask connected");
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = await provider.getSigner();
      state.userAddress = await signer.getAddress()
      
      state.chainId = await window.ethereum.request({ method: "eth_chainId" });

      console.log("chainId: ", state.chainId);
      UserProfileContract = UserProfileContract.connect(signer)
      NFTcontract = NFTcontract.connect(signer)
      window.ethereum.on("accountsChanged", async () => {
        state.userAddress = await signer.getAddress()
        console.log(`Accounts changed to ${state.address}`);
      })

      window.ethereum.on("chainChanged", async () => {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          state.chainId = await window.ethereum.request({ method: "eth_chainId" });
          signer = await provider.getSigner();
          state.userAddress = await signer.getAddress()
          UserProfileContract = UserProfileContract.connect(signer)
          NFTcontract = NFTcontract.connect(signer)
          console.log("chainId changed to ", state.chainId);
      })
          } else {
              alert ("Metamask is not installed!")
          }
      } else {
          alert ("Ethereum client is not installed!")
      }
    
  },
    // Действия для взаимодействия с контрактами Ethereum
      async createProfile({state}, args) {
        try {
          const [nameProfile, contactInfo, socialLinks] = args
          const tx = await UserProfileContract.createProfile(nameProfile, contactInfo, socialLinks);
          await tx.wait();
          state.userProfiles = [...state.userProfiles, {name: nameProfile, contactInformation: contactInfo, socialLinks: socialLinks, userProfileAddress: state.userAddress}];
          return true;
        } catch (error) {
          console.error("Error creating profile:", error);
          return false;

        }
      },
      async rateSkill({state}, args) {
        try {
          const [skillName, rating, comment, targetUser] = args
          const tx = await UserProfileContract.rateSkill(skillName, rating, comment, targetUser);
          await tx.wait();
          return true;
        } catch (error) {
          console.error("Error rating skill:", error, state.userAddress);
          return false;
        }
      },
      async addSkill({state}, skillName) {
        try{
          const tx = await UserProfileContract.addSkill(skillName);
          await tx.wait();
          return true;
        } catch (error) {
          console.error("Error add skill:", error, state.userAddress);
          return false;
        }
      },
      async fetchUserProfile({ state }, address) {
        try {
          const profile = await UserProfileContract.profiles(address);
          state.userProfile = profile;
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },
      async fetchAllUserSkills({state}, address) {
        try{
          const skills = await UserProfileContract.getUserSkills(address);
          const uniqueSkills = skills.filter((value, index) => skills.indexOf(value) === index);
          return uniqueSkills;
        } catch (error) {
              console.error("Error fetching skills:", error, state.userAddress);
            }
      },
      async fetchAllUserProfiles({state}){
        try{
          const users = await UserProfileContract.getAllUserProfiles();
          
          state.userProfiles = users;
        } catch (error) {
          console.error("Error fetching user profiles:", error);
        }
      },

      async fetchAllUserRatings({state}, address) {
        try{
          const ratings = await UserProfileContract.getUserSkillRatings(address);
          return ratings;
        } catch (error) {
              console.error("Error fetching ratings:", error, state.userAddress);
        }
      },

      async getUserSkillRatingsAverage({ state }, address) {
        try {
          const ratings = await UserProfileContract.getUserSkillRatings(address);
          const skillRatings = {};
      
          for (let i = ratings.length - 1; i >= 0; i--) {
            const rating = ratings[i];
      
            if (!skillRatings[rating.skillName]) {
              skillRatings[rating.skillName] = rating;
            } 
          }
      
          let totalRating = 0;
          let ratingCount = 0;
      
          for (const skillName in skillRatings) {
            const rating = skillRatings[skillName];
            const weight = rating.isTrust ? 1.5 : 1;
            totalRating += rating.rating * weight;
            ratingCount++;
          }
      
          const averageRating = ratingCount > 0 ? (totalRating / ratingCount) * 5 : 0;
          return averageRating;
        } catch (error) {
          console.error("Error fetching user skill ratings:", error, state.userAddress);
          return 0;
        }
      },
      
      async saveAndMintNft({state}, args) {
        try{
          const [ipfsHash, targetUser] = args
          let tokenId = await NFTcontract.mintDiplomaNFT(targetUser, ipfsHash)
          await tokenId.wait()
        } catch(error) {
          console.error("Error saving and minting NFT", error, state.userAddress);
          return 0;
        }
      },
      async getUserTokenLinks({state}, address) {
        try{
          let hashes = await NFTcontract.getAllTokenHashesForUser(address)
          let baseUrl = await NFTcontract.baseURI()
          const imageURLs = hashes.map((hash) => baseUrl + hash);
          return imageURLs
        } catch(error) {
          console.error("Error fetching user skill ratings:", error, state.userAddress);
          return 0;
        }
      },
      async sendTrustRequest({state}, address) {
        try{
          await UserProfileContract.sendTrustRequest(address)
        } catch(error) {
          console.error("Error sending trust request:", error, state.userAddress);
          return 0;
        }
      },
      async getUserTrustRequests({state}) {
        try{
          let request = await UserProfileContract.getTrustRequests()
          return request
        } catch(error) {
          console.error("Error getting trust requests:", error, state.userAddress);
          return 0;
        }
      },
      async confirmTrustRequest({state}, address) {
        try{
          await UserProfileContract.setTrustUser(address)
        } catch(error) {
          console.error("Error confirming trust request:", error, state.userAddress);
          return 0;
        }
      }
  },

  modules:{

  }
})