const { Client } = require("@notionhq/client")

exports.handler = async function(event, context) {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN
  });

  try {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_ID
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
