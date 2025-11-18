router.get("/:id", async (req, res) => {
    const includeOptions = {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      through: {
        attributes: ["read", "id"],
      },
    };
  
    if (req.query.read !== undefined) {
      const readValue = req.query.read === "true";
      includeOptions.through.where = {
        read: readValue,
      };
    }
  
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [includeOptions],
    });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    const userJson = user.toJSON();
    if (userJson.readings) {
      userJson.readings = userJson.readings.map((blog) => {
        const joinData =
          blog.reading_list || blog.ReadingList || blog.readinglists;
  
        const { reading_list, ReadingList, ...blogData } = blog;
  
        return {
          ...blogData,
          readinglists: joinData
            ? [{ read: joinData.read, id: joinData.id }]
            : [],
        };
      });
    }
  
    res.json(userJson);
  });