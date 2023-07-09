export const USER_PROFILE_ABI = [{"inputs":[{"internalType":"string","name":"newSkill","type":"string"}],"name":"addSkill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_contactInfo","type":"string"},{"internalType":"string","name":"_socialLinks","type":"string"}],"name":"createProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllUserProfiles","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"contactInformation","type":"string"},{"internalType":"string","name":"socialLinks","type":"string"},{"internalType":"address","name":"userProfileAddress","type":"address"}],"internalType":"struct UserProfile.Profile[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTrustRequests","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_userProfileAddress","type":"address"}],"name":"getUserSkillRatings","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"string","name":"skillName","type":"string"},{"internalType":"uint8","name":"rating","type":"uint8"},{"internalType":"string","name":"comment","type":"string"},{"internalType":"bool","name":"isTrust","type":"bool"}],"internalType":"struct UserProfile.SkillRate[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserSkills","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"profiles","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"contactInformation","type":"string"},{"internalType":"string","name":"socialLinks","type":"string"},{"internalType":"address","name":"userProfileAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_skillName","type":"string"},{"internalType":"uint8","name":"_rating","type":"uint8"},{"internalType":"string","name":"_comment","type":"string"},{"internalType":"address","name":"targetUser","type":"address"}],"name":"rateSkill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"}],"name":"sendTrustRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"setTrustUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"trustRequests","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"trustUsers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]