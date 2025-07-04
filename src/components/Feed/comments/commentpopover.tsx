type props = {
onClose: () => void
handleDelete: () => void
}

const CommentPopOver:React.FC<props> = ({onClose, handleDelete}) => {
  const menuItems = [
    {
      label: "Flag this comment",
      onClick: () => {},
    },
    {
      label: "Copy comment link",
      onClick: () => {},
    },
    {
      label: "Delete Comment",
      onClick: handleDelete
    },
  ];
  return (
    <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose?.();
            }}
            className="w-full flex items-center gap-2 px-3 py-[5px] transition-colors cursor-pointer"
          >
            <span className="text-[13px] text-[#3A3D46] font-normal">
              {item.label}
            </span>
          </button>
        ))}
      </div>
  );
};

export default CommentPopOver;
