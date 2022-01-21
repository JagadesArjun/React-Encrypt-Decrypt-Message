import "./App.css";

import CryptoJS from "crypto-js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [plainTextMessage, setPlainTextMessage] = useState("");
  const [plainTextKey, setPlainTextKey] = useState("");
  const [decryptedTextMessage, setDecryptedTextMessage] = useState("");
  const [decryptTextKey, setDecryptTextKey] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");

  const encryptMessage = () => {
    try {
      var ciphertext = CryptoJS.AES.encrypt(
        plainTextMessage,
        plainTextKey
      ).toString();
      setFinalMessage(ciphertext);
      setShowModal(true);
    } catch (e) {
      alert(e);
    }
  };

  const decryptMessage = () => {
    try {
      var text = CryptoJS.AES.decrypt(
        decryptedTextMessage,
        decryptTextKey
      ).toString(CryptoJS.enc.Utf8);
      setFinalMessage(text);
      setShowModal(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="App">
      <div
        style={{
          padding: 20,
          boxShadow: "-3px 10px 27px -7px rgba(0,0,0,0.37)",
        }}
      >
        <h3>Encrypt | Decrypt Messages</h3>
      </div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Decrypt Message</Accordion.Header>
          <Accordion.Body>
            <div>
              <div style={{ padding: 10 }}>
                <Form.Label htmlFor="decrypt-text-msg">
                  Decrypted Text Message
                </Form.Label>
                <Form.Control
                  id="decrypt-text-msg"
                  as="textarea"
                  aria-label="Decrypted Text Message"
                  placeholder="Enter Decrypted Text Message here..."
                  value={decryptedTextMessage}
                  onChange={(e) => setDecryptedTextMessage(e.target.value)}
                  style={{ height: "250px" }}
                />
              </div>

              <div style={{ padding: 10 }}>
                <Form.Label htmlFor="decryption-key">Decryption Key</Form.Label>
                <Form.Control
                  id="decryption-key"
                  placeholder="Enter Decryption Key here..."
                  aria-label="Decryption Key"
                  aria-describedby="basic-addon1"
                  value={decryptTextKey}
                  onChange={(e) => setDecryptTextKey(e.target.value)}
                />
              </div>
              <div style={{ padding: 10 }}>
                <Button
                  variant="primary"
                  disabled={!decryptedTextMessage || !decryptTextKey}
                  onClick={() => decryptMessage()}
                >
                  Decrypt
                </Button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Encrypt Message</Accordion.Header>
          <Accordion.Body>
            <div>
              <div style={{ padding: 10 }}>
                <Form.Label htmlFor="text-msg">Plain Text Message</Form.Label>
                <Form.Control
                  id="text-msg"
                  as="textarea"
                  aria-label="Plain Text Message"
                  placeholder="Enter Plain Text Message here..."
                  value={plainTextMessage}
                  onChange={(e) => setPlainTextMessage(e.target.value)}
                  style={{ height: "250px" }}
                />
              </div>

              <div style={{ padding: 10 }}>
                <Form.Label htmlFor="Encryption-key">Encryption Key</Form.Label>
                <Form.Control
                  id="Encryption-key"
                  placeholder="Enter Encryption Key here..."
                  aria-label="Encryption Key"
                  aria-describedby="basic-addon1"
                  value={plainTextKey}
                  onChange={(e) => setPlainTextKey(e.target.value)}
                />
              </div>
              <div style={{ padding: 10 }}>
                <Button
                  variant="primary"
                  disabled={!plainTextMessage || !plainTextKey}
                  onClick={() => encryptMessage()}
                >
                  Decrypt
                </Button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {showModal && (
        <Modal show={showModal} centered size="lg" fullscreen>
          <Modal.Header>
            <Modal.Title>Final Message</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control
              id="final-text-msg"
              as="textarea"
              value={finalMessage}
              style={{ height: "calc(100vh - 25%)" }}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;
