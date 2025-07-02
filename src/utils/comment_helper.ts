export default function insertReply(
  comments: Comments[],
  newReply: Comments
): Comments[] {
  const findAndInsert = (nodes: Comments[]): boolean => {
    for (const node of nodes) {
      if (node.id === newReply.parent_id) {
        node.replies.push(newReply);
        return true; // Inserted
      }
      if (node.replies.length > 0) {
        if (findAndInsert(node.replies)) return true;
      }
    }
    return false;
  };

  // Create a deep clone to preserve immutability
  const updatedComments = JSON.parse(JSON.stringify(comments));
  findAndInsert(updatedComments);
  return updatedComments;
}

export function removeComment(
  comments: Comments[],
  targetId: number
): Comments[] {
  const removeRecursive = (nodes: Comments[]): Comments[] => {
    return nodes
      .filter((node) => node.id !== targetId) // Remove if ID matches
      .map((node) => ({
        ...node,
        replies: removeRecursive(node.replies), // Recurse into replies
      }));
  };

  return removeRecursive(comments);
}
