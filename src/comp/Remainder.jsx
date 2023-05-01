import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import List from "./List";

import { useGlobalContext } from "../Context";

const Remainder = () => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { addData, readData, remainders } = useGlobalContext();
  useEffect(() => {
    readData();
  }, []);

  function createRemainder() {
    if (!input) {
      return;
    }
    addData(input);
  }
  return (
    <>
      {/* Modal Trigger Button */}
      <div className="container">
        <h2 className="display-3 text-center">REMAINDER APP</h2>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <Button variant="primary" onClick={handleShow}>
                  Add Remainder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {remainders.map((item) => {
        return <List key={item.id} {...item}></List>;
      })}

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Add Remainder"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              createRemainder();
              setInput("");
              setShow(false);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Remainder;
