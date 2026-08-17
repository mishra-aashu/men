import { COMMUNITIES } from '../utils/constants';

export const communityService = {
  getCommunities: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return COMMUNITIES;
  },
  joinCommunity: async (communityId) => {
    return { success: true, communityId };
  },
  createCommunity: async (communityData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, community: { id: communityData.name.toLowerCase().replace(/ /g, '-'), ...communityData } };
  }
};
