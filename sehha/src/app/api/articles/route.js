// sehha/src/app/api/articles/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Article from "../../lib/models/Article";

export async function GET(request) {
  try {
    console.log("Starting /api/articles request...");

    // Ensure MongoDB connection
    await connectMongoDB();
    console.log("MongoDB connection established");

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const author = searchParams.get("author") || "all";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 6; // Articles per page
    console.log(`Query parameters: author=${author}, search=${search}, page=${page}, limit=${limit}`);

    // Build the query
    const query = {};
    if (author && author !== "all") {
      query.author = author;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search by title
    }
    console.log("Query:", query);

    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    console.log(`Pagination: skip=${skip}, limit=${limit}`);

    // Fetch articles with pagination, filtering, and search
    console.log("Fetching articles from database...");
    const articles = await Article.find(query)
      .skip(skip)
      .limit(limit)
      .lean();
    console.log("Fetched articles:", articles);

    // Get the total number of articles for pagination metadata
    console.log("Counting total articles...");
    const totalArticles = await Article.countDocuments(query);
    console.log("Total articles:", totalArticles);

    const totalPages = Math.ceil(totalArticles / limit);
    console.log("Total pages:", totalPages);

    // If the request includes a "getAuthors" parameter, return distinct authors
    const getAuthors = searchParams.get("getAuthors");
    if (getAuthors) {
      console.log("Fetching distinct authors...");
      const authors = await Article.distinct("author");
      console.log("Authors:", authors);
      return NextResponse.json(["all", ...authors], { status: 200 });
    }

    return NextResponse.json(
      {
        articles: articles || [],
        pagination: {
          currentPage: page,
          totalPages: totalPages || 1,
          totalArticles: totalArticles || 0,
          articlesPerPage: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/articles:", error.message);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    console.log("MongoDB connection established for POST request");

    const body = await request.json();
    console.log("Request body:", body);

    const { title, content, author, image } = body;

    // Validate required fields
    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, and author are required" },
        { status: 400 }
      );
    }

    // Create new article
    const newArticle = new Article({
      title,
      content,
      author,
      image,
      date: new Date(),
    });

    await newArticle.save();
    console.log("Article created:", newArticle);

    return NextResponse.json(
      { message: "Article created successfully", article: newArticle },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error.message);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      {
        error: "Failed to create article",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}