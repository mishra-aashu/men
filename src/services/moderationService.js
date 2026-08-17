export const moderationService = {
  reportContent: async (type, id, reason) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, message: 'Content flagged for manual review.' };
  }
};
