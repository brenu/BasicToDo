import { useEffect, useState } from "react";
import { FaArchive, FaPlus, FaPlusCircle, FaTimes } from "react-icons/fa";

import './App.css';

function App() {
  const [list, setList] = useState(() => {
    const localList = localStorage.getItem("todo@list");

    if (localList) {
      return JSON.parse(localList);
    }

    return [];
  });
  const [showOnlyArchived, setShowOnlyArchived] = useState(false);
  const [isCreatingItem, setIsCreatingItem] = useState(false);

  const [newItemContent, setNewItemContent] = useState("");

  useEffect(() => {
    localStorage.setItem("todo@list", JSON.stringify(list));
  }, [list]);

  function updateStatus(index) {
    const newList = list.map((item,itemIndex) => {
      if (itemIndex === index) {
        const presentStatus = item.status;

        if (presentStatus === "todo") {
          item.status = "doing";
        } else if (presentStatus === "doing") {
          item.status = "done";
        } else {
          item.status = "todo";
        }

        return item
      }

      return item;
    });

    setList(newList);
  }
  
  function handleArchiving(index) {
    const temporaryList = [...list];
    temporaryList[index].isArchived = !temporaryList[index].isArchived;

    setList(temporaryList);
  }

  function handleNewItem(e) {
    e.preventDefault();

    setList([...list, {content: newItemContent, status: "todo", isArchived: false}]);
    setNewItemContent("");
    setIsCreatingItem(false);
  }

  if (isCreatingItem) {
    return (
      <div className="container">
        <div className="content">
          <div className="header-container">
            <button onClick={() => {
              setIsCreatingItem(false);
              setNewItemContent("");
            }}>
              <FaTimes/>
            </button>
          </div>
          <form onSubmit={handleNewItem}>
            <textarea 
              value={newItemContent} 
              onChange={e => setNewItemContent(e.target.value)}
              placeholder="Nice task here..."
            >
              
            </textarea>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <div className="header-container">
          <button onClick={() => setIsCreatingItem(true)}>
            <FaPlusCircle/>
          </button>
          <button onClick={() => setShowOnlyArchived(!showOnlyArchived)}>
            { showOnlyArchived ? "Hide Archive" : "Show Archive" }
          </button>
        </div>
        {list.map((item, index) => {
            if (item.isArchived === showOnlyArchived) {
              return (
                <div key={index} className="card">
                  <div className="options-container">
                    <div className={`status-container ${item.status}`}>
                      <div className="button-background">
                        <button onClick={() => updateStatus(index)}></button>
                      </div>
                      <span>{item.status}</span>
                    </div>
                    <button onClick={() => handleArchiving(index)}>
                      <FaArchive color="#C284FF" size={18} />
                    </button>
                  </div>
                  <p>{item.content}</p>
                </div>
              );
            }
          }
        )}
      </div>
    </div>
  );
}

export default App;
