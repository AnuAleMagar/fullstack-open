CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Anu Ale', 'https://techinsights.dev/js-closures', 'Understanding JavaScript Closures in Depth', 12);

INSERT INTO blogs (author, url, title, likes)
VALUES ('John Doe', 'https://devcorner.io/react-hooks-guide', 'A Complete Guide to React Hooks', 25);
