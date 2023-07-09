//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// Контракт для хранения профилей пользователей
contract UserProfile {
    struct Profile {
        string name;
        string contactInformation;
        string socialLinks;
        address userProfileAddress;
    }

    struct SkillRate {
        address user;
        string skillName;
        uint8 rating;
        string comment;
    }

    mapping(address => Profile) public profiles;
    mapping(uint => address) users;
    mapping(address => bool) isExist;
    mapping(address => SkillRate[]) public userSkillRatings;
    mapping(address => mapping(string => mapping(address => uint))) private skillRatings;

    mapping(address => string[]) skills;
    uint index;

    function createProfile(string calldata _name, string calldata _contactInfo, string calldata _socialLinks) public {
        require(bytes(_name).length > 0, "Name is required");
        if(!isExist[msg.sender]){
            profiles[msg.sender] = Profile(_name, _contactInfo, _socialLinks, msg.sender);
            isExist[msg.sender] = true;
            users[index] = msg.sender;
            index++;
        }
    }

    function addSkill(string calldata newSkill) external {
        skills[msg.sender].push(newSkill);
    }

    function getUserSkills(address user) external view returns(string[] memory){
        return skills[user];
    }

    function getAllUserProfiles() public view returns(Profile[] memory userProfiles) {
        for(uint i = 0; i <= index; i++) {
            userProfiles[i] = profiles[users[i]];
        }
        return userProfiles;
    }

    function rateSkill(string memory _skillName, uint8 _rating, string memory _comment, address targetUser) public {
        require(targetUser != msg.sender, "You cannot rate yourself");
        require(bytes(_skillName).length > 0, "Skill name is required");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        // Проверяем, есть ли уже оценка для данного пользователя и скилла
        uint currentRate = skillRatings[targetUser][_skillName][msg.sender];
        require(currentRate == 0, "Skill already rated");
        skillRatings[targetUser][_skillName][msg.sender] = _rating;
        userSkillRatings[targetUser].push(SkillRate(msg.sender, _skillName, _rating, _comment));
    }

    function getUserSkillRatings(address _userProfileAddress) public view returns (SkillRate[] memory) {
        return userSkillRatings[_userProfileAddress];
    }
}
