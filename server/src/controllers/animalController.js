function parseAnimalBody(body = {}) {
  const yearsValue =
    typeof body.age === "object" ? Number(body.age.years || 0) : Number(body.ageYears || 0);
  const monthsValue =
    typeof body.age === "object"
      ? Number(body.age.months || 0)
      : Number(body.ageMonths || 0);

  return {
    nameTagId: body.nameTagId,
    age: {
      years: Number.isNaN(yearsValue) ? 0 : yearsValue,
      months: Number.isNaN(monthsValue) ? 0 : monthsValue
    },
    milkYieldPerDay: Number(body.milkYieldPerDay || 0),
    pregnancyStatus: body.pregnancyStatus || "Unknown",
    owner: body.owner
  };
}

export function createAnimalController(Model) {
  return {
    async list(request, response) {
      try {
        const items = await Model.find({ owner: request.user.id }).sort({ createdAt: -1 });
        return response.json(items);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    },

    async create(request, response) {
      try {
        const payload = parseAnimalBody({
          ...request.body,
          owner: request.user.id
        });

        const item = await Model.create(payload);
        return response.status(201).json(item);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    },

    async bulkUpsert(request, response) {
      try {
        const animals = Array.isArray(request.body.animals) ? request.body.animals : [];

        await Model.deleteMany({ owner: request.user.id });

        if (!animals.length) {
          return response.json([]);
        }

        const docs = animals
          .filter((animal) => animal.nameTagId || animal.age || animal.milkYieldPerDay)
          .map((animal) =>
            parseAnimalBody({
              ...animal,
              owner: request.user.id
            })
          );

        const saved = docs.length ? await Model.insertMany(docs) : [];
        return response.json(saved);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    },

    async update(request, response) {
      try {
        const item = await Model.findOneAndUpdate(
          { _id: request.params.id, owner: request.user.id },
          parseAnimalBody(request.body),
          { new: true }
        );

        if (!item) {
          return response.status(404).json({ message: "Record not found." });
        }

        return response.json(item);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    },

    async remove(request, response) {
      try {
        const item = await Model.findOneAndDelete({
          _id: request.params.id,
          owner: request.user.id
        });

        if (!item) {
          return response.status(404).json({ message: "Record not found." });
        }

        return response.json({ message: "Record deleted." });
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    }
  };
}
