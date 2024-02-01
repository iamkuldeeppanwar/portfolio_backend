const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

exports.uploadImage = async (file, quantity) => {
  const storageFB = getStorage();

  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);

    // Get the download URL
    const downloadURL = await getDownloadURL(ref(storageFB, fileName));
    return downloadURL;
  }

  if (quantity === "multiple") {
    const imageUrls = [];

    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {
        contentType: file.images[i].mimetype,
      };

      await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

      // Get the download URL for each image
      const downloadURL = await getDownloadURL(ref(storageFB, fileName));
      imageUrls.push(downloadURL);

      // Save the image URL to your database
      const saveImage = await Image.create({ imageUrl: downloadURL });
      file.item.imageId.push({ _id: saveImage._id });
      await file.item.save();
    }

    return imageUrls;
  }
};
