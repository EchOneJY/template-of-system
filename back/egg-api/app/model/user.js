module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema(
    {
      name: { type: String, required: true },
      password: { type: String, required: true, select: false },
      role: { type: String, required: true },
      avatar: { type: String, required: false },
      following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      },
      likeArticle: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
      },
    },
    { timestamps: true }
  )

  return mongoose.model('User', UserSchema)
}
