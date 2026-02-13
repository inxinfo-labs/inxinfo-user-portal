import { useState, useContext } from "react";
import { Card, Button, Form, Image, Alert, Row, Col } from "react-bootstrap";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { FaCamera, FaUpload, FaTimes, FaCheckCircle } from "react-icons/fa";

const UploadProfilePic = () => {
  const { avatar, refreshAvatar } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError("");
    setSuccess("");
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError("");
    setSuccess("");
  };

  const upload = async () => {
    if (!file) {
      setError("Please select an image file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/user/profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refreshAvatar();
      setSuccess("Profile picture updated successfully! Admin has been notified.");
      setFile(null);
      setPreview(null);
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || "Failed to upload profile picture";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-profile-pic">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <Card.Header 
              className="border-0 py-3"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <h5 className="mb-0 fw-bold d-flex align-items-center">
                <FaCamera className="me-2 text-teal" />
                Upload Profile Picture
              </h5>
            </Card.Header>
            <Card.Body className="p-4 p-lg-5">
              {success && (
                <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccess("")}>
                  <FaCheckCircle className="me-2" />
                  {success}
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="mb-4" dismissible onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              <div className="text-center mb-4">
                <div
                  className="mx-auto position-relative"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    border: "6px solid rgba(234, 88, 12, 0.2)",
                    boxShadow: "0 10px 30px rgba(234, 88, 12, 0.2)",
                  }}
                >
                  {preview || avatar ? (
                    <Image
                      src={preview || avatar}
                      roundedCircle
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FaCamera style={{ fontSize: "4rem", color: "white", opacity: 0.7 }} />
                  )}
                </div>
                <p className="text-muted mt-3 mb-0">
                  {preview ? "Preview" : "Current Profile Picture"}
                </p>
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold mb-3 d-block">
                  Select Image
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border-2"
                  style={{ borderRadius: "10px", padding: "0.75rem" }}
                />
                <Form.Text className="text-muted d-block mt-2">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </Form.Text>
              </Form.Group>

              {preview && (
                <div className="mb-4 p-3 rounded" style={{ background: "rgba(234, 88, 12, 0.08)" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="mb-0 fw-semibold">{file?.name}</p>
                      <p className="mb-0 small text-muted">
                        {(file?.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleRemove}
                      style={{ borderRadius: "8px" }}
                    >
                      <FaTimes className="me-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              <div className="d-flex gap-3">
                <Button
                  onClick={upload}
                  disabled={!file || loading}
                  className="fw-semibold flex-grow-1"
                  style={{
                    background: "var(--gradient-primary)",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.75rem",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 20px rgba(234, 88, 12, 0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload className="me-2" />
                      Upload Picture
                    </>
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style>{`
        .form-control:focus {
          border-color: var(--primary-600) !important;
          box-shadow: 0 0 0 0.2rem rgba(234, 88, 12, 0.25) !important;
        }
      `}</style>
    </div>
  );
};

export default UploadProfilePic;
