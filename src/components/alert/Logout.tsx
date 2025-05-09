
export const Logout = ({
    heading,
    content,
    buttonText,
    onCloseText,
    onOkClick,
    onClose,
  }: {
    heading: string;
    content: string;
    buttonText: string;
    onCloseText?: string;
    onOkClick: () => void;
    onClose: () => void;
  }) => {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black opacity-50 pointer-events-auto`}
        ></div>
        <div className="fixed w-full inset-0 flex flex-col items-center justify-center z-50">
          <div className="flex flex-col bg-white p-6 shadow-md mobile:w-[80%] tablet:w-[60%] laptop:w-[45%] desktop:w-[38%] largescreen:w-[28%] rounded-2xl ">
            <h2 className="mt-2 text-center text-xl font-semibold text-app-gray-medium break-words mb-2">
              {heading}
            </h2>
            {content && <p className="break-words">{content}</p>}
            <div className="flex flex-row mt-3 justify-center items-center justify-items-center gap-5">
              <div className="flex flex-1 justify-end">
                <button
                  onClick={() => onOkClick()}
                  className="bg-white px-8 py-2 text-app-blue border-app-blue border-2 rounded-lg hover:bg-app-blue hover:text-white"
                >
                  {buttonText}
                </button>
              </div>
              {onCloseText && (
                <div className="flex flex-1 justify-start">
                  <button
                    onClick={() => onClose()}
                    className="bg-white text-app-blue border-2 border-app-blue py-2  px-8 rounded-lg hover:bg-app-blue hover:text-white"
                  >
                    {onCloseText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Logout