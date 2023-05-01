import EditRemainder from "./EditRemainder";
import { useGlobalContext } from "../Context";
const List = ({ timestamp, remainder, id, isChecked }) => {
  const { editRemainder, deleteRemainder } = useGlobalContext();
  return (
    <div key={id} className="remainder-list">
      <div className="remainder-item">
        <span>
          <div className="checker fs-2 ">
            <span className="">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  editRemainder(id, "CHECKBOX");
                }}
              />
            </span>
            <span
              style={{ textDecoration: isChecked ? "line-through" : "none" }}
            >
              {remainder}
            </span>
          </div>
          <i>{new Date(timestamp * 1000).toLocaleString()}</i>
        </span>
        <span className="">
          <EditRemainder remainder={remainder} id={id}></EditRemainder>
          <button
            onClick={() => deleteRemainder(id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </div>
      <hr />
    </div>
  );
};

export default List;
852;
