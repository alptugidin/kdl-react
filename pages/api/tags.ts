import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../util/db';
import Tag from './models/tags';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const tags = await Tag.find({tag: {$regex: req.query.q, $options: "i"}}).limit(9);
  res.send(tags);
}
