const fetch = require('node-fetch');

exports.handler = async (event) => {
  const path = event.path; // 요청된 경로
  const url = `https://api.ezpzz.store${path}`; // ALB URL로 요청을 전달

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: 'admin.ezpzz.store',  // ALB에서 요청을 라우팅하기 위해 Host 헤더 설정
      },
      body: event.body,
    });

    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers: {
        ...response.headers,
        'Access-Control-Allow-Origin': '*',
      },
      body: responseBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Internal Server Error: ${error.message}`,
    };
  }
};