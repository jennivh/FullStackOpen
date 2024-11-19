const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((a,b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog =>blog.likes)
    let max = Math.max(... likes)
    const position = likes.indexOf(max)
    return blogs[position]
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }

