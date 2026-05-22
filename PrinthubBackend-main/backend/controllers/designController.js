import Design from "../models/DesignModel.js";

// Upload Design
export const uploadDesign = async (req, res) => {
  try {
    const { title, description, price, category, imageUrl } = req.body;

    const design = new Design({
      title,
      description,
      price,
      category,
      imageUrl: req.file?.path || imageUrl,
      designer: req.user.id
    });

    await design.save();

    res.status(201).json({
      success: true,
      message: "Design uploaded successfully",
      design
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Designs + Search Filter
export const getAllDesigns = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice && maxPrice) {
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice)
      };
    }

    const designs = await Design.find(filter).populate("designer", "firstName lastName email");

    res.status(200).json(designs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
