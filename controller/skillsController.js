const { skillCollectionRef } = require("../firebase.config");

/* ============== added skills ==============*/
exports.addSkill = async (req, res) => {
  const { skills } = req.body;
  try {
    const project = await skillCollectionRef.add(skills);

    res.status(201).json({
      message: "Skills added successfully",
      project,
    });
  } catch (err) {
    res.status(400).json({
      message: "Skills not added!",
      error: err.message,
    });
  }
};

/* ============== get all skills ==============*/
exports.getSkills = async (req, res) => {
  try {
    const skills = await skillCollectionRef.get();
    const skillsList = skills.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    }));

    if (!skills) {
      throw new Error("skills Not Found!");
    }

    res.status(200).json({
      message: "skills founded",
      skills: skillsList,
    });
  } catch (err) {
    res.status(404).json({
      message: "Projects not created!",
      error: err.message,
    });
  }
};

/* ============== delete skills ==============*/
exports.deleteSkill = async (req, res) => {
  const documentId = req.params.id;

  try {
    const documentRef = await skillCollectionRef.doc(documentId);
    await documentRef.delete();

    res.status(200).json({
      message: "project deleted!",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};
