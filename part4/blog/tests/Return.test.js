const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const listWithMultipleBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const listWithTwoBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

//total likes

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.TotalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  const listWithEmptyBlog = [];
  test("when list has zero blog, equals to zero", () => {
    const result = listHelper.TotalLikes(listWithEmptyBlog);
    assert.strictEqual(result, 0);
  });

  test("when list has two blogs, equals to sum of the likes of each of them", () => {
    const result = listHelper.TotalLikes(listWithTwoBlogs);
    assert.strictEqual(result, 17);
  });
  test("List with multiple blogs should return the total number of likes each blog have", () => {
    const result = listHelper.TotalLikes(listWithMultipleBlog);
    assert.strictEqual(result, 36);
  });
});

//favoriteBlog
describe("favorite blog", () => {
  test("When list has only one blog,it should return that blog", () => {
    result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });
  const listWithEmptyBlog = [];
  test("When list has empty blog,it should return empty object", () => {
    result = listHelper.favoriteBlog(listWithEmptyBlog);
    assert.deepStrictEqual(result, {});
  });

  test("When list has multiple blogs,it should return the blog which has maximum number of likes count", () => {
    result = listHelper.favoriteBlog(listWithMultipleBlog);
    assert.deepStrictEqual(result, listWithMultipleBlog[2]);
  });
});

//mostblogs
describe("most blogs", () => {
  test("When blog has only one blog then it should return the author and blogs:1", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });

  test('when list has empty blog it should return empty object',()=>{
    const listWithEmptyBlog=[]
    const result=listHelper.mostBlogs(listWithEmptyBlog)
    assert.deepStrictEqual(result,{})
  })
    test('when list has multiple blog it should return an object of author name and the number of blogs the author have',()=>{
    const result=listHelper.mostBlogs(listWithMultipleBlog)
    assert.deepStrictEqual(result,{
        author:'Robert C. Martin',
        blogs:3
    })
  })
});
