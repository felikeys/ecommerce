import { LoginImage } from "@/assets/images";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-3 w-full h-full">
    <div className="col-span-1">
        <img className="h-full w-full object-cover" src={LoginImage} alt="login and signup image" />
    </div>
    <div className="col-span-2 text-2xl flex justify-center items-center">
    <div>Profile</div>
    </div>
    </div>
  )
}

export default AuthLayout;