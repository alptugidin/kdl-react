import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../util/db';
import Series from './models/series';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const series = await Series.find({name: {$regex: req.query.q, $options: 'i'}}).limit(10);
  res.send(series);
}
