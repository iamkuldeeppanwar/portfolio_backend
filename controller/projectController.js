const {
  projectCollectionRef,
  moreProjectCollectionRef,
} = require("../firebase.config");
const { uploadImage } = require("./imageController");
const { deleteObject, ref, getStorage } = require("firebase/storage");

/* ============== create project ==============*/
exports.addProjects = async (req, res) => {
  const file = {
    type: req.file.mimetype,
    buffer: req.file.buffer,
  };
  const buildImage = await uploadImage(file, "single");

  const { projectName, hostedLink, projectTechnology } = req.body;

  const projectData = {
    projectImage: buildImage,
    projectName,
    hostedLink,
    projectTechnology: [...projectTechnology],
  };

  try {
    const project = await projectCollectionRef.add(projectData);

    res.status(201).json({
      message: "projects created successfully",
      project,
    });
  } catch (err) {
    res.status(400).json({
      message: "Projects not created!",
      error: err.message,
    });
  }
};

/* ============== get all project ==============*/
exports.getProjects = async (req, res) => {
  try {
    const project = await projectCollectionRef.get();
    const projectList = project.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    }));

    if (!project) {
      throw new Error("projects Not Found!");
    }

    res.status(200).json({
      message: "projects founded",
      project: projectList,
    });
  } catch (err) {
    res.status(404).json({
      message: "Projects not created!",
      error: err.message,
    });
  }
};

/* ============== delete project and image ==============*/
exports.deleteProjects = async (req, res) => {
  const documentId = req.params.id;

  const storage = getStorage();

  try {
    const imageRef = await projectCollectionRef.doc(documentId).get();
    const imageURL = imageRef.data();
    const image = ref(storage, imageURL.projectImage);

    await deleteObject(image);

    const documentRef = await projectCollectionRef.doc(documentId);
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

/* ============== create more project ==============*/
exports.addMoreSkills = async (req, res) => {
  const { projectName, hostedLink, projectTechnology } = req.body;

  const moreProject = {
    projectName,
    hostedLink,
    projectTechnology: [...projectTechnology],
  };

  try {
    const Project = await moreProjectCollectionRef.add(moreProject);

    res.status(201).json({
      message: "moreProject created successfully",
      Project,
    });
  } catch (err) {
    res.status(400).json({
      message: "moreProject not created!",
      error: err.message,
    });
  }
};

/* ============== get more project ==============*/
exports.getMoreProjects = async (req, res) => {
  try {
    const project = await moreProjectCollectionRef.get();
    const projectList = project.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    }));

    if (!project) {
      throw new Error("projects Not Found!");
    }

    res.status(200).json({
      message: "projects founded",
      project: projectList,
    });
  } catch (err) {
    res.status(404).json({
      message: "Projects not created!",
      error: err.message,
    });
  }
};

/* ============== delete project and image ==============*/
exports.deleteMoreProjects = async (req, res) => {
  const documentId = req.params.id;

  try {
    const documentRef = await moreProjectCollectionRef.doc(documentId);
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
