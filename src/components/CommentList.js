import Comment from "./Comment";

const CommentList = (props) => {
  const data = props.comments;
  if (data === undefined) {
    return;
  }
  return data.map((comment, index) => {
    return (
      <div className="mb-5" key={index}>
        {comment.snippet?.topLevelComment ? (
          <Comment data={comment.snippet?.topLevelComment?.snippet} />
        ) : (
          <Comment data={comment?.snippet} />
        )}
        <div className="ml-5 pl-5 border border-l-black">
          <CommentList comments={comment?.replies?.comments} />
        </div>
      </div>
    );
  });
};

export default CommentList;
