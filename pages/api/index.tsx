// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import LineChart from 'common/chart';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    <LineChart 
      values={{gpa: [2, 3, 1, 0, 4]}}
      labels={["Fall 2019", "Spring 2020", "2021", "2022", "2024"]}
    />
  );
  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
    'Content-Length': svg.length,
  });

  res.end(svg);
}
