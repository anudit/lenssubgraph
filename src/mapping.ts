import {
  LensHub,
  Transfer
} from "../generated/LensHub/LensHub"
import { Profile } from "../generated/schema"

export function handleTransfer(event: Transfer): void {

  let lensContract = LensHub.bind(event.address);
  let entity = Profile.load(event.params.to.toHexString());

  if (!entity) {
    entity = new Profile(event.params.to.toHexString());
    let profileData = lensContract.getProfile(event.params.tokenId);
    entity.profileId = event.params.tokenId;
    entity.pubCount = profileData.pubCount;
    entity.followModule = profileData.followModule;
    entity.followNFT = profileData.followNFT;
    entity.handle = profileData.handle.toString();
    entity.imageURI = profileData.imageURI.toString();
    entity.followNFTURI = profileData.followNFTURI.toString();
  }

  entity.save();

};
