import {
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import sendIcon from "../assets/paper-plane.png";
import avatar from "../assets/user-286.png";
import { auth, database } from "../config/firebaseConfig";

function Comments({ movieId }) {
  const [commentInput, setCommentInput] = useState();
  const [user] = useAuthState(auth);

  const commentsRef = collection(database, "comments", movieId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "desc"));
  const [values, loading] = useCollectionData(q);

  const addComment = async (e) => {
    e.preventDefault();
    const comment = {
      username: user.displayName,
      comment: commentInput,
      createdAt: serverTimestamp(),
    };
    await addDoc(commentsRef, comment).then(() => {
      setCommentInput("");
    });
  };

  return (
    <div style={{ paddingTop: "3rem" }}>
      <h2 style={{ margin: "1rem 0" }}>Comments</h2>
      <div
        style={{
          width: "fit-content",
          background: "#DDDDDD",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        {user && (
          <form
            style={{ display: "flex", alignItems: "center" }}
            onSubmit={(e) => addComment(e, "David")}
          >
            <input
              value={commentInput}
              style={{
                width: "40rem",
                background: "transparent",
                outline: "none",
                fontSize: "20px",
                border: "none",
                borderRadius: "5px",
                color: "black",
              }}
              onChange={(e) => setCommentInput(e.target.value)}
            />

            <div
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "5px",
                background: "#00337C",
                borderRadius: "5px",
              }}
            >
              <img
                onClick={addComment}
                style={{ width: "100%", height: "100%" }}
                src={sendIcon}
                alt="user avatar"
              />
            </div>
          </form>
        )}
      </div>
      <div>
        {loading ? (
          <div
            style={{
              width: "100%",
              padding: "5rem 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>Loading...</h2>
          </div>
        ) : values.length > 0 ? (
          values.map((movie, index) => (
            <CommentCard
              key={index}
              username={movie.username}
              comment={movie.comment}
            />
          ))
        ) : (
          <div
            style={{
              width: "100%",
              padding: "5rem 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2>No comments Yet</h2>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentCard({ username, comment }) {
  return (
    <div
      style={{
        height: "5rem",
        display: "flex",
        alignItems: "center",
        margin: "0.5rem 0",
        borderBottom: "1px",
        borderBottomColor: "gray",
      }}
    >
      <div>
        <img
          style={{ width: "3rem", marginRight: "1rem" }}
          src={avatar}
          alt="user avatar"
        />
      </div>
      <div style={{}}>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{username}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comments;
