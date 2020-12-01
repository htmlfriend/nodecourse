export default (mongoose) => {
  const UserSchema = mongoose.Schema({
    login: String,
    password: {
      type: String,
      required: [true, 'Password is necessity'],
    },
  });
  return mongoose.model('User', UserSchema);
};
