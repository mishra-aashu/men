export const postService = {
  getPosts: async () => {
    // Mock fetch
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
  createPost: async (postData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, post: postData };
  },
  toggleLike: async (postId) => {
    return { success: true };
  },
  getComments: async (postId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { id: '1', author: 'SolidGrit', content: 'You got this, brother. Keep grinding.', timestamp: '1h ago' },
      { id: '2', author: 'ShieldKnight', content: 'Same boat here. Taking it one day at a time.', timestamp: '30m ago' },
    ];
  },
  addComment: async (postId, content) => {
    return { id: Math.random().toString(), content, author: 'You', timestamp: 'Just now' };
  }
};
