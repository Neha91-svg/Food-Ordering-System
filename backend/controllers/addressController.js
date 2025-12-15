import addressModel from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const address = await addressModel.create({
      userId: req.body.userId,
      ...req.body,
    });
    res.json({ success: true, data: address });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.find({ userId: req.body.userId });
    res.json({ success: true, data: addresses });
  } catch {
    res.status(500).json({ success: false });
  }
};
