import React from "react";
import ReactDOM from "react-dom/client";
import { CommentDetails } from "./CommentDetails";
import { faker } from "@faker-js/faker";
import ApprovalCard from "./ApprovalCard";
import './style/App.css'  // styles copied from course

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <CommentDetails
          author="Sam"
          timeAgo="Today at 4:00pm"
          comment="Nice post"
          avatar={faker.image.avatar()}
        ></CommentDetails>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetails
          author="Alex"
          timeAgo="Yesterday at 1:00am"
          comment="thoughtful"
          avatar={faker.image.avatar()}
        ></CommentDetails>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetails
          author="Jane"
          timeAgo="Yesterday at 7:00am"
          comment="I agree"
          avatar={faker.image.avatar()}
        ></CommentDetails>
      </ApprovalCard>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(<App />, document.querySelector("#root"));
