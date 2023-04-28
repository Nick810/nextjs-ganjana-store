export default async (req, res) => {
  res.status(200).json({ cookies: req.headers })
}