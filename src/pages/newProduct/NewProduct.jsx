import { useDispatch } from "react-redux";
import { useState } from "react";
import "./newProduct.css";
import app from "../../../firebase";
const storage = getStorage();
const storageRef = ref(storage, "images/mountains.jpg");

// Upload the file and metadata
const uploadTask = uploadBytesResumable(storageRef, file);

// Pause the upload
uploadTask.pause();

// Resume the upload
uploadTask.resume();

// Cancel the upload
uploadTask.cancel();
export default function NewProduct() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  //INFO: How to get values as a key value pair.
  //
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }; //TIP: names should be the exactly the same as in the db.
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name; //INFO: To prevent duplicate files to override each other!
    const storage = getStorage(app); //Firebase app
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file); //TIP: upload process started.

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  console.log(categories);
  console.log(file);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            name="img"
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem" onChange={handleChange}>
          <label>Price</label>
          <input name="price" type="number" placeholder="100" />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="jeans, skirts"
            onChange={handleCategories}
          />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Enter the description.."
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
