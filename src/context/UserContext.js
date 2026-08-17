import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 'post_1',
      author: 'Anonymous Bat',
      avatar: 'batman',
      content: 'Feels like I am carrying the weight of the entire world. Career pressure is crushing. How do you guys manage?',
      type: 'post', // post or advice
      commentsCount: 8,
      likesCount: 14,
      isLiked: false,
      isSaved: false,
      timestamp: '2 hours ago',
      category: 'Career',
    },
    {
      id: 'post_2',
      author: 'Bruce_93',
      avatar: 'knight',
      content: 'Tips on dealing with a breakup: block them, hit the gym, focus on your craft. You will rise from the ashes.',
      type: 'advice',
      commentsCount: 15,
      likesCount: 42,
      isLiked: true,
      isSaved: true,
      timestamp: '4 hours ago',
      category: 'Breakup',
    },
    {
      id: 'post_3',
      author: 'SilentGideon',
      avatar: 'ninja',
      content: 'Fatherhood is hard. My son looks up to me, but sometimes I feel like I have no idea what I am doing.',
      type: 'post',
      commentsCount: 22,
      likesCount: 89,
      isLiked: false,
      isSaved: false,
      timestamp: '1 day ago',
      category: 'Fatherhood',
    }
  ]);

  const [savedPostIds, setSavedPostIds] = useState(['post_2']);
  const [joinedCommunityIds, setJoinedCommunityIds] = useState(['career', 'fatherhood']);
  const [moodHistory, setMoodHistory] = useState([
    { date: '2026-08-16', mood: 'stressed', label: 'Stressed' },
    { date: '2026-08-15', mood: 'focused', label: 'Focused' },
    { date: '2026-08-14', mood: 'neutral', label: 'Neutral' },
  ]);
  const [streakCount, setStreakCount] = useState(3);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  const addPost = (content, type, category, isAnonymous, authorName) => {
    const newPost = {
      id: `post_${Date.now()}`,
      author: isAnonymous ? 'Anonymous Member' : (authorName || 'User'),
      avatar: isAnonymous ? 'anonymous' : 'knight',
      content,
      type,
      category,
      commentsCount: 0,
      likesCount: 0,
      isLiked: false,
      isSaved: false,
      timestamp: 'Just now',
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLikePost = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: post.likesCount + (isLiked ? 1 : -1),
          };
        }
        return post;
      })
    );
  };

  const toggleSavePost = (postId) => {
    setSavedPostIds((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, isSaved: !post.isSaved };
        }
        return post;
      })
    );
  };

  const checkInMood = (moodKey, label) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setMoodHistory((prev) => [
      { date: todayStr, mood: moodKey, label },
      ...prev.filter((m) => m.date !== todayStr),
    ]);
    if (!hasCheckedInToday) {
      setStreakCount((prev) => prev + 1);
      setHasCheckedInToday(true);
    }
  };

  const toggleJoinCommunity = (commId) => {
    setJoinedCommunityIds((prev) => {
      if (prev.includes(commId)) {
        return prev.filter((id) => id !== commId);
      } else {
        return [...prev, commId];
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        posts,
        savedPostIds,
        joinedCommunityIds,
        moodHistory,
        streakCount,
        hasCheckedInToday,
        addPost,
        toggleLikePost,
        toggleSavePost,
        checkInMood,
        toggleJoinCommunity,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
