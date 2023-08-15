const Post = require('../models/Post');
const fetch = require('node-fetch'); // For making HTTP requests
const cheerio = require('cheerio'); // For parsing HTML

exports.createPost = async (req, res) => {
  const { url } = req.body;
  const user = req.user; // Assuming user is attached by the verifyToken middleware

  try {
    // Fetch the Flipkart URL
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract data from the HTML
    const title = $('span[class="_35KyD6"]').text().trim();
    const price = $('div[class="_1vC4OE"]').text().trim();
    const description = $('div[class="_2c7YLP"]').text().trim();
    const reviews = parseInt($('span[class="_2_R_DZ"]').text().trim());
    const ratings = $('div[class="_1i0wk8"]').text().trim();
    const mediaCount = parseInt($('div[class="_2c7YLP"]').find('div').length);

    // Create a new post and save it
    const post = new Post({
      title,
      price,
      description,
      reviews,
      ratings,
      mediaCount,
      user,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
