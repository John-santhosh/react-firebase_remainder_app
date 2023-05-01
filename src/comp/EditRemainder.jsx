import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../Context";

const EditRemainder = ({ id, remainder }) => {
  const [value, setValue] = useState(remainder);
  const { editRemainder } = useGlobalContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Remainder
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Remainder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Edit
            </span>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="form-control"
              placeholder={remainder}
              id="basic-url"
              aria-describedby="basic-addon3 basic-addon4"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              editRemainder(id, "REMAINDER", value);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditRemainder;
