const { resumeCollectionRef } = require("../firebase.config");
const { uploadImage } = require("./imageController");
const { deleteObject, ref, getStorage } = require("firebase/storage");

/* ============== add Resume ==============*/
exports.addResume = async (req, res) => {
  const file = {
    type: req.file.mimetype,
    buffer: req.file.buffer,
  };
  const buildImage = await uploadImage(file, "single");

  const projectData = {
    resume: buildImage,
  };

  try {
    const project = await resumeCollectionRef.add(projectData);

    res.status(201).json({
      message: "Resume added successfully",
      project,
    });
  } catch (err) {
    res.status(400).json({
      message: "Resume not added!",
      error: err.message,
    });
  }
};

/* ============== get Resume ==============*/
exports.getResume = async (req, res) => {
  try {
    const resume = await resumeCollectionRef.get();
    const resumeList = resume.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    }));

    if (!resume) {
      throw new Error("Resume not found!");
    }

    res.status(200).json({
      message: "Resume founded",
      resume: resumeList,
    });
  } catch (err) {
    res.status(404).json({
      message: "Resume not Added!",
      error: err.message,
    });
  }
};

/* ============== delete resume ==============*/
exports.deleteResume = async (req, res) => {
  const documentId = req.params.id;

  const storage = getStorage();

  try {
    const imageRef = await resumeCollectionRef.doc(documentId).get();
    const imageURL = imageRef.data();
    const image = ref(storage, imageURL.resume);

    await deleteObject(image);

    const documentRef = await resumeCollectionRef.doc(documentId);
    await documentRef.delete();

    res.status(200).json({
      message: "Resume deleted!",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};
