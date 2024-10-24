const { Client } = require("@notionhq/client");

exports.handler = async function(event, context) {
    // CORSヘッダーの設定
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    };

    // OPTIONSリクエストへの対応
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: ""
        };
    }

    try {
        // Notionクライアントの初期化
        const notion = new Client({
            auth: process.env.NOTION_API_TOKEN
        });

        // データベースクエリの実行
        const response = await notion.databases.query({
            database_id: process.env.DATABASE_ID,
            page_size: 100
        });

        // 成功時のレスポンス
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        };

    } catch (error) {
        console.error("Error details:", error);
        
        // エラー時のレスポンス
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message,
                details: error.toString()
            })
        };
    }
};
