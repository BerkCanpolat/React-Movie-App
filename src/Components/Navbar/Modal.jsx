import { useState } from "react";
import useInput from "../../Hook/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../../utils/validation";
import { useAuth } from "../../Context/AuthContext";

const Modal = ({ onClose, type, setType }) => {
  const [showPassword, setShowPassword] = useState(false);

  const emailInput = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const passwordInput = useInput("", (value) => hasMinLength(value, 5));

  function handleFormSubmit(e) {
    e.preventDefault();
    if (emailInput.hasError || passwordInput.hasError) return;
    console.log(emailInput.value);
    console.log(passwordInput.value);
  }

  const { redirectToTMDB } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl shadow-xl p-8 w-11/12 sm:w-[470px] z-10 dark:bg-[#0f0f0f]/95 backdrop-blur-md border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Login with TMDb</h2>
        <p className="text-gray-400 text-center mb-6">
          You’ll be redirected to The Movie Database to log in securely.
        </p>
        <button
          onClick={redirectToTMDB}
          className="dark:bg-emerald-600 bg-black text-white w-full sm:py-3 rounded-xl cursor-pointer hover:opacity-75 transition-opacity duration-400 font-medium"
        >
          Continue with TMDb
        </button>
      </div>

      {/* <div className="relative bg-white rounded-xl shadow-xl p-8 w-11/12 sm:w-[470px] z-10 dark:bg-[#0f0f0f]/95 backdrop-blur-md border border-white/10">
      {
        type === "login" ? (
            <div>
                <div className="flex items-center justify-between">
                <div>
                <img src={mainLogo} alt="mainlogo" className="w-26"/>
                <p className="dark:text-white text-black sm:text-sm mt-0.5">Login to your account</p>
                </div>
                <div>
                    <button className="dark:bg-black dark:text-white dark:border-white border text-black bg-white rounded-[9px] sm:pt-2.5 sm:pr-3.5 sm:pl-3.5 sm:pb-2.5 cursor-pointer sm:text-sm" onClick={onClose}>Close</button>
                </div>
                </div>
                <form onSubmit={handleFormSubmit}>

                    <Input type="text" placeholder="Email" className="mb-5" classNameLabel="mt-10" labelText={"Email"} id={"email"} error={emailInput.hasError && "Geçerli Bir Email Giriniz"} name="email" value={emailInput.value} onChange={emailInput.handleInputChange} onBlur={emailInput.handleInputBlur}/>

                    <div className="relative">

                    <Input type={showPassword ? "text" : "password"} className="mb-5" placeholder="Password" labelText={"Password"} error={passwordInput.hasError && "Şifre En az 5 karakterli olmalı"} name="password" value={passwordInput.value} onChange={passwordInput.handleInputChange} onBlur={passwordInput.handleInputBlur}/>

                    <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                    <button className="bg-transparent dark:text-white text-black sm:text-sm sm:mt-7.5 sm:mb-4 cursor-pointer font-medium">Forgot Password</button>
                    <button className="dark:bg-white bg-black dark:text-gray-500 text-white w-full sm:py-3 rounded-xl cursor-pointer hover:opacity-75 transition-opacity duration-400 font-medium">Login</button>
                    <p className="dark:text-gray-500 text-white mt-5.5">Don't have ac account? <span className="dark:text-white text-black font-semibold cursor-pointer" onClick={() => setType("signup")}>Sign Up</span></p>
                    </div>
                </form>
            </div>

        ) : (
            <div>
                <div className="flex items-center justify-between">
                <div>
                <img src={mainLogo} alt="mainlogo" className="w-26"/>
                <p className="dark:text-white text-black sm:text-sm mt-0.5">Login to your account</p>
                </div>
                <div>
                    <button className="dark:bg-black dark:text-white dark:border-white border text-black bg-white rounded-[9px] sm:pt-2.5 sm:pr-3.5 sm:pl-3.5 sm:pb-2.5 cursor-pointer sm:text-sm" onClick={onClose}>Close</button>
                </div>
                </div>
                <form>

                    <Input type="text" placeholder="Username" className="mb-5" classNameLabel="mt-10" labelText={"Username"}/>

                    <Input type="text" placeholder="Email" className="mb-5" labelText={"Email"}/>
                    

                    <div className="relative">
                    <Input type={showPassword ? "text" : "password"} className="mb-5" placeholder="Password" labelText={"Password"}/>

                    <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </span>
                    </div>
                    <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" labelText={"Password"}/>

                    <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </span>
                    </div>

                    <div className="flex flex-col items-center justify-center mt-5">
                        <div className="flex items-center gap-2 mb-5">
                            <input type="checkbox" className="appearance-none dark:bg-black bg-white border border-gray-400 w-5.5 h-5.5 rounded-full cursor-pointer"/>
                    <p className="dark:text-gray-500 text-white sm:text-sm">I agree to our <span className="dark:text-white text-black font-semibold cursor-pointer">Privacy Policy</span> and <span className="dark:text-white text-black font-semibold cursor-pointer">Term & Conditions</span></p>
                        </div>
                    <button className="dark:bg-white bg-black dark:text-gray-500 text-white w-full sm:py-3 rounded-xl cursor-pointer hover:opacity-75 transition-opacity duration-400 font-medium">Login</button>
                    <p className="dark:text-gray-500 text-white mt-5.5">Already hove ac account? <span className="dark:text-white text-black font-semibold cursor-pointer" onClick={() => setType("login")}>Login</span></p>
                    </div>
                </form>
            </div>
        )
      }
      </div> */}
    </div>
  );
};

export default Modal;