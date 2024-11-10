import React, { useEffect, useState } from "react";

const CommentDialog = ({ openComment, setOpenComment }) => {
  const [text, setText] = useState("");

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
      console.log(inputText);
    }
  };

  const addCommentHandler = () => {
    console.log("addCommentHandler");
    setText("");
  };

  const handleKeys = (e) => {
    if (e.key == "Enter") {
      addCommentHandler();
    }
  };
  useEffect(() => {
    // console.log(openComment);
    if (openComment) {
      document.getElementById("commentbox").checked = true;
    }
  }, [openComment]);

  return (
    <>
      <input type="checkbox" id="commentbox" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0 max-w-4xl bg-gray-300">
          <div className="flex flex-1">
            <div className="w-3/5">
              <img
                className="rounded-sm w-full aspect-square object-cover"
                src="https://plus.unsplash.com/premium_photo-1714051661316-4432704b02f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="post_image"
              />
            </div>
            <div className="w-2/5 h-2/5 flex flex-col justify-between">
              {/* avatar */}
              <div className="flex items-center justify-between bg-red-300">
                <div className="flex items-center gap-2">
                  <div className="avatar flex items-center p-1 ">
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                    <span className="mx-3 text-black">Username</span>
                  </div>
                </div>

                {/* dropdown */}

                <details className="dropdown dropdown-end">
                  <summary className="btn m-1 bg-transparent hover:bg-transparent border-none text-black">
                    :
                  </summary>
                  <ul className="menu dropdown-content font-bold bg-white text-black rounded-box z-[1] w-40 p-2">
                    <li>
                      <a>Unfollow</a>
                    </li>
                    <li>
                      <a>Add to favourite</a>
                    </li>
                    <li>
                      <a>Cancel</a>
                    </li>
                  </ul>
                </details>
              </div>

              {/* comments */}

              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
                <div>comments</div>
              </div>

              <div className="flex items-center gap-2 mx-2 my-1">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  onKeyDown={handleKeys}
                  className="w-full outline-none border-gray-300 rounded py-1 px-2"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={addCommentHandler}
                  disabled={!text.trim()}
                  className="btn btn-success text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="commentbox"
          onClick={() => setOpenComment(false)}
        ></label>
      </div>
    </>
  );
};

export default CommentDialog;
