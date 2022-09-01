function Avatar({ avatarPath, height, width, className }) {
  return (
    <img
      src={avatarPath ? avatarPath : "/assets/img/avt-default.jpeg"}
      height={height}
      width={width}
      className={className}
    />
  );
}

export default Avatar;
