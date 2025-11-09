const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // kapalıysa hiçbir şey gösterme

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arka plan (karartma efekti) */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>

      {/* Modal içeriği */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-11/12 sm:w-96 z-10">
        <h1 className="dark:text-white text-black">My İtems</h1>
      </div>
    </div>
  );
};

export default Modal;
