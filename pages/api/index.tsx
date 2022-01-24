// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import LineChart from 'common/chart';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const sgpa: number[] = req.query.sgpa 
    ? (req.query.sgpa as string).split(',').map(s => +s)
    : null
    const cgpa: number[] = req.query.cgpa
    ? (req.query.cgpa as string).split(',').map(s => +s)
    : null
    const labels: string[] = req.query.labels
    ? (req.query.labels as string).split(',')
    : []
    
  if(!sgpa && !cgpa)
    return res.send(400);

  const svg = ReactDOMServer.renderToStaticMarkup(
    <LineChart 
      values={{sgpa: sgpa, cgpa: cgpa}}
      labels={labels}
    />
  );
  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
    'Content-Length': svg.length,
  });

  res.end(svg);
}
