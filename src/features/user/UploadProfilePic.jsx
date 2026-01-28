import { useState, useContext } from "react";
import { Card, Button, Form, Image } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const UploadProfilePic = () => {
  const { avatar, refreshAvatar } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); //React Router navigate

  const upload = async () => {
    if (!file) {
      alert("Select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/user/profile-pic", formData);
      await refreshAvatar(); //  GLOBAL UPDATE

      alert("Profile picture updated");
      setFile(null);
      setPreview(null);
      navigate("/user/profile"); //Redirect to profile page
    } catch (err) {
      console.log(err);
      alert("Failed to upload profile picture");
    }
  };

  return (
    <Card className="mx-auto mt-4 shadow" style={{ maxWidth: 400 }}>
      <Card.Body className="text-center">
        <Image
          src={preview || avatar}
          roundedCircle
          width={150}
          height={150}
          className="mb-3"
        />

        <Form.Control
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        <Button className="w-100" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UploadProfilePic;
