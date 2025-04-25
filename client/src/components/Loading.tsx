const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="loader border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
