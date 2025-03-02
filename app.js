


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent ="Welcome to the latest insights and stories from The Open Journal! Here, you’ll find thought-provoking articles, personal reflections, and inspiring ideas that spark curiosity and conversation. Whether you’re seeking wisdom, motivation, or just a fresh perspective, our curated posts are here to enlighten and engage. Dive in and explore!"


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [
  {
    title: "The Beauty of Imperfection",
    content:
      "Perfection is an illusion, and embracing our flaws is what makes us truly unique. Life’s beauty lies in its imperfections...",
  },
  {
    title: "Chasing Sunsets: A Traveler’s Reflection",
    content:
      "There’s something magical about watching the sun dip below the horizon. Each sunset reminds us that endings can be just as beautiful as beginnings...",
  },
  {
    title: "The Power of a Single Idea",
    content:
      "Every great innovation started as a single thought. What if the next big breakthrough is locked inside your mind, waiting to be shared?",
  },
  {
    title: "Minimalism: The Art of Letting Go",
    content:
      "In a world that glorifies excess, minimalism teaches us that less is truly more. It's not just about decluttering our homes but also our minds...",
  },
  {
    title: "The Science of Happiness",
    content:
      "Happiness isn’t just a feeling—it’s a skill. Studies show that gratitude, mindfulness, and connection are the key ingredients to lasting joy...",
  },
  {
    title: "Why Failure is the Best Teacher",
    content:
      "Every setback is a lesson in disguise. The greatest minds in history didn’t succeed because they never failed—they succeeded because they never quit...",
  },
];


app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  var requestTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("New Contact Form Submission:", { name, email, message });
  res.redirect("/?message=Thank you for contacting us! We will get back to you soon.");
});


app.listen(3000, function () {
  console.log("Server running on port 3000");
});
