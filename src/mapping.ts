import { BigInt } from "@graphprotocol/graph-ts";
import {
  LensHub,
  Followed,
  PostCreated,
  ProfileCreated
} from "../generated/LensHub/LensHub"
import { Post, Profile, SocialGraph } from "../generated/schema"

export function handleProfileCreated(event: ProfileCreated): void {

  let lensContract = LensHub.bind(event.address);
  let entity = Profile.load(event.params.profileId.toString());

  if (!entity) {
    entity = new Profile(event.params.profileId.toString());
    let profileData = lensContract.getProfile(event.params.profileId);

    entity.profileId = event.params.profileId;
    entity.creator = event.params.creator;
    entity.owner = event.params.to;
    entity.pubCount = profileData.pubCount;
    entity.followModule = profileData.followModule;
    entity.followNFT = profileData.followNFT;
    entity.handle = profileData.handle.toString();
    entity.imageURI = profileData.imageURI.toString();
    entity.createdOn = event.params.timestamp;
    entity.followNFTURI = profileData.followNFTURI.toString();
    entity.followModuleReturnData = event.params.followModuleReturnData;

    entity.save();
  }


};

export function handleFollowed(event: Followed): void {

  let entity = SocialGraph.load(event.params.follower.toHexString());

  if (!entity) {
    let entity = new SocialGraph(event.params.follower.toHexString());
    let newFollowingList: string[] = [];
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }

    entity.following = newFollowingList;
    entity.save();
  }
  else {
    let newFollowingList: string[] = entity.following;
    for (let index = 0; index < event.params.profileIds.length; index++) {
      const profileId = event.params.profileIds[index].toString();
      newFollowingList.push(profileId);
    }
    entity.following = newFollowingList;
    entity.save();
  };

};

export function handlePostCreated(event: PostCreated): void {

  let entity = Post.load(event.params.pubId.toString());

  if (!entity) {
    let entity = new Post(event.params.pubId.toString());

    entity.profileId = event.params.profileId.toString();
    entity.contentURI = event.params.contentURI;
    entity.collectModule = event.params.collectModule;
    entity.collectModuleReturnData = event.params.collectModuleReturnData;
    entity.referenceModule = event.params.referenceModule;
    entity.referenceModuleReturnData = event.params.referenceModuleReturnData;
    entity.timestamp = event.params.timestamp;

    entity.save();
  }

};
