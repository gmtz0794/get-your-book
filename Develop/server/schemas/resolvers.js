const { Tech, Matchup, User } = require('../models');

const resolvers = {
  Query: {
    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
    me: async (parent, args, context) => {
      return context.user;
    },
    books: async () => {
      return Book.find({});
    },
    bookSearch: async (parent, { query }) => {
      return Book.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { author: { $regex: query, $options: 'i' } }] });
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
    signup: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email, password });
      return user;
    },
    saveBook: async (parent, { bookInput }, context) => {
      const user = context.user;
    
      // Validate that bookInput has all required fields
      const { title, author, description, image, link } = bookInput;
      if (!title || !author || !description || !image || !link) {
        throw new Error('All fields for a book must be provided.');
      }
    
      user.savedBooks.push(bookInput);
      await user.save();
      return user;
    },
    removeBook: async (parent, { bookId }, context) => {
      const user = context.user; 
      user.savedBooks = user.savedBooks.filter(book => book._id !== bookId);
      await user.save();
      return user;
    },
    logout: async (parent, args, context) => {
      context.user = null; 
      return 'Successfully logged out';
    },
  },
};

module.exports = resolvers;

