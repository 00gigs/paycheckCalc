// pages/api/account/latest.js

import moneyinfo from "@/app/(models)/money";



export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { finAccount } = req.query; // Get the user account from query parameters

      // Make sure to adjust the query as per your database schema and requirements
      const latestData = await moneyinfo.findOne({ finAccount }).sort({ createdAt: -1 });

      if (!latestData) {
        return res.status(404).json({ message: 'Data not found' });
      }

      res.status(200).json({ amountSaved: latestData.amountSaved, amountInvested: latestData.amountInvested });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
