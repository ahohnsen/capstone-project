import Request from '../components/Request.js';

export default function RequestsList({
  posts,
  searchValue,
  onToggleBookmark,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  return (
    <>
      {posts
        ?.filter(post =>
          post.destination
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        )
        .map(post => (
          <Request
            key={post._id}
            createdDate={post.createdAt}
            startDate={post.startDate}
            endDate={post.endDate}
            destination={post.destination}
            description={post.description}
            isBookmarked={post.isBookmarked}
            isArchived={post.isArchived}
            author={post.author}
            onToggleBookmark={() => onToggleBookmark(post._id)}
            onToggleCheckmark={() => onToggleCheckmark(post._id)}
            onEditPost={() => onEditPost(post)}
            onDeletePost={() => onDeletePost(post._id)}
          />
        ))}
    </>
  );
}
