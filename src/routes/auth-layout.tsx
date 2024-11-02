import { LoginImage } from "@/assets/images";
import Login from "@/components/ui/pages/auth/login";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-3 w-full h-screen">
    <div className="col-span-1 h-full">
        <img className=" w-full h-full object-cover" src={LoginImage} alt="login and signup image" />
    </div>
    <div className="col-span-2 flex justify-center items-center">
    <Login/>
    </div>
    </div>
  )
}

export default AuthLayout;